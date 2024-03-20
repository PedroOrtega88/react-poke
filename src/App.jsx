import React, { useState, useEffect } from 'react';
import styles from './poke.module.css'; 

function BuscadorPokemon() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setPokemonData(null); 
      return;
    }

    const fetchPokemon = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        setError(error.message);
        setPokemonData(null);
      }

      setIsLoading(false);
    };

    fetchPokemon();
  }, [searchTerm]); 

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.poke}>
        <label htmlFor="search">Buscar Pokémon:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre del Pokémon"
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
