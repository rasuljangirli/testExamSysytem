package com.rasuljangirli.repository;

import com.rasuljangirli.model.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OptionRepository extends JpaRepository<Option,Long> {
    Optional<Option> findByQuestionIdAndCorrectTrue(Long questionId);
}
