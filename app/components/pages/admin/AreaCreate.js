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

class AreaCretae extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            roleList: [],
            selectedRoles: null,
            selectedStatus: null,
            cityList: [],
            cityRegionList: [],
            selectedCity: null,
            selectedCityRegion: null,
        };
    }

    componentDidMount() {
        axios.get(config.apiURL + 'api/v1/roles').then(res => {
            if (res.data.status) {
                this.setState({ roleList: res.data.roles.data })
            }
        });
        axios.get(config.apiURL + 'api/v1/city').then(res => {
            if (res.data.status) {
                this.setState({ cityList: res.data.city.filter(x => !x.parent_id) })
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

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

        if (!this.state.selectedStatus) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Status daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        data["status"] = this.state.selectedStatus.id;

        // if (this.state.selectedCityRegion) {
        //     data['city_id'] = this.state.selectedCityRegion.id
        // } else {
        //     if (this.state.selectedCity) {
        //         data['city_id'] = this.state.selectedCity.id
        //     };
        // };

        if (this.state.selectedCityRegion) {
            data['city_id'] = this.state.selectedCityRegion.id
        } else {
            if (this.state.selectedCity) {
                if (this.state.selectedCity.child?.length) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-danger m-3">
                            <h5>Uğursuz əməliyyat!</h5>
                            <p className="mb-0">Rayon seçilməyib.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                    return;
                }
                data['city_id'] = this.state.selectedCity.id
            };
        };

        axios.post(config.apiURL + 'api/v1/area', data)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Ərazi uğurla əlavə edildi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                };
                this.props.history.push('/area/list')
            });

    }

    handleCityChange = e => {
        this.setState({
            selectedCity: e,
            cityRegionList: e.child,
        });
    }

    render() {
        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Ərazi əlavə olunması</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <div className="row">
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="name" className="font-weight-bold">Ərazi adı</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Adı daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="city" className="font-weight-bold">Şəhər</Label>
                                        <Select
                                            id="city"
                                            placeholder="Seç"
                                            value={this.state.selectedCity}
                                            options={this.state.cityList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.handleCityChange(e)}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="region" className="font-weight-bold">Rayon</Label>
                                        <Select
                                            id="region"
                                            placeholder="Seç"
                                            isDisabled={!this.state.selectedCity}
                                            value={this.state.selectedCityRegion}
                                            options={this.state.cityRegionList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedCityRegion: e })}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="status" className="font-weight-bold">Status</Label>
                                        <Select
                                            id="status"
                                            placeholder="Seç"
                                            value={this.state.selectedStatus}
                                            options={[{
                                                id: 1,
                                                name: "Aktiv"
                                            }, {
                                                id: 0,
                                                name: "Deaktiv"
                                            }

                                            ]}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedStatus: e })}
                                        />
                                    </div>
                                </div>
                                {/* submit */}
                                <div className="row">
                                    <div className="col-md-12 text-md-right">
                                        <Button
                                            type="button"
                                            color="default"
                                            onClick={() => this.props.history.push('/area/list')}
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

export default AreaCretae;