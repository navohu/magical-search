import React, { createElement, Component } from 'react';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import Autocomplete from './Autocomplete';
import { ProductItem } from './ProductItem';
import './style.css';

const appId = 'latency';
const apiKey = '6be0576ff61c053d5f9a3225e2a90f76';
const searchClient = algoliasearch(appId, apiKey);

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <h1>Magical Search</h1>
        <div class="autocomplete">
          <Autocomplete
            suggestions={[
              'Angular',
              'Blitzjs',
              'Gatsby',
              'Reactjs',
              'Vuejs',
              'Svelte',
              'Nextjs',
              'Node',
              'Express',
              'Sails',
              'Loopback',
              'React-router',
              'Redux',
              'Flux',
              'Yarn',
              'Npm',
            ]}
          />
        </div>
      </div>
    );
  }
}

export default App;
