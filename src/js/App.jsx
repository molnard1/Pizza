import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { createRoot } from 'react-dom/client';

export default function App() {
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async() => {
			let res = await axios.get("https://pizza.kando-dev.eu/Pizza");
			setData(res.data);
			setLoaded(true);
		})();
	}, []);

	let items = data.map(item => (
		<Col>
			<h1>{item.name}</h1>
			<h2>Gluténmentes? {item.isGlutenFree ? "igen" : "nem"}</h2>
			<Image alt={item.name} title={item.name} src={item.kepURL} style={{objectFit: "cover", width: 400, height: 400}} fluid />
		</Col>
	));

    return [
		<>
		  {loaded ? (
			<Container>
			  <Row>{[...items]}</Row>
			</Container>
		  ) : (
			<div className="d-flex flex-row min-vh-100 justify-content-center align-items-center">
				<Spinner animation="border" role="status" />
				<h1>Töltés...</h1>
			</div>
		  )}
		</>
	];
}

createRoot(document.getElementById("root")).render(<App />);
