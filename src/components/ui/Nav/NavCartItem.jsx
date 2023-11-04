import { Link } from "react-router-dom";
import "./NavCartItem.css";
import formatPrice from "../../../utils/fomatters/formatPrice";

function NavCartItem({ id, name, img, price, quantity }) {
	return (
		<Link to={`/products/${id}`} className="nav__cartItem">
			<img src={img} alt={name} className="nav__cartItem__img" />

			<div className="nav__cartItem__info">
				<h4 className="nav__cartItem__name">{name}</h4>
				<span className="nav__cartItem__price">{formatPrice(price?.currency, price?.amount)}</span>
				<span className="nav__cartItem__qunatity">&times;{quantity}</span>
			</div>

			<div className="nav__cartItem__subtotal">{formatPrice(price?.currency, price?.amount * quantity)}</div>
		</Link>
	);
}

export default NavCartItem;
