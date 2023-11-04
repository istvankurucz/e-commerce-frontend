import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import AuthCard from "../../components/auth/AuthCard/AuthCard";
import FormText from "../../components/form/FormText/FormText";
import Input from "../../components/form/Input/Input";
import Button from "../../components/ui/Button/Button";
import Divider from "../../components/ui/Divider/Divider";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import AuthBg from "../../components/auth/AuthBg/AuthBg";
import Feedback from "../../components/ui/Feedback/Feedback";
import { useState } from "react";
import getValue from "../../utils/input/getValue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const dummyFeedbackData = {
	type: "success",
	title: "Feedback title",
};

function Login() {
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedbackData, setFeedbackData] = useState(dummyFeedbackData);
	const navigate = useNavigate();

	async function handleLogin(e) {
		e.preventDefault();

		// 1. Get form data
		const email = getValue("loginEmail");
		const password = getValue("loginPassword");

		// 2. Login user via Firebase Auth
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (e) {
			setFeedbackData({
				type: "error",
				title: "Invalid credentials.",
				details: "The email or the password is incorrect.",
			});
			setShowFeedback(true);

			return;
		}

		// 3. Redirect to home page
		navigate("/");
	}

	return (
		<AuthBg className="login">
			<Feedback show={showFeedback} setShow={setShowFeedback} data={feedbackData} />

			<AuthCard className="scrollbar">
				<AuthCard.Nav direction="back" onClick={() => navigate("/")} />
				<AuthCard.Title>Login</AuthCard.Title>

				<AuthCard.Body onSubmit={handleLogin}>
					<Input id="loginEmail" type="email" label="Email" placeholder="Email" required fullWidth />
					<Input id="loginPassword" type="password" label="Password" placeholder="Password" required fullWidth />

					<Button type="submit" variant="primary" rounded fullWidth>
						Login
					</Button>

					<Divider />

					<div className="login__options">
						<FormText className="login__subtitle">Other login options</FormText>

						<div className="login__options__buttons">
							<Button variant="transparent" className="login__options__button">
								<FontAwesomeIcon icon={faGoogle} />
								<span className="login__options__button__text">Google</span>
							</Button>
							<Button variant="transparent" className="login__options__button">
								<FontAwesomeIcon icon={faFacebook} />
								<span className="login__options__button__text">Facebook</span>
							</Button>
						</div>
					</div>

					<Divider />

					<div className="login__register">
						<FormText className="login__subtitle">
							Don't have an account?{" "}
							<Link to="/register" className="login__register__link">
								Create one!
							</Link>
						</FormText>
					</div>
				</AuthCard.Body>
			</AuthCard>
		</AuthBg>
	);
}

export default Login;
