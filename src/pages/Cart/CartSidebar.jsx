import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import ShippingAddress from "../../components/ui/ShippingAddress/ShippingAddress";
import "./CartSidebar.css";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import sumBasketPrice from "../../utils/basket/sumBasketPrice";
import formatPrice from "../../utils/fomatters/formatPrice";
import Feedback from "../../components/ui/Feedback/Feedback";
import { useState } from "react";
import axios from "../../config/axios";

function CartSidebar() {
	const [{ user, basket }] = useStateValue();
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedbackData, setFeedbackData] = useState({});

	const totalPrice = sumBasketPrice(basket);

	async function goToCheckout() {
		// Check if there is a logged in user with shipping address
		if (!user || !user.address) {
			setFeedbackData({
				type: "error",
				title: "You are not logged in or don't have a shipping address.",
				details: "",
			});
			setShowFeedback(true);

			return;
		}

		// Post to the server the basket
		try {
			const { data } = await axios.post("/create-checkout-session", {
				user,
				basket,
			});

			window.location = data;
		} catch (e) {
			setFeedbackData({
				type: "error",
				title: "Error proceding to checkout.",
				details: "",
			});
			setShowFeedback(true);

			return;
		}
	}

	return (
		<div className="cartSidebar">
			<Feedback show={showFeedback} setShow={setShowFeedback} data={feedbackData} />

			<div className="cartSidebar__shipping">
				<h3 className="cartSidebar__shipping__text">Shipping info</h3>
				<ShippingAddress className="cartSidebar__shipping__address" />
			</div>

			<div className="cartSidebar__total">
				<h2 className="cartSidebar__total__text">Total price</h2>

				<div className="cartSidebar__total__price">
					{formatPrice(basket?.length > 0 ? basket[0].price.currency : 0, totalPrice)}
				</div>
			</div>

			<div className="cartSidebar__buttons">
				<Button variant="dark" className="cartSidebar__button" rounded fullWidth onClick={goToCheckout}>
					Go to checkout
				</Button>
				<Link to="/">
					<Button variant="transparent" className="cartSidebar__button" rounded fullWidth tabIndex={-1}>
						Back to shopping
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default CartSidebar;
