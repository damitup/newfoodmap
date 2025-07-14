import axios from 'axios';

const mapApi = axios.create({
  baseURL: 'http://localhost:8080/api/map',
  headers: { 'Content-Type': 'application/json' },
  timeout: 50000,
});

export default mapApi;
