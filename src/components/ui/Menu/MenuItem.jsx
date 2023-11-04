import "./MenuItem.css";

function MenuItem({ className, children }) {
	return <li className={`menuItem${className ? ` ${className}` : ""}`}>{children}</li>;
}

export default MenuItem;
