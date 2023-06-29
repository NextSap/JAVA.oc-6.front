import {api} from "@/config/ky.config";
import {MinimizedUserResponseSchema, UserResponseSchema} from "@/objects/response/user.response";
import {UserRequestSchema} from "@/objects/requests/user.request";
import {base_url} from "@/config/service.config";

const endpoint: string = `${base_url}/user`;

export const getUser = async () => {
    return await api.get(endpoint).then((response) => response.json()).then(UserResponseSchema.parse);
}

export const getUserByEmail = async (email: string) => {
    return await api.get(`${endpoint}/${email}`).json().then(MinimizedUserResponseSchema.parse);
}

export const addContact = async (email: string) => {
    return await api.post(`${endpoint}/add-contact`, {searchParams: {email: email}}).json().then(UserResponseSchema.parse);
}

export const updateUser = async (user: UserRequestSchema) => {
    return await api.put(endpoint, {json: user}).json().then(UserResponseSchema.parse);
}

export const deleteUser = async () => {
    await api.delete(endpoint);
}