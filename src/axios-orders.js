import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://pimp-my-burger-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
