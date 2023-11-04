import "./FancyPrice.css";

function FancyPrice({ className, children }) {
	return <span className={`fancyPrice${className ? ` ${className}` : ""}`}>{children}</span>;
}

export default FancyPrice;
