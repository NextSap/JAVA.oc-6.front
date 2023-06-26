import ky from "ky";
import {LoginRequest, SigninRequest} from "@/objects/requests/auth.request";
import {UserResponseSchema} from "@/objects/response/user.response";
import {LoginResponseSchema} from "@/objects/response/auth.response";

const endpoint: string = `http://localhost:8080/auth`;

export const login = async (loginRequest: LoginRequest) => {
    return await ky.post(`${endpoint}/login`, {json: loginRequest}).json().then(LoginResponseSchema.parse);
}

export const signin = async (signinRequest: SigninRequest) => {
    return await ky.post(`${endpoint}/signin`, {json: signinRequest}).json().then(UserResponseSchema.parse);
}