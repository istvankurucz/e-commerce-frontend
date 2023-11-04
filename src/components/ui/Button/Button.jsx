import "./Button.css";

function Button({
	type,
	title,
	outlined,
	rounded,
	circle,
	fullWidth,
	onClick,
	variant,
	className,
	tabIndex,
	children,
}) {
	return (
		<button
			type={type ? type : "button"}
			title={title ?? title}
			onClick={onClick ?? onClick}
			className={`button${className ? ` ${className}` : ""}${outlined ? " button--outlined" : ""}${
				rounded ? " button--rounded" : ""
			}${circle ? " button--circle" : ""}${fullWidth ? " button--fullWidth" : ""}${
				variant ? ` button--${variant}` : ""
			}`}
			tabIndex={tabIndex ?? tabIndex}>
			{children}
		</button>
	);
}

export default Button;
