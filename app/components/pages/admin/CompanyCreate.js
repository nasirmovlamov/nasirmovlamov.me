import React from 'react';
import {
    Button,
    Form,
    Input,
    Label,
} from 'reactstrap';
import axios from 'axios';
import { config } from '../../../config';
import toast from "toasted-notes";
import Select from 'react-select';

class CompanyCreate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenConfirmCreatePortModal: false,
            isOpenPortCreate: true,
        };
    };

    // componentDidMount() {
    // };

    togglePortCreate = () => {
        this.setState({ isOpenPortCreate: !this.state.isOpenPortCreate })
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
        if (!data.tax_id) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">VÖEN daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };
        if (data.tax_id.length !== 10) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">VÖEN 10 simvol daxil edilməlidir.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };
        if (!data.phone) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Telefon nömrəsi daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        // port create


        axios.post(config.apiURL + 'api/v1/company', data)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Şirkət məlumatları uğurla əlavə edildi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                };
                this.props.history.push('/customer/company/list');
            });
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
        };

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
            <div className="bg-white rounded p-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-header">
                            <h1 className="font-weight-bold">Şirkət əlavə olunması</h1>
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
                                    <Label for="tax_id" className="font-weight-bold">VÖEN</Label>
                                    <Input
                                        id="tax_id"
                                        name="tax_id"
                                        placeholder="VÖEN daxil edin"
                                        min={0}
                                        type="number"
                                    />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <Label for="phone" className="font-weight-bold">Telefon</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="Telefon nömrəsi daxil edin"
                                    />
                                </div>
                            </div>
                            {/* submit */}
                            <div className="row">
                                <div className="col-md-12 text-md-right">
                                    <Button
                                        type="button"
                                        color="default"
                                        onClick={() => this.props.history.push('/customer/company/list')}
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
        )
    }
}

export default CompanyCreate;