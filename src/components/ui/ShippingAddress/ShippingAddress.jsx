import { Link } from "react-router-dom";
import "./ShippingAddress.css";
import { useStateValue } from "../../../contexts/Context API/StateProvider";

const shippingData = {
	name: "Nagy Péter",
	tel: "+36758956237",
	country: "Hungary",
	zip: "1111",
	city: "Budapest",
	street: "Őz utca",
	number: "16",
};

function ShippingAddress({ className }) {
	const [{ user }] = useStateValue();

	return (
		<div className={`shippingAddress${className ? ` ${className}` : ""}`}>
			{user ? (
				<>
					<div className="shippingAddress__top">
						<span className="shippingAddress__name">
							{user?.displayName} - {user?.phone}
						</span>
						<Link to="/profile" className="shippingAddress__link">
							Change
						</Link>
					</div>

					<p className="shippingAddress__country">
						{user?.address?.country}, {user?.address?.zip}
					</p>
					<p className="shippingAddress__street">
						{user?.address?.city}, {user?.address?.street} street {user?.address?.number}
					</p>
				</>
			) : (
				<p className="shippingAddress__noUser">
					You are not logged in.
					<Link className="shippingAddress__noUser__link">Click here to log in!</Link>
				</p>
			)}
		</div>
	);
}

export default ShippingAddress;
