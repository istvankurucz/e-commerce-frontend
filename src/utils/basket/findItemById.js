// Finds an item based on the ID - if there is no item the return value will be undefined

export default function findItemById(basket, id) {
	return basket.find((product) => product.id === id);
}
