/** @format */

import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

const url = "https://randomuser.me/api/";

export default function Home() {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		getCharacters();
	}, []);

	function getCharacters() {
		axios
			.get(url)
			.then((res) => {
				setCharacters(res.data.results);
			})
			.catch((err) => {
				return "error: ", err.res;
			});
	}

	return (
		<div className={styles.container}>
			{characters.map((person) => {
				return (
					<div key={person.id.value}>
						<img
							className={styles.imgContainer}
							src={person.picture.large}
							alt=""
						/>
						<h3>
							{person.name.title}. {person.name.first} {person.name.last}
						</h3>
						<p>solo </p>
					</div>
				);
			})}
		</div>
	);
}
