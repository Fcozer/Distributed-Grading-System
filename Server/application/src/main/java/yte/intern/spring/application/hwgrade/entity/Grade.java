package yte.intern.spring.application.hwgrade.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.spring.application.common.entity.BaseEntity;
import yte.intern.spring.application.hwsubmit.entity.Submit;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Grade extends BaseEntity {
    private String grade;

    //kurulan ilişki kontrol edilecek.
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "submit_id", referencedColumnName = "ID")
    private Submit submits;

    public Grade(String grade, Long submit_id){
        this.grade = grade;

        this.submits=new Submit();
        this.submits.setId(submit_id);
    }

    public void update(Grade updateGrade) {
        this.grade = updateGrade.grade;
        this.submits = updateGrade.submits;
    }
}
