import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import getProductPrices from "../../utils/product/getProductPrices";

function useProduct() {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!productId) return;

		async function fetchProduct() {
			setLoading(true);
			try {
				const prod = await getDoc(doc(db, `products/${productId}`));
				const prices = await getProductPrices(prod.id);

				setProduct({
					id: prod.id,
					name: prod.data().name,
					description: prod.data().description,
					imgs: prod.data().images,
					prices,
				});
				setLoading(false);
			} catch (e) {
				// return e;
				console.log("Error fetching the product with ID: ", productId, "\n", e);
				setLoading(false);
			}
		}

		fetchProduct();
	}, [productId]);

	return { product, loading };
}

export default useProduct;
