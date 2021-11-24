import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Configure,
  Hits,
  Highlight,
} from 'react-instantsearch/dom';
import { connectSearchBox } from 'react-instantsearch-dom';
import AutoComplete from './Autocomplete';

const Hit = ({ hit }) => (
  <div className="hit">
    <div className="hitName">
      <Highlight attribute="name" hit={hit} />
    </div>
  </div>
);

const Content = () => (
  <div className="content">
    <Hits hitComponent={Hit} />
  </div>
);

const VirtalSearchBox = connectSearchBox(() => null);

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

class Search extends Component {
  state = {
    query: '',
  };

  onSuggestionSelected = (_, { suggestion }) => {
    console.log('onSuggestionSelected', suggestion);
    this.setState({
      query: suggestion.name,
    });
  };

  onSuggestionCleared = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <InstantSearch
          appId="latency"
          apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
          indexName="bestbuy"
        >
          <header>
            <SearchBox
              translations={{ placeholder: 'Type a command or search...' }}
            />
          </header>

          <main>
            <Content />
          </main>
        </InstantSearch>

        {/* <InstantSearch
          indexName="demo_ecommerce"
          appId="latency"
          apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
          indexName="bestbuy"
        >
          <Configure hitsPerPage={5} />
          <AutoComplete
            onSuggestionSelected={this.onSuggestionSelected}
            onSuggestionCleared={this.onSuggestionCleared}
          />
        </InstantSearch>

        <InstantSearch
          indexName="demo_ecommerce"
          appId="latency"
          apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
          indexName="bestbuy"
        >
          <VirtalSearchBox defaultRefinement={query} />
          <Hits hitComponent={Hit} />
        </InstantSearch> */}
      </div>
    );
  }
}

export default Search;
