import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
var _ = require('lodash');

const AutoComplete = ({ animals, categories }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState(animals);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    const userInput = e.target.innerText;
    const foundElement = animals.map((animal) => {
      return {
        category: animal.category,
        breeds: animal.breeds.filter(
          (breed) =>
            breed.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        ),
      };
    });
    setFilteredSuggestions(foundElement);
    setInput(userInput);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setInput(filteredSuggestions[activeSuggestionIndex].name);
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
    else if (e.key === 'ArrowDown') {
      // if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
      //   return;
      // }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const ListOfBreedsByCategory = ({ results, category }) => {
    const filteredAnimalsByCategory = _.filter(
      results,
      (result) => result.category === category.id
    );

    return <AnimalList results={filteredAnimalsByCategory} />;
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

  const CategoriesSearchResult = ({ animal }) => {
    const listOfBreeds = (
      <ul class="breed-list">
        {animal.breeds.map((breed, index) => {
          let activeItemClassName;

          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            console.log('Index: ' + index);
            console.log('Active sugg. index: ' + activeSuggestionIndex);
            activeItemClassName = 'suggestion-active';
          }
          console.log(activeItemClassName);
          // The breeds
          return (
            <li className={activeItemClassName} key={breed} onClick={onClick}>
              {breed}
            </li>
          );
        })}
      </ul>
    );

    return animal.breeds.length ? (
      // Only include animal category if there are still results from the category
      <>
        <li class="animal-category" key={animal.category} onClick={onClick}>
          {animal.category}
        </li>

        {listOfBreeds}
      </>
    ) : (
      <>{listOfBreeds}</>
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
      <Tabs defaultActiveKey="all" transition={true} className="tablist">
        <Tab eventKey="all" title="All">
          <AnimalList results={results} />
        </Tab>
        {categories.map((category, index) => {
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

  // const SuggestionsListComponent = () => {
  //   if (!input.length) {
  //     console.log(animals);
  //     return (
  //       <ul class="suggestions">
  //         {animals.map((animal, index) => {
  //           return (
  //             // The animal category
  //             <CategoriesSearchResult animal={animal} />
  //           );
  //         })}
  //       </ul>
  //     );
  //   }

  //   return _.filter(filteredSuggestions, (x) => x.breeds.length).length ? (
  //     <ul class="suggestions">
  //       {filteredSuggestions.map((animal) => {
  //         return <CategoriesSearchResult animal={animal} />;
  //       })}
  //     </ul>
  //   ) : (
  //     <div class="no-suggestions text-center">
  //       <span role="img">😪</span> <em> sorry no suggestions</em>
  //     </div>
  //   );
  // };

  return (
    <>
      <input
        type="text"
        placeholder="Type a command or search..."
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {/* <label class="search" for="inpt_search">
        <input id="inpt_search" type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}/>
      </label> */}
      <div class="suggestion-list">{<TabListComponent />}</div>
    </>
  );
};

export default AutoComplete;
