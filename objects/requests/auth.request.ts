export type LoginRequest = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export type SigninRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}