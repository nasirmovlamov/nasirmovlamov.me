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
    faEye, faPen, faPlus, faSearch, faTimes, faTimesCircle, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
import toast from "toasted-notes";
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link, NavLink } from 'react-router-dom';
import Pagination from '../../common/Pagination';

class HardWareList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            rows: 10,
            page: 1,
            data: [],
            areaList: [],
            hardwareList: [],
            searchText: "",
            isOpenDetailModal: false,
            isOpenEditModal: false,
            isOpenDeleteModal: false,
            selectedRow: null,
            roleList: [],
            selectedRole: null,
            selectedArea: null,
            selectedHardware: null,
        };

    }

    componentDidMount() {
        this.getData(this.state.page, this.state.rows);
        axios.get(config.apiURL + "api/v1/area?per_page=1000")
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        areaList: res.data.data.data
                    })
                }
            });
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
        // if (page !== this.state.page || rows !== this.state.rows) {
        // axios.get(config.apiURL + `api/card?per_page=${rows}&page=${page}`)
        //     .then(res => {
        //         if (res.data.success) {
        //             this.setState({
        //                 data: res.data.data.data,
        //                 total: res.data.data.total,
        //                 page: res.data.data.current_page
        //             })
        //         }
        //     });
        // // }
        let searchText = "";
        if (search) {
            searchText = `&type=name&search=${search}`
        }
        axios.get(config.apiURL + `api/v1/hardware?page=${page}&per_page=${rows}${searchText}`)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.data.data,
                        total: res.data.data.total,
                        page: res.data.data.current_page
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

        if (!this.state.selectedStatus) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">İstifadəçi Statusu seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        if (!this.state.selectedArea) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ərazi seçilməyib.</p>
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

        data["status"] = this.state.selectedStatus.id;
        data["area_id"] = this.state.selectedArea.id;

        axios.put(config.apiURL + `api/v1/hardware/${this.state.selectedRow.id}`, data).then(res => {
            if (res.data.status) {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-success m-3">
                        <h5>Uğurlu əməliyyat!</h5>
                        <p className="mb-0">Ərazi uğurla redakdə edildi.</p>
                    </div>), { position: "top-right", duration: 2500 }
                );
                this.getData(this.state.page, this.state.rows);
                this.setState({ selectedRow: null });
                this.toggleEditModal();
            };
        });
    }

    deleteData = () => {
        axios.delete(config.apiURL + `api/v1/hardware/${this.state.selectedRow.id}`)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Avadanlıq uğurla silindi.</p>
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
        const selectedRow = this.state.selectedRow;

        const columns = [{
            dataField: 'id',
            text: 'No.',
            formatter: (cell, row, index) => {
                return index + 1
            },
        }, {
            dataField: 'area',
            text: 'Ərazi adı',
            formatExtraData: this.state,
            formatter: (cell, row, rowIndex, extaData) => {
                if (!cell) return ''
                return cell.name
            }
        }, {
            dataField: 'name',
            text: 'Avadanlıqin adı',
        }, {
            dataField: 'status',
            text: 'Status',
            formatter: (cell, row) => {
                if (cell === 1) return "Aktiv"
                if (cell === 0) return "Deaktiv"
                return ""
            }
        },{
            dataField: 'ip_front',
            text: 'IP address ',
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
                                <DropdownItem tag={Link} to={`/hardware/view/${row.id}`}>
                                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                                    Bax
                                </DropdownItem>
                                <DropdownItem onClick={() => {

                                    let status = {
                                        id: 0,
                                        name: "Deaktiv",
                                    }

                                    if (row.status === 1) {
                                        status.id = 1
                                        status.name = "Aktiv"
                                    }
                                    this.setState({
                                        selectedRow: row,
                                        selectedStatus: status,
                                        selectedArea: row.area ? row.area : null
                                    });
                                    this.toggleEditModal();
                                }}
                                >
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
                                <h1 className="font-weight-bold">Avadanlıqlar</h1>
                                <div className="d-md-flex align-items-center justify-content-between">

                                    <NavLink to='/hardware/create'>
                                        <Button
                                            color="warning"
                                            className="mb-4 mb-md-0 font-weight-bold"
                                        >
                                            Avadanlıq əlavə et
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
                {/* detail modal */}
                <Modal isOpen={this.state.isOpenDetailModal} centered size="md">
                    <ModalHeader toggle={this.toggleViewModal}>Baxış</ModalHeader>
                    <Form onSubmit={e => this.createData(e)}>
                        {
                            this.state.selectedRow ?
                                <>
                                    <ModalBody>
                                        <div className="row pt-2">
                                            <div className="col-md-4 mb-4">
                                                <Label className="text-muted">ID</Label>
                                                <p className="text-muted">{selectedRow.id}</p>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <Label>Ərazi adı</Label>
                                                <p className="font-weight-bold">
                                                    {selectedRow.area.name}
                                                </p>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <Label>Ad</Label>
                                                <p className="font-weight-bold">
                                                    {selectedRow.name}
                                                </p>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <Label>Status</Label>
                                                <p className="font-weight-bold">
                                                    {this.state.selectedStatus?.name ? this.state.selectedStatus.name : ""}
                                                </p>
                                            </div>
                                        </div>
                                    </ModalBody>
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
                                            <div className="col-md-6 mb-4">
                                                <Label for="name" className="font-weight-bold">Ad</Label>
                                                <Input
                                                    name="name"
                                                    placeholder="Ad daxil et"
                                                    defaultValue={selectedRow.name}
                                                />

                                            </div>
                                            <div className="col-md-6  mb-4">
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
                                                <Label for="name" className="font-weight-bold">İP address</Label>
                                                <Input
                                                    name="ip"
                                                    placeholder="İP address daxil et"
                                                    defaultValue={selectedRow.ip_front}
                                                />

                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="name" className="font-weight-bold">Mac address</Label>
                                                <Input
                                                    name="mac"
                                                    placeholder="Mac address daxil et"
                                                    defaultValue={selectedRow.mac}
                                                />

                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="name" className="font-weight-bold"> Subnet id</Label>
                                                <Input
                                                    name="subnet_id"
                                                    placeholder="Subnet id daxil et"
                                                    defaultValue={selectedRow.subnet_id}
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
                                            <h5 className="font-weight-bold">Aparatı silmək istədiyinizdən əminsinizmi?</h5>
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

export default HardWareList;