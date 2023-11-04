import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Input.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button/Button";
import { useState } from "react";
import RequiredDot from "../RequiredDot/RequiredDot";

function Input({
	type,
	label,
	id,
	name,
	placeholder,
	required,
	autoFocus,
	className,
	defaultValue,
	min,
	max,
	onChange,
	fullWidth,
}) {
	const [showPw, setShowPw] = useState(false);
	const isPassword = type === "password";

	return (
		<div className={`input${className ? ` ${className}` : ""}${fullWidth ? " input--fullWidth" : ""}`}>
			{label ? (
				<header className="input__header">
					<label htmlFor={id ? id : ""} className="input__label">
						{label}
					</label>
					{required ? <RequiredDot /> : ""}
				</header>
			) : (
				""
			)}
			{isPassword ? (
				<div className="input__password">
					<input
						type={showPw ? "text" : "password"}
						id={id ?? id}
						name={name ?? name}
						required={required ?? required}
						autoFocus={autoFocus ?? autoFocus}
						placeholder={placeholder ?? placeholder}
						className="input__input"
						defaultValue={defaultValue ?? defaultValue}
						min={min ?? min}
						max={max ?? max}
						onChange={onChange ?? onChange}
					/>
					{isPassword ? (
						<Button
							variant="transparent"
							rounded
							className="input__password__button"
							onClick={() => setShowPw((prev) => !prev)}>
							<FontAwesomeIcon icon={showPw ? faEye : faEyeSlash} />
						</Button>
					) : (
						""
					)}
				</div>
			) : (
				<input
					type={type ? type : "text"}
					id={id ?? id}
					name={name ?? name}
					required={required ?? required}
					autoFocus={autoFocus ?? autoFocus}
					placeholder={placeholder ?? placeholder}
					className="input__input"
					defaultValue={defaultValue ?? defaultValue}
					onChange={onChange ?? onChange}
				/>
			)}
		</div>
	);
}

export default Input;
