import { useState } from 'react';
import React from 'react';
var _ = require('lodash');
import { Filter } from 'react-lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

const AutoComplete = ({ animals }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState('');

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = animals.map((animal) => {
      return {
        category: animal.category,
        breeds: animal.breeds.filter(
          (breed) => breed.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        ),
      };
    });

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setInput(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      filteredSuggestions.map((animal) => {
        if (activeSuggestionIndex - 1 === animal.breeds.length) {
          return;
        }
      });
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const CategoriesSearchResult = ({ animal }) => {
    const listOfBreeds = (
      <ul class="suggestions">
        {animal.breeds.map((breed, index) => {
          let className;
          
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            console.log("Index: " + index)
            console.log("Active sugg. index: " + activeSuggestionIndex)
            className = 'suggestion-active';
          }
          // The breeds
          return (
            <li
              className={className, 'breed'}
              key={breed}
              onClick={onClick}
            >
              {breed}
            </li>
          );
        })}
      </ul>
    );

    return (
      animal.breeds.length ? 
          // Only include animal category if there are still results from the category
          <>
            <li class="animal-category" key={animal.category} onClick={onClick}>
              {animal.category}
            </li>

            {listOfBreeds}
          </>
          :
          <>
            {listOfBreeds}
          </>
    );
  };

  const SuggestionsListComponent = () => {
    if (!input.length) {
      console.log(animals);
      return (
        <ul class="suggestions">
          {animals.map((animal, index) => {
            return (
              // The animal category
              <CategoriesSearchResult animal={animal} />
            );
          })}
        </ul>
      );
    }

    return _.filter(filteredSuggestions, (x) => x.breeds.length).length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((animal) => {
          return <CategoriesSearchResult animal={animal} />;
        })}
      </ul>
    ) : (
      <div class="no-suggestions text-center">
        <span role="img">😪</span> <em> sorry no suggestions</em>
      </div>
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
      <div class="suggestion-list">
        {<SuggestionsListComponent />}
      </div>
    </>
  );
};

export default AutoComplete;
