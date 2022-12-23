import axios from "axios";

export class GradeApi {

    getGrades() {
        return axios.get("/grades");
    }

    addGrade(formState) {
        return axios.post("/grades", formState);
    }

    updateGrade(id, newData) {
        return axios.put("/grades/" + id, newData)
    }

    deleteGrade(id) {
        return axios.delete("/grades/" + id)
    }

}