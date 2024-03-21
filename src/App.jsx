import  { useState, useEffect } from 'react';
import styles from './poke.module.css'; 

function BuscadorPokemon() {
  const [searchPoke, setSearchPoke] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchPoke.trim() === '') {
      setPokemonData(null); 
      return;
    }

    const fetchPokemon = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPoke.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        setError(error.message);
        setPokemonData(null);
      }

      setLoading(false);
    };

    fetchPokemon();
  }, [searchPoke]); 

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  const handleInputChange = (e) => {
    setSearchPoke(e.target.value);
  };

  return (
    <div Name={styles.container}>
      <form onSubmit={handleSubmit} className={styles.poke}>
        <label htmlFor="search">Buscar Pokémon:</label>
        <input
          type="text"
          id="search"
          value={searchPoke}
          onChange={handleInputChange}
          placeholder="Nombre del Pokemon"
        />
        <button type="submit">Buscar</button>
      </form>
    
      {error && <p>{error}</p>}
      {pokemonData && (
        <div className={styles.resultados}>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
    </div>
  );
}

export default BuscadorPokemon;
