import "./Menu.css";
import MenuItem from "./MenuItem";

function Menu({ top, className, children }) {
	return (
		<ul style={{ "--top": top }} className={`menu${className ? ` ${className}` : ""}`}>
			{children}
		</ul>
	);
}

Menu.Item = MenuItem;

export default Menu;
