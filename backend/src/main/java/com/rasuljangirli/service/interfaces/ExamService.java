package com.rasuljangirli.service.interfaces;


import com.rasuljangirli.dto.ExamResponseDTO;
import com.rasuljangirli.dto.RequestExamDTO;
import com.rasuljangirli.dto.ResponseExamDTO;

import java.util.List;

public interface ExamService {

    List<ResponseExamDTO> getAllExams();
    ResponseExamDTO createExam(RequestExamDTO requestExamDTO);

    public ExamResponseDTO getExamWithQuestions(Long examId);

}
