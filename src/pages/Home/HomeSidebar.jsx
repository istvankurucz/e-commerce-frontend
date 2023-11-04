import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HomeSidebar.css";
import { categories } from "../../data/categories";
import { Link } from "react-router-dom";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button/Button";

function HomeSidebar({ show, setShow, className }) {
	return (
		<nav className={`homeSidebar${show ? " homeSidebar--show" : ""}${className ? ` ${className}` : ""} scrollbar`}>
			<h3 className="homeSidebar__title">Catgories</h3>
			<Button
				title="Hide categories"
				variant="transparent"
				circle
				className="homeSidebar__expand"
				onClick={() => setShow(false)}>
				<FontAwesomeIcon icon={faAnglesLeft} />
			</Button>

			<ul className="homeSidebar__categories">
				{categories.map((category) => (
					<li key={category.name} className="homeSidebar__category">
						<Link to="/">
							<FontAwesomeIcon icon={category.icon} />
							<span className="homeSidebar__category__name">{category.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default HomeSidebar;
