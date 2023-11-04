import "./AuthCardBody.css";

function AuthCardBody({ action, className, onSubmit, children }) {
	return (
		<form
			action={action}
			className={`authCardBody${className ? ` ${className}` : ""}`}
			onSubmit={onSubmit ?? onSubmit}>
			{children}
		</form>
	);
}

export default AuthCardBody;
