import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalSearch() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [gender, setGender] = useState("female");
  const [minAge, setMinAge] = useState(1);
  const [maxAge, setMaxAge] = useState(80);
  const [location, setLocation] = useState(null);
  const [userProfiles, setUserProfiles] = useState([]);

  /* test Adrijana */

  useEffect(() => {
    console.log("gender:", gender);
    console.log("minAge:", minAge);
    console.log("maxAge:", maxAge);
    console.log("location:", location);
    console.log("userProfiles:", userProfiles);
  }, [gender, minAge, maxAge, location, userProfiles]);

  const searchHandel = () => {
    //console.log("searching...");
    if (minAge === "") {
      setMinAge(18);
    }

    if (maxAge === "") {
      setMaxAge(100);
    }

    if (location === "") {
      setLocation(null);
    }

    let user = {
      gender: gender,
      minAge: minAge,
      maxAge: maxAge,
      location: location,
    };
    console.log(user);

    Axios.get(`http://localhost:5000/user-profiles/filtered`, {
      params: {
        gender: gender,
        minAge: minAge,
        maxAge: maxAge,
        location: location,
      },
    })
      .then((response) => {
        // setUserProfiles(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {/* da code aus bootstrap ist, um style zu änderen brauche ich inlineStyle */}
      <button
        style={{ backgroundColor: "#734058", margin: "0px", padding: "0px" }}
        className="searchBtn"
        onClick={handleShow}
      >
        Search
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Finden mit Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ----------- modal-body ----------- */}
          {/* Geschlecht wählen */}
          <section 
          style={{width: "100%", display: "flex", justifyContent: "space-evenly"}}>
            <button
              style={{ backgroundColor: "#734058" }}
              value={gender}
              onClick={() => {
                setGender("male");
              }}
            >
              <img src="./icons/male.png" />
              mänlich
            </button>
            <button
              style={{ backgroundColor: "#a72b61" }}
              value={gender}
              onClick={() => {
                setGender("female");
              }}
            >
              <img src="./icons/female.png" />
              weiblich
            </button>
          </section>
          {/* Alter wählen */}
          <section
            style={{
              width: "90%",
              display: "flex",
              margin: "20px",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <label>von: </label>
              <input
                style={{ width: "120px", marginLeft: "7px" }}
                type="number"
                min={1}
                max={80}
                placeholder=" min Alter"
                onChange={(e) => {
                  setMinAge(parseInt(e.target.value));
                }}
              />
            </div>
            <div>
              <label>bis: </label>
              <input
                style={{ width: "120px", marginLeft: "7px" }}
                type="number"
                min={1}
                max={80}
                placeholder=" max Alter"
                onChange={(e) => {
                  setMaxAge(parseInt(e.target.value));
                }}
              />
            </div>
            <label> Jahre alt</label>
          </section>
          {/* Ort wählen */}
          <section
          style={{ margin: "20px" }}>
            <label>Bitte nenne den Ort: </label>
            <input
            style={{ marginLeft: "7px" }}
              type="text"
              placeholder=" z.B. Hamburg"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </section>

          {/* ---------------------------------- */}
        </Modal.Body>
        <Modal.Footer>
          <Button
          style={{backgroundColor: "#DD3A5A"}}
            onClick={() => {
              searchHandel();
            }}
          >
            <img src="./icons/iconSearch.png" />
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSearch;
