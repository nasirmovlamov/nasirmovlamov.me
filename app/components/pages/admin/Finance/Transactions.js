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
    faEye, faMoneyCheck, faPen, faPlus, faRedo, faSearch, faTimes, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { config, tableConfig } from '../../../../config';
import toast from "toasted-notes";
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link, NavLink } from 'react-router-dom';
import Pagination from '../../../common/Pagination';

class Transactions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            rows: 10,
            page: 1,
            data: [],
            searchText: "",
            isOpenEditModal: false,
            selectedRow: null,

            selectedSearchFilter: null,
            selectedCurrency: null,
            currencyList: [],
            paymentSystemList: [],
            selectedPaymentSystem: null,
        };

        this.formRef = React.createRef();
    }

    componentDidMount() {
        axios.get(config.apiURL + 'api/v1/shared/currencies').then(res => {
            if (res.data.status) {
                this.setState({
                    currencyList: res.data.currencies,
                });
            }
        });
        axios.get(config.apiURL + 'api/v1/shared/payment/systems').then(res => {
            if (res.data.status) {
                this.setState({
                    paymentSystemList: res.data.payment_systems,
                });
            }
        });
        axios.get(config.apiURL + `api/v1/payment?page=${this.state.page}&per_page=${this.state.rows}`)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.payments.data,
                        total: res.data.payments.total,
                        rows: res.data.payments.per_page,
                        page: res.data.payments.current_page
                    });
                };
            });
    }

    toggleEditModal = () => {
        this.setState({ isOpenEditModal: !this.state.isOpenEditModal });
    }

    getData = (page, rows, query) => {
        axios.get(config.apiURL + `api/v1/payment?page=${page}&per_page=${rows}&${query ? query : ''}`)
            .then(res => {
                console.log('search res', res);
                if (res.data.status) {
                    if (!res.data.payments.total) {
                        toast.notify(({ onClose }) => (
                            <div className="alert alert-warning m-3">
                                <h5>Nəticə tapılmadı</h5>
                                <p className="mb-0">Axtarışa uyğun nəticə tapılmadı</p>
                            </div>), { position: "top-right", duration: 2500 }
                        );
                    };
                    this.setState({
                        data: res.data.payments.data,
                        total: res.data.payments.total,
                        rows: res.data.payments.per_page,
                        page: res.data.payments.current_page
                    });
                };
            });
    }

    setRowCount = (event) => {
        this.setState({ rows: event.target.value });
        this.getData(1, event.target.value);
    };

    submitData = e => {
        e.preventDefault();

        const formData = new FormData(e.target);

        let data = {};
        let query = '';

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        };

        if (this.state.selectedPaymentSystem) query += `payment_system_id=${this.state.selectedPaymentSystem.id}&`;
        if (data.home_id) query += `home_id=${data.home_id}&`;
        if (data.start) query += `start=${data.start}&`;
        if (data.end) query += `end=${data.end}&`;

        this.getData(this.state.page, this.state.rows, query);
    };

    resetForm = () => {
        this.formRef.current.reset();
        this.setState({
            selectedPaymentSystem: null,
        });
        this.getData(this.state.page, this.state.rows);
    }

    render() {
        const tableRowEvents = {
            onDoubleClick: (e, row) => this.props.history.push('/person/view/' + row.id)
        };

        const columns = [{
            dataField: 'id',
            text: 'No.',
            formatter: (cell, row, index) => {
                return index + 1
            },
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
            dataField: 'home',
            text: 'Ünvan kodu',
            formatter: (cell) => {
                if (!cell) return '';
                return cell.id ? cell.id : '';
            }
        }, {
            dataField: 'amount',
            text: 'Məbləğ',
            formatter: (cell, row) => {
                if (!cell) return '';
                return cell + (row.currency?.short_name ? ' ' + row.currency?.short_name : '');
            }
        }, {
            dataField: 'created_at',
            text: 'Tarix',
        }];

        return (
            <div className="bg-white rounded p-4">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="page-header">
                            <h1 className="font-weight-bold">Ödənişlər</h1>
                        </div>
                    </div>
                </div>
                <Form innerRef={this.formRef} onSubmit={e => this.submitData(e)}>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 mb-4">
                            <Label for="payment_system_id" className="font-weight-bold">Ödəniş sistemi</Label>
                            <Select
                                id="payment_system_id"
                                placeholder="Seçin"
                                value={this.state.selectedPaymentSystem}
                                options={this.state.paymentSystemList}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                onChange={(e) => this.setState({ selectedPaymentSystem: e })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <Label for="home_id" className="font-weight-bold">Ünvan kodu</Label>
                            <Input
                                id='home_id'
                                name='home_id'
                                type='number'
                                placeholder='Ünvan kodu'
                                onChange={e => this.setState({ searchText: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <Label for="start" className="font-weight-bold">Başlama tarixi</Label>
                            <Input
                                id='start'
                                name='start'
                                type='date'
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <Label for="end" className="font-weight-bold">Bitmə tarixi</Label>
                            <Input
                                id='end'
                                name='end'
                                type='date'
                            />
                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="d-flex justify-content-end">
                                <Button
                                    type='submit'
                                    color='warning'
                                    className='font-weight-bold ml-2'
                                >
                                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                                    Axtar
                                </Button>
                                <Button
                                    type='button'
                                    color='light'
                                    className='font-weight-bold ml-2'
                                    onClick={this.resetForm}
                                >
                                    <FontAwesomeIcon icon={faRedo} className="mr-2" />
                                    Axtarışı sıfırla
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <hr className='mb-4' />
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
                                    <Pagination
                                        total_count={this.state.total}
                                        rows_on_page={this.state.rows}
                                        page={this.state.page}
                                        getData={this.getData}
                                        setRowCount={this.setRowCount}
                                    />
                                </>
                                : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Transactions;