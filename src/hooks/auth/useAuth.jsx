import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { doc, getDoc } from "firebase/firestore";

function useAuth() {
	const [, dispatch] = useStateValue();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
			if (userAuth) {
				try {
					const userSnapshot = await getDoc(doc(db, `customers/${userAuth.uid}`));

					dispatch({
						type: "SET_USER",
						user: {
							...userAuth,
							...userSnapshot.data(),
						},
					});

					console.log("User data:\n", {
						...userAuth,
						...userSnapshot.data(),
					});
				} catch (e) {
					console.log("Error fetching the data of the user from DB.\n", e);
				}
			} else {
				dispatch({
					type: "SET_USER",
					userDb: null,
				});
			}
		});

		return unsubscribe;
	}, []);
}

export default useAuth;
