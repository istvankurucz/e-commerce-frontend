import { useState } from "react";
import Input from "../../components/form/Input/Input";
import Container from "../../components/layout/Container/Container";
import Button from "../../components/ui/Button/Button";
import Divider from "../../components/ui/Divider/Divider";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import "./Profile.css";
import getValue from "../../utils/input/getValue";
import Feedback from "../../components/ui/Feedback/Feedback";
import { updateEmail, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Loader from "../../components/ui/Loader/Loader";
import logout from "../../utils/auth/logout";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
	const [{ user }] = useStateValue();
	const [feedbackData, setFeedbackData] = useState({});
	const [showFeedback, setShowFeedback] = useState(false);
	const navigate = useNavigate();

	async function handleLogout() {
		try {
			await logout();

			navigate("/");
		} catch (e) {
			setFeedbackData({
				type: "error",
				title: "Error during logout.",
				details: "",
			});
			setShowFeedback(true);
		}
	}

	async function savePersonalData(e) {
		e.preventDefault();

		// Get form data
		const name = getValue("profileName");
		const email = getValue("profileEmail");
		const phone = getValue("profilePhone");

		// Update the name (if necessary)
		if (user.displayName !== name) {
			try {
				await updateProfile(auth.currentUser, {
					displayName: name,
				});
			} catch (e) {
				console.log(e);
				setFeedbackData({
					type: "error",
					title: "Error updating your name.",
					details: e.message,
				});
				setShowFeedback(true);

				return;
			}
		}

		// Update the email (if necessary)
		if (user.email !== email) {
			try {
				await updateEmail(auth.currentUser, email);
			} catch (e) {
				console.log(e);
				setFeedbackData({
					type: "error",
					title: "Error updating your email.",
					details: e.message,
				});
				setShowFeedback(true);

				return;
			}
		}

		// Update the phone (if necessary)
		if (!user.phone || user.phone !== phone) {
			try {
				await updateDoc(doc(db, `customers/${user.uid}`), {
					phone,
				});
			} catch (e) {
				console.log(e);
				setFeedbackData({
					type: "error",
					title: "Error updating your phone.",
					details: e.message,
				});
				setShowFeedback(true);

				return;
			}
		}

		// Show feedback if everything was successful
		setFeedbackData({
			type: "success",
			title: "Your data was saved.",
			details: "",
		});
		setShowFeedback(true);
	}

	async function saveAddress(e) {
		e.preventDefault();

		// Get form data
		const country = getValue("profileCountry");
		const zip = parseInt(getValue("profileZIP"));
		const city = getValue("profileCity");
		const street = getValue("profileStreet");
		const number = getValue("profileNumber");

		// Update the address in DB
		try {
			await updateDoc(doc(db, `customers/${user.uid}`), {
				address: { country, zip, city, street, number },
			});
		} catch (e) {
			setFeedbackData({
				type: "error",
				title: "Error saving your address.",
				details: e.message,
			});
			setShowFeedback(true);

			return;
		}

		// Feedback if everything was successful
		setFeedbackData({
			type: "success",
			title: "Your address was saved.",
			details: "",
		});
		setShowFeedback(true);
	}

	return (
		<Container className="profile">
			<Feedback feedbackData={feedbackData} show={showFeedback} setShow={setShowFeedback} />

			{user === null && <Loader />}

			<div className="profile__left">
				<img
					src={user?.photoURL ?? "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"}
					alt={user?.displayName}
					className="profile__img"
				/>

				<Button variant="transparent" rounded fullWidth>
					Change profile picture
				</Button>

				<Divider className="profile__left__divider" />

				{user ? (
					<Button
						variant="dark"
						rounded
						fullWidth
						className="profile__left__button profile__left__button--logout"
						onClick={handleLogout}>
						Logout
					</Button>
				) : (
					<Link to="/login">
						<Button
							variant="dark"
							rounded
							fullWidth
							className="profile__left__button profile__left__button--logout"
							tabIndex={-1}>
							Login
						</Button>
					</Link>
				)}

				<Button
					variant="transparent"
					rounded
					fullWidth
					className="profile__left__button profile__left__button--delete">
					Delete my profile
				</Button>
			</div>

			<div className="profile__right">
				<h2 className="profile__subtitle">Personal</h2>
				<form className="profile__section profile__section--personal" onSubmit={savePersonalData}>
					<Input
						type="text"
						id="profileName"
						label="Name"
						placeholder="Name"
						fullWidth
						className="profile__input"
						defaultValue={user?.displayName}
						required
					/>
					<Input
						type="email"
						id="profileEmail"
						label="Email"
						placeholder="Email"
						fullWidth
						className="profile__input"
						defaultValue={user?.email}
						required
					/>
					<Input
						type="tel"
						id="profilePhone"
						label="Phone"
						placeholder="Phone"
						fullWidth
						className="profile__input"
						defaultValue={user?.phone}
						required
					/>

					<Button type="submit" rounded className="profile__save">
						Save
					</Button>
				</form>

				<h2 className="profile__subtitle">Address</h2>
				<form className="profile__section profile__section--address" onSubmit={saveAddress}>
					<Input
						type="text"
						id="profileCountry"
						label="Country"
						placeholder="Country"
						fullWidth
						className="profile__input"
						defaultValue={user?.address?.country}
						required
					/>
					<Input
						type="number"
						id="profileZIP"
						label="ZIP"
						placeholder="ZIP"
						fullWidth
						className="profile__input"
						defaultValue={user?.address?.zip}
						required
					/>
					<Input
						type="text"
						id="profileCity"
						label="City"
						placeholder="City"
						fullWidth
						className="profile__input"
						defaultValue={user?.address?.city}
						required
					/>
					<Input
						type="text"
						id="profileStreet"
						label="Street"
						placeholder="Street"
						fullWidth
						className="profile__input"
						defaultValue={user?.address?.street}
						required
					/>
					<Input
						type="text"
						id="profileNumber"
						label="Number"
						placeholder="Number"
						fullWidth
						className="profile__input"
						defaultValue={user?.address?.number}
						required
					/>

					<Button type="submit" rounded className="profile__save">
						Save
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default Profile;
