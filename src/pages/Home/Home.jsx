import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import HomeSidebar from "./HomeSidebar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button/Button";
import { useState } from "react";
import Section from "../../components/layout/Section/Section";
import Card from "../../components/ui/Card/Card";
import Feedback from "../../components/ui/Feedback/Feedback";
import useProducts from "../../hooks/product/useProducts";
import Loader from "../../components/ui/Loader/Loader";

function Home() {
	const { products, loading } = useProducts();
	const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768);
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedbackData, setFeedbackData] = useState({});

	// console.log(products);

	return (
		<div className="home">
			<Feedback show={showFeedback} setShow={setShowFeedback} data={feedbackData} seconds={3} />

			{loading && <Loader />}

			<main className="home__main">
				<Button
					title="Categories"
					variant="primary"
					circle
					className={`home__categories${showSidebar ? " home__categories--hide" : ""}`}
					onClick={() => setShowSidebar(true)}>
					<FontAwesomeIcon icon={faBars} />
				</Button>
				<HomeSidebar show={showSidebar} setShow={setShowSidebar} />
				<div className="home__content">
					<Section id="homeBestSeller" className="home__bestSeller">
						<Section.Title>BestSeller</Section.Title>

						<div className="home__bestSeller__container">
							{products.map((product) => (
								<Card
									key={product.id}
									id={product.id}
									title={product.name}
									img={product.imgs[0]}
									description={product.description}
									price={product.prices[0]}
									setShowFeedback={setShowFeedback}
									setFeedbackData={setFeedbackData}
								/>
							))}
						</div>
					</Section>

					<Section id="homeForYou" variant="gradient" tilted className="home__forYou">
						<Section.Title>For You</Section.Title>

						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
					</Section>
				</div>
			</main>
		</div>
	);
}

export default Home;
