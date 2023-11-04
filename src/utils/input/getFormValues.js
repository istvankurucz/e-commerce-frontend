export default function getFormValues(currentData = []) {
	const inputs = document.querySelectorAll(".input__input");
	let values = [];
	inputs.forEach((input) => values.push(input.value));

	return [...currentData, ...values];
}
