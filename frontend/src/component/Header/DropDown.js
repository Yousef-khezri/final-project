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
          About us
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" target="_blank">
          Galery
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" target="_blank">
          Our Team
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/Home/Home.js" target="_blank">
          Contact
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/LoginRegistration/LoginRegister.js" target="_blank">
          Singin
        </Dropdown.Item>
        <Dropdown.Item href="../src/componente/LoginRegistration/LoginRegister.js" target="_blank">
          Signup
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
