import './Home.css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import PokemonContext from '../PokemonContext';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  text-transform: capitalize;
`;

const PokeList = styled.article`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-gap: 10px;
`;

const PokeListItem = {
  padding: "15px",
  textDecoration: "none",
  color: "black",
};

const TypeButton = styled.article`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: larger;
  font-style: italic;
`;

const TypeButtonSelect = {
  width: "150px",
  padding: "7px",
  textAlignLast: "center",
  textTransform: "capitalize",
  fontSize: "medium",
}

// Custom hook stolen from the react router docs
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const pokemon = useContext(PokemonContext);
  const query = useQuery();
  const history = useHistory();

  const filter = query.get('filter') || 'No Filter';

  // localhost:3000?filter=grass

  const setFilter = (filter) => {
    if (filter === 'No Filter') {
      history.push('/');
    } else {
      history.push(`/?filter=${filter}`);
    }
  };


  const types = pokemon
    .flatMap(poke =>
      poke.types.flatMap(({ type }) => type.name))
    .reduce((uniqueTypes, nextType) => {
      if (!uniqueTypes.includes(nextType)) {
        uniqueTypes.push(nextType);
      }
      return uniqueTypes;
    }, []);

  // Still doesn't work.
  const pokemonList = filter === 'No Filter'
    ? pokemon
    : pokemon.filter(poke =>
       poke.types.some(({ type }) =>
         type.name === filter));

  return (
    <Container>
        <article className="poke-list-title">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png' alt="a thing" height="150px" width="380px"/>
        </article>
        <TypeButton>
            <label htmlFor="types">Choose a Pokemon type:  </label>
            <select style={TypeButtonSelect} value={filter} onChange={evt => setFilter(evt.target.value)} name="types" id="types">
              <option>No Filter</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
        </TypeButton>
        <PokeList>
          {pokemonList.map(poke => (
            <Link key={poke.name} style={PokeListItem} className="poke-list-item" to={`/pokemon/${poke.name}/abilities`}>
              <span>
                <img key={poke.name} src={poke.image} alt={poke.name} />
                <p>{poke.name}</p>
                <hr />
              </span>
            </Link>
          ))}
        </PokeList>
    </Container>
    
  );
}
