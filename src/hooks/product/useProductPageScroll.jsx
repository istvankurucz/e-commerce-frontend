import { useLayoutEffect } from "react";

function useProductPageScroll() {
	useLayoutEffect(() => {
		const orderButton = document.querySelector(".product__order__button");
		function handleScroll() {
			if (window.innerHeight + Math.round(window.scrollY) + 50 >= document.body.offsetHeight) {
				orderButton.classList.remove("product__order__button--show");
			} else {
				orderButton.classList.add("product__order__button--show");
			}
		}

		window.addEventListener("scroll", handleScroll);

		return () => removeEventListener("scroll", handleScroll);
	}, []);
}

export default useProductPageScroll;
