export const initalState = {
	user: null,
	basket: [],
};

export default function reducer(state, action) {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};

		case "SET_BASKET":
			return {
				...state,
				basket: action.basket,
			};

		default:
			return "Invalid action type!";
	}
}
