import "./AuthCardTitle.css";

function AuthCardTitle({ className, children }) {
	return <h1 className={`authCardTitle${className ? ` ${className}` : ""}`}>{children}</h1>;
}

export default AuthCardTitle;
