import {SigninRequest, LoginRequest} from "@/objects/requests/auth.request";
import * as authService from "@/services/auth.service";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {HTTPError} from "ky";
import {Error} from "@/objects/response/error.response";

export const useAuthStore = () => {

    const router = useRouter();

    const login = (loginRequest: LoginRequest) => {
        authService.login(loginRequest)
            .then((response) => {
                localStorage.setItem("token", response.token);
                toast.success("Login successful");
                router.push("/");
            }).catch((error: HTTPError) => {
            error.response.text().then((text: string) => {
                const error: Error = JSON.parse(text);
                toast.error("Error when login: " + error.cause);
            });
        });
    }

    const logout = () => {
        localStorage.removeItem("token");
        toast.success("Logout successful");
        router.push("/login");
    }

    const signin = (signinRequest: SigninRequest) => {
        authService.signin(signinRequest)
            .then(() => {
                toast.success("Signin successful");
                router.push("/login");
            }).catch((error: HTTPError) => {
            error.response.text().then((text: string) => {
                const error: Error = JSON.parse(text);
                toast.error("Error when login: " + error.cause);
            })
        });
    }

    return {
        login,
        logout,
        signin,
    }
}