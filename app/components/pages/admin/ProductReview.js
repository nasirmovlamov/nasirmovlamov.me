import React from 'react';
import {
    Form,
    Input,
    Label,
} from 'reactstrap';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
import BootstrapTable from 'react-bootstrap-table-next';


class CustomerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceList: [],
        };
        this.uploadDocRef = React.createRef();
    }
    componentDidMount() {
        axios.get(config.apiURL + "api/v1/product/" + this.props.match.params.id)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.person,
                        serviceList: res.data.person.services,
                    })
                }
            });
    };

    render() {
        const data = this.state.data;
        const columns = [{
            dataField: 'id',
            text: 'No.',
            formatter: (cell, row, index) => {
                return index + 1
            },
        }, {
            dataField: 'name',
            text: 'Servislər',
        }];

        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Baxış</h1>

                            </div>
                        </div>
                    </div>
                    {
                        data ?
                            <>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <Label className="font-weight-bold">ID</Label>
                                        <Input
                                            disabled
                                            value={data.id}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Label className="font-weight-bold">Ad</Label>
                                        <Input
                                            disabled
                                            value={data.name}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Label className="font-weight-bold">Məhsul</Label>
                                        <Input
                                            disabled
                                            value={data.child_id}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Label className="font-weight-bold">Tip</Label>
                                        <Input
                                            disabled
                                            value={data.type?.name}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4">
                                        <Label className="font-weight-bold">Qiymət</Label>
                                        <Input
                                            disabled
                                            value={data.price}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4">
                                        <Label className="font-weight-bold">Valyuta</Label>
                                        <Input
                                            disabled
                                            value={data.currency?.short_name}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4">
                                        <Label className="font-weight-bold">Müddət</Label>
                                        <Input
                                            disabled
                                            value={data.count}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4">
                                        <Label className="font-weight-bold">Interval</Label>
                                        <Input
                                            disabled
                                            value={data.interval?.name}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    {
                                        this.state.serviceList.length ?
                                            <>
                                                <BootstrapTable
                                                    bootstrap4
                                                    striped
                                                    keyField='id'
                                                    data={this.state.serviceList}
                                                    {...tableConfig}
                                                    columns={columns}
                                                />
                                            </>
                                            : <div className="alert alert-warning">
                                                Məhsul servisləri tapılmadı.
                                            </div>
                                    }
                                </div>
                            </>
                            :
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="alert alert-warning">
                                        Məlumat tapılmadı
                                    </div>
                                </div>
                            </div>
                    }
                </div>

            </>
        )
    }
}

export default CustomerList;