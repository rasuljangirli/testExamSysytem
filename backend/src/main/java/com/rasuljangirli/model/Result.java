package com.rasuljangirli.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Result {

    public Result(Long examId, String userToken, int totalQuestions, int correctAnswers, int wrongAnswers, LocalDateTime submissionTime) {
        this.examId = examId;
        this.userToken = userToken;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.wrongAnswers = wrongAnswers;
        this.submissionTime = submissionTime;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long examId;
    private String userToken;

    private int totalQuestions;
    private int correctAnswers;
    private int wrongAnswers;

    private LocalDateTime submissionTime;

    @OneToMany(mappedBy = "result")
    private List<Answer> answers;  // Bir nəticə bir neçə cavaba sahib olacaq
}
