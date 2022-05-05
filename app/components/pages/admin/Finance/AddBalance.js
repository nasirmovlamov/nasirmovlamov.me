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
    faEye, faMoneyCheck, faPen, faPlus, faSearch, faTimes, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { config, tableConfig } from '../../../../config';
import toast from "toasted-notes";
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link, NavLink } from 'react-router-dom';
import Pagination from '../../../common/Pagination';

class AddBalance extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchText: "",
            isOpenAddBalanceModal: false,
            isOpenConfirmCompleteModal: false,
            selectedRow: null,
            selectedSearchFilter: null,
            selectedCurrency: null,
            currencyList: [],
        };
    }

    componentDidMount() {
        axios.get(config.apiURL + 'api/v1/shared/currencies').then(res => {
            if (res.data.status) {
                let azn = res.data.currencies.find(x => x.short_name === "AZN");
                this.setState({
                    currencyList: res.data.currencies,
                    selectedCurrency: azn ? azn : null,
                });
            }
        });
    }

    toggleAddBalanceModal = () => {
        this.setState({ isOpenAddBalanceModal: !this.state.isOpenAddBalanceModal });
    }

    toggleConfirmCompleteModal = () => {
        this.setState({ isOpenConfirmCompleteModal: !this.state.isOpenConfirmCompleteModal });
    }

    getData = (filterType, search) => {
        let searchText = "";
        if (search) {
            searchText = `&type=name&search=${search}`
        };

        let filterKey = '';
        let url = '';

        if (filterType === "CUSTOMER_ID") {
            filterKey = "customer_code"
            url = 'api/v1/find/person';
        };
        if (filterType === "PHONE_NUMBER") {
            filterKey = "phone";
            url = 'api/v1/find/phone';
        };

        if (!filterKey) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Xəta baş verdi</h5>
                    <p className="mb-0">Axtarış tipi seçilməyib.</p>
                </div>), { position: "top-right", duration: 3500 }
            );
            return;
        };

        axios.post(config.apiURL + url, {
            [filterKey]: search
        })
            .then(res => {
                if (res.data.status) {
                    console.log('data log', [res.data.home]);
                    this.setState({
                        data: [res.data.home],
                    })
                }
            });
    }

    clearSearch = () => {
        this.setState({
            searchText: '',
            data: [],
        });
    }

    searchData = () => {
        if (!this.state.selectedSearchFilter) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat</h5>
                    <p className="mb-0">Axtarış tipi seçilməyib.</p>
                </div>), { position: "top-right", duration: 3500 }
            );
            return;
        };
        if (!this.state.searchText) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-warning m-3">
                    <h5>Nəticə tapılmadı</h5>
                    <p className="mb-0">Axtarış mətni daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 3500 }
            );
            return
        };
        this.getData(this.state.selectedSearchFilter.id, this.state.searchText);
    }

    submitData = e => {
        e.preventDefault();

        if (!this.state.selectedRow) return;

        const formData = new FormData(e.target);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        };

        if (!data.amount) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Məbləğ daxil edilməyib.</p>
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

        data['payment_system_id'] = 1;
        data['home_id'] = this.state.selectedRow.id;
        data['currency_id'] = this.state.selectedCurrency.id;

        axios.post(config.apiURL + 'api/v1/payment/create', data)
            .then(res => {
                if (res.data.status) {
                    this.toggleAddBalanceModal();
                    this.toggleConfirmCompleteModal();
                    this.setState({ selectedRequestDataToComplete: res.data.request_data.params })
                };
            });
    };

    completePayment = () => {
        if (!this.state.selectedRequestDataToComplete) return;
        axios.post(config.apiURL + 'api/v1/payment/complete', this.state.selectedRequestDataToComplete).then(res => {
            if (res.data.status) {
                this.toggleConfirmCompleteModal();
                toast.notify(({ onClose }) => (
                    <div className="alert alert-success m-3">
                        <h5>Uğurlu əməliyyat!</h5>
                        <p className="mb-0">
                            Əməliyyat uğurla yerinə yetirildi
                        </p>
                    </div>), { position: "top-right", duration: 2500 }
                );
                this.resetState();
                return;
            } else {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-danger m-3">
                        <h5>Xəta baş verdi!</h5>
                        <p className="mb-0">
                            {this.renderErrorMessages(res.data.errors)}
                        </p>
                    </div>), { position: "top-right", duration: 2500 }
                );
                return;
            }
        });
    }

    resetState = () => {
        this.setState({
            selectedRow: null,
            data: [],
            searchText: '',
            selectedRequestDataToComplete: null,
        });
    }

    renderErrorMessages = err => {
        let errList = [];

        for (const [key, value] of Object.entries(err)) {
            errList.push(value);
        };

        return errList;
    };

    render() {
        const tableRowEvents = {
            onDoubleClick: (e, row) => this.props.history.push('/person/view/' + row.id)
        };

        const columns = [{
            dataField: 'id',
            text: 'Ünvan kodu'
        }, {
            dataField: 'customer',
            text: 'Müştəri',
            formatter: (cell, row) => {
                if (!row.person) return '';
                if (row.person.company_name) {
                    return row.person.company_name
                } else {
                    return (
                        (row.person.name ? row.person.name + ' ' : '') +
                        (row.person.surname ? row.person.surname + ' ' : '') +
                        (row.person.father_name ? row.person.father_name : '')
                    )
                }
            }
        }, {
            dataField: 'pin_tax',
            text: '',
            formatter: (cell, row) => {
                if (!row.person) return '';
                if (row.person.pin) return row.person.pin;
                if (row.person.tax_id) return row.person.tax_id;
            }
        }, {
            dataField: 'phone',
            text: 'Telefon',
        }, {
            dataField: 'browse',
            text: '',
            formatter: (cell, row) => {
                return (
                    <Button
                        color='warning'
                        onClick={() => {
                            this.setState({ selectedRow: row });
                            this.toggleAddBalanceModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faMoneyCheck} className="mr-2" />
                        Balansı artır
                    </Button>
                )
            }
        }];

        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Balansı artırmaq</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 mb-4">
                            <Select
                                placeholder="Axtarış tipi"
                                value={this.state.selectedSearchFilter}
                                options={[{
                                    id: "CUSTOMER_ID",
                                    name: "Müştəri kodu",
                                }, {
                                    id: "PHONE_NUMBER",
                                    name: "Telefon nömrəsi",
                                }]}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                onChange={(e) => this.setState({ selectedSearchFilter: e })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4">
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
                            <hr className='mb-4' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
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
                                            rowEvents={tableRowEvents}
                                        />
                                    </>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                {/* add balance modal */}
                <Modal isOpen={this.state.isOpenAddBalanceModal} centered size="md">
                    <ModalHeader toggle={this.toggleAddBalanceModal}>Balansı artır</ModalHeader>
                    <Form onSubmit={e => this.editData(e)}>
                        {
                            this.state.selectedRow ?
                                <>
                                    <Form onSubmit={e => this.submitData(e)}>
                                        <ModalBody>
                                            <div className="row pt-2">
                                                <div className="col-md-6 mb-4">
                                                    <Label for="amount" className="font-weight-bold">Məbləğ</Label>
                                                    <Input
                                                        name="amount"
                                                        type='number'
                                                        min={0}
                                                        placeholder="Məbləğ daxil et"
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-4">
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
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="default" onClick={this.toggleAddBalanceModal}>Ləğv et</Button>
                                            <Button
                                                type="submit"
                                                color="success"
                                                className="font-weight-bold"
                                            >
                                                Təsdiqlə
                                            </Button>
                                        </ModalFooter>
                                    </Form>
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
                {/* confirm modal */}
                <Modal
                    size="sm"
                    centered
                    isOpen={this.state.isOpenConfirmCompleteModal}
                    onClosed={this.resetState}
                >
                    <ModalHeader toggle={this.toggleDeleteModal}></ModalHeader>
                    {
                        this.state.selectedRow ?
                            <>
                                <ModalBody>
                                    <div className="row pt-2">
                                        <div className="col-md-12 text-center mb-4">
                                            <h5 className="font-weight-bold">Əməliyyatı təsdiqləmək istədiyinizdən əminsinizmi?</h5>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter className="justify-content-center">
                                    <Button color="light" onClick={this.toggleConfirmCompleteModal}>Ləğv et</Button>
                                    <Button
                                        color="success"
                                        className="font-weight-bold"
                                        onClick={this.completePayment}
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
                </Modal>
            </>
        )
    }
}

export default AddBalance;