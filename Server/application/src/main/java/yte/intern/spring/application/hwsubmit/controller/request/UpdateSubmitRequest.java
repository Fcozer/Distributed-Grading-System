package yte.intern.spring.application.hwsubmit.controller.request;

import yte.intern.spring.application.homework.entity.Homework;
import yte.intern.spring.application.hwsubmit.entity.Submit;

public record UpdateSubmitRequest(
        String file,
        Long homework_id
) {
    public Submit toDomainEntity() {
        return new Submit(file, homework_id);
    }

}
