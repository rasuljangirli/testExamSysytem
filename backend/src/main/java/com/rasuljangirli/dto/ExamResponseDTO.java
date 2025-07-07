package com.rasuljangirli.dto;

import lombok.Data;

import java.util.List;

@Data
public class ExamResponseDTO {
    private Long id;
    private String examName;
    private String examDescription;
    private int examTime;
    private List<QuestionResponseDTO> questions;
}
