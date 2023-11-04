// Deletes an the item based on the ID

export default function deleteItemById(basket, id) {
	return basket.filter((item) => item.id !== id);
}
