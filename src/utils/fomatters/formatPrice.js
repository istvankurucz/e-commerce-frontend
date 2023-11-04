export default function formatPrice(currency = "USD", amount) {
	if (!amount) return 0;

	const formatter = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency,
		currencyDisplay: "narrowSymbol",
		maximumFractionDigits: 2,
	});

	return formatter.format(amount / 100);
}
