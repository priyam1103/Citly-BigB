import axios from "axios";

const getUrls = () => axios.get("/urls");
const postUrl = (payload) => axios.post("/urls", payload);
const urlsApi = {
    getUrls,
    postUrl,
};

export default urlsApi;
