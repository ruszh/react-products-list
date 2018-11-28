//@flow
import React, { Component, Fragment } from 'react';
import './Pagination.css';
import { generateSequence } from '../../utilities';

type Props = {
    current: number,
    pages: number,
    selectPageHandler: (page: number, sort?: string) => void
};

export default class Pagination extends Component<Props> {
    selectPage = (e: Object) => {
        const value = Number(e.target.dataset.page);
        if (value === this.props.current) return;
        this.props.selectPageHandler(value);
    };
    nextPage = () => {
        const { pages, current } = this.props;
        if (current !== Number(pages)) {
            this.props.selectPageHandler(current + 1);
        }
    };
    prevPage = () => {
        let { current } = this.props;
        if (current > 1) {
            this.props.selectPageHandler(current - 1);
        }
    };
    get pages(): number[] {
        const { current, pages } = this.props;

        const allPages: number[] = [...generateSequence(pages)];

        if (pages < 6) {
            return allPages;
        } else if (current <= 3) {
            return allPages.slice(0, 6);
        } else if (current > pages - 3) {
            return allPages.slice(pages - 6, pages);
        } else {
            return allPages.slice(current - 3, current + 2);
        }
    }

    render() {
        const { current, pages } = this.props;
        return (
            <Fragment>
                <ul className='pagination'>
                    {pages > 1 && (
                        <li
                            style={{ width: '64px' }}
                            className={current > 1 ? '' : 'disabled'}
                            onClick={this.prevPage}>
                            prev
                        </li>
                    )}
                    {current > 3 && pages > 6 && (
                        <li onClick={this.selectPage} data-page='1'>
                            ...
                        </li>
                    )}
                    {this.pages.map(el => (
                        <li
                            key={el}
                            className={el === current ? 'active' : ''}
                            data-page={el}
                            onClick={this.selectPage}>
                            {el}
                        </li>
                    ))}
                    {current < pages - 2 && pages > 6 && (
                        <li onClick={this.selectPage} data-page={pages}>
                            ...
                        </li>
                    )}
                    {pages > 1 && (
                        <li
                            onClick={this.nextPage}
                            className={current !== pages ? '' : 'disabled'}
                            style={{ width: '64px' }}>
                            next
                        </li>
                    )}
                </ul>
            </Fragment>
        );
    }
}
