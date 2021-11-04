/** @format */
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

//First solution
// const url = "https://randomuser.me/api/";

// export default function Home() {
// 	const [characters, setCharacters] = useState([]);

// 	useEffect(() => {
// 		getCharacters();
// 	}, []);

// 	function getCharacters() {
// 		axios
// 			.get(url)
// 			.then((res) => {
// 				setCharacters(res.data.results);
// 			})
// 			.catch((err) => {
// 				return "error: ", err.res;
// 			});
// 	}

// 	return (
// 		<div className={styles.container}>
// 			{characters.map((person) => {
// 				return (
// 					<div key={person.id.value}>
// 						<img
// 							className={styles.imgContainer}
// 							src={person.picture.large}
// 							alt=""
// 						/>
// 						<h3>
// 							{person.name.title}. {person.name.first} {person.name.last}
// 						</h3>
// 						<p>solo </p>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// }

//Second solution

export default function Home() {
	// variables to setting the States that i will render from the API
	const [profilName, setProfileName] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [profilCell, setProfileCell] = useState("");
	const [profilEmail, setProfileEmail] = useState("");
	const [profilCountry, setProfilCountry] = useState("");
	const [profilCity, setProfilCity] = useState("");

	//Config the function to obtain the data from the url API with AXIOS
	const profilData = async () => {
		try {
			const res = await axios.get("https://randomuser.me/api/");
			// console.log(res);
			const user = res.data.results[0];
			setProfileName(`${user.name.first} ${user.name.last}`);
			setProfileImage(user.picture.large);
			setProfileCell(user.cell);
			setProfileEmail(user.email);
			setProfilCountry(user.location.country);
			setProfilCity(user.location.city);
		} catch (error) {
			console.log(error);
		}
	};

	//Using the useEffect to controll the received data from API
	useEffect(() => {
		profilData();
	}, []);

	//Rendenring data
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<img src={profileImage} className={styles.profilePicture} alt="" />
				<h2>{profilName}</h2>
				<div className={styles.infoCard}>
					<span>
						From: {profilCity}, {profilCountry}
					</span>
					<span>Phone: {profilCell}</span>
					<span>{profilEmail}</span>
					<button
						className={styles.btnNewContact}
						onClick={() => profilData()}
					>
						New Contact
					</button>
				</div>
			</div>
		</div>
	);
}
