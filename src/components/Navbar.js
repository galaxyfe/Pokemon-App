import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #367BB4;
  width: 100vw;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 5px solid black;
`;

const NavBarLinks = styled.section`
  height: 50px;
  padding: 20px;
`;

const addPadding = {
  padding: '20px',
};

export default function Navbar() {
  return (
    <Nav>
      <section className="navbar-title">
        <img src='https://cdn.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png' alt="Pokemon Logo"/>
      </section>
     
      <NavBarLinks>
        <Link style={addPadding} className="navbar-link" to="/">
          <img src="https://fontmeme.com/permalink/210401/9816077e53cd22d6026a3902c83e4fee.png" alt="pokemon-font" border="0" height="50px"/>
        </Link>
        <Link style={addPadding} className="navbar-link" to="/about">
          <img src="https://fontmeme.com/permalink/210401/40d2ac1d6817cbec6becfd9502b4be61.png" alt="pokemon-font" border="0" height="50px"/>
        </Link>
      </NavBarLinks>
    </Nav>
  );
}
