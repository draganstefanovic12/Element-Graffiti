import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://dragpersonalproj.xyz/element-graffiti",
});

export default backendApi;
