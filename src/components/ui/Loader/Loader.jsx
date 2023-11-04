import "./Loader.css";

function Loader({ className }) {
	return (
		<div className={`loader${className ? ` ${className}` : ""}`}>
			<div className="loader__spinner"></div>
		</div>
	);
}

export default Loader;
