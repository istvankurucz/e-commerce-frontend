import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/form/Input/Input";
import Container from "../../components/layout/Container/Container";
import Button from "../../components/ui/Button/Button";
import "./Product.css";
import { faBasketShopping, faStar, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import getValue from "../../utils/input/getValue";
import addProductToBasket from "../../utils/basket/addProductToBasket";
import updateBasket from "../../utils/basket/updateBasket";
import findItemById from "../../utils/basket/findItemById";
import BackToHome from "../../components/ui/BackToHome/BackToHome";
import Carousel from "../../components/ui/Carousel/Carousel";
import ShippingAddress from "../../components/ui/ShippingAddress/ShippingAddress";
import useProductPageScroll from "../../hooks/product/useProductPageScroll";
import useProduct from "../../hooks/product/useProduct";
import formatPrice from "../../utils/fomatters/formatPrice";
import Loader from "../../components/ui/Loader/Loader";
import goToBottom from "../../utils/general/goToBottom";
import Feedback from "../../components/ui/Feedback/Feedback";

function Product() {
	const { product, loading } = useProduct();
	const [{ basket }, dispatch] = useStateValue();
	const [feedbackData, setFeedbackData] = useState({});
	const [showFeedback, setShowFeedback] = useState(false);
	const [showCarousel, setShowCarousel] = useState(false);
	const [imgIndex, setImgIndex] = useState(0);

	// console.log("Product:\n", product);

	// Scroll handling on smaller screen sizes
	useProductPageScroll();

	function handleBasketClick() {
		// 1. Get form data and check the value
		const quantity = parseInt(getValue("productQuantity"));
		if (quantity < 1) {
			setFeedbackData({
				type: "error",
				title: "You have to add at least 1 pc to the basket.",
				description: "",
			});
			setShowFeedback(true);

			return;
		}

		if (isNaN(quantity)) {
			setFeedbackData({
				type: "error",
				title: "Please enter the quantity.",
				description: "",
			});
			setShowFeedback(true);

			return;
		}

		// 2. Check if product is already in the basket
		const productInBasket = findItemById(basket, product.id);

		// 3. Create the new basket
		const newBasket = productInBasket
			? updateBasket(basket, product.id, { quantity: productInBasket.quantity + quantity })
			: addProductToBasket(basket, {
					id: product.id,
					name: product.name,
					img: product.imgs[0],
					description: product.description,
					price: product.prices[0],
					quantity,
			  });

		// 4. Set the local basket to the new basket
		dispatch({
			type: "SET_BASKET",
			basket: newBasket,
		});

		// 5. Show feedback that the product was added
		setFeedbackData({
			type: "info",
			title: "Item successfully added to basket.",
			description: "",
		});
		setShowFeedback(true);
	}

	return (
		<Container className="product">
			<Feedback show={showFeedback} setShow={setShowFeedback} data={feedbackData} />

			<div className={`product__carousel${showCarousel ? " product__carousel--show" : ""}`}>
				<Button circle className="product__carousel__close" onClick={() => setShowCarousel(false)}>
					<FontAwesomeIcon icon={faX} />
				</Button>

				<div className="product__carousel__inner">
					<Carousel imgs={product?.imgs?.length > 0 ? product?.imgs : []} />
				</div>
			</div>

			{loading && <Loader />}

			<header className="product__header">
				<BackToHome />
			</header>

			<main className="product__main">
				<div className="product__product">
					<div className="product__imgs">
						<img
							src={product?.imgs?.length > 0 ? product?.imgs[imgIndex] : ""}
							alt={product?.name}
							className="product__imgs__current"
							onClick={() => setShowCarousel(true)}
						/>

						<div className="product__imgs__other">
							{product?.imgs?.map((img, i) => (
								<img
									key={img}
									src={img}
									alt={product?.name}
									className="product__imgs__other__img"
									onClick={() => setImgIndex(i)}
								/>
							))}
						</div>
					</div>

					<div className="product__info">
						<h2 className="product__name">{product?.name}</h2>

						<div className="product__price">
							{/* <span className="product__price__currency">$</span>
							<span className="product__price__amount">199.99</span> */}
							{product?.prices?.length > 0 &&
								formatPrice(product?.prices[0].currency, product?.prices[0].amount)}
						</div>

						<div className="product__rating">
							<span className="product__rating__number">3.5</span>{" "}
							<span className="product__rating__stars">
								<FontAwesomeIcon icon={faStar} />
								<FontAwesomeIcon icon={faStar} />
								<FontAwesomeIcon icon={faStar} />
								<FontAwesomeIcon icon={faStar} />
								<FontAwesomeIcon icon={faStar} />
							</span>
							<span className="product__rating__count">15 ratings</span>
						</div>

						<div className="product__description">{product?.description}</div>
					</div>
				</div>

				<div className="product__order">
					<div className="product__shipping">
						<h3 className="product__shipping__title">Shipping info</h3>
						<ShippingAddress />
					</div>

					<Input
						id="productQuantity"
						type="number"
						label="Quantity"
						placeholder="Quantity"
						defaultValue={1}
						fullWidth
						className="product__order__quantity"
					/>

					<Button variant="primary" fullWidth rounded className="product__buy" onClick={handleBasketClick}>
						<FontAwesomeIcon icon={faBasketShopping} />
						<span className="product__buy__text">Add to cart</span>
					</Button>
				</div>

				<Button variant="primary" circle className="product__order__button" onClick={goToBottom}>
					<FontAwesomeIcon icon={faBasketShopping} />
				</Button>
			</main>
		</Container>
	);
}

export default Product;
