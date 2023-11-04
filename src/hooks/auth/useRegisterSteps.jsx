import { useState } from "react";

function useRegisterSteps(steps) {
	const [index, setIndex] = useState(0);

	function prevStep() {
		setIndex((prev) => {
			if (prev === 0) return prev;
			return prev - 1;
		});
	}

	function nextStep() {
		setIndex((prev) => {
			if (prev === steps.length - 1) return prev;
			return prev + 1;
		});
	}

	return {
		index,
		step: steps[index],
		steps,
		isFirstStep: index === 0,
		isLastStep: index === steps.length - 1,
		prevStep,
		nextStep,
	};
}

export default useRegisterSteps;
