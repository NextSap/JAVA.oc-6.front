import {api} from "@/config/ky.config";
import {UserResponse} from "@/objects/response/user.response";
import {UserRequest} from "@/objects/requests/user.request";

const endpoint: string = "/user"

export const getUser = async (): Promise<UserResponse> => {
    return await api.get(endpoint).json();
}

export const updateUser = async (user: UserRequest): Promise<UserResponse> => {
    return await api.put(endpoint, {json: user}).json();
}

export const deleteUser = async () => {
    await api.delete(endpoint);
}