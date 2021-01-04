import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Table from './components/Table';
import Header from './components/Header';

// function App() {
//   return (
//     <div className="App">
//     Ajay Babu
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
    <Header/>
    <Table/>
    </div>
  );
}


export default App;
