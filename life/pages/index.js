import React, { useState, useEffect } from "react";
import axios from "axios";

// JSX -> is the react version of html
// -> we can add dynamic values, we can loop, we can have conditional rendering, and we can render components
// Components -> Are pieces of code, that are going to render to some kind of html
// State -> Self contained logic
// Props -> Logic passed down from a parent to a child component

const url = "https://rickandmortyapi.com/api/character";

// axios.get(url).then((response) => {
//   console.log("response:", response.data);
// });

export default function Home() {
  const [characters, setCharacters] = useState([]);
  console.log("characters:", characters);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  // console.log("characters:", characters);

  useEffect(() => {
    getCharacters();
  }, []);

  async function getCharacters() {
    axios
      .get(url)
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((err) => {
        console.error("err", err.response);
      });
    // try {
    //   const response = await axios.get(url);
    //   // .then((response) => {
    //   //   // console.log("response:", response.data.results);
    //   setCharacters(response.data.results);
    //   // })
    //   // .catch((err) => {
    //   //   console.log("err:", err.response);
    //   // });
    // } catch (error) {
    //   console.log("err:", error.response);
    // }
  }

  // Lifecycle of a component
  // Mounting (being added to the DOM)
  // Updating (being updated)
  // Unmounting (being removed from the DOM)
  useEffect(() => {
    console.log("Only gets called when the component gets added to the DOM");
  }, []);

  useEffect(() => {
    if (!count) {
      return;
    }
    console.log(
      `This is called when the component gets added to the DOM AND when count gets updated`
    );
  }, [count]);

  useEffect(() => {
    if (!name) {
      return;
    }
    console.log(`Gets called in the begining and when name changes`);
  }, [name]);

  useEffect(() => {
    if (!name && !count) {
      return;
    }

    console.log(`Count or Name changed`);
  }, [name, count]);

  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      Hello Class
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={increment}>{count}</button>
      </div>
      <div>
        {characters.map((person) => {
          return (
            <div key={person.id}>
              <img src={person.image} />
              <h3>{person.name}</h3>
              <p>{person.species}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
