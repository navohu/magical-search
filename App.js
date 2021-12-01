import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  {
    id: 'europe',
    name: 'Europe',
  },
  {
    id: 'africa',
    name: 'Africa',
  },
  {
    id: 'middle-east',
    name: 'Middle East',
  },
];

const countries = [
  {
    name: 'Israel',
    category: 'middle-east',
  },
  {
    name: 'Norway',
    category: 'europe',
  },
  {
    name: 'Italy',
    category: 'europe',
  },
  {
    name: 'Nigeria',
    category: 'africa',
  },
  {
    name: 'United Kingdom',
    category: 'europe',
  },
  {
    name: 'Qatar',
    category: 'middle-east',
  },
  {
    name: 'Croatia',
    category: 'europe',
  },
  {
    name: 'Lesotho',
    category: 'africa',
  },
  {
    name: 'South Africa',
    category: 'africa',
  },
  {
    name: 'Iran',
    category: 'middle-east',
  },
  {
    name: 'United Arab Emirates',
    category: 'middle-east',
  },
];

class App extends Component {
  render() {
    return (
      <>
      <div class="wrapper h-100"></div>
      <div className="autocomplete h-100 d-flex align-items-center justify-content-center">
        <div class="pt-3 ">
          <Autocomplete countries={countries} categories={categories} />
        </div>
      </div>
      </>
    );
  }
}

export default App;
