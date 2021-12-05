import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Row, Col } from 'react-bootstrap';
import { BsSearch, BsX } from 'react-icons/bs';
var _ = require('lodash');

const AutoComplete = ({ countries, categories }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState(countries);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [input, setInput] = useState('');
  const [tab, setTab] = useState('all');
  const [displayItem, setDisplayItem] = useState(undefined);
  const [showDisplayItem, setShowDisplayItem] = useState(false);

  function resetInput() {
    setInput('');
    setFilteredSuggestions(countries);
    setShowDisplayItem(false);
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
    setShowDisplayItem(false);
  };

  const onClick = (e) => {
    let clickedItemName;
    if (e.target.children.length > 1) {
      clickedItemName = e.target.children[0].innerText;
    } else {
      clickedItemName = e.target.parentElement.children[0].innerText;
    }
    const foundElement = countries.filter(
      (country) =>
        country.name.toLowerCase().indexOf(clickedItemName.toLowerCase()) > -1
    );
    setFilteredSuggestions(foundElement);
    setInput(clickedItemName);
    setActiveSuggestionIndex(-1);
    setDisplayItem(foundElement[0]);
    setShowDisplayItem(true);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && activeSuggestionIndex > -1) {
      const foundElement = filteredSuggestions[activeSuggestionIndex];
      setInput(foundElement.name);
      setFilteredSuggestions([foundElement]);
      setDisplayItem(foundElement);
      setShowDisplayItem(true);
      setActiveSuggestionIndex(-1);
    }

    else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex === -1) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }

    else if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }

    else if (e.key === 'Tab' && filteredSuggestions) {
      setInput(filteredSuggestions[0].name);
      setFilteredSuggestions([filteredSuggestions[0]]);
      setDisplayItem(filteredSuggestions[0]);
      setShowDisplayItem(true);
      setActiveSuggestionIndex(-1);
    }
  };

  const RegionPill = ({ result }) => {
    return (
      <span className={`country--category country--${result.category}`}>
        {_.find(categories, (category) => category.id === result.category).name}
      </span>
    );
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
              <RegionPill result={result} />
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
    return (
      <Tabs className="tablist" onSelect={(k) => setTab(k)} activeKey={tab}>
        <Tab eventKey="all" title="All">
          <CountryList results={filteredSuggestions} />
        </Tab>
        {categories.map((category) => {
          const filteredByCategory = _.filter(
            filteredSuggestions,
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

  const DisplayPanelComponent = () => {
    return (
      <div class="country__pane pt-3">
        {displayItem && (
          <>
            <span class="country__pane--flag">{displayItem.flag}</span>
            <span class="country__pane--title">{displayItem.name}</span>
            <RegionPill result={displayItem} />
            <div class="country__pane--description">
              {displayItem.description}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div class="input__wrapper">
        <input
          type="text"
          placeholder="Type to see the magic..."
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
          autoComplete="on"
        ></input>
        <span class="input--clear" onClick={!input ? undefined : resetInput}>
          {!input ? <BsSearch /> : <BsX />}
        </span>
      </div>

      <div className="country__container mt-3">
        <Row>
          <Col xs>{<TabListComponent />}</Col>
          <Col
            xs
            sm={showDisplayItem ? 4 : 'auto'}
            xs={showDisplayItem ? 4 : 'auto'}
            className={`${showDisplayItem ? 'ModalOpen' : 'ModalClosed'}`}
          >
            <DisplayPanelComponent />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AutoComplete;
