import ky from "ky";
import {
    LoginRequestSchemaType,
    SigninRequestSchemaType
} from "@/objects/requests/auth.request";
import {UserResponseSchema} from "@/objects/response/user.response";
import {LoginResponseSchema} from "@/objects/response/auth.response";

const endpoint: string = `http://localhost:8080/auth`;

export const login = async (loginRequest: LoginRequestSchemaType) => {
    return await ky.post(`${endpoint}/login`, {json: loginRequest}).json().then(LoginResponseSchema.parse);
}

export const signin = async (signinRequest: SigninRequestSchemaType) => {
    return await ky.post(`${endpoint}/signin`, {json: signinRequest}).json().then(UserResponseSchema.parse);
}