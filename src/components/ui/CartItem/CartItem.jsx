import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../form/Input/Input";
import Button from "../Button/Button";
import "./CartItem.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import formatPrice from "../../../utils/fomatters/formatPrice";
import FancyPrice from "../FancyPrice/FancyPrice";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import removeItemById from "../../../utils/basket/removeItemById";
import updateBasket from "../../../utils/basket/updateBasket";

function CartItem({ id, name, description, img, price, quantity }) {
	const [{ basket }, dispatch] = useStateValue();

	function setItemQuantity(e) {
		const newQuantity = parseInt(e.target.value);
		if (newQuantity < 1 || isNaN(newQuantity)) return;

		const newBasket = updateBasket(basket, id, { quantity: newQuantity });
		dispatch({
			type: "SET_BASKET",
			basket: newBasket,
		});
	}

	function deleteItem() {
		const newBasket = removeItemById(basket, id);

		dispatch({
			type: "SET_BASKET",
			basket: newBasket,
		});
	}

	return (
		<div className="cartItem">
			<Link to={`/products/${id}`} className="cartItem__link">
				<img src={img} alt={name} className="cartItem__img" />
			</Link>

			<div className="cartItem__info">
				<Link to={`/products/${id}`} className="cartItem__name">
					{name}
				</Link>

				<p className="cartItem__description">{description}</p>

				<div className="cartItem__pricePerPc">
					{formatPrice(price?.currency, price?.amount)}
					/pc
				</div>
			</div>

			<div className="cartItem__subtotal">
				<Input
					type="number"
					id={`cartItem-${id}`}
					label="Quantity"
					placeholder="Quantity"
					defaultValue={quantity}
					min={1}
					onChange={setItemQuantity}
					className="cartItem__subtotal__quantity"
				/>
				<p className="cartItem__subtotal__text">Subtotal</p>
				<FancyPrice>{formatPrice(price?.currency, price?.amount * quantity)}</FancyPrice>
			</div>

			<Button
				variant="transparent"
				title="Remove from basket"
				circle
				className="cartItem__remove"
				onClick={deleteItem}>
				<FontAwesomeIcon icon={faX} />
			</Button>
		</div>
	);
}

export default CartItem;
