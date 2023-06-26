import {api} from "@/config/ky.config";
import {UserResponseSchema} from "@/objects/response/user.response";
import {UserRequest} from "@/objects/requests/user.request";
import {base_url} from "@/config/service.config";

const endpoint: string = `${base_url}/user`;

export const getUser = async () => {
    return await api.get(endpoint).json().then(UserResponseSchema.parse);
}

export const getUserById = async (id: string) => {
    return await api.get(`${endpoint}/${id}`).json().then(UserResponseSchema.parse);
}

export const updateUser = async (user: UserRequest) => {
    return await api.put(endpoint, {json: user}).json().then(UserResponseSchema.parse);
}

export const deleteUser = async () => {
    await api.delete(endpoint);
}