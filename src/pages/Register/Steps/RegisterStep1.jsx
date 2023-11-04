import Input from "../../../components/form/Input/Input";
import "../Register.css";

function RegisterStep1() {
	return (
		<>
			<Input type="text" id="registerName" label="Name" placeholder="Name" required autoFocus fullWidth />
			{/* <Input type="tel" id="registerPhone" label="Phone" placeholder="Phone" required fullWidth /> */}
		</>
	);
}

export default RegisterStep1;
