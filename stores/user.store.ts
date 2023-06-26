import * as userService from "@/services/user.service"
import {useQuery} from "react-query";
import {UserRequest} from "@/objects/requests/user.request";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

export const useUserStore = () => {
    const router = useRouter();
    const getUser = () => {
        const {data, isLoading, isError} = useQuery({
            queryKey: 'users',
            queryFn: userService.getUser
        });

        return {data, isLoading, isError};
    }

    const getUserById = (id: string) => {
        // TODO
    }

    const updateUser = (user: UserRequest) => {
        const {data, isLoading, isError} = useQuery({
            queryKey: 'users',
            queryFn: () => userService.updateUser(user),
            onSuccess: () => {
                toast.success('User updated successfully');
            },
            onError: () => {
                toast.error('Error updating user');
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
                router.push("/login");
            },
            onError: () => {
                toast.error('Error deleting user');
            }
        });

        return {data, isLoading, isError};
    }

    return {getUser, getUserById, updateUser, deleteUser};
}