package com.rasuljangirli.repository;

import com.rasuljangirli.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResultRepository extends JpaRepository<Result,Long> {
    Optional<Result> findByUserTokenAndExamId(String userToken, Long examId);
    Optional<Result> findByExamIdAndUserToken(Long examId, String userToken);

}
