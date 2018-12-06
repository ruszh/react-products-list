//@flow
import React, { Component, Fragment } from 'react';
//import { CSVLink } from 'react-csv';
import { CSVDownload } from 'react-csv';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createAction } from '../../utilities';
import { EXPORT_LIST, ALERT_ERROR } from '../../constants';

type Props = {
    selectedProducts: number[],
    exportListAction: (selectedProducts: number[]) => Object,
    alertErrorAction: (message: string) => Object,
    dataToExport: Array<string[]>
};

class ExportList extends Component<Props> {
    exportHandler = () => {
        const {
            selectedProducts,
            alertErrorAction,
            exportListAction
        } = this.props;
        if (!selectedProducts.length) {
            return alertErrorAction(
                'Products are not selected'
            );
        }
        exportListAction(selectedProducts);
    };

    render() {
        const data = [['products', 'shops'], ['мясо', 'АТБ, Класс, Сильпо']];
        const {
            selectedProducts,
            exportListAction,
            alertErrorAction,
            dataToExport
        } = this.props;
        const renderDownloadElement = (data) => <CSVDownload data={dataToExport} target='_blank' />;
        return (
            <Fragment>
                <Button variant='outlined' onClick={this.exportHandler} color='primary'>
                    {/* <CSVLink
                    data={dataToExport}
                    asyncOnClick={true}
                    style={{ textDecoration: 'none' }}
                    onClick={(event, done) => {
                        if (!selectedProducts.length) {
                            done(false);
                            return alertErrorAction(
                                'Products are not selected'
                            );
                        }
                        exportListAction(selectedProducts);
                        done(false);
                    }}
                    filename={'products.csv'}> */}
                    {/* Export to csv
                </CSVLink> */}
                    Export to csv
                </Button>
                { dataToExport.length &&
                    renderDownloadElement(dataToExport)
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    dataToExport: state.export.dataToExport
});

export default connect(
    mapStateToProps,
    {
        exportListAction: createAction(EXPORT_LIST.request),
        alertErrorAction: createAction(ALERT_ERROR.request)
    }
)(ExportList);
