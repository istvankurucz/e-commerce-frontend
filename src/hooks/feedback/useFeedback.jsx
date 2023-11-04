import { useEffect, useState } from "react";

function useFeedback(show, setShow, seconds = 10) {
	const [secondsLeft, setSecondsLeft] = useState(seconds);
	const decrement = 10; // ms
	const [isMouseOver, setIsMouseOver] = useState(false);

	useEffect(() => {
		if (!show) return;

		const interval = setInterval(() => {
			setSecondsLeft((prev) => {
				if (prev <= 0) {
					clearInterval(interval);
					setShow(false);
					return seconds;
				}
				if (isMouseOver) {
					clearInterval(interval);
					return prev;
				}
				return prev - decrement / 1000;
			});
		}, decrement);

		return () => clearInterval(interval);
	}, [show, isMouseOver]);

	// Reset the seconds to default
	useEffect(() => {
		setSecondsLeft(seconds);
	}, [show]);

	return {
		secondsLeft,
		setIsMouseOver,
	};
}

export default useFeedback;
