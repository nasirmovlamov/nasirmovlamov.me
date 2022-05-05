import React from 'react';
import {
    Button,
    Form,
    Input,
    Label
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPen,
    faPrint, faSearch, faSync, faTrash, faUpload
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
import toast from "toasted-notes";
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import { NavLink } from 'react-router-dom';

class UserCreate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            roleList: [],
            selectedRoles: null,
        };

    }

    componentDidMount() {
        axios.get(config.apiURL + 'api/v1/roles').then(res => {
            if (res.data.status) {
                this.setState({ roleList: res.data.roles.data })
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.state.selectedRoles?.length) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">İstifadəçi rolu seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        const formData = new FormData(e.target);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        };

        if (!data.name) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ad daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }
        if (!data.surname) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Soyad daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }
        if (!data.email) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Email daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }
        if (!data.password) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Şifrə daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        data['roles'] = this.state.selectedRoles.map(item => item.id);

        axios.post(config.apiURL + 'api/v1/users', data)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">İstifadəçi uğurla əlavə edildi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                };
                this.props.history.push('/user/list')
            });

    }

    render() {
        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">İstifadəçi əlavə olunması</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <div className="row">
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="name" className="font-weight-bold">Ad</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Adı daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="surname" className="font-weight-bold">Soyad</Label>
                                        <Input
                                            id="surname"
                                            name="surname"
                                            placeholder="Soyad daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="email" className="font-weight-bold">Email</Label>
                                        <Input
                                            type='email'
                                            id="email"
                                            name="email"
                                            placeholder="Email daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="password" className="font-weight-bold">Şifrə</Label>
                                        <Input
                                            type='password'
                                            id="password"
                                            name="password"
                                            placeholder="Şifrə daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="role" className="font-weight-bold">Rol</Label>
                                        <Select
                                            id="role"
                                            placeholder="Seç"
                                            isMulti
                                            value={this.state.selectedRoles}
                                            options={this.state.roleList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedRoles: e })}
                                        />
                                    </div>

                                </div>
                                {/* submit */}
                                <div className="row">
                                    <div className="col-md-12 text-md-right">
                                        <Button
                                            type="button"
                                            color="default"
                                            onClick={() => this.props.history.push('/user/list')}
                                            className="font-weight-bold ml-2"
                                        >
                                            Ləğv et
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="success"
                                            className="font-weight-bold ml-2"
                                        >
                                            Təsdiq et
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default UserCreate;