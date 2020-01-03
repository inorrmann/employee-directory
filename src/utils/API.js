import axios from "axios";
const BASEURL = "https://randomuser.me/api/";

export default {
    search: function(query) {
        return axios.get(BASEURL + query)
    }
}


// query = ?results=5000
// ?exc=login
// ?inc=gender,name,nat
// gender
// name
// location
// email
// login
// registered
// dob
// phone
// cell
// id
// picture
// nat
       