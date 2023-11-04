import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default async function getProductPrices(productId) {
	try {
		const priceSnapshot = await getDocs(collection(db, `products/${productId}/prices`));

		return priceSnapshot.docs.map((price) => ({
			id: price.id,
			currency: price.data().currency,
			amount: price.data().unit_amount,
		}));
	} catch (e) {
		return null;
	}
}
