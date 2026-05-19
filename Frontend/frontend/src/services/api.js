import axios from "axios";

//backend connectie
const api = axios.create({
    baseURL: "https://localhost:44335/api"
});


export function getTest() {
  return api.get("/test");
}

