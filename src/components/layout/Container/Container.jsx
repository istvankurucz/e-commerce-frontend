import "./Container.css";

function Container({ maxWidth, className, children }) {
	return (
		<div
			style={{ "--maxWidth": maxWidth ? `${maxWidth}px` : "1200px" }}
			className={`container${className ? ` ${className}` : ""}`}>
			{children}
		</div>
	);
}

export default Container;
