package yte.intern.spring.application.hwgrade.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import yte.intern.spring.application.common.response.MessageResponse;
import yte.intern.spring.application.common.response.ResponseType;
import yte.intern.spring.application.hwsubmit.entity.Submit;
import yte.intern.spring.application.hwsubmit.service.SubmitService;
import yte.intern.spring.application.hwgrade.repository.GradeRepository;
import yte.intern.spring.application.hwgrade.entity.Grade;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GradeService {
    
    private final GradeRepository gradeRepository;
    private final SubmitService submitService;

    public MessageResponse addGrade(Grade grade) {
        Submit submit = submitService.getById(grade.getSubmits().getId());
        grade.setSubmits(submit);

        gradeRepository.save(grade);
        return new MessageResponse(ResponseType.SUCCESS, "Grade added successfully");
    }

    public MessageResponse updateGrade(Long id, Grade updateGrade) {
        Grade grade = gradeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fault"));

        Submit submit = submitService.getById(updateGrade.getSubmits().getId());
        updateGrade.setSubmits(submit);
        grade.update(updateGrade);

        gradeRepository.save(grade);
        return new MessageResponse(ResponseType.SUCCESS, "Grade updated successfully");
    }

    public MessageResponse deleteGradeById(Long id) {
        gradeRepository.deleteById(id);
        return new MessageResponse(ResponseType.SUCCESS, "Grade deleted successfully");
    }

    public List<Grade> getAllGrade() {
        return gradeRepository.findAll();
    }

    public Grade getGradeById(Long id) {
        return gradeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("fault"));
    }

    @GetMapping("{id}")
    public Grade getById(@PathVariable Long id) {
        return gradeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("fault"));

    }
}

