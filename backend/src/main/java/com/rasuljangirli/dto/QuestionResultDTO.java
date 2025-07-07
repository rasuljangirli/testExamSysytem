package com.rasuljangirli.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResultDTO {
    private Long questionId;
    private boolean correct;
    private Long correctOptionId;
    private Long selectedOptionId;
}
