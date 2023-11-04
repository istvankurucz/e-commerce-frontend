import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Feedback.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import useFeedback from "../../../hooks/feedback/useFeedback";

function Feedback({ show, setShow, data, className, seconds = 5 }) {
	const { secondsLeft, setIsMouseOver } = useFeedback(show, setShow, seconds);

	return (
		<div
			className={`feedback${show ? " feedback--show" : ""}${className ? ` ${className}` : ""} feedback--${
				data?.type ?? "info"
			}`}
			style={{ "--barWidth": `${(secondsLeft / seconds) * 100}%` }}
			onMouseEnter={() => setIsMouseOver(true)}
			onMouseLeave={() => setIsMouseOver(false)}>
			<header className="feedback__header">
				<h2 className="feedback__title">{data?.title}</h2>
				<Button variant="transparent" circle className="feedback__close" onClick={() => setShow(false)}>
					<FontAwesomeIcon icon={faX} />
				</Button>
			</header>

			{data?.details && <p className="feedback__details">{data?.details}</p>}

			<div className="feedback__bar"></div>
		</div>
	);
}

export default Feedback;
