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
    faEye, faPen, faPlus, faSearch, faTimes, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
import toast from "toasted-notes";
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link, NavLink } from 'react-router-dom';
import Pagination from '../../common/Pagination';

class ProductList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            rows: 10,
            page: 1,
            data: [],
            isOpenEditModal: false,
            isOpenDeleteModal: false,
            selectedRow: null,
            searchText: "",
            selectedProduct: null,
            productTypeList: [],
            selectedProductType: null,
            currencyList: [],
            selectedCurrency: null,
            intervalList: [],
            selectedInterval: null,
            serviceList: [],
            selectedServices: [],
            allProductList: [],
        };

    };

    componentDidMount() {
        this.getData(this.state.page, this.state.rows);

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

        axios.get(config.apiURL + 'api/v1/shared/products').then(res => {
            if (res.data.status) {
                this.setState({ allProductList: res.data.products })
            }
        });
    }

    toggleEditModal = () => {
        this.setState({ isOpenEditModal: !this.state.isOpenEditModal });
    }

    toggleDeleteModal = () => {
        this.setState({ isOpenDeleteModal: !this.state.isOpenDeleteModal });
    }

    getData = (page, rows, search) => {
        let searchText = "";
        if (search) {
            searchText = `&type=name&search=${search}`
        }
        axios.get(config.apiURL + `api/v1/product?page=${page}&per_page=${rows}${searchText}`)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.product.data,
                        total: res.data.product.total,
                        page: res.data.product.current_page
                    })
                }
            });
    }

    setRowCount = (event) => {
        this.setState({ rows: event.target.value });
        this.getData(1, event.target.value);
    }

    editData = (e) => {
        e.preventDefault();

        if (!this.state.selectedRow) {
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
        }

        if (!data.name) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ad daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        if (data.price <= 0) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Qiymət düzgün deyil.</p>
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
        if (this.state.selectedProduct) {
            data['child_id'] = this.state.selectedProduct.id;
        }
        data['currency_id'] = this.state.selectedCurrency.id;
        data['interval_id'] = this.state.selectedInterval.id;
        data['type_id'] = this.state.selectedProductType.id;
        data['services'] = this.state.selectedServices.map(item => item.id);

        axios.put(config.apiURL + `api/v1/product/${this.state.selectedRow.id}`, data).then(res => {
            if (res.data.status) {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-success m-3">
                        <h5>Uğurlu əməliyyat!</h5>
                        <p className="mb-0">Məhsul məlumatları redakdə edildi.</p>
                    </div>), { position: "top-right", duration: 2500 }
                );
                this.getData(this.state.page, this.state.rows);
                this.setState({ selectedRow: null });
                this.toggleEditModal();
            };
        });
    }

    deleteData = () => {
        axios.delete(config.apiURL + `api/v1/product/${this.state.selectedRow.id}`)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Məhsul uğurla silindi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                    this.getData(this.state.page, this.state.rows);
                    this.setState({ selectedRow: null });
                    this.toggleDeleteModal();
                };
            });
    }

    getProducById = productId => {
        if (!productId) return;

        axios.get(config.apiURL + "api/v1/product/" + productId)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        selectedRow: res.data.person,
                        selectedProductType: res.data.person.type,
                        selectedCurrency: res.data.person.currency,
                        selectedInterval: res.data.person.interval,
                        selectedServices: res.data.person.services,
                    })
                }
            });
    }

    clearSearch = () => {
        this.setState({
            searchText: ''
        })
        this.getData(this.state.page, this.state.rows)
    }

    searchData = () => {
        if (!this.state.searchText) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-warning m-3">
                    <h5>Nəticə tapılmadı</h5>
                    <p className="mb-0">Axtarış mətni daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 3500 }
            );
        };

        this.getData(this.state.page, this.state.rows, this.state.searchText);
    }

    render() {
        const selectedRow = this.state.selectedRow;

        const columns = [{
            dataField: 'id',
            text: 'No.',
            formatter: (cell, row, index) => {
                return index + 1
            },
        }, {
            dataField: 'name',
            text: 'Ad',
        }, {
            dataField: 'price',
            text: 'Qiymət',
            formatter: (cell, row) => {
                if (cell) {
                    return `${cell} ${row.currency?.short_name ? row.currency?.short_name : ''}`
                } else {
                    return '';
                }
            }
        }, {
            dataField: 'count',
            text: 'Müddət',
            formatExtraData: this.state,
            formatter: (cell, row, rowIndex, extraData) => {
                if (!cell) return;

                let interval = extraData.intervalList.find(x => x.id === row.interval_id);

                return `${cell} ${interval ? interval.name : ''}`;
            }
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
                                <DropdownItem tag={Link} to={`/product/view/${row.id}`}>
                                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                                    Bax
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                    this.getProducById(row.id);
                                    this.toggleEditModal();
                                }}>
                                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                                    Redakdə et
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => {
                                        this.setState({ selectedRow: row })
                                        this.toggleDeleteModal();
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

        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Məhsullar</h1>
                                <div className="d-md-flex align-items-center justify-content-between">
                                    <NavLink to='/product/create'>
                                        <Button
                                            color="warning"
                                            className="mb-4 mb-md-0 font-weight-bold"
                                        >
                                            Məhsul əlavə et
                                            <FontAwesomeIcon icon={faPlus} className="ml-2" />
                                        </Button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-lg-3 mb-4">
                            <div className="d-flex seacrh-block">
                                <Input
                                    type='text'
                                    placeholder='Axtar...'
                                    value={this.state.searchText}
                                    onChange={e => this.setState({ searchText: e.target.value })}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={`search-clear ${this.state.searchText ? "d-block " : "d-none"}`}
                                    onClick={this.clearSearch}

                                />
                                <Button
                                    color='warning'
                                    onClick={this.searchData}
                                >
                                    <FontAwesomeIcon
                                        icon={faSearch} />
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            {
                                this.state.data?.length ?
                                    <>
                                        <BootstrapTable
                                            bootstrap4
                                            striped
                                            keyField='id'
                                            data={this.state.data}
                                            {...tableConfig}
                                            columns={columns}
                                        />
                                        <Pagination
                                            total_count={this.state.total}
                                            rows_on_page={this.state.rows}
                                            page={this.state.page}
                                            getData={this.getData}
                                            setRowCount={this.setRowCount}
                                        />
                                    </>
                                    : <div className="alert alert-info">
                                        Axtardığınız səhifəyə uyğun məlumat yoxdur.
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                {/* edit modal */}
                <Modal isOpen={this.state.isOpenEditModal} centered size="lg">
                    <ModalHeader toggle={this.toggleEditModal}>Redakdə et</ModalHeader>
                    <Form onSubmit={e => this.editData(e)}>
                        {
                            this.state.selectedRow ?
                                <>
                                    <ModalBody>
                                        <div className="row pt-2">
                                            <div className="col-md-6 mb-4">
                                                <Label className="text-muted">ID</Label>
                                                <Input
                                                    disabled
                                                    name="id"
                                                    value={selectedRow.id}
                                                />
                                            </div>
                                            <div className="col-md-6 col-lg-6 mb-4">
                                                <Label for="selectedProduct" className="font-weight-bold">Məhsul</Label>
                                                <Select
                                                    id="selectedProduct"
                                                    placeholder="Seç"
                                                    isClearable
                                                    value={this.state.selectedProduct}
                                                    options={this.state.allProductList}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => option.name}
                                                    onChange={(e) => this.setState({ selectedProduct: e })}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="name" className="font-weight-bold">Məhsul adı</Label>
                                                <Input
                                                    name="name"
                                                    placeholder="Ad daxil et"
                                                    defaultValue={selectedRow.name}
                                                />
                                            </div>
                                            <div className="col-md-6 col-lg-6 mb-4">
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
                                            <div className="col-md-6 mb-4">
                                                <Label for="price" className="font-weight-bold">Qiymət</Label>
                                                <Input
                                                    name="price"
                                                    placeholder="Ad daxil et"
                                                    defaultValue={selectedRow.price}
                                                />
                                            </div>
                                            <div className="col-md-6 col-lg-6 mb-4">
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
                                            <div className="col-md-6 mb-4">
                                                <Label for="count" className="font-weight-bold">Say</Label>
                                                <Input
                                                    name="count"
                                                    placeholder="Ad daxil et"
                                                    defaultValue={selectedRow.count}
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
                                            <div className="col-md-12 mb-4">
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
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="default" onClick={this.toggleEditModal}>Ləğv et</Button>
                                        <Button
                                            type="submit"
                                            color="success"
                                            className="font-weight-bold"
                                        >
                                            Təsdiqlə
                                        </Button>
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
                    </Form>
                </Modal>
                {/* delete modal */}
                <Modal isOpen={this.state.isOpenDeleteModal} centered size="sm">
                    <ModalHeader toggle={this.toggleDeleteModal}></ModalHeader>
                    {
                        this.state.selectedRow ?
                            <>
                                <ModalBody>
                                    <div className="row pt-2">
                                        <div className="col-md-12 text-center mb-4">
                                            <h5 className="font-weight-bold">Servisi silmək istədiyinizdən əminsinizmi?</h5>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter className="justify-content-center">
                                    <Button
                                        color="danger"
                                        className="font-weight-bold"
                                        onClick={this.deleteData}
                                    >
                                        Sil
                                    </Button>
                                    <Button color="light" onClick={this.toggleDeleteModal}>Ləğv et</Button>
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

export default ProductList;