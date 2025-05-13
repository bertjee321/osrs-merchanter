import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://prices.runescape.wiki/api/v1/osrs",
});

export default axiosInstance;
