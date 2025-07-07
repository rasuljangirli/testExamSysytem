package com.rasuljangirli.service.impl;

import com.rasuljangirli.dto.*;
import com.rasuljangirli.model.Exam;
import com.rasuljangirli.model.Question;
import com.rasuljangirli.repository.ExamRepository;
import com.rasuljangirli.repository.QuestionRepository;
import com.rasuljangirli.service.interfaces.ExamService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Data
public class ExamServiceImpl implements ExamService {

    @Autowired
    private final ExamRepository examRepository;
    private final QuestionRepository questionRepositor;

    public ExamServiceImpl(ExamRepository examRepository, QuestionRepository questionRepositor) {
        this.examRepository = examRepository;
        this.questionRepositor = questionRepositor;
    }

    @Override
    public List<ResponseExamDTO> getAllExams() {
        return examRepository.findAll()
                .stream()
                .map(exam -> new ResponseExamDTO(
                        exam.getId(),
                        exam.getExamName(),
                        exam.getExamDescription(),
                        exam.getExamTime()))
                .collect(Collectors.toList());
    }

    @Override
    public ResponseExamDTO createExam(RequestExamDTO requestExamDTO) {

        Exam exam = new Exam();

        exam.setExamName(requestExamDTO.getExamName());
        exam.setExamDescription(requestExamDTO.getExamDescription());
        exam.setExamTime(requestExamDTO.getExamTime());

        Exam savedExma = examRepository.save(exam);

        ResponseExamDTO requestSavedExam = new ResponseExamDTO();

        requestSavedExam.setExamName(savedExma.getExamName());
        requestSavedExam.setExamDescription(savedExma.getExamDescription());
        requestSavedExam.setExamTime(savedExma.getExamTime());
        requestSavedExam.setId(savedExma.getId());

        return requestSavedExam;

    }

    @Override
    public ExamResponseDTO getExamWithQuestions(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<Question> questions = questionRepositor.findAllByExamId(examId);

        List<QuestionResponseDTO> questionDTOs = questions.stream().map(question -> {
            List<OptionResponseDTO> optionDTOs = question.getOption().stream().map(option -> {
                OptionResponseDTO optionDTO = new OptionResponseDTO();
                optionDTO.setId(option.getId());
                optionDTO.setOptionText(option.getOptionText());
                optionDTO.setOptionFormulText(option.getOptionFormulText());
                return optionDTO;
            }).collect(Collectors.toList());

            QuestionResponseDTO questionDTO = new QuestionResponseDTO();
            questionDTO.setId(question.getId());
            questionDTO.setQuestionText(question.getQuestionText());
            questionDTO.setQuestionFormulText(question.getQuestionFormulText());
            questionDTO.setOptions(optionDTOs);

            return questionDTO;
        }).collect(Collectors.toList());

        ExamResponseDTO examDTO = new ExamResponseDTO();
        examDTO.setId(exam.getId());
        examDTO.setExamName(exam.getExamName());
        examDTO.setExamDescription(exam.getExamDescription());
        examDTO.setExamTime(exam.getExamTime());
        examDTO.setQuestions(questionDTOs);

        return examDTO;
    }


}
