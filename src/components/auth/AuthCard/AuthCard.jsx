import "./AuthCard.css";
import AuthCardTitle from "./AuthCardTitle";

import AuthCardNav from "./AuthCardNav";
import AuthCardBody from "./AuthCardBody";

function AuthCard({ className, children }) {
	return <main className={`authCard${className ? ` ${className}` : ""}`}>{children}</main>;
}

AuthCard.Title = AuthCardTitle;
AuthCard.Nav = AuthCardNav;
AuthCard.Body = AuthCardBody;

export default AuthCard;
