import React from 'react';
import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    UncontrolledDropdown
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye, faPen, faPlus, faSearch, faTimesCircle, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
import toast from "toasted-notes";
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import { NavLink } from 'react-router-dom';
import Pagination from '../../common/Pagination';
import { charging_status_list } from '../../../store/staticData';

class CustomerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            transactionList: [],
            productList: [],
            chargingList: [],
            isOpenAddProductModal: false,
            selectedProductList: [],
            isOpenDeleteProductModal: false,
        };
    };

    toggleAddProductModal = () => {
        this.setState({ isOpenAddProductModal: !this.state.isOpenAddProductModal });
    };

    toggleDeleteProductModal = () => {
        this.setState({ isOpenDeleteProductModal: !this.state.isOpenDeleteProductModal });
    };

    componentDidMount() {
        this.getData(this.state.page, this.state.rows);
    };

    getData = (page, rows) => {
        axios.get(config.apiURL + `api/v1/homes/${this.props.match.params.id}`)
            .then(res => {
                if (res.status) {
                    this.setState({
                        data: res.data.home,
                        person: res.data.home.person,
                        productList: res.data.home.products,
                        // transactionList: res.data.person.transactions,
                        // chargingList: res.data.person.charging,
                    })
                }
            });
    };

    toggleTab = activeTab => {
        if (this.state.activeTab !== activeTab) {
            this.setState({ activeTab });
        }
    };

    getAllProductList = (currentProductIdList) => {
        axios.get(config.apiURL + 'api/v1/shared/products').then(res => {
            if (res.status) {
                this.setState({
                    allProductList: res.data.products.filter(item => !currentProductIdList.includes(item.id))
                });
            };
        });
    };

    attachProduct = () => {
        if (!this.state.selectedProductList.length) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Məhsul seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        let product_list = [];

        this.state.selectedProductList.map(item => {
            product_list.push({
                product_id: item.id,
            })
        });

        axios.post(config.apiURL + `api/v1/homes/${this.props.match.params.id}/attach`, {
            products: product_list
        }).then(res => {
            if (res.status) {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-success m-3">
                        <h5>Uğurlu əməliyyat!</h5>
                        <p className="mb-0">
                            {this.state.selectedProductList.length > 1 ? 'Məhsullar ' : 'Məhsul '}
                            əlavə edildi.
                        </p>
                    </div>), { position: "top-right", duration: 2500 }
                );
                this.getData(this.state.page, this.state.rows);
                this.setState({ selectedProductList: [] });
                this.toggleAddProductModal();
            }
        })
    };

    detachProduct = () => {
        if (!this.state.selectedRow) return;

        axios.post(config.apiURL + `api/v1/homes/${this.props.match.params.id}/detach`, {
            products: this.state.selectedRow.id
        })
            .then(res => {
                if (res.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Məhsul uğurla silindi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                    this.getData(this.state.page, this.state.rows);
                    this.setState({ selectedRow: null });
                    this.toggleDeleteProductModal();
                };
            });
    };

    render() {
        const data = this.state.data;
        const person = this.state.person;

        const productColumns = [{
            dataField: 'id',
            text: 'No.',
            formatter: (cell, row, index) => {
                return index + 1
            },
        }, {
            dataField: 'name',
            text: 'Ad',
        }, {
            dataField: 'browse',
            text: '',
            formatter: (cell, row) => {
                return (
                    <div className="text-center">
                        <UncontrolledDropdown>
                            <DropdownToggle color="warning">
                                ...
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem
                                    onClick={() => {
                                        this.setState({ selectedRow: row })
                                        this.toggleDeleteProductModal();
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                                    Sil
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                )
            }
        }];

        const transactionColumns = [{
            dataField: 'id',
            text: 'No.',
            formatter: (cell, row, index) => {
                return index + 1
            },
        }, {
            dataField: 'payment_system_id',
            text: 'Ödəniş terminalı',
        }, {
            dataField: 'amount',
            text: 'Qiymət',
            formatter: (cell) => {
                if (!cell) return '';
                return cell + ' AZN'
            }
        }, {
            dataField: 'browse',
            text: '',
        }, {
            dataField: 'created_at',
            text: 'Tarix',
        }];

        const chargingColumns = [{
            dataField: 'id',
            text: 'No.',
            formatter: (cell, row, index) => {
                return index + 1
            },
        }, {
            dataField: 'product',
            text: 'Məhsul',
            formatter: (cell, row) => {
                if (!row?.product) return '';

                let productName = row.product.name;

                return productName ? productName : '';
            }
        }, {
            dataField: 'amount',
            text: 'Məbləğ',
            formatter: (cell) => {
                if (!cell) return '';
                return cell + ' AZN'
            }
        }, {
            dataField: 'balance',
            text: 'Balans',
            formatter: (cell) => {
                if (!cell) return '';
                return cell + ' AZN'
            }
        }, {
            dataField: 'status_id',
            text: 'Status',
            formatter: (cell) => {
                if (!cell) return '';

                let statusName = charging_status_list.find(x => x.id === cell)?.name;

                return statusName ? statusName : '';
            }
        }, {
            dataField: 'created_at',
            text: 'Tarix',
        }];

        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Ünvan məlumatları</h1>

                            </div>
                        </div>
                    </div>
                    <Form className="mb-4">
                        {
                            data ?
                                <>
                                    <div className="row pt-2">
                                        <div className="col-md-6 mb-4">
                                            <Label className="font-weight-bold">Ünvan kodu</Label>
                                            <Input
                                                disabled
                                                defaultValue={data.id}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <Label className="font-weight-bold">Ünvan</Label>
                                            <Input
                                                disabled
                                                defaultValue={data.address}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <Label className='font-weight-bold'>Telefon nömrəsi</Label>
                                            <Input
                                                disabled
                                                defaultValue={data.phone}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <Label className='font-weight-bold'>Balans</Label>
                                            <Input
                                                disabled
                                                defaultValue={data.balance}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <Label className="font-weight-bold">Müştəri</Label>
                                            <Input
                                                disabled
                                                defaultValue={person.company_name}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <Label className='font-weight-bold'>VÖEN</Label>
                                            <Input
                                                disabled
                                                defaultValue={person.tax_id}
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
                    <div className="d-flex mb-4">
                        <Button onClick={() => this.toggleTab(0)} className="mb-2 mr-3" color={this.state.activeTab === 0 ? 'warning' : ''}>
                            Qoşulduğu xidmətlər
                        </Button>
                        <Button onClick={() => this.toggleTab(1)} className="mb-2 mr-3" color={this.state.activeTab === 1 ? 'warning' : ''}>
                            Ödənişlər
                        </Button>
                        <Button onClick={() => this.toggleTab(2)} className="mb-2 mr-3" color={this.state.activeTab === 2 ? 'warning' : ''}>
                            İstifadə olunmuş xidmətlər
                        </Button>
                        {
                            this.state.activeTab === 0 &&
                            <Button
                                color="white"
                                className="mb-2 ml-auto"
                                onClick={() => {
                                    this.getAllProductList(this.state.data?.products.map(x => x.id));
                                    this.toggleAddProductModal();
                                }}
                            >
                                Əlavə et
                                <FontAwesomeIcon icon={faPlus} className="ml-2" />
                            </Button>
                        }
                    </div>
                    <BootstrapTable
                        bootstrap4
                        striped
                        keyField='id'
                        {...tableConfig}
                        data={
                            this.state.activeTab === 0 ? this.state.productList
                                :
                                this.state.activeTab === 1 ? this.state.transactionList
                                    :
                                    this.state.activeTab === 2 ? this.state.chargingList
                                        : []
                        }
                        columns={
                            this.state.activeTab === 0 ? productColumns
                                :
                                this.state.activeTab === 1 ? transactionColumns
                                    :
                                    this.state.activeTab === 2 ? chargingColumns
                                        : []
                        }
                    />
                </div>
                {/* add product modal */}
                <Modal isOpen={this.state.isOpenAddProductModal} centered size="md">
                    <ModalHeader toggle={this.toggleAddProductModal}>Xidmət əlavə et</ModalHeader>
                    <ModalBody>
                        <div className="row pt-2">
                            <div className="col-md-12 mb-4">
                                <Label for="status" className="font-weight-bold">Məhsul</Label>
                                <Select
                                    id="status"
                                    placeholder="Seç"
                                    isMulti
                                    value={this.state.selectedProductList}
                                    options={this.state.allProductList}
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={(e) => this.setState({ selectedProductList: e })}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" onClick={this.toggleAddProductModal}>Ləğv et</Button>
                        <Button
                            color="success"
                            className="font-weight-bold"
                            onClick={this.attachProduct}
                        >
                            Təsdiqlə
                        </Button>
                    </ModalFooter>
                </Modal>
                {/* delete product modal */}
                <Modal isOpen={this.state.isOpenDeleteProductModal} centered size="md">
                    <ModalHeader toggle={this.toggleDeleteProductModal}></ModalHeader>
                    {
                        this.state.selectedRow ?
                            <>
                                <ModalBody>
                                    <div className="row pt-2">
                                        <div className="col-md-12 text-center mb-4">
                                            <h5 className="font-weight-bold">Müştəri məhsulunu silmək istədiyinizdən əminsinizmi?</h5>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter className="justify-content-center">
                                    <Button
                                        color="danger"
                                        className="font-weight-bold"
                                        onClick={this.detachProduct}
                                    >
                                        Sil
                                    </Button>
                                    <Button color="light" onClick={this.toggleDeleteProductModal}>Ləğv et</Button>
                                </ModalFooter>
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
                </Modal>
            </>
        )
    }
}

export default CustomerList;