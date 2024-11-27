import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NannyCharacters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:5000/characters')
      .then((response) => setCharacters(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Personajes de "The Nanny"</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <strong>{character.name}</strong> - {character.role}
            <br />
            <em>{character.traits}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NannyCharacters;
