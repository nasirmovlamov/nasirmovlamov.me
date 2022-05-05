import React from 'react';
import {
    Form,
    Input,
    Label,
} from 'reactstrap';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

class CustomerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
        };
        this.uploadDocRef = React.createRef();
    }
    componentDidMount() {
        axios.get(config.apiURL + "api/v1/service/" + this.props.match.params.id)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.service,
                    })
                }
            });
    }

    toggleTab = activeTab => {
        if (this.state.activeTab !== activeTab) {
            this.setState({ activeTab });
        }
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
                                    <div className="row">
                                        <div className="col-md-4 mb-4">
                                            <Label className="text-muted">ID</Label>
                                            <Input
                                                name="id"
                                                placeholder="id"
                                                disabled
                                                defaultValue={data.id}
                                            />
                                        </div>
                                        <div className="col-md-4 mb-4">
                                            <Label>Ad</Label>
                                            <Input
                                                name="name"
                                                placeholder="Ad "
                                                disabled
                                                defaultValue={data.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <Link
                                                to="/service/list"
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