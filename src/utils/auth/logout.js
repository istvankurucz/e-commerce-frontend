import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export default async function logout(navigate) {
	try {
		await signOut(auth);

		navigate("/");
	} catch (e) {
		return e;
	}
}
