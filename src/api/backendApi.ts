import axios from "axios";

const backendApi = axios.create({
  baseURL: "dragpersonalproj.xyz",
});

export default backendApi;
