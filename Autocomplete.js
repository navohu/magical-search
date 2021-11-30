import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
var _ = require('lodash');

const AutoComplete = ({ animals, categories }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState(animals);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [input, setInput] = useState('');

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = [];
    animals.filter((animal) => {
      if (animal.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
        unLinked.push(animal);
      }
    });

    setInput(userInput);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
  };

  const onClick = (e) => {
    const userInput = e.target.innerText;
    const foundElement = animals.filter(
      (animal) =>
        animal.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredSuggestions(foundElement);
    setInput(userInput);
    setActiveSuggestionIndex(0);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setInput(filteredSuggestions[activeSuggestionIndex].name);
      setActiveSuggestionIndex(0);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.key === 'ArrowDown') {
      // if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
      //   return;
      // }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const AnimalList = ({ results }) => {
    return (
      <ul class="breed-list">
        {results.map((result, index) => {
          let activeItemClassName;

          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            console.log('Index: ' + index);
            console.log('Active sugg. index: ' + activeSuggestionIndex);
            activeItemClassName = 'suggestion-active';
          }
          // The breeds
          return (
            <li
              className={`${
                activeItemClassName ? activeItemClassName : ''
              } breed`}
              key={result.name}
              onClick={onClick}
            >
              {result.name}
            </li>
          );
        })}
      </ul>
    );
  };

  const NoResults = () => {
    return (
      <div class="no-suggestions text-center">
        <span role="img">😪</span> <em> sorry no suggestions</em>
      </div>
    );
  };

  const TabListComponent = () => {
    let results;

    if (!input.length) {
      results = animals;
    } else if (filteredSuggestions.length) {
      results = filteredSuggestions;
    } else {
      results = undefined;
    }

    if (!results) {
      return <NoResults />;
    }

    return (
      <Tabs className="tablist" onSelect={(key, ev) => console.log(ev)}>
        <Tab eventKey="all" title="All">
          <AnimalList results={results} />
        </Tab>
        {categories.map((category) => {
          const filteredAnimalsByCategory = _.filter(
            results,
            (result) => result.category === category.id
          );
          return (
            <Tab eventKey={category.id} title={category.name}>
              <AnimalList results={filteredAnimalsByCategory} />
            </Tab>
          );
        })}
      </Tabs>
    );
  };

  return (
    <>
      <input
        type="text"
        placeholder="Type a command or search..."
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div class="suggestion-list">{<TabListComponent />}</div>
    </>
  );
};

export default AutoComplete;
