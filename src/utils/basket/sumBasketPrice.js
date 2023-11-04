export default function sumBasketPrice(basket) {
	return basket.reduce((sum, item) => sum + item.price.amount * item.quantity, 0);
}
