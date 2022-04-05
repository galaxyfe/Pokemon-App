import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Header = styled.h1`
  font-family: fantasy;
  font-size: 40px;
`;

const P = styled.p`
  font-family: cursive;
  color: darkblue;
  font-size: 30px;
  text-decoration: none;
`;



export default function About() {
  //function openTab() {
    //window.open('https://www.linkedin.com/in/ericeash/');
  //}
  return (
    <>

      <Header>Authors</Header>
        <Link>
          <P>Eric Eash</P>
        </Link>
      <P>Dustin Stiles
        <p style={{fontSize: "16px"}}>
          Dustin Stiles is a coding wizard extraordinaire, able to break down the language of coding to the most basic level of understanding!
        </p>
      </P>
    </>
  );
}
