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
      <Button onClick={handleShow}>
        <img src="./icons/search.png" />
        Search
      </Button>

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
          <section className="genderBtns">
            <button
              value={gender}
              onClick={() => {
                setGender("male");
              }}
            >
              <img src="./icons/male.png" />
              mänlich
            </button>
            <button
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
          <section className="alterBox">
            <div>
              <label>von: </label>
              <input
                type="number"
                min={1}
                max={80}
                placeholder="min Alter"
                onChange={(e) => {
                  setMinAge(parseInt(e.target.value));
                }}
              />
            </div>
            <div>
              <label>bis: </label>
              <input
                type="number"
                min={1}
                max={80}
                placeholder="max Alter"
                onChange={(e) => {
                  setMaxAge(parseInt(e.target.value));
                }}
              />
              <label> Jahre alt</label>
            </div>
          </section>
          {/* Ort wählen */}
          <section>
            <label>Bitte trage den gewünschten Ort ein: </label>
            <input
              type="text"
              placeholder="z.B. Hamburg"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </section>

          {/* ---------------------------------- */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              searchHandel();
            }}
          >
            <img src="./icons/iconSearch.png" />
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSearch;
