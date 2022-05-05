import React from 'react';
import {
    Button,
    Form,
    Input,
    Label,
} from 'reactstrap';
import axios from 'axios';
import { config } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class CustomerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        axios.get(config.apiURL + "api/v1/users/" + this.props.match.params.id)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.user,
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
                    <Form>
                        {
                            data ?
                                <>
                                    <div className="row mb-4 pt-2">
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
                                        <div className="col-md-4 mb-2">
                                            <Label>Soyad</Label>
                                            <Input
                                                name="name"
                                                placeholder="Soyad"
                                                disabled
                                                defaultValue={data.surname}
                                            />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <Label>Email</Label>
                                            <Input
                                                name="name"
                                                placeholder="Email"
                                                disabled
                                                defaultValue={data.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <Link
                                                to="/user/list"
                                                className='btn btn-light'
                                            >
                                                <FontAwesomeIcon icon={faList} className="mr-2" />
                                                Listə geri qayıt
                                            </Link>
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