import Container from "../Container/Container";
import "./Section.css";
import SectionTitle from "./SectionTitle";

function Section({ id, variant, tilted, className, children }) {
	return (
		<section
			id={id ?? id}
			className={`section section--${variant ? variant : "light"}${tilted ? " section--tilted" : ""}${
				className ? ` ${className}` : ""
			}`}>
			<Container className="section__container">{children}</Container>
		</section>
	);
}

Section.Title = SectionTitle;

export default Section;
