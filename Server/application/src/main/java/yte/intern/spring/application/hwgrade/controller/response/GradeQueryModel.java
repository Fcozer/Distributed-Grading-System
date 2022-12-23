package yte.intern.spring.application.hwgrade.controller.response;

import yte.intern.spring.application.hwgrade.entity.Grade;

public record GradeQueryModel(
        Long id,
        String grade,
        Long submit_id
) {
    public GradeQueryModel(Grade grade) {
        this(
                grade.getId(),
                grade.getGrade(),
                grade.getSubmits().getId()

        );
    }

}
