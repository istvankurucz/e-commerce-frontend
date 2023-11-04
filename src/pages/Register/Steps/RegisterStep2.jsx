import React from "react";
import Input from "../../../components/form/Input/Input";
import "../Register.css";
import RequiredDot from "../../../components/form/RequiredDot/RequiredDot";
import FormText from "../../../components/form/FormText/FormText";

function RegisterStep2() {
	return (
		<>
			<Input type="email" id="registerEmail" label="Email" placeholder="Email" required autoFocus fullWidth />
			<Input type="password" id="registerPassword" label="Password" placeholder="Password" required fullWidth />
			<Input
				type="password"
				id="registerPasswordConfirm"
				label="Password Confirm"
				placeholder="Password Confirm"
				required
				fullWidth
			/>

			<div className="register__info">
				<FormText>The password must be at least 6 characters.</FormText>
				<div className="register__info__required">
					<RequiredDot />
					<FormText>Required field</FormText>
				</div>
			</div>
		</>
	);
}

export default RegisterStep2;
