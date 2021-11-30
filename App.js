import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  {
    id: 'dogs',
    name: 'Dogs',
  },
  {
    id: 'cats',
    name: 'Cats',
  },
  {
    id: 'horses',
    name: 'Horses',
  },
];

const animals = [
  {
    name: 'Chiuaua',
    isActive: false,
    size: 'Small',
    category: 'dogs',
  },
  {
    name: 'Bulldog',
    isActive: false,
    size: 'Small',
    category: 'dogs',
  },
  {
    name: 'Bengal',
    isActive: false,
    size: 'Small',
    category: 'cats',
  },
  {
    name: 'Arabian',
    isActive: false,
    size: 'Small',
    category: 'horses',
  },
];
// {
//   id: 'cats',
//   category: 'Cats',
//   breeds: [
//     {
//       name: 'Bengal',
//       isActive: false,
//       size: "Small"
//     }
//   ]
//   // breeds: [
//   //   'Bengal',
//   //   'Ragdoll',
//   //   'Maine Coon',
//   //   'British Short Hair',
//   //   'Sphynx Cat',
//   // ],
// },
// {
//   id: 'horses',
//   category: 'Horses',
//   breeds: [
//     {
//       name: 'Arabian',
//       isActive: false,
//       size: "Small"
//     }
//   ]
//   // breeds: ['Arabian', 'Iceland Pony', 'Friesian Horse', 'Shetland Pony'],
// }
// ];

class App extends Component {
  render() {
    return (
      <div className="wrapper h-100 d-flex align-items-center justify-content-center">
        {/* <h1 class="pt-3 pb-3">Magical Search</h1> */}
        <div class="pt-3 autocomplete">
          <Autocomplete animals={animals} categories={categories} />
        </div>
      </div>
    );
  }
}

export default App;
