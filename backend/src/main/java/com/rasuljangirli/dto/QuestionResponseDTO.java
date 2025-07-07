package com.rasuljangirli.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionResponseDTO {
    private Long id;
    private String questionText;
    private String questionFormulText;
    private List<OptionResponseDTO> options;
}