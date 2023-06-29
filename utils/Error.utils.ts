import {HTTPError} from "ky";
import {toast} from "react-toastify";

export const renderError = (error: HTTPError, message: string) => {
    if (error.response) {
        error.response.text().then((text: string) => {
            console.log(text);
            const error = JSON.parse(text);
            toast.error(message + ": " + error.cause);

        });
        return;
    }
    toast.error(message);
}