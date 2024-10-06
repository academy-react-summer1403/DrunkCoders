import {api} from '../interceptor'

export const registerApi = async(user) =>{
    try {
        const response = await api.post("/Sign/SendVerifyMessage", user);
        return response
    }catch (error) {
        return false
    }
}
export const verifyApi = async(user) =>{
    try {
        const response = await api.post("/Sign/VerifyMessage", user);
        return response
    }catch (error) {
        return false
    }
}