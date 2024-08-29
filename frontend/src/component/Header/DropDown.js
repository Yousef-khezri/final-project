import Dropdown from "react-bootstrap/Dropdown";
import "./Header.css";

function DropDown() {
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
        <Dropdown.Item href="../src/componente/Home/Home.js" target="_blank">
          Home
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" target="_blank">
          Über uns
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" target="_blank">
          Galerie
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" target="_blank">
          Unseres Team
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" target="_blank">
          Kontakt
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/LoginRegistration/LoginRegister.js" target="_blank">
          Anmelden
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/LoginRegistration/LoginRegister.js" target="_blank">
          Registrieren
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
