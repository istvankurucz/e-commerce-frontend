import "./SectionTitle.css";

function SectionTitle({ className, children }) {
	return <h2 className={`sectionTitle${className ? ` ${className}` : ""}`}>{children}</h2>;
}

export default SectionTitle;
