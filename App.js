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
  }
];

const countries = [
  {
    name: 'Norway',
    size: 'Small',
    category: 'europe',
  },
  {
    name: 'Italy',
    size: 'Medium',
    category: 'europe',
  },
  {
    name: 'United Kingdom',
    size: 'Small',
    category: 'europe',
  },
  {
    name: 'Croatia',
    size: 'Tall',
    category: 'europe',
  },
  {
    name: 'Nigeria',
    size: 'Medium',
    category: 'africa',
  },
  {
    name: 'Lesotho',
    size: 'Large',
    category: 'africa',
  },
  {
    name: 'South Africa',
    size: 'Medium',
    category: 'africa',
  },
  {
    name: 'Israel',
    size: 'Small',
    category: 'middle-east',
  },
  {
    name: 'Iran',
    size: 'Small',
    category: 'middle-east',
  },
  {
    name: 'United Arab Emirates',
    size: 'Medium',
    category: 'middle-east',
  },
  {
    name: 'Qatar',
    size: 'Small',
    category: 'middle-east',
  }
];

class App extends Component {
  render() {
    return (
      <div className="wrapper h-100 d-flex align-items-center justify-content-center">
        {/* <h1 class="pt-3 pb-3">Magical Search</h1> */}
        <div class="pt-3 autocomplete">
          <Autocomplete countries={countries} categories={categories} />
        </div>
      </div>
    );
  }
}

export default App;
