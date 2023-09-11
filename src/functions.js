import axios from "axios"
import { useEffect } from "react"
import config from "./config"

export async function checkRole(params) {
    // let {loggedInStudentId, studentId} = params

    let userRole = await axios.get(`${config.API_URL}/rolesPermissions/${localStorage.getItem('user-role-id')}`)
    console.log(userRole.data);

    

    return false
}
