package yte.intern.spring.application.hwgrade.controller.request;

import yte.intern.spring.application.hwgrade.entity.Grade;

public record AddGradeRequest(
        String grade,
        Long submit_id
) {
    public Grade toDomainEntity(){
        return new Grade(grade, submit_id);
    }

}
