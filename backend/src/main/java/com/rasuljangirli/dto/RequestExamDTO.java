package com.rasuljangirli.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestExamDTO {
    private String examName;
    private String examDescription;
    private int examTime;
}
