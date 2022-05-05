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

class PortCretae extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            customerList: [],
            selectedCustomer: null,
            selectedCustomerType: null,
            areaList: [],
            selectedArea: null,
            areaCardList: [],
            selectedCard: null,
            selectedStatus: null,
        };

    }

    componentDidMount() {
        axios.get(config.apiURL + 'api/v1/area').then(res => {
            if (res.data.status) {
                this.setState({ areaList: res.data.data.data })
            };
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.state.selectedCustomerType) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Müştəri tipi seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedCustomer) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Müştəri seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedStatus) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Status seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedArea) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ərazi seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedHardware) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Avadanlıq seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedCard) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Server seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        const formData = new FormData(e.target);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        };


        if (!data.name) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Port daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        data["status"] = this.state.selectedStatus.id;
        data["user_type"] = this.state.selectedCustomerType.id;
        data["user_id"] = this.state.selectedCustomer.id;
        data["card_id"] = this.state.selectedCard.id;
        data["hardware_id"] = this.state.selectedHardware.id;

        axios.post(config.apiURL + 'api/v1/port', data)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Port uğurla əlavə edildi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                };
                this.props.history.push('/port/list')
            });

    }

    getCustomerList = customerType => {
        if (!customerType) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Müştəri tipi seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        if (customerType === "person") {
            axios.get(config.apiURL + 'api/v1/person').then(res => {
                if (res.data.status) {
                    this.setState({ customerList: res.data.persons.data })
                }
            });
            return;
        }
        if (customerType === "company") {
            axios.get(config.apiURL + 'api/v1/company').then(res => {
                if (res.data.status) {
                    this.setState({ customerList: res.data.company.data })
                }
            });
            return;
        }
    };

    getAreaHardwareList = areaId => {
        if (!areaId) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ərazi seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        axios.get(config.apiURL + `api/v1/hardware?type=area_id&search=${areaId}`).then(res => {
            if (res.data.status) {
                this.setState({ hardwareList: res.data.data.data })
            };
        });
    };

    getAreaCardList = hardwareId => {
        if (!hardwareId) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ərazi seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        axios.get(config.apiURL + `api/v1/card?type=hardware_id&search=${hardwareId}`).then(res => {
            if (res.data.status) {
                this.setState({ areaCardList: res.data.data.data })
            };
        });
    };

    render() {
        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Port əlavə olunması</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <Label for="customerType" className="font-weight-bold">Müştəri tipi</Label>
                                        <Select
                                            id="customerType"
                                            placeholder="Seç"
                                            value={this.state.selectedCustomerType}
                                            options={[{
                                                id: "person",
                                                name: "Şəxs"
                                            }, {
                                                id: "company",
                                                name: "Şirkət"
                                            }]}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => {
                                                this.setState({
                                                    customerList: [],
                                                    selectedCustomer: null,
                                                    selectedCustomerType: e
                                                })
                                                this.getCustomerList(e.id);
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Label for="customerList" className="font-weight-bold">Müştəri siyahısı</Label>
                                        <Select
                                            id="customerList"
                                            placeholder="Seç"
                                            isDisabled={!this.state.selectedCustomerType}
                                            value={this.state.selectedCustomer}
                                            options={this.state.customerList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => {
                                                if (this.state.selectedCustomerType?.id === "person") {
                                                    return `${option.name} ${option.surname}`
                                                }
                                                return option.name
                                            }}
                                            onChange={(e) => this.setState({ selectedCustomer: e })}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Label for="name" className="font-weight-bold">Port</Label>
                                        <Input
                                            id="name"
                                            type='number'
                                            min={0}
                                            name="name"
                                            placeholder="Port daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
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

                                    <div className="col-md-6 mb-4">
                                        <Label for="areaList" className="font-weight-bold">Ərazilər</Label>
                                        <Select
                                            id="areaList"
                                            placeholder="Seç"
                                            value={this.state.selectedArea}
                                            options={this.state.areaList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => {
                                                this.setState({
                                                    selectedArea: e,
                                                    selectedHardware: null,
                                                    selectedCard: null,
                                                });
                                                this.getAreaHardwareList(e.id)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Label for="selectedHardware" className="font-weight-bold">Avadanlıq</Label>
                                        <Select
                                            id="selectedHardware"
                                            placeholder="Seç"
                                            isDisabled={!this.state.selectedArea}
                                            value={this.state.selectedHardware}
                                            options={this.state.hardwareList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => {
                                                this.setState({
                                                    selectedHardware: e,
                                                    selectedCard: null,
                                                });
                                                this.getAreaCardList(e.id)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Label for="card" className="font-weight-bold">Server</Label>
                                        <Select
                                            id="card"
                                            placeholder="Seç"
                                            isDisabled={!this.state.selectedArea}
                                            value={this.state.selectedCard}
                                            options={this.state.areaCardList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedCard: e })}
                                        />
                                    </div>
                                </div>
                                {/* submit */}
                                <div className="row">
                                    <div className="col-md-12 text-md-right">
                                        <Button
                                            type="button"
                                            color="default"
                                            onClick={() => this.props.history.push('/port/list')}
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

export default PortCretae;