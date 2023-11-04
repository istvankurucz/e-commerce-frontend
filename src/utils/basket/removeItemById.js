export default function removeItemById(basket, id) {
	return basket.filter((item) => item.id !== id);
}
