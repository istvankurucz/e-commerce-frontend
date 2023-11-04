import "./AuthBg.css";

function AuthBg({ className, children }) {
	return <div className={`authBg${className ? ` ${className}` : ""}`}>{children}</div>;
}

export default AuthBg;
