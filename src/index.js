import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import FilmNav from './FilmNav.js';
import FilmDatabase from './FilmList.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Film, FilmLibrary } from './FilmLibrary.js';
import dayjs from 'dayjs'

let films = [
  new Film(1,
      "Pulp Fiction",
      true,
      dayjs('2022-03-10'),
      5),
  new Film(2,
      "21 Grams",
      true,
      dayjs('2022-03-27'),
      4),
  new Film(3,
      "Star Wars"),
  new Film(4,
      "Matrix"),
  new Film(5,
      "Shrek",
      false,
      dayjs('2022-04-21'),
      3)
];
let lib = new FilmLibrary();
films.forEach(f => lib.addNewFilm(f));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div className="d-flex flex-column flex-grow-1">
    <FilmNav/>
    <FilmDatabase library={lib}/>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
