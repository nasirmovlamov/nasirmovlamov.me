import React from 'react';
import {
    Button,
    Form,
    Input,
    Label
} from 'reactstrap';
import axios from 'axios';
import { config } from '../../../config';
import toast from "toasted-notes";
import Select from 'react-select';

class HardWareCretae extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            areaList: [],
            selectedRoles: null,
            selectedStatus: null,
            selectedArea: null,
        };
    };

    componentDidMount() {
        axios.get(config.apiURL + 'api/v1/area?per_page=1000').then(res => {
            if (res.data.status) {
                this.setState({ areaList: res.data.data.data })
            }
        });
    };

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
        };

        if (!data.ip) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">IP address daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!data.mac) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Mac address daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!data.subnet_id) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Subnet_id daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };


        if (!this.state.selectedStatus) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Status daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedArea) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ərazi daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        data["status"] = this.state.selectedStatus.id;
        data["area_id"] = this.state.selectedArea.id;

        axios.post(config.apiURL + 'api/v1/hardware', data)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Avadanlıq uğurla əlavə edildi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                };
                this.props.history.push('/hardware/list')
            });
    };

    render() {
        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Avadanlıq əlavə olunması</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <div className="row">
                                    <div className="col-md-6 col-lg-4   mb-4">
                                        <Label for="role" className="font-weight-bold">Ərazi</Label>
                                        <Select
                                            id="role"
                                            placeholder="Seç"
                                            value={this.state.selectedArea}
                                            options={this.state.areaList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedArea: e })}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="name" className="font-weight-bold">Avadanlığın adı</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Avadanlığın adını daxil edin"
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
                                            },{
                                                id: 0,
                                                name: "Deaktiv"
                                            }]}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedStatus: e })}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="name" className="font-weight-bold">IP address</Label>
                                        <Input
                                            id="ip"
                                            name="ip"
                                            placeholder="Ip address daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="name" className="font-weight-bold">MAC address</Label>
                                        <Input
                                            id="mac"
                                            name="mac"
                                            placeholder="MAC address daxil edin"
                                        />

                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="name" className="font-weight-bold">Subnet İD</Label>
                                        <Input
                                            id="subnet_id"
                                            name="subnet_id"
                                            placeholder="Subnet İD daxil edin"
                                        />
                                    </div>
                                </div>
                                {/* submit */}
                                <div className="row">
                                    <div className="col-md-12 text-md-right">
                                        <Button
                                            type="button"
                                            color="default"
                                            onClick={() => this.props.history.push('/hardware/list')}
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

export default HardWareCretae;