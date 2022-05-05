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
            rolPermissionListI: [],
        };

        this.uploadDocRef = React.createRef();
    }

    componentDidMount() {
        axios.get(config.apiURL + "api/v1/roles/" + this.props.match.params.id)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.role,
                        rolPermissionList: res.data.role.permissions,
                    });
                };
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
            text: 'İcazə',
        },];
        return (
            <div className="bg-white rounded p-4">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="page-header">
                            <h1 className="font-weight-bold">Baxış</h1>
                        </div>
                    </div>
                </div>
                <Form className="mb-4">
                    {
                        data ?
                            <>
                                <div className="row pt-2">
                                    <div className="col-md-4 mb-2">
                                        <Label className="text-muted">ID</Label>
                                        <Input
                                            name="id"
                                            placeholder="id"
                                            disabled
                                            defaultValue={data.id}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <Label>Ad</Label>
                                        <Input
                                            name="name"
                                            placeholder="Ad "
                                            disabled
                                            defaultValue={data.name}
                                        />
                                    </div>
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
                </Form>
                {
                    this.state.rolPermissionList?.length ?
                        <>
                            <BootstrapTable
                                bootstrap4
                                striped
                                keyField='id'
                                data={this.state.rolPermissionList}
                                {...tableConfig}
                                columns={columns}
                            />
                        </>
                        : <div className="alert alert-info">
                            Məlumata aid icazə tapılmadı.
                        </div>
                }
            </div>
        )
    }
}

export default CustomerList;