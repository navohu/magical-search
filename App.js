import React, { createElement, Component } from 'react';
import algoliasearch from 'algoliasearch';
import Autocomplete from './Autocomplete';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const appId = 'latency';
const apiKey = '6be0576ff61c053d5f9a3225e2a90f76';
const searchClient = algoliasearch(appId, apiKey);

const animals = [
  {
    category: '🐶 Dogs',
    breeds: ['Chiuaua', 'Bulldog', 'Pitbull', 'Golden Retriever'],
  },
  {
    category: '🐈 Cats',
    breeds: ['Bengal'],
  },
  {
    category: '🐎 Horses',
    breeds: ['Arabian', 'Iceland Pony'],
  },
];

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <h1 class="pt-3 pb-3">Magical Search</h1>
        <div class="autocomplete">
          <Autocomplete animals={animals} />
        </div>
      </div>
    );
  }
}

export default App;
