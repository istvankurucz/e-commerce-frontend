// https://e-commerce-1209d.firebaseapp.com

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Nav from "./components/ui/Nav/Nav";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import useAuth from "./hooks/auth/useAuth";
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";

function App() {
	useAuth();

	return (
		<div className="app">
			{/* Pages where Nav has to be shown */}
			<Routes>
				<Route path="/login" element={<></>} />
				<Route path="/register" element={<></>} />

				<Route path="/products/:productId" element={<Nav />} />

				<Route path="/profile" element={<Nav />} />
				<Route path="/cart" element={<Nav />} />

				<Route path="/success" element={<Nav />} />
				<Route path="/cancel" element={<Nav />} />

				<Route path="/" element={<Nav />} />
			</Routes>

			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route path="/products/:productId" element={<Product />} />

				<Route path="/profile" element={<Profile />} />
				<Route path="/cart" element={<Cart />} />

				<Route path="/success" element={<Success />} />
				<Route path="/cancel" element={<Cancel />} />

				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
