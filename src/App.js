import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PokemonContext from './PokemonContext';
import Navbar from './components/Navbar';

import Home from './Pages/Home';
import About from './Pages/About';
import Pokemon from './Pages/Pokemon';


function range(start, end) {
  const results = [];
  while (start <= end) results.push(start++);
  return results;
}


export default function App() {
  const [pokemon, setPokemon] = React.useState([]);

  React.useEffect(() => {
    // https://github.com/PokeAPI/pokeapi/issues/287
    // For some reason you can't get multiple pokemon with all of their data attached. :(
    const promises = range(1, 151).map(pokeId =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(response => response.json()));

    Promise.all(promises)
      .then(pokes => pokes.map(mapImageToPokemon))
      .then(pokemonList => {
        setPokemon(pokemonList);
      });
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <main className="content">
          <PokemonContext.Provider value={pokemon}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pokemon/:name" component={Pokemon} />
              <Route exact path="/pokemon/:name/:filter" component={Pokemon} />
              <Route exact path="/about" component={About}/>
            </Switch>
          </PokemonContext.Provider>
        </main>
      </Router>
    </>
  );
}

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

function mapImageToPokemon(poke, index) {
  return {
    ...poke,
    image: getImageUrlById(index + 1),
  };
}

function getImageUrlById(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
