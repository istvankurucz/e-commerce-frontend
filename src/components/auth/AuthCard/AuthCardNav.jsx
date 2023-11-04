import "./AuthCardNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button/Button";

function AuthCardNav({ direction, onClick }) {
	return (
		<Button
			variant="dark"
			circle
			className={`authCardNav ${direction === "back" ? "authCardNav--back" : "authCardNav--next"}`}
			title={direction === "back" ? "Back" : "Next"}
			onClick={onClick ?? onClick}>
			<FontAwesomeIcon icon={direction === "back" ? faArrowLeft : faArrowRight} />
		</Button>
	);
}

export default AuthCardNav;
