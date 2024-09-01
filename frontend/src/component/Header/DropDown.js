import Dropdown from "react-bootstrap/Dropdown";
import "./Header.css";

function DropDown() {
   /* test Adrijana */
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        /* className="dropBtn" */
        style={{backgroundColor: "#DD3A5A"}}
      >
        <img src="../images/menu.png" />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{backgroundColor: "#DD3A5A"}}>
        <Dropdown.Item href="../src/componente/Home/Home.js" >
          Home
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" >
          Über uns
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" >
          Galerie
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" >
          Unseres Team
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" >
          Kontakt
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/LoginRegistration/LoginRegister.js" >
          Anmelden
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/LoginRegistration/LoginRegister.js" >
          Registrieren
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
