package yte.intern.spring.application.hwsubmit.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.spring.application.common.entity.BaseEntity;
import yte.intern.spring.application.homework.entity.Homework;
import yte.intern.spring.application.lessons.entity.Lessons;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Submit extends BaseEntity {
    private String file;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "homework_id", referencedColumnName = "ID")
    private Homework homeworks;

    public Submit(String file, Long homework_id){
        this.file = file;

        this.homeworks=new Homework();
        this.homeworks.setId(homework_id);
    }

    public void update(Submit updateSubmit) {
        this.file = updateSubmit.file;
        this.homeworks = updateSubmit.homeworks;
    }
}
