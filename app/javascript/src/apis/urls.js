import axios from "axios";

const getUrls = () => axios.get("/urls");
const postUrl = (payload) => axios.post("/urls", payload);
const pinUnpinUrl = (id) => axios.put(`/urls/${id}`);
const deleteUrl = (id) => axios.delete(`/urls/${id}`);
const urlsApi = {
  getUrls,
  postUrl,
  pinUnpinUrl,
  deleteUrl,
};

export default urlsApi;
