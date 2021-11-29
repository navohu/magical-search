import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const animals = [
  {
    id: 'dogs',
    category: 'Dogs',
    breeds: ['Chiuaua', 'Bulldog', 'Pitbull', 'Golden Retriever'],
  },
  {
    id: 'cats',
    category: 'Cats',
    breeds: [
      'Bengal',
      'Ragdoll',
      'Maine Coon',
      'British Short Hair',
      'Sphynx Cat',
    ],
  },
  {
    id: 'horses',
    category: 'Horses',
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
