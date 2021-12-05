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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇮🇱',
  },
  {
    name: 'Norway',
    category: 'europe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇳🇴',
  },
  {
    name: 'Italy',
    category: 'europe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇮🇹',
  },
  {
    name: 'Nigeria',
    category: 'africa',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇳🇬',
  },
  {
    name: 'United Kingdom',
    category: 'europe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇬🇧',
  },
  {
    name: 'Qatar',
    category: 'middle-east',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇶🇦',
  },
  {
    name: 'Croatia',
    category: 'europe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇭🇷',
  },
  {
    name: 'Lesotho',
    category: 'africa',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇱🇸',
  },
  {
    name: 'South Africa',
    category: 'africa',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇿🇦',
  },
  {
    name: 'Iran',
    category: 'middle-east',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇮🇷',
  },
  {
    name: 'United Arab Emirates',
    category: 'middle-east',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui nec mi tincidunt vulputate. Fusce gravida ligula mi, ac porttitor purus varius sit amet. Nulla accumsan tempor venenatis. Curabitur augue libero, mattis eu ultrices sit amet, tempus sit amet nibh. Curabitur ex quam, ullamcorper ultrices pellentesque vitae, sodales eu sem. Nulla tempus, arcu vitae maximus egestas, nisl ligula ornare neque, vel faucibus ex arcu id arcu. Donec vel odio faucibus, volutpat ligula at, volutpat felis. Nam sagittis nec tellus nec vestibulum. Nunc ac luctus nunc.',
    flag: '🇦🇪',
  },
];

class App extends Component {
  render() {
    return (
      <>
        <div class="wrapper h-100"></div>
        <div className="autocomplete h-100 d-flex align-items-center justify-content-center">
          <div class="autocomplete__wrapper">
            <Autocomplete countries={countries} categories={categories} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
