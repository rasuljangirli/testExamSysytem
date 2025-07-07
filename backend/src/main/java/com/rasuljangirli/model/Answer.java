package com.rasuljangirli.model;

import com.rasuljangirli.model.Result;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long questionId;
    private Long selectedOptionId;

    @ManyToOne
    @JoinColumn(name = "result_id", referencedColumnName = "id")
    private Result result;  // İmtahanın nəticəsi ilə əlaqə
}