//@flow
import React, { Component, Fragment } from 'react';
import './Pagination.css';
import { generateSequence } from '../../utilities';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

type Styles = {
    list: {
        dispaly: string,
        justifyContent: string
    },
    text: {
        dispaly: string,
        justifyContent: string
    }
}

type Props = {
    current: number,
    pages: number,
    selectPageHandler: (page: number, sort?: string) => void,
    classes: Styles
};

const styles: Styles = {
    list: {
        dispaly: 'flex',
        justifyContent: 'center'
    },
    text: {
        width: 25,
        dispaly: 'flex',
        justifyContent: 'center'
    }
}

class Pagination extends Component<Props> {
    selectPage = (e: Object) => {
        const value = Number(e.currentTarget.dataset.page);
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
        const { current, pages, classes } = this.props;
        return (
            <Fragment>
                <List className='pagination'>
                    {pages > 1 && (
                        <ListItem
                            button
                            className={classes.text}
                            disabled={current > 1 ? false : true}
                            onClick={this.prevPage}>
                            <ArrowBackIos />
                        </ListItem>
                    )}
                    {current > 3 && pages > 6 && (
                        <ListItem
                            button
                            className={classes.text}
                            onClick={this.selectPage}
                            data-page='1'>
                            <ListItemText>...</ListItemText>
                        </ListItem>
                    )}
                    {this.pages.map(el => (
                        <ListItem
                            className={classes.text}
                            button
                            key={el}
                            selected={el === current ? true : false}
                            data-page={el}
                            onClick={this.selectPage}>
                            {el}
                        </ListItem>
                    ))}
                    {current < pages - 2 && pages > 6 && (
                        <ListItem
                            button
                            className={classes.text}
                            onClick={this.selectPage}
                            data-page={pages}>
                            <ListItemText>...</ListItemText>
                        </ListItem>
                    )}
                    {pages > 1 && (
                        <ListItem
                            button
                            className={classes.text}
                            onClick={this.nextPage}
                            disabled={current !== pages ? false : true}
                            style={{ width: '64px' }}>
                            <ArrowForwardIos />
                        </ListItem>
                    )}
                </List>
            </Fragment>
        );
    }
}


export default withStyles(styles)(Pagination);