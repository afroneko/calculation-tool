import axios from "axios";

//backend connectie
const api = axios.create({
    baseURL: "https://localhost:44335/api"
});

export const getQuote = async (id) => {
    const response = await fetch(`/api/offertes/${id}`);
    if (!response.ok) throw new Error('Ophalen mislukt');
    return response.json();
}

export const getOrder = async (id) => {
    const response = await fetch(`/api/quotes/${id}`);
    if (!response.ok) throw new Error('Ophalen mislukt');
    return response.json();
}


export function getTest() {
  return api.get("/test");
}

