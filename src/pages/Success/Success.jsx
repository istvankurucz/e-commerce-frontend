import { Link } from "react-router-dom";
import Container from "../../components/layout/Container/Container";
import "./Success.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

function Success() {
	return (
		<Container className="success">
			<FontAwesomeIcon icon={faCreditCard} className="success__bg" />

			<p className="success__info">
				Your payment was <span className="success__highlight">successful</span>.
			</p>

			<Link to="/" className="success__redirect">
				Click here to navigate back to the products.
			</Link>
		</Container>
	);
}

export default Success;
