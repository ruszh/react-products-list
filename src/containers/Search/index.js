import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from '../../components/SearchResult';
import { debounce } from 'lodash';
import './Search.css';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchResult: false,
      searchResult: []
    };
    this.inputElement = React.createRef();
    this.onSearchHandler = debounce(this.onSearchHandler, 1000, { leading: false, trailing: true });
  }


  hideSearchResult = () => {
    setTimeout(() => {
      this.setState({
        showSearchResult: false,
        searchResult: []
      });
    }, 200);
    this.inputElement.current.value = '';
  }
  search = (query) => {
    const itemsArr = this.props.items;
    const searchResult = itemsArr.filter(el => el.name.toLowerCase().indexOf(query) !== -1);

    if(searchResult.length) {
      this.setState({
        showSearchResult: true,
        searchResult,
        query: ''
      })
    } else {
      this.hideSearchResult();
    }
  }

  onSearchHandler = () => {
    const value = this.inputElement.current.value;
    if(!value) return;
    const query = value.toLowerCase();
    this.search(query);
  }

  render() {
    return (
      <div className="search-container">
          <input
              type='text'
              className='form-control search-input'
              placeholder='Search'
              onInput={this.onSearchHandler}
              ref={this.inputElement}
              onBlur={this.hideSearchResult} />
          { this.state.showSearchResult &&
              <SearchResult
                  items={this.state.searchResult}
                  selectHandler={this.props.selectHandler}/>
          }
      </div>
    )
  }
}

Search.propTypes = {
  items: PropTypes.array.isRequired,
  selectHandler: PropTypes.func.isRequired
}