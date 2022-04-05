import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Pokemon.css'
import styled from 'styled-components';

const PokePic = styled.article`
  display: flex;
  align-items: center;
  height: 500px;
  width: 400px;
  background-color: seashell;
  text-align: center;
  text-shadow: 2px 2px white;
  border-radius: 10px;
  border: 2px solid black;
`;

const PokePicSpan = styled.span`
  margin: auto;
  font-size: xx-large;
  font-weight: bold;
  text-transform: capitalize;
  text-shadow: 0 0 10px yellow;
`;

const PokePicSpanImg = {
  height: "300px",
}

const InfoDisplay = styled.div`
  border-radius: 10px;
  border: 2px solid black;
  text-align: center;
  text-transform: capitalize;
  background-color: #94bddf;
`;

const PokeInfo = styled.article`
  padding: 20px;
  text-transform: capitalize;
`;

function loadPokemon(name) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(pokemon => mapPokemonResponseToWhatWeNeed(pokemon));
}

function loadEncounters(name) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}/encounters`)
    .then(response => response.json())
    .then(encounters => encounters.map(mapEncountersToWhatWeNeed));
}

function mapPokemonResponseToWhatWeNeed(pokemon) {
  return {
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    abilities: pokemon.abilities.map(({ ability }) => ability.name),
    types: pokemon.types.map(({ type }) => type.name),
  };
}

function mapEncountersToWhatWeNeed(encounter) {
  return encounter.location_area.name;
}


export default function Pokemon() {
  const { name: nameInUrl, filter = 'abilities' } = useParams();
  
  const [pokemon, setPokemon] = useState(null);


  useEffect(() => {
    Promise
      .all([
        loadPokemon(nameInUrl),
        loadEncounters(nameInUrl),
      ])
      .then(([pokemon, encounters]) => {
        setPokemon({
          ...pokemon,
          environments: encounters,
        });
      });
  }, [nameInUrl]);

  if (!pokemon) {
    return <h1>Loading Pokemon</h1>;
  }

  const { name, image, abilities, environments, types } = pokemon;

  // Just take the first ten environments because some have A LOT.
  const data = filter === 'abilities' ? abilities : environments.slice(0, 10);

  return (
    <>
      <section className="buttons">
        <PokePic>
          <PokePicSpan>
            <p>{name}</p>
            <img style={PokePicSpanImg} src={image} alt={name} />
          </PokePicSpan>
        </PokePic>
        <PokeInfo>
          <span>
            <strong>Types:</strong>
            {types.map(type => (
              <Link style={{ color: 'blue', cursor: 'pointer' }} key={type} to={`/?filter=${type}`}>{type}</Link>
            ))}
          </span>
          <br />
          <br />
          <Link to={`/pokemon/${name}/abilities`}>
            <button disabled={filter === 'abilities'} className="abilities-button">
              Show Abilities
            </button>
          </Link>
          <Link to={`/pokemon/${name}/environment`}>
            <button disabled={filter === 'environment'} className="environment-button">
              Show Environments
            </button>
          </Link>
          <article className="Info">
            {data.length === 0 &&
              <h3>
                {filter === 'environment' && `This Pokemon's environments are unknown.`}
                {filter === 'abilities' && `This Pokemon's abilities are unknown.`}
              </h3>
            }
            {data.length > 0 &&
              <InfoDisplay>
                {filter === 'environment' && <h3>This Pokemon can be found in these locations.</h3>}
                {filter === 'abilities' && <h3>This Pokemon has these abilities.</h3>}
                {data.map(data => (
                  <p key={data}>{data.replace(/-/g, ' ')}</p>
                ))}
              </InfoDisplay>
            }
          </article>
        </PokeInfo>
        
      </section>
      
    </>
  );
}
