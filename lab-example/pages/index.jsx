import React, {useState, useEffect}from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

const url = "https://randomuser.me/api/";

export default function Home() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  function getUsers() {
    axios
      .get(url)
      .then((response) => {
        setUser(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Users</h1>
      <button>Add one more!</button>
      <br /><br />
      {user.map((singleUser) =>{
        return (
          <div className={styles.container} key={singleUser.id}>
            <img src={singleUser.picture.large} alt="" />
            <div className={styles.text} >
              <h2>First Name: {singleUser.name.first}</h2>
              <h2>Last Name: {singleUser.name.last}</h2>
              <h2>Gender: {singleUser.gender}</h2>
              <h2>Height: {singleUser.height}</h2>
              <h2>Birth: {singleUser.dob.date}</h2>
            </div>
          </div>
        )
      })}
    </div>
    
  );
}