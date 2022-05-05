import React from 'react';
import {
    Form,
    Input,
    Label,
} from 'reactstrap';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
import { dataStatus } from '../../../store/staticData';

class CustomerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.uploadDocRef = React.createRef();
    }

    componentDidMount() {
        axios.get(config.apiURL + "api/v1/hardware/" + this.props.match.params.id)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.data,
                    })
                }
            });
    }

    render() {
        const data = this.state.data;

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
                                <div className="row pt-2">
                                    <div className="col-md-4 mb-2">
                                        <Label className="text-muted">ID</Label>
                                        <Input
                                            name="id"
                                            disabled
                                            defaultValue={data.id}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <Label>Ərazi</Label>
                                        <Input
                                            name="name"
                                            disabled
                                            defaultValue={data.area?.name}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <Label>Ad</Label>
                                        <Input
                                            name="name"
                                            disabled
                                            defaultValue={data.name}
                                        />
                                    </div>

                                    <div className="col-md-4 mb-2">
                                        <Label>Status</Label>
                                        <Input
                                            name="name"
                                            disabled
                                            defaultValue={dataStatus.find(x => x.id === data.status)?.name}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <Label>IP address</Label>
                                        <Input
                                            name="name"
                                            disabled
                                            defaultValue={data?.ip_front}
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
                </div>
            </>
        )
    }
}

export default CustomerList;