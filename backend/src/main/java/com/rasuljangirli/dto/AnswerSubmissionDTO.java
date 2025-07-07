package com.rasuljangirli.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerSubmissionDTO {
    private Long examId;
    private String userToken;
    private List<AnswerDTO> answers;
}
