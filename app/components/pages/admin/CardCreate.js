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

class CardCretae extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hardwareList: [],
            selectedRoles: null,
            selectedStatus: null,
            selectedArea: null,
            selectedHardware: null,
        };

    }

    componentDidMount() {
        axios.get(config.apiURL + 'api/v1/hardware?per_page=1000').then(res => {
            if (res.data.status) {
                this.setState({ hardwareList: res.data.data.data })
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
        if (!data.count) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Port sayı daxil edilməyib.</p>
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

        if (!this.state.selectedHardware) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Avadanlıq daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        data["status"] = this.state.selectedStatus.id
        data["hardware_id"] = this.state.selectedHardware.id
        axios.post(config.apiURL + 'api/v1/card', data)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Kart uğurla əlavə edildi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                };
                this.props.history.push('/card/list')
            });
    }

    render() {
        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Kart əlavə olunması</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <div className="row">
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="role" className="font-weight-bold">Avadanlıq</Label>
                                        <Select
                                            id="role"
                                            placeholder="Seç"
                                            value={this.state.selectedHardware}
                                            options={this.state.hardwareList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedHardware: e })}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="name" className="font-weight-bold">Kart adı</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Adı daxil edin"
                                        />

                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                        <Label for="count" className="font-weight-bold">Port sayı</Label>
                                        <Input
                                            id="count"
                                            name="count"
                                            type='number'
                                            placeholder="Port sayı daxil edin"
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
                                            onClick={() => this.props.history.push('/card/list')}
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

export default CardCretae;