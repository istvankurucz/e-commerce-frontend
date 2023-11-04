import { Link } from "react-router-dom";
import Container from "../../components/layout/Container/Container";
import BackToHome from "../../components/ui/BackToHome/BackToHome";
import CartItem from "../../components/ui/CartItem/CartItem";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import "./Cart.css";
import CartSidebar from "./CartSidebar";

function Cart() {
	const [{ basket }] = useStateValue();

	return (
		<Container className="cart">
			<header className="cart__header">
				<BackToHome />
			</header>

			<main className="cart__main">
				<div className="cart__items">
					{basket?.length > 0 ? (
						basket.map((item) => (
							<CartItem
								key={item.id}
								id={item.id}
								name={item.name}
								img={item.img}
								description={item.description}
								price={item.price}
								quantity={item.quantity}
							/>
						))
					) : (
						<p className="cart__noItem">
							There is no item in your basket.{" "}
							<Link to="/" className="cart__noItem__link">
								Click here to see our products.
							</Link>
						</p>
					)}
				</div>

				<CartSidebar />
			</main>
		</Container>
	);
}

export default Cart;
