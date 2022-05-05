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

class ProductCreate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            productList: [],
            selectedProduct: null,
            productTypeList: [],
            selectedProductType: null,
            currencyList: [],
            selectedCurrency: null,
            intervalList: [],
            selectedInterval: null,
            serviceList: [],
            selectedServices: null,
        };

    }

    componentDidMount() {
        axios.get(config.apiURL + 'api/v1/shared/products').then(res => {
            if (res.data.status) {
                this.setState({ productList: res.data.products })
            }
        });

        axios.get(config.apiURL + 'api/v1/shared/types').then(res => {
            if (res.data.status) {
                this.setState({ productTypeList: res.data.types })
            }
        });

        axios.get(config.apiURL + 'api/v1/shared/currencies').then(res => {
            if (res.data.status) {
                let azn = res.data.currencies.find(x => x.short_name === "AZN");
                this.setState({
                    currencyList: res.data.currencies,
                    selectedCurrency: azn ? azn : null,
                });
            }
        });

        axios.get(config.apiURL + 'api/v1/shared/intervals').then(res => {
            if (res.data.status) {
                this.setState({ intervalList: res.data.intervals })
            }
        });

        axios.get(config.apiURL + 'api/v1/shared/services').then(res => {
            if (res.data.status) {
                this.setState({ serviceList: res.data.services })
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
        };

        if (!this.state.selectedProductType) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Tip seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };


        if (data.price <= 0) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Qiymət düzgün deyil.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedCurrency) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Valyuta seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!data.count) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Say daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedInterval) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">İnterval seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedServices) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Servis seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        data['child_id'] = 0;
        if(this.state.selectedProduct){
            data['child_id'] = this.state.selectedProduct.id;
        }
        data['currency_id'] = this.state.selectedCurrency.id;
        data['interval_id'] = this.state.selectedInterval.id;
        data['type_id'] = this.state.selectedProductType.id;
        data['services'] = this.state.selectedServices.map(item => item.id);

        axios.post(config.apiURL + 'api/v1/product', data)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Məhsul uğurla əlavə edildi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                };
                this.props.history.push('/product/list')
            });

    }

    render() {
        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Məhsul əlavə olunması</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 mb-4">
                                        <Label for="selectedProduct" className="font-weight-bold">Məhsul</Label>
                                        <Select
                                            id="selectedProduct"
                                            placeholder="Seç"
                                            isClearable
                                            value={this.state.selectedProduct}
                                            options={this.state.productList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedProduct: e })}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-4">
                                        <Label for="name" className="font-weight-bold">Məhsul adı</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Adı daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4">
                                        <Label for="selectedProductType" className="font-weight-bold">Tip</Label>
                                        <Select
                                            id="selectedProductType"
                                            placeholder="Seç"
                                            value={this.state.selectedProductType}
                                            options={this.state.productTypeList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedProductType: e })}
                                        />
                                    </div>
                                    <div className="col-md-4 col-lg-3 mb-4">
                                        <Label for="price" className="font-weight-bold">Qiymət</Label>
                                        <Input
                                            type='number'
                                            min={0}
                                            id="price"
                                            name="price"
                                            placeholder="Qiymət daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-4 col-lg-3 mb-4">
                                        <Label for="currency" className="font-weight-bold">Valyuta</Label>
                                        <Select
                                            id="currency"
                                            placeholder="Seç"
                                            value={this.state.selectedCurrency}
                                            options={this.state.currencyList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.short_name}
                                            onChange={(e) => this.setState({ selectedCurrency: e })}
                                        />
                                    </div>
                                    <div className="col-md-4 col-lg-3 mb-4">
                                        <Label for="count" className="font-weight-bold">Say</Label>
                                        <Input
                                            id="count"
                                            name="count"
                                            placeholder="Say daxil edin"
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-4">
                                        <Label for="interval" className="font-weight-bold">Interval</Label>
                                        <Select
                                            id="interval"
                                            placeholder="Seç"
                                            value={this.state.selectedInterval}
                                            options={this.state.intervalList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedInterval: e })}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-4">
                                        <Label for="service" className="font-weight-bold">Servis</Label>
                                        <Select
                                            id="service"
                                            placeholder="Seç"
                                            isMulti
                                            isClearable
                                            value={this.state.selectedServices}
                                            options={this.state.serviceList}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={(e) => this.setState({ selectedServices: e })}
                                        />
                                    </div>
                                </div>
                                {/* submit */}
                                <div className="row mt-4">
                                    <div className="col-md-12 text-md-right">
                                        <Button
                                            type="button"
                                            color="default"
                                            onClick={() => this.props.history.push('/product/list')}
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

export default ProductCreate;