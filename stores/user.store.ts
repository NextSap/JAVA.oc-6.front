import * as userService from "@/services/user.service"
import {useQuery} from "react-query";
import {UserRequest} from "@/objects/requests/user.request";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {HTTPError} from "ky";
import {renderError} from "@/utils/Error.utils";
import {removeToken} from "@/utils/Jwt.utils";

export const useUserStore = () => {
    const router = useRouter();
    const getUser = () => {
        return useQuery({
            queryKey: 'users',
            queryFn: userService.getUser,
            onError: (error: HTTPError) => {
                renderError(error, "Getting user failed");
            }
        });
    }

    const getUserByEmail = (email: string) => {
        return useQuery({
            queryKey: ['users', email],
            queryFn: () => userService.getUserByEmail(email),
            onError: (error: HTTPError) => {
                renderError(error, "Getting user failed");
            }
        });
    }

    const updateUser = (user: UserRequest) => {
        const {data, isLoading, isError} = useQuery({
            queryKey: 'users',
            queryFn: () => userService.updateUser(user),
            onSuccess: () => {
                toast.success('User updated successfully');
            },
            onError: (error: HTTPError) => {
                renderError(error, "Updating user failed");
            }
        });

        return {data, isLoading, isError};
    }

    const deleteUser = () => {
        const {data, isLoading, isError} = useQuery({
            queryKey: 'users',
            queryFn: userService.deleteUser,
            onSuccess: () => {
                toast.success('User deleted successfully');
                removeToken();
                router.push("/login");
            },
            onError: (error: HTTPError) => {
                renderError(error, "Deleting user failed");
            }
        });

        return {data, isLoading, isError};
    }

    return {getUser, getUserByEmail, updateUser, deleteUser};
}