import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

//props: pages, current, selectPageHandler

export default class Pagination extends Component {

    selectPage = (e) => {
        const value = Number(e.target.dataset.page);
        this.props.selectPageHandler(value);
    }
    nextPage = () => {
        const { pages, current } = this.props;
        if(current !== Number(pages)) {
            this.props.selectPageHandler(current + 1)
        }
    }
    prevPage = () => {
        let { current } = this.props;
        if(current > 1) {
            this.props.selectPageHandler(current - 1)
        }
    }
    get pages() {
        const { current, pages } = this.props;
        const allPages = [];

        for(let i = 1; i <= pages; i++) {
            allPages.push(i);
        }
        if(pages < 6) {
            return allPages;
        } else if(current <= 3) {
            return allPages.slice(0, 6)
        } else if(current > pages - 3) {
            return allPages.slice(pages - 6, pages)
        } else {
            return allPages.slice(current - 3, current + 2)
        }
    }

    render() {
        const { current, pages } = this.props;
        return (
        <Fragment>
            <ul className='pagination'>
                <li style={{width: '64px'}} className={ current > 1 ? "" : "disabled"} onClick={this.prevPage}>prev</li>
                { current > 3 && pages > 5 &&
                    <li onClick={this.selectPage} data-page='1'>...</li> }
                { this.pages.map(el => (
                    <li
                        key={el}
                        className={el === current ? 'active' : ''}
                        data-page={el}
                        onClick={this.selectPage}>
                        {el}
                    </li>
                )) }
                { current < pages - 2 && pages > 6 &&
                   <li onClick={this.selectPage} data-page={pages}>...</li> }
                <li onClick={this.nextPage} className={ current !== pages ? "" : "disabled"} style={{width: '64px'}}>next</li>
            </ul>
        </Fragment>
        )
    }
}

Pagination.propTypes = {
    pages: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    selectPageHandler: PropTypes.func
}