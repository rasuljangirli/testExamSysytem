package com.rasuljangirli.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultDTO {
    private int totalQuestions;
    private int correctAnswers;
    private int wrongAnswers;
    private List<QuestionResultDTO> questionResults;
}
