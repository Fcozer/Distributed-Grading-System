package yte.intern.spring.application.hwsubmit.controller.response;

import yte.intern.spring.application.hwsubmit.entity.Submit;

public record SubmitQueryModel(
        Long id,
        String file,
        Long homework_id
) {
    public SubmitQueryModel(Submit submit) {
        this(
                submit.getId(),
                submit.getFile(),
                submit.getHomeworks().getId()

        );
    }

}
