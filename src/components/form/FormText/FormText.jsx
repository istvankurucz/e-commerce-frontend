import "./FormText.css";

function FormText({ className, children }) {
	return <p className={`formText${className ? ` ${className}` : ""}`}>{children}</p>;
}

export default FormText;
