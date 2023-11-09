import axios from "axios";
import { baseURL } from "../baseUrl";

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});