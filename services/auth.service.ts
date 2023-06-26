import ky from "ky";
import {LoginResponse} from "@/objects/response/auth.response";
import {UserResponse} from "@/objects/response/user.response";
import {basedUrl} from "@/config/service.config";
import {LoginRequest, SigninRequest} from "@/objects/requests/auth.request";

const endpoint: string = `${basedUrl}/auth`;

export const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    return await ky.post(`${endpoint}/login`, {json: loginRequest}).json();
}

export const signin = async (signinRequest: SigninRequest): Promise<UserResponse> => {
    return await ky.post(`${endpoint}/signin`, {json: signinRequest}).json();
}