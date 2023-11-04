import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import getProductPrices from "../../utils/product/getProductPrices";

function useProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchProducts() {
			setLoading(true);
			const q = query(collection(db, "products"), where("active", "==", true));

			try {
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach(async (product) => {
					const prices = await getProductPrices(product.id);

					setProducts((prev) => [
						...prev,
						{
							id: product.id,
							name: product.data().name,
							description: product.data().description,
							imgs: product.data().images,
							prices,
						},
					]);
				});

				setLoading(false);
			} catch (e) {
				// return e;
				console.log("Error fetching the products.\n", e);
				setLoading(false);
			}
		}

		setProducts([]);
		fetchProducts();
	}, []);

	return { products, loading };
}

export default useProducts;
