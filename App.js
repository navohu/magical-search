import React, { createElement, Component } from 'react';
import algoliasearch from 'algoliasearch';
import Autocomplete from './Autocomplete';
import './style.scss';
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
    breeds: [
      'Bengal',
      'Ragdoll',
      'Maine Coon',
      'British Short Hair',
      'Sphynx Cat',
    ],
  },
  {
    category: '🐎 Horses',
    breeds: ['Arabian', 'Iceland Pony', 'Friesian Horse', 'Shetland Pony'],
  },
];

class App extends Component {
  render() {
    return (
      <div className="wrapper h-100 d-flex align-items-center justify-content-center">
        {/* <h1 class="pt-3 pb-3">Magical Search</h1> */}
        <div class="pt-3 autocomplete">
          <Autocomplete animals={animals} />
        </div>
      </div>
    );
  }
}

export default App;
