import { Link } from "react-router-dom";
import "./BackToHome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function BackToHome() {
	return (
		<Link to="/" className="backToHome">
			<FontAwesomeIcon icon={faAngleLeft} />
			<span className="backToHome__text">Back to products</span>
		</Link>
	);
}

export default BackToHome;
