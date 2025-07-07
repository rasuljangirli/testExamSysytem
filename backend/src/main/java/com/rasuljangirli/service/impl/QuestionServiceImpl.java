package com.rasuljangirli.service.impl;

import com.rasuljangirli.dto.*;
import com.rasuljangirli.model.*;
import com.rasuljangirli.repository.*;
import com.rasuljangirli.service.interfaces.QuestionService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Data
public class QuestionServiceImpl implements QuestionService {

    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;
    private final OptionRepository optionRepository;
    private final ResultRepository resultRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Override
    @Transactional
    public Question createQuestion(QuestionDTO dto) {
        Exam exam = examRepository.findById(dto.getExamId())
                .orElseThrow(() -> new EntityNotFoundException("Exam not found with id " + dto.getExamId()));

        // 2. Question obyektini hazırla
        Question question = new Question();
        question.setQuestionText(dto.getQuestionText());
        question.setQuestionFormulText(dto.getQuestionFormulText());
        question.setExam(exam);

        // 3. Option-ları map et və sualla əlaqələndir
        List<Option> options = dto.getOptions().stream()
                .map(optDto -> {
                    Option opt = new Option();
                    opt.setOptionText(optDto.getOptionText());
                    opt.setOptionFormulText(optDto.getOptionFormulText());
                    opt.setCorrect(optDto.isCorrect());
                    opt.setQuestion(question);
                    return opt;
                })
                .collect(Collectors.toList());

        question.setOption(options);

        // 4. Yaddaşa yaz və yaradılan Question-u qaytar
        return questionRepository.save(question);
    }

    @Transactional
    @Override
    public ResultDTO evaluateSubmission(AnswerSubmissionDTO submissionDTO) {
        List<AnswerDTO> answers = submissionDTO.getAnswers();
        Long examId = submissionDTO.getExamId();
        String userToken = submissionDTO.getUserToken();

        // 0. İmtahanı tap və ümumi sual sayını götür
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("Exam not found with id: " + examId));
        int totalQuestions = exam.getQuestions().size();

        int correctCount = 0;
        List<QuestionResultDTO> questionResults = new ArrayList<>();

        // Əvvəlki nəticəni sil
        Optional<Result> existingResultOpt = resultRepository.findByExamIdAndUserToken(examId, userToken);
        existingResultOpt.ifPresent(result -> {
            answerRepository.deleteByResultId(result.getId());
            resultRepository.delete(result);
        });

        // Cavab verilmiş sualların nəticəsini yoxla
        for (AnswerDTO answer : answers) {
            Long questionId = answer.getQuestionId();
            Long selectedOptionId = answer.getSelectedOptionId();

            Optional<Option> correctOptionOpt = optionRepository.findByQuestionIdAndCorrectTrue(questionId);
            if (correctOptionOpt.isEmpty()) continue;

            Long correctOptionId = correctOptionOpt.get().getId();
            boolean isCorrect = correctOptionId.equals(selectedOptionId);

            if (isCorrect) correctCount++;

            QuestionResultDTO questionResult = new QuestionResultDTO();
            questionResult.setQuestionId(questionId);
            questionResult.setSelectedOptionId(selectedOptionId);
            questionResult.setCorrectOptionId(correctOptionId);
            questionResult.setCorrect(isCorrect);

            questionResults.add(questionResult);
        }

        int wrongCount = totalQuestions - correctCount;

        // Yeni nəticə yarat və yadda saxla
        Result result = new Result(
                examId,
                userToken,
                totalQuestions,
                correctCount,
                wrongCount,
                LocalDateTime.now()
        );
        Result savedResult = resultRepository.save(result);

        // Cavabları yaddaşa yaz
        List<Answer> answerList = answers.stream().map(dto -> {
            Answer answer = new Answer();
            answer.setQuestionId(dto.getQuestionId());
            answer.setSelectedOptionId(dto.getSelectedOptionId());
            answer.setResult(savedResult);
            return answer;
        }).toList();
        answerRepository.saveAll(answerList);

        // DTO hazırla və qaytar
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setTotalQuestions(totalQuestions);
        resultDTO.setCorrectAnswers(correctCount);
        resultDTO.setWrongAnswers(wrongCount);
        resultDTO.setQuestionResults(questionResults);

        return resultDTO;
    }


    @Override
    public ResultDTO getUserExamResult(String userToken, Long examId) {
        Optional<Result> resultOpt = resultRepository.findByUserTokenAndExamId(userToken, examId);

        if (resultOpt.isEmpty()) {
            throw new RuntimeException("Nəticə tapılmadı");
        }

        Result result = resultOpt.get();

        // Cavabları "AnswerRepository" vasitəsilə tapırıq
        List<Answer> answers = answerRepository.findByResultId(result.getId());

        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setTotalQuestions(result.getTotalQuestions());
        resultDTO.setCorrectAnswers(result.getCorrectAnswers());
        resultDTO.setWrongAnswers(result.getWrongAnswers());

        // Cavabları QuestionResultDTO ilə doldururuq
        List<QuestionResultDTO> questionResults = new ArrayList<>();

        for (Answer answer : answers) {
            Long questionId = answer.getQuestionId();
            Long selectedOptionId = answer.getSelectedOptionId();

            Optional<Option> correctOptionOpt = optionRepository
                    .findByQuestionIdAndCorrectTrue(questionId);

            if (correctOptionOpt.isEmpty()) continue;

            Long correctOptionId = correctOptionOpt.get().getId();
            boolean isCorrect = correctOptionId.equals(selectedOptionId);

            QuestionResultDTO questionResult = new QuestionResultDTO();
            questionResult.setQuestionId(questionId);
            questionResult.setSelectedOptionId(selectedOptionId);
            questionResult.setCorrectOptionId(correctOptionId);
            questionResult.setCorrect(isCorrect);

            questionResults.add(questionResult);
        }

        resultDTO.setQuestionResults(questionResults);

        return resultDTO;
    }
}
