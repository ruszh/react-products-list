//@flow
import React, { Component } from 'react';
import SearchResult from '../../components/SearchResult';
import debounce from 'lodash/debounce';
import './Search.css';
import type { ListItems } from '../../containers/Dashboard/types';
import Input from '@material-ui/core/Input';

type Props = {
    items: ListItems,
    selectHandler: (e: Object) => any
};

type State = {
    showSearchResult: boolean,
    searchResult: ListItems,
    inputValue: string
};

class Search extends Component<Props, State> {
    state = {
        showSearchResult: false,
        searchResult: [],
        inputValue: ''
    };

    hideSearchResult = () => {
        setTimeout(() => {
            this.setState({
                showSearchResult: false,
                searchResult: []
            });
        }, 200);
        this.setState({ inputValue: '' });
    };

    search = (query: string) => {
        if (!query) return;
        const itemsArr: ListItems = this.props.items;
        const searchResult: ListItems = itemsArr.filter(
            el => el.name.toLowerCase().indexOf(query) === 0
        );

        if (searchResult.length) {
            this.setState({
                showSearchResult: true,
                searchResult
            });
        }
    };

    onChangeHandler = (e: SyntheticInputEvent<>) => {
        this.setState({ inputValue: e.target.value });
        this.onSearchHandler(e.target.value);
    };

    onSearchHandler = debounce(
        (value: string) => {
            this.setState({
                inputValue: value
            });
            const query: string = value.toLowerCase();
            this.search(query);
        },
        1000,
        { leading: false, trailing: true }
    );

    render() {
        return (
            <div>
                <Input
                    fullWidth
                    placeholder='Search'
                    onChange={this.onChangeHandler}
                    value={this.state.inputValue}
                    onBlur={this.hideSearchResult}
                />
                {this.state.showSearchResult && (
                    <SearchResult
                        items={this.state.searchResult}
                        selectHandler={this.props.selectHandler}
                    />
                )}
            </div>
        );
    }
}

export default Search;
