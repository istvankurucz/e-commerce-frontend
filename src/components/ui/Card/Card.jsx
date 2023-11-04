import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import updateBasket from "../../../utils/basket/updateBasket";
import findItemById from "../../../utils/basket/findItemById";
import addProductToBasket from "../../../utils/basket/addProductToBasket";
import formatPrice from "../../../utils/fomatters/formatPrice";
import FancyPrice from "../FancyPrice/FancyPrice";

function Card({ id, img, title, description, price, setShowFeedback, setFeedbackData, className }) {
	const [{ basket }, dispatch] = useStateValue();

	function addProductToCart() {
		// 1. Check if product already in basket
		const productInBasket = findItemById(basket, id);

		// 2. If the product is already in -> quantity +1, if not add to the basket
		const newBasket = productInBasket
			? updateBasket(basket, id, { quantity: productInBasket.quantity + 1 })
			: addProductToBasket(basket, { id, name: title, img, description, price, quantity: 1 });

		// 3. Set the local basket
		dispatch({
			type: "SET_BASKET",
			basket: newBasket,
		});

		// 4. Show feedback that the operation was successful
		setFeedbackData({
			type: "info",
			title: "Item successfully added to basket.",
			description: "",
		});
		setShowFeedback(true);
	}

	return (
		<div className={`card${className ? ` ${className}` : ""}`}>
			<Button variant="primary" className="card__cart" onClick={addProductToCart}>
				<FontAwesomeIcon icon={faBasketShopping} />
			</Button>

			<Link to={`/products/${id}`} className="card__link" tabIndex={-1}>
				<img src={img} alt={title} className="card__img" />
			</Link>

			<div className="card__body">
				<h3 className="card__title">{title}</h3>

				<p className="card__description">{description}</p>
			</div>

			<footer className="card__footer">
				<FancyPrice>{formatPrice(price.currency, price.amount)}</FancyPrice>

				<Link to={`/products/${id}`} className="card__more">
					Show more
				</Link>
			</footer>
		</div>
	);
}

export default Card;
