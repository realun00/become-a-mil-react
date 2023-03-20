import axios from "axios";

export default axios.create({ baseURL: "https://opentdb.com/api.php" });

//In case we need to make private api calls (if authorization is needed)
export const axiosPrivate = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});