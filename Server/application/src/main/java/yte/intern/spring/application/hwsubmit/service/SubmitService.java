package yte.intern.spring.application.hwsubmit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import yte.intern.spring.application.common.response.MessageResponse;
import yte.intern.spring.application.common.response.ResponseType;
import yte.intern.spring.application.homework.entity.Homework;
import yte.intern.spring.application.homework.service.HomeworkService;
import yte.intern.spring.application.hwsubmit.entity.Submit;
import yte.intern.spring.application.hwsubmit.repository.SubmitRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmitService {
    private final SubmitRepository submitRepository;
    private final HomeworkService homeworkService;

    public MessageResponse addSubmit(Submit submit){
        Homework homework = homeworkService.getById(submit.getHomeworks().getId());
        submit.setHomeworks(homework);

        submitRepository.save(submit);
        return new MessageResponse(ResponseType.SUCCESS, "Submit added successfully");
    }

    public MessageResponse updateSubmit(Long id, Submit updateSubmit){
        Submit submit = submitRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fault"));

        Homework homework = homeworkService.getById(updateSubmit.getHomeworks().getId());
        updateSubmit.setHomeworks(homework);
        submit.update(updateSubmit);

        submitRepository.save(submit);
        return new MessageResponse(ResponseType.SUCCESS, "Submit updated successfully");
    }

    public MessageResponse deleteSubmitById(Long id) {
        submitRepository.deleteById(id);
        return new MessageResponse(ResponseType.SUCCESS, "Submit deleted successfully");
    }
    public List<Submit> getAllSubmit() {
        return submitRepository.findAll();
    }

    public Submit getSubmitById(Long id) {
        return submitRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("fault"));
    }

    @GetMapping("{id}")
    public Submit getById(@PathVariable Long id) {
        return submitRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("fault"));

    }
}

