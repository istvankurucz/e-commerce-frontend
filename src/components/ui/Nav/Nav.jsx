import { Link, useNavigate } from "react-router-dom";
import Container from "../../layout/Container/Container";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import Input from "../../form/Input/Input";
import Menu from "../Menu/Menu";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import NavCartItem from "./NavCartItem";
import logout from "../../../utils/auth/logout";

function Nav({ className }) {
	const [{ user, basket }] = useStateValue();
	const navigate = useNavigate();

	return (
		<nav className={`nav${className ? ` ${className}` : ""}`}>
			<Container className="nav__container">
				<Link to="/" className="nav__logo">
					LOGO
				</Link>

				<Input type="email" id="navSearch" placeholder="Search" className="nav__search" />

				<ul className="nav__menu">
					<li className="nav__menu__item nav__menu__item--profile">
						<Link to="/profile">
							<img
								src={
									user?.photoURL ?? "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
								}
								alt={user?.displayName}
								className="nav__profile"
							/>
						</Link>

						<Menu top="2.2rem" className="nav__submenu">
							<Menu.Item>
								{user ? <div onClick={() => logout(navigate)}>Logout</div> : <Link to="/login">Login</Link>}
							</Menu.Item>
						</Menu>
					</li>
					<li className="nav__menu__item nav__menu__item--cart">
						<Link to="/cart">
							<Button variant="transparent" circle tabIndex={-1} className="nav__cart">
								<FontAwesomeIcon icon={faBasketShopping} />
								{basket?.length > 0 && <div className="nav__cart__indicator">{basket?.length}</div>}
							</Button>
						</Link>

						<Menu top="2.2rem" className="nav__submenu">
							{basket.map((item) => (
								<Menu.Item key={item.id}>
									<NavCartItem
										id={item.id}
										name={item.name}
										img={item.img}
										price={item.price}
										quantity={item.quantity}
									/>
								</Menu.Item>
							))}
						</Menu>
					</li>
				</ul>
			</Container>
		</nav>
	);
}

export default Nav;
