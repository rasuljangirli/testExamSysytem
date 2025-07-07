package com.rasuljangirli.service.interfaces;

import com.rasuljangirli.dto.AnswerSubmissionDTO;
import com.rasuljangirli.dto.QuestionDTO;
import com.rasuljangirli.dto.ResultDTO;
import com.rasuljangirli.model.Question;

import java.util.List;

public interface QuestionService {
    public Question createQuestion(QuestionDTO dto);

    public ResultDTO evaluateSubmission(AnswerSubmissionDTO submissionDTO);

    public ResultDTO getUserExamResult(String userToken, Long examId);
}
