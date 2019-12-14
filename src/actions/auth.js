import axios from 'axios'

import {SET_CURRENT_USER} from './types'

export const register = (userData,history) =>(dispatch) => {
    axios
    .post('http://localhost:8080/api/board/auth/register',userData)
    .then((res)=>history.push('/login'))
}

export const login = (userData) => (dispatch) => {
    axios.post('http://localhost:8080/api/board/auth/login', userData)
    .then((res)=>{
        const{token}=res.data
        localStorage.setItem('access_token',token)
        // setAuthToken(token)
        // const decoded = jwtDecode(token)
        dispatch(setCurrentUser(token))
    })
}

export const logout = ()=>(dispatch) => {
    localStorage.removeItem('access_token')
    //setAuthToken(false)
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (user) =>({
    type:SET_CURRENT_USER,
    payload:user
})