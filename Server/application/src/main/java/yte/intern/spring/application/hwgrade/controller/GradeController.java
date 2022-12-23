package yte.intern.spring.application.hwgrade.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.spring.application.common.response.MessageResponse;
import yte.intern.spring.application.hwgrade.controller.request.AddGradeRequest;
import yte.intern.spring.application.hwgrade.controller.request.UpdateGradeRequest;
import yte.intern.spring.application.hwgrade.controller.response.GradeQueryModel;
import yte.intern.spring.application.hwgrade.service.GradeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/grades")
@Validated
@RequiredArgsConstructor
public class GradeController {
    private final GradeService gradeService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT','STUDENT')")
    public MessageResponse addGrade(@Valid @RequestBody AddGradeRequest addGradeRequest) {
        return gradeService.addGrade(addGradeRequest.toDomainEntity());
    }
    @PutMapping("{id}")
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT','STUDENT')")
    public MessageResponse updateGrade(@Valid @RequestBody UpdateGradeRequest updateGradeRequest, @PathVariable Long id) {
        return gradeService.updateGrade(id, updateGradeRequest.toDomainEntity());
    }
    @DeleteMapping("{id}")
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT','STUDENT')")
    public MessageResponse getGradeById(@PathVariable Long id) {
        return gradeService.deleteGradeById(id);
    }
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT','STUDENT')")
    public List<GradeQueryModel> getAllGrades() {
        return gradeService.getAllGrade()
                .stream()
                .map(GradeQueryModel::new)
                .toList();
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT','STUDENT')")
    public GradeQueryModel getById(@PathVariable Long id) {
        return new GradeQueryModel(gradeService.getById(id));
    }

}
