import axios from "axios";

export class SubmitApi {

    getSubmits() {
        return axios.get("/submits");
    }

    addSubmit(formState) {
        return axios.post("/submits", formState);
    }

    updateSubmit(id, newData) {
        return axios.put("/submits/" + id, newData)
    }

    deleteSubmit(id) {
        return axios.delete("/submits/" + id)
    }

}