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
      searchResult: [],
      inputValue: ''
    };   
  }


  hideSearchResult = () => {
    setTimeout(() => {
      this.setState({
        showSearchResult: false,
        searchResult: []
      });
    }, 200);
    this.setState({ inputValue: ''})
  }

  search = (query) => {
    if(!query) return;
    const itemsArr = this.props.items;
    const searchResult = itemsArr.filter(el => el.name.toLowerCase().indexOf(query) !== -1);

    if(searchResult.length) {
      this.setState({
        showSearchResult: true,
        searchResult
      })
    }
  }

  onSearchHandler = debounce((value) => {
    this.setState({
        inputValue: value
    });
    //const value = e.target.value;
    //if(!value) return;
    const query = value.toLowerCase();
    this.search(query);
  }, 1000, { leading: false, trailing: true });

  render() {
    return (
      <div className="search-container">
          <input
              type='text'
              className='form-control search-input'
              placeholder='Search'
              onInput={(e) => {
                this.setState({inputValue: e.target.value})
                this.onSearchHandler(e.target.value)
              }}
              value={this.state.inputValue}
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