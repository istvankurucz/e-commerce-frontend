import axios from "axios";

const instance = axios.create({
	// baseURL: import.meta.env.VITE_SERVER_URL,
	// baseURL: "http://localhost:3000",
	baseURL: "https://muddy-boa-smock.cyclic.app",
});

export default instance;
