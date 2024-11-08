import axios from 'axios';

export const rickAndMortyApiClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});