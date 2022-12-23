package yte.intern.spring.application.hwgrade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.spring.application.hwgrade.entity.Grade;

public interface GradeRepository extends JpaRepository<Grade, Long> {
}
