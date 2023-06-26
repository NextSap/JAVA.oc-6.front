import ky from "ky";

export const api = ky.extend({
    prefixUrl: "https://localhost:8080",
    hooks: {
        beforeRequest: [
            request => {
                request.headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
            }]
    }
});