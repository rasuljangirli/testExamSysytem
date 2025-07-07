package com.rasuljangirli.repository;

import com.rasuljangirli.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    List<Question> findAllByExamId(Long examId);
}
