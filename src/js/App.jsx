import axios from "axios";
import React, { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';

export default function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		(async() => {
			let res = await axios.get("https://pizza.kando-dev.eu/Pizza");
			setData(res.data);
		})();
	}, []);

	let items = data.map(item => (
		<div style={{
			border: "2px solid black",
			display: "inline-block",
			marginRight: "20px",
		}} key={item.id}>
			<h1 style={{
				margin: "0px"
			}}>{item.name}</h1>
			<h2 style={{
				margin: "0px"
			}}>Gluténmentes? {item.isGlutenFree ? "igen" : "nem"}</h2>
			<img alt={item.name} title={item.name} src={item.kepURL} height="400" width="400"></img>
		</div>
	))

    return items;
}

createRoot(document.getElementById("root")).render(<App />);
