import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
var _ = require('lodash');

const AutoComplete = ({ countries, categories }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState(countries);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [input, setInput] = useState('');
  const [tab, setTab] = useState('all');

  function resetInput() {
    setInput('');
  }

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const filteredList = [];
    countries.filter((country) => {
      if (country.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
        filteredList.push(country);
      }
    });

    setInput(userInput);
    setFilteredSuggestions(filteredList);
    setActiveSuggestionIndex(-1);
  };

  const onClick = (e) => {
    let userInput;
    if (e.target.children.length > 1) {
      userInput = e.target.children[0].innerText;
    } else {
      userInput = e.target.parentElement.children[0].innerText;
    }
    const foundElement = countries.filter(
      (country) =>
        country.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredSuggestions(foundElement);
    setInput(userInput);
    setActiveSuggestionIndex(-1);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      const foundElement = _.find(
        countries,
        (country, index) => index === activeSuggestionIndex
      );
      setInput(foundElement.name);
      setFilteredSuggestions([foundElement]);
      setActiveSuggestionIndex(0);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === -1) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const CountryList = ({ results }) => {
    if (!results || !results.length) {
      return <NoResults />;
    }
    return (
      <ul class="country__list">
        {results.map((result, index) => {
          let activeItemClassName;

          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            activeItemClassName = 'suggestion-active';
          }

          return (
            <li
              className={`${
                activeItemClassName ? activeItemClassName : ''
              } country`}
              key={result.name}
              onClick={onClick}
            >
              <span>{result.name}</span>
              <span className={`country--category country--${result.category}`}>
                {
                  _.find(
                    categories,
                    (category) => category.id === result.category
                  ).name
                }
              </span>
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
      results = countries;
    } else if (filteredSuggestions.length) {
      results = filteredSuggestions;
    } else {
      results = undefined;
    }

    return (
      <Tabs className="tablist" onSelect={(k) => setTab(k)} activeKey={tab}>
        <Tab eventKey="all" title="All">
          <CountryList results={results} />
        </Tab>
        {categories.map((category) => {
          const filteredByCategory = _.filter(
            results,
            (result) => result.category === category.id
          );

          return (
            <Tab eventKey={category.id} title={category.name}>
              <CountryList results={filteredByCategory} />
            </Tab>
          );
        })}
      </Tabs>
    );
  };

  return (
    <>
      <div class="input__wrapper">
        <input
          type="text"
          placeholder="Type a command or search..."
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
        ></input>
        <span class="input--clear" onClick={resetInput}>
          &times;
        </span>
      </div>
      <div class="country__container">{<TabListComponent />}</div>
    </>
  );
};

export default AutoComplete;
