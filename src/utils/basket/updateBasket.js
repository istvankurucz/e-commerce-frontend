// Updates the item based on the ID with teh given props

import addProductToBasket from "./addProductToBasket";
import findProductById from "./findItemById";

export default function updateBasket(basket, id, newProps = {}) {
	const cartItem = findProductById(basket, id);

	if (cartItem) {
		return basket.map((item) => {
			if (item.id === id) return { ...item, ...newProps };
			return item;
		});
	} else {
		return addProductToBasket(basket, newProps);
	}
}
