import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../../components/layout/Container/Container";
import "./Cancel.css";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Cancel() {
	return (
		<Container className="cancel">
			<FontAwesomeIcon icon={faCreditCard} className="cancel__bg" />

			<p className="cancel__info">
				Your payment has <span className="cancel__highlight">failed</span>.
			</p>

			<Link to="/" className="cancel__redirect">
				Click here to navigate back to the products.
			</Link>
		</Container>
	);
}

export default Cancel;
