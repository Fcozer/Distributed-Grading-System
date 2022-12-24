import axios from "axios";

export class ListhwApi {

    getListhws() {
        return axios.get("/homeworks");
    }

    updateListhw(id, newData) {
        return axios.put("/homeworks/" + id, newData)
    }

    deleteListhw(id) {
        return axios.delete("/homeworks/" + id)
    }

}