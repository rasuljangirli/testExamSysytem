package com.rasuljangirli.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseExamDTO {
    private Long id;
    private String examName;
    private String examDescription;
    private int examTime;
}
