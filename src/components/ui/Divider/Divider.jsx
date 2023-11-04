import "./Divider.css";

function Divider({ className }) {
	return <div className={`divider ${className ? ` ${className}` : ""}`}></div>;
}

export default Divider;
