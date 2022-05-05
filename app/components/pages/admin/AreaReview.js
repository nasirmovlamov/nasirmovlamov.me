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
        axios.get(config.apiURL + "api/v1/area/" + this.props.match.params.id)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.data,

                    })
                }
            });
    };

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
                    <Form className="mb-4">
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
                                            <Label>Ad</Label>
                                            <Input
                                                name="name"
                                                disabled
                                                defaultValue={data.name}
                                            />
                                        </div>

                                        {
                                            data.city.parent?.name &&
                                            <div className="col-md-4 mb-2">
                                                <Label>Şəhər</Label>
                                                <Input
                                                    name="city"
                                                    disabled
                                                    defaultValue={data.city.parent?.name}
                                                />
                                            </div>
                                        }
                                        {
                                            data.city &&
                                            <div div className="col-md-4 mb-2">
                                                <Label>Rayon</Label>
                                                <Input
                                                    name="region"
                                                    disabled
                                                    defaultValue={data.city?.name}
                                                />
                                            </div>
                                        }
                                        <div className="col-md-4 mb-2">
                                            <Label>Status</Label>
                                            <Input
                                                name="name"
                                                disabled
                                                defaultValue={dataStatus.find(x => x.id === data.status)?.name}
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
                </div>
            </>
        )
    }
}

export default CustomerList;