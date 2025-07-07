package com.rasuljangirli.controller;

import com.rasuljangirli.dto.ExamResponseDTO;
import com.rasuljangirli.dto.RequestExamDTO;
import com.rasuljangirli.dto.ResponseExamDTO;
import com.rasuljangirli.model.Question;
import com.rasuljangirli.service.interfaces.ExamService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@NoArgsConstructor
@AllArgsConstructor
@RequestMapping("/api/exam")
public class ExamController {

    @Autowired
    private ExamService examService;

    @GetMapping("/get-all")
    public ResponseEntity<List<ResponseExamDTO>> getAllExam() {
        List<ResponseExamDTO> exams = examService.getAllExams();
        if (exams.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exams);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseExamDTO> createExam(@RequestBody RequestExamDTO requestExamDTO) {
        ResponseExamDTO savedExam =  examService.createExam(requestExamDTO);
        if (savedExam == null){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedExam);
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<ExamResponseDTO> getExamQuestions(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getExamWithQuestions(id));
    }
}
