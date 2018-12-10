//@flow
import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createAction, selectShops } from '../../utilities';
import { EXPORT_LIST } from '../../constants';
import type { Lists } from '../../containers/Dashboard/types';


type Props = {
    selectedProductsIds: number[],
    lists: Lists,
    exportListAction: (data: Array<string[]>) => Object
};


class ExportList extends Component<Props> {
    exportHandler = () => {
        this.props.exportListAction(this.convertData());
    };

    convertData = () => {
        const { selectedProductsIds, lists } = this.props;
        const selectedProducts = lists.products.filter(el =>
            selectedProductsIds.includes(el.id)
        );

        const dataToExport = selectedProducts.reduce((acc, prod) => {
            const prodArr = [prod.name];
            prodArr.push(selectShops(prod.id, lists.shops));
            acc.push(prodArr);
            return acc;
        }, [['Products', 'Shops']]);

        return dataToExport;
    }

    render() {
        const {
            selectedProductsIds
        } = this.props;
        return (
            <Fragment>
                <Button
                    disabled={!selectedProductsIds.length}
                    onClick={this.exportHandler}
                    color='primary'>
                   export to csv
                </Button>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    lists: state.data.lists
});

export default connect(
    mapStateToProps,
    {
        exportListAction: createAction(EXPORT_LIST.request)
    }
)(ExportList);
