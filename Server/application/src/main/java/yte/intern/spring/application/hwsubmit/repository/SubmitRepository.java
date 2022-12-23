package yte.intern.spring.application.hwsubmit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.spring.application.hwsubmit.entity.Submit;

public interface SubmitRepository  extends JpaRepository<Submit, Long> {
}
