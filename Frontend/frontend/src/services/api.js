import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:44300/api"
});

export function getTest() {
  return fetch("http://localhost:5173/api/test")
    .then(res => res.text());
}