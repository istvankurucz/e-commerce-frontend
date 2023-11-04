import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./contexts/Context API/StateProvider";
import reducer, { initalState } from "./contexts/Context API/reducer";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<BrowserRouter>
		<StateProvider initalState={initalState} reducer={reducer}>
			<App />
		</StateProvider>
	</BrowserRouter>
	// </React.StrictMode>
);
