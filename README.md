# Investigacion de API en React - The Nanny API

Este proyecto consiste en la creación de una API usando **json-server** que simula una base de datos de personajes de la serie *The Nanny*. El frontend está desarrollado en **React**, donde se consume la API utilizando **Axios** para mostrar la información de los personajes.

## Descripción

En este proyecto se creó un servidor API RESTful utilizando **json-server**, lo cual nos permitió simular una base de datos con información de personajes. Esta API fue consumida en una aplicación frontend desarrollada con **React**, utilizando **Axios** para realizar las solicitudes HTTP y mostrar los datos.

El objetivo principal fue aprender a construir y consumir APIs en una aplicación React utilizando herramientas como **json-server** para el backend y **Axios** para las solicitudes HTTP.

## Herramientas Utilizadas

- **json-server**: Herramienta que permite crear un servidor API RESTful a partir de un archivo JSON.
- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **Axios**: Librería para realizar solicitudes HTTP en JavaScript.
- **npm**: Gestor de paquetes para instalar dependencias.

## ¿Qué es una API?

Una **API (Interfaz de Programación de Aplicaciones)** es un conjunto de definiciones y protocolos que permiten que diferentes aplicaciones se comuniquen entre sí. En este proyecto, hemos creado una API RESTful que expone información sobre los personajes de *The Nanny*, y luego, una aplicación React consume esta API para mostrar los datos.

## Pasos Realizados

### Paso 1: Creación del Backend con **json-server**

Para crear el backend de nuestro proyecto, utilizamos **json-server**, que nos permite levantar un servidor API de forma rápida con un archivo JSON.

1. **Instalar `json-server`**:

   Primero, instalamos **json-server** de manera global para tenerlo disponible en nuestro sistema:
   ```bash
   npm install -g json-server

2. Crear el archivo db.json:

Creamos un archivo db.json que contiene los datos de los personajes de la serie The Nanny. Este archivo simula una base de datos y se estructura de la siguiente manera:

{
  "characters": [
    {
      "id": 1,
      "name": "Fran Fine",
      "role": "Niñera"
    },
    {
      "id": 2,
      "name": "Mr. Sheffield",
      "role": "Empresario"
    },
    {
      "id": 3,
      "name": "Niles",
      "role": "Mayordomo"
    }
  ]
}

3. Iniciar el servidor de la API:

Para iniciar el servidor de la API, ejecutamos el siguiente comando en el terminal:
json-server --watch db.json --port 5000

Esto levanta el servidor de la API en http://localhost:5000, donde podemos hacer solicitudes HTTP como GET, POST, PUT, y DELETE.

### Paso 2: Creación del Frontend con React + Axios

1. Instalar React:

Si no habíamos creado la aplicación React, lo hicimos con el siguiente comando:
npx create-react-app the-nanny-app

2. Instalar Axios:

Para hacer solicitudes HTTP desde el frontend, instalamos Axios ejecutando:
npm install axios

3. Crear el componente NannyCharacters.js:

Creamos un componente llamado NannyCharacters.js, que se encarga de hacer una solicitud GET a la API de json-server para obtener la lista de personajes de The Nanny. A continuación, se muestra el código de este componente:

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NannyCharacters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Realizamos una solicitud GET a la API
    axios.get('http://localhost:5000/characters')
      .then(response => {
        // Cuando los datos llegan, los almacenamos en el estado
        setCharacters(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los personajes', error);
      });
  }, []);

  return (
    <div>
      <h1>Personajes de The Nanny</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <strong>{character.name}</strong> - {character.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NannyCharacters;

4. Ejecutar la aplicación React:

Después de crear el componente, iniciamos la aplicación React con el siguiente comando:
npm start

### Paso 3: Conclusión y Observaciones
El servidor de la API está corriendo en http://localhost:5000 gracias a json-server. Esta API es capaz de manejar las operaciones básicas de una base de datos como GET, POST, PUT, y DELETE.
El frontend en React consume esta API utilizando Axios, lo que permite obtener y mostrar los personajes de manera dinámica.
Esta configuración nos permite trabajar de manera rápida y sencilla para pruebas y desarrollo de APIs sin necesidad de configurar un backend completo.