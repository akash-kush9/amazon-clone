import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-amaz-on-clone-c4.cloudfunctions.net/api",
  // "http://localhost:5001/amaz-on-clone-c4/us-central1/api",
});

export default instance;
