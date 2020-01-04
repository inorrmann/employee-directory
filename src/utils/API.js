import axios from "axios";

export default {
    getUsers: function() {
        return axios.get("https://randomuser.me/api/?results=300&inc=name,email,login,dob,picture,id")
    }
}

       