package com.rasuljangirli.controller;

import com.rasuljangirli.dto.AnswerSubmissionDTO;
import com.rasuljangirli.dto.QuestionDTO;
import com.rasuljangirli.dto.ResultDTO;
import com.rasuljangirli.model.Question;
import com.rasuljangirli.service.interfaces.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/create")
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionDTO dto) {
        Question created = questionService.createQuestion(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @PostMapping("/evaluate")
    public ResponseEntity<ResultDTO> evaluateExamSubmission(@RequestBody AnswerSubmissionDTO submissionDTO) {
        ResultDTO resultDTO = questionService.evaluateSubmission(submissionDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(resultDTO);
    }

    @GetMapping("/result/{userToken}/{examId}")
    public ResponseEntity<ResultDTO> getUserExamResult(
            @PathVariable String userToken,
            @PathVariable Long examId) {

        ResultDTO resultDTO = questionService.getUserExamResult(userToken, examId);
        return ResponseEntity.ok(resultDTO);
    }


}
