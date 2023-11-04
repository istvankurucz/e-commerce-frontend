import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import "./Carousel.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Carousel({ imgs, className }) {
	const [index, setIndex] = useState(0);

	function showPrev() {
		setIndex((prev) => {
			if (prev === 0) return imgs.length - 1;
			return prev - 1;
		});
	}

	function showNext() {
		setIndex((prev) => {
			if (prev === imgs.length - 1) return 0;
			return prev + 1;
		});
	}

	return (
		<div className={`carousel${className ? ` ${className}` : ""}`}>
			<div className="carousel__imgs">
				{imgs.map((img, i) => (
					<img
						key={img}
						src={img}
						alt=""
						className="carousel__img"
						style={{ "--translateX": `-${index * 100}%` }}
					/>
				))}
			</div>

			<Button variant="transparent" className="carousel__arrow carousel__arrow--prev" onClick={showPrev}>
				<FontAwesomeIcon icon={faAngleLeft} />
			</Button>
			<Button variant="transparent" className="carousel__arrow carousel__arrow--next" onClick={showNext}>
				<FontAwesomeIcon icon={faAngleRight} />
			</Button>

			<div className="carousel__buttons">
				{imgs.map((_, i) => (
					<button
						key={i}
						className={`carousel__button${i === index ? " carousel__button--active" : ""}`}
						onClick={() => setIndex(i)}></button>
				))}
			</div>
		</div>
	);
}

export default Carousel;
