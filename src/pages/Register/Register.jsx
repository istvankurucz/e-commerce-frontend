import { Link, useNavigate } from "react-router-dom";
import AuthBg from "../../components/auth/AuthBg/AuthBg";
import AuthCard from "../../components/auth/AuthCard/AuthCard";
import FormText from "../../components/form/FormText/FormText";
import Button from "../../components/ui/Button/Button";
import Divider from "../../components/ui/Divider/Divider";
import useRegisterSteps from "../../hooks/auth/useRegisterSteps";
import RegisterStep1 from "./Steps/RegisterStep1";
import RegisterStep2 from "./Steps/RegisterStep2";
import Feedback from "../../components/ui/Feedback/Feedback";
import "./Register.css";
import getValue from "../../utils/input/getValue";
import getFormValues from "../../utils/input/getFormValues";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

function Register() {
	const [formData, setFormData] = useState([]);
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedbackData, setFeedbackData] = useState({});
	const navigate = useNavigate();
	const { index, step, steps, isFirstStep, isLastStep, prevStep, nextStep } = useRegisterSteps([
		<RegisterStep1 />,
		<RegisterStep2 />,
	]);

	async function handleSubmit(e) {
		e.preventDefault();

		if (!isLastStep) {
			setFormData((prev) => getFormValues(prev));

			return nextStep();
		}

		// 1. Get the form data
		const name = formData[0];
		// const phone = formData[1];
		const email = getValue("registerEmail");
		const password = getValue("registerPassword");
		const passwordConfirm = getValue("registerPasswordConfirm");

		// 2. Check the passwords
		// Error if the password is too short
		if (password.length < 6) {
			setFeedbackData({
				type: "error",
				title: "The password is too short.",
				details: "Password must be at least 6 characters.",
			});
			setShowFeedback(true);

			return;
		}

		// Error if the passwords don't match
		if (password !== passwordConfirm) {
			setFeedbackData({
				type: "error",
				title: "The passwords don't match.",
				details: "",
			});
			setShowFeedback(true);

			return;
		}

		// 3. Create user in Firebase Auth
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(auth.currentUser, {
				displayName: name,
			});
			// await updatePhoneNumber(auth.currentUser, phone);
		} catch (e) {
			setFeedbackData({
				type: "error",
				title: e.message,
				details: "",
			});
			setShowFeedback(true);

			return;
		}

		// 4. Redirect to home page
		navigate("/");
	}

	return (
		<AuthBg className="regsiter">
			<Feedback show={showFeedback} setShow={setShowFeedback} data={feedbackData} seconds={5} />

			<AuthCard className="register__card">
				<AuthCard.Nav direction="back" onClick={isFirstStep ? () => navigate("/") : prevStep} />
				<div className="register__paging">
					{index + 1}/{steps.length}
				</div>

				<AuthCard.Title>Registration</AuthCard.Title>

				<AuthCard.Body onSubmit={handleSubmit}>
					{step}

					<Button type="submit" variant="primary" rounded fullWidth>
						{isLastStep ? "Register" : "Next"}
					</Button>

					<Divider />

					<div className="register__login">
						<FormText className="login__subtitle">
							Already have an account?{" "}
							<Link to="/login" className="login__register__link">
								Log in!
							</Link>
						</FormText>
					</div>
				</AuthCard.Body>
			</AuthCard>
		</AuthBg>
	);
}

export default Register;
