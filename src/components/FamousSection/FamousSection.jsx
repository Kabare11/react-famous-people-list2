import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FamousSection.css";

function FamousSection() {
  let [famousPersonName, setPersonName] = useState("");
  let [famousPersonRole, setPersonRole] = useState("");
  let [famousPeopleArray, setPeopleArray] = useState([]);
  console.log(famousPeopleArray);

  // TODO: on load, call the fetchPeople() function

  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios
      .get("/api/people")
      .then((response) => setPeopleArray(response.data))
      .catch((error) => console.log("Error made", error));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(
      `The person is ${famousPersonName} and they're famous for ${famousPersonRole}`
    );

    axios
      .post("/api/people", {
        name: famousPersonName,
        role: famousPersonRole,
      })
      .then((response) => fetchPeople())
      .then(() => {
        setPersonName("");
        setPersonRole("");
      })
      .catch((error) => console.log("error made", error));

    // TODO: create POST request to add this new person to the database

    // HINT: the server is expecting a person object
    //       with a `name` and a `role` property
  };

  return (
    <section className="new-person-section">
      <form onSubmit={addPerson}>
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          value={famousPersonName}
          onChange={(e) => setPersonName(e.target.value)}
        />
        <label htmlFor="role-input">Famous for:</label>
        <input
          id="role-input"
          value={famousPersonRole}
          onChange={(e) => setPersonRole(e.target.value)}
        />
        <button type="submit">Done</button>
      </form>
      <p>
        {famousPersonName} is famous for "{famousPersonRole}".
      </p>
      <ul>
        {/* TODO: Render the list of famous people */}
        {famousPeopleArray.map((item) => (
          <li key={item.id}>
            {item.id} - {item.name} - {item.role}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FamousSection;
