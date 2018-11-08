import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from '../../components/SearchResult';

export default class Search extends Component {
  state = {
    showSearchResult: false,
    searchResult: []
  }
  onChangeHandler = (e) => {
    if(!e.target.value) return;
    const query = e.target.value.toLowerCase();
    const itemsArr = this.props.items;
    const searchResult = itemsArr.filter(el => el.name.toLowerCase().indexOf(query) !== -1);
    if(itemsArr.length) {
      this.setState({
        showSearchResult: true,
        searchResult
      })
    }
    console.log(searchResult)
  }
  onSelectHandler = (e) => {
    console.log(e.target)
  }

  render() {
    return (
      <div>
          <input
              type='text'
              className='form-control search-input'
              placeholder='Search'
              onChange={this.onChangeHandler}/>
          { this.showSearchResult &&
              <SearchResult
                  items={this.state.searchResult}
                  selectHandler={this.onSelectHandler}/>
          }

      </div>
    )
  }
}

Search.propTypes = {
  items: PropTypes.array.isRequired
}