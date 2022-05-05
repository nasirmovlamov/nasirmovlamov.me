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

class CustomerList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            rows: 10,
            page: 1,
            data: [],
            searchText: "",
            isOpenDetailModal: false,
            isOpenEditModal: false,
            isOpenBlockModal: false,
            isOpenDeleteModal: false,
            selectedRow: null,
            roleList: [],
            selectedRole: null,
        };
    }

    componentDidMount() {
        this.getData(this.state.page, this.state.rows);
    }

    toggleViewModal = () => {
        this.setState({ isOpenDetailModal: !this.state.isOpenDetailModal });
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
        axios.get(config.apiURL + `api/v1/person?page=${page}&per_page=${rows}${searchText}`)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.persons.data,
                        total: res.data.persons.total,
                        page: res.data.persons.current_page
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
        if (!data.surname) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Soyad daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }
        if (!data.father_name) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ata adı daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }


        axios.put(config.apiURL + `api/v1/person/${this.state.selectedRow.id}`, data).then(res => {
            if (res.data.status) {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-success m-3">
                        <h5>Uğurlu əməliyyat!</h5>
                        <p className="mb-0">Müştəri məlumatları uğurla redakdə edildi.</p>
                    </div>), { position: "top-right", duration: 2500 }
                );
                this.getData(this.state.page, this.state.rows);
                this.setState({ selectedRow: null });
                this.toggleEditModal();
            };
        });
    }

    deleteData = () => {
        axios.delete(config.apiURL + `api/v1/person/${this.state.selectedRow.id}`)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Müştəri məlumatları uğurla silindi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                    this.getData(this.state.page, this.state.rows);
                    this.setState({ selectedRow: null });
                    this.toggleDeleteModal();
                };
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
        const tableRowEvents = {
            onDoubleClick: (e, row) => this.props.history.push('/person/view/' + row.id)
        };
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
            dataField: 'surname',
            text: 'Soyad',
        }, {
            dataField: 'father_name',
            text: 'Ata adı',
        }, {
            dataField: 'pin',
            text: 'FİN',
        }, {
            dataField: 'phone',
            text: 'Telefon',
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
                                <DropdownItem tag={Link} to={`/person/view/${row.id}`}>
                                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                                    Bax
                                </DropdownItem>
                                <DropdownItem tag={Link} to={`/person/edit/${row.id}`}>
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
                                <h1 className="font-weight-bold">Müştərilər</h1>
                                <div className="d-md-flex align-items-center justify-content-between">

                                    <NavLink to='/customer/create'>
                                        <Button
                                            color="warning"
                                            className="mb-4 mb-md-0 font-weight-bold"
                                        >
                                            Müştəri əlavə et
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
                                    : <div className="alert alert-info">
                                        Axtardığınız səhifəyə uyğun məlumat yoxdur.
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                {/* edit modal */}
                <Modal isOpen={this.state.isOpenEditModal} centered size="md">
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
                                            <div className="col-md-6 mb-4">
                                                <Label for="name" className="font-weight-bold">Ad</Label>
                                                <Input
                                                    name="name"
                                                    placeholder="Ad daxil et"
                                                    defaultValue={selectedRow.name}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="surname" className="font-weight-bold">Soyad</Label>
                                                <Input
                                                    name="surname"
                                                    placeholder="Soyad daxil et"
                                                    defaultValue={selectedRow.surname}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="father_name" className="font-weight-bold">Ata adı</Label>
                                                <Input
                                                    name="father_name"
                                                    placeholder="Ata adı daxil et"
                                                    defaultValue={selectedRow.father_name}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="pin" className="font-weight-bold">FİN</Label>
                                                <Input
                                                    name="pin"
                                                    placeholder="FİN daxil et"
                                                    defaultValue={selectedRow.pin}
                                                    disabled
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
                                            <h5 className="font-weight-bold">İstifadəçini silmək istədiyinizdən əminsinizmi?</h5>
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

export default CustomerList;