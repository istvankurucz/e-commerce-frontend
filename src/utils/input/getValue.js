export default function getValue(id) {
	const input = document.getElementById(id);
	if (!input) return null;

	return input.value;
}
