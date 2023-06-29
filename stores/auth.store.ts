import {LoginRequestSchemaType, SigninRequestSchemaType} from "@/objects/requests/auth.request";
import * as authService from "@/services/auth.service";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {HTTPError} from "ky";
import {renderError} from "@/utils/Error.utils";

export const useAuthStore = () => {

    const router = useRouter();

    const login = (loginRequest: LoginRequestSchemaType) => {
        authService.login(loginRequest)
            .then((response) => {
                localStorage.setItem("token", response.token);
                toast.success("Login successful");
                router.push("/");
            }).catch((error: HTTPError) => {
            renderError(error, "Signin failed");
        });
    }

    const logout = () => {
        localStorage.removeItem("token");
        toast.success("Logout successful");
        router.push("/login");
    }

    const signin = (signinRequest: SigninRequestSchemaType) => {
        authService.signin(signinRequest)
            .then(() => {
                toast.success("Signin successful");
                router.push("/login");
            }).catch((error: HTTPError) => {
            renderError(error, "Signin failed");
        });
    }

    return {
        login,
        logout,
        signin,
    }
}