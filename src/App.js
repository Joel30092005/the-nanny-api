import React, { useEffect, useState } from 'react';
import './App.css'; // Puedes incluir tus estilos aquí

const App = () => {
  const [characters, setCharacters] = useState([]); // Estado para los personajes
  const [loading, setLoading] = useState(true); // Estado de carga
  const [newCharacter, setNewCharacter] = useState(''); // Para agregar un nuevo personaje
  const [editCharacter, setEditCharacter] = useState({ id: null, name: '' }); // Para editar un personaje
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda

  // Usamos useEffect para obtener los personajes de la API al montar el componente
  useEffect(() => {
    fetch('http://localhost:5000/characters') // Endpoint GET de la API
      .then(response => response.json())
      .then(data => {
        setCharacters(data); // Guardamos los personajes en el estado
        setLoading(false); // Terminamos el estado de carga
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setLoading(false); // Si ocurre un error, dejamos de cargar
      });
  }, []);

  // Función para agregar un nuevo personaje (POST)
  const addCharacter = () => {
    if (!newCharacter) return; // Evitamos agregar si el campo está vacío

    const characterToAdd = { name: newCharacter };

    fetch('http://localhost:5000/characters', {
      method: 'POST', // Usamos el método POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(characterToAdd), // Convertimos el personaje a JSON
    })
      .then(response => response.json())
      .then(data => {
        setCharacters([...characters, data]); // Actualizamos la lista de personajes
        setNewCharacter(''); // Limpiamos el campo
      })
      .catch(error => {
        console.error('Error al agregar el personaje:', error);
      });
  };

  // Función para actualizar un personaje (PUT)
  const updateCharacter = () => {
    if (!editCharacter.name) return; // Evitamos si el nombre está vacío

    fetch(`http://localhost:5000/characters/${editCharacter.id}`, {
      method: 'PUT', // Usamos el método PUT
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editCharacter), // Convertimos el personaje editado a JSON
    })
      .then(response => response.json())
      .then(data => {
        setCharacters(
          characters.map(character =>
            character.id === editCharacter.id ? data : character
          )
        ); // Actualizamos el personaje editado en la lista
        setEditCharacter({ id: null, name: '' }); // Limpiamos el formulario de edición
      })
      .catch(error => {
        console.error('Error al actualizar el personaje:', error);
      });
  };

  // Función para eliminar un personaje (DELETE)
  const deleteCharacter = id => {
    fetch(`http://localhost:5000/characters/${id}`, {
      method: 'DELETE', // Usamos el método DELETE
    })
      .then(() => {
        setCharacters(characters.filter(character => character.id !== id)); // Filtramos el personaje eliminado
      })
      .catch(error => {
        console.error('Error al eliminar el personaje:', error);
      });
  };

  // Filtrar los personajes por id, role, name, traits
  const filteredCharacters = characters.filter(character => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // Aseguramos que los campos no sean undefined antes de llamar a toLowerCase()
    const idMatch = character.id.toString().includes(lowerSearchTerm);
    const nameMatch = character.name && character.name.toLowerCase().includes(lowerSearchTerm);
    const roleMatch = character.role && character.role.toLowerCase().includes(lowerSearchTerm);
    const traitsMatch = character.traits && character.traits.toLowerCase().includes(lowerSearchTerm);

    // Si alguno de los filtros coincide, lo incluimos
    return idMatch || nameMatch || roleMatch || traitsMatch;
  });

  return (
    <div className="App">
      <h1>Personajes de The Nanny</h1>

      {/* Campo de búsqueda para filtrar por ID, role, name o traits */}
      <div>
        <h3>Buscar por ID, Nombre, Rol o Traits</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el término de búsqueda
          placeholder="Buscar por ID, nombre, rol o traits..."
        />
      </div>

      {/* Mostrar los personajes filtrados */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {filteredCharacters.map((character) => (
            <li key={character.id}>
              {character.name} (ID: {character.id}, Rol: {character.role}, Traits: {character.traits}){" "}
              <button onClick={() => deleteCharacter(character.id)}>Eliminar</button>
              <button onClick={() => setEditCharacter({ id: character.id, name: character.name })}>Editar</button>
            </li>
          ))}
        </ul>
      )}

      {/* Formulario para agregar un nuevo personaje */}
      <div>
        <h2>Agregar Personaje</h2>
        <input
          type="text"
          value={newCharacter}
          onChange={(e) => setNewCharacter(e.target.value)}
          placeholder="Nuevo personaje"
        />
        <button onClick={addCharacter}>Agregar</button>
      </div>

      {/* Formulario para editar un personaje */}
      {editCharacter.id && (
        <div>
          <h2>Editar Personaje</h2>
          <input
            type="text"
            value={editCharacter.name}
            onChange={(e) => setEditCharacter({ ...editCharacter, name: e.target.value })}
            placeholder="Editar personaje"
          />
          <button onClick={updateCharacter}>Actualizar</button>
        </div>
      )}
    </div>
  );
};

export default App;
