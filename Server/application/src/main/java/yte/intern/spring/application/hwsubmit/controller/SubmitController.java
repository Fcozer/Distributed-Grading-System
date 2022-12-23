package yte.intern.spring.application.hwsubmit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.spring.application.common.response.MessageResponse;
import yte.intern.spring.application.hwsubmit.controller.request.AddSubmitRequest;
import yte.intern.spring.application.hwsubmit.controller.request.UpdateSubmitRequest;
import yte.intern.spring.application.hwsubmit.controller.response.SubmitQueryModel;
import yte.intern.spring.application.hwsubmit.service.SubmitService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/submits")
@Validated
@RequiredArgsConstructor
public class SubmitController {
    private final SubmitService submitService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT','STUDENT')")
    public MessageResponse addSubmit(@Valid @RequestBody AddSubmitRequest addSubmitRequest) {
        return submitService.addSubmit(addSubmitRequest.toDomainEntity());
    }
    @PutMapping("{id}")
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT')")
    public MessageResponse updateSubmit(@Valid @RequestBody UpdateSubmitRequest updateSubmitRequest, @PathVariable Long id) {
        return submitService.updateSubmit(id, updateSubmitRequest.toDomainEntity());
    }
    @DeleteMapping("{id}")
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT')")
    public MessageResponse getSubmitById(@PathVariable Long id) {
        return submitService.deleteSubmitById(id);
    }
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT','STUDENT')")
    public List<SubmitQueryModel> getAllSubmits() {
        return submitService.getAllSubmit()
                .stream()
                .map(SubmitQueryModel::new)
                .toList();
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('ACADEMICIAN','ASSISTANT','STUDENT')")
    public SubmitQueryModel getById(@PathVariable Long id) {
        return new SubmitQueryModel(submitService.getById(id));
    }

}
