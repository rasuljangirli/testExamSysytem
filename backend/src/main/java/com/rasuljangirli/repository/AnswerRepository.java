package com.rasuljangirli.repository;

import com.rasuljangirli.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByResultId(Long resultId);

    void deleteByResultId(Long resultId);

}
