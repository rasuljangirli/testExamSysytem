package com.rasuljangirli.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDTO {
    private Long examId;
    private String questionText;
    private String questionFormulText;
    private List<OptionDTO> options;
}
