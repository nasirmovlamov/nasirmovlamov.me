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
    faEye, faPen, faSearch, faTimes, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
import toast from "toasted-notes";
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import Pagination from '../../common/Pagination';
import { customer_types } from '../../../store/staticData';

class PortList extends React.Component {

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
            isOpenDeleteModal: false,
            selectedRow: null,
            selectedCustomerType: null,
            customerList: [],
            selectedCustomer: null,
            areaList: [],
            selectedArea: null,
            areaCardList: [],
            selectedAreaCard: null,
            selectedCard: null,
        };
    };

    componentDidMount() {
        this.getData(this.state.page, this.state.rows);
        axios.get(config.apiURL + 'api/v1/area').then(res => {
            if (res.data.status) {
                this.setState({ areaList: res.data.data.data })
            };
        });
    };

    toggleViewModal = () => {
        this.setState({ isOpenDetailModal: !this.state.isOpenDetailModal });
    };

    toggleEditModal = () => {
        this.setState({ isOpenEditModal: !this.state.isOpenEditModal });
    };

    toggleDeleteModal = () => {
        this.setState({ isOpenDeleteModal: !this.state.isOpenDeleteModal });
    };

    getData = (page, rows, search) => {
        let searchText = "";
        if (search) {
            searchText = `&type=name&search=${search}`
        }
        axios.get(config.apiURL + `api/v1/port?page=${page}&per_page=${rows}${searchText}`)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.data.data,
                        total: res.data.data.total,
                        page: res.data.data.current_page
                    })
                }
            });
    };

    setRowCount = (event) => {
        this.setState({ rows: event.target.value });
        this.getData(1, event.target.value);
    };

    editData = (e) => {
        e.preventDefault();

        if (!this.state.selectedCustomerType) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Müştəri tipi seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedCustomer) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Müştəri seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedStatus) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Status seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedArea) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ərazi seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (!this.state.selectedCard) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Server seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

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
        data["user_type"] = this.state.selectedCustomerType.id;
        data["user_id"] = this.state.selectedCustomer.id;
        data["card_id"] = this.state.selectedCard.id;

        axios.put(config.apiURL + `api/v1/port/${this.state.selectedRow.id}`, data).then(res => {
            if (res.data.status) {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-success m-3">
                        <h5>Uğurlu əməliyyat!</h5>
                        <p className="mb-0">Port uğurla redakdə edildi.</p>
                    </div>), { position: "top-right", duration: 2500 }
                );
                this.getData(this.state.page, this.state.rows);
                this.setState({ selectedRow: null });
                this.toggleEditModal();
            };
        });
    };

    deleteData = () => {
        axios.delete(config.apiURL + `api/v1/port/${this.state.selectedRow.id}`)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Port uğurla silindi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                    this.getData(this.state.page, this.state.rows);
                    this.setState({ selectedRow: null });
                    this.toggleDeleteModal();
                };
            });
    };

    getCustomerList = customerType => {
        if (!customerType) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <p className="mb-0">Müştəri tipi tapılmadı.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

        if (customerType === 1) {
            axios.get(config.apiURL + 'api/v1/person?per_page=1000').then(res => {
                if (res.data.status) {
                    this.setState({ customerList: res.data.persons.data })
                }
            });
            return;
        }
        if (customerType === 2) {
            axios.get(config.apiURL + 'api/v1/company?per_page=1000').then(res => {
                if (res.data.status) {
                    this.setState({ customerList: res.data.company.data })
                }
            });
            return;
        }
    };

    getPortById = portId => {
        if (!portId) return;

        axios.get(config.apiURL + "api/v1/port/" + portId)
            .then(res => {
                if (res.data.status) {

                    let user_type = res.data.data.person?.person_type_id;

                    if(user_type){
                        this.getCustomerList(Number(user_type))
                    };

                    this.setState({
                        selectedRow: res.data.data,
                        selectedCustomerType: user_type ? customer_types.find(x => x.id === Number(user_type)) : null,
                        selectedCustomer: res.data.data.person,
                        selectedArea: res.data.data.card.hardware.area,
                        selectedHardware: res.data.data.card.hardware,
                        selectedCard: res.data.data.card
                    })
                }
            });
    }

    getAreaHardwareList = areaId => {
        if (!areaId) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ərazi seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        }

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
        };

        axios.get(config.apiURL + `api/v1/card?type=hardware_id&search=${hardwareId}`).then(res => {
            if (res.data.status) {
                this.setState({ areaCardList: res.data.data.data })
            };
        });
    };

    clearSearch = () => {
        this.setState({
            searchText: ''
        })
        this.getData(this.state.page, this.state.rows)
    };

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
    };

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
            dataField: 'card',
            text: 'Server',
            formatter: (cell, row) => {
                return row.card?.name ? row.card?.name : "";
            }
        }, {
            dataField: 'hardware',
            text: 'Avadanlıq',
            formatter: (cell, row) => {
                if (row.card && row.card.hardware) {
                    return row.card.hardware?.name ? row.card.hardware.name : ''
                } else {
                    return '';
                }
            }
        }, {
            dataField: 'home_id',
            text: 'Ünvan kodu',

        }, {
            dataField: 'customer',
            text: 'Müştəri',
            formatter: (cell, row) => {
                if (row.person) {
                    return (
                        (row.person.name ? row.person.name + ' ' : '') +
                        (row.person.surname ? row.person.surname + ' ' : '') +
                        (row.person.father_name ? row.person.father_name : '')
                    )
                } else if (row.company) {
                    return <span>
                        {
                            row.company.name ? row.company.name : ''
                        }
                        <em>
                            {
                                row.company.tax_id ? ` ${row.company.tax_id}` : ''
                            }
                        </em>
                    </span>
                }
                return ''
            }
        }, {
            dataField: 'status',
            text: 'Status',
            formatter: (cell, row) => {
                if (cell === 1) return "Aktiv"
                if (cell === 0) return "Deaktiv"
                return ""
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
                                <DropdownItem
                                    tag={Link} to={`/port/view/${row.id}`}>
                                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                                    Bax
                                </DropdownItem>
                                <DropdownItem onClick={() => {

                                    this.getCustomerList(row.person?.person_type_id);
                                    this.getPortById(row.id);

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
                                <h1 className="font-weight-bold">Portlar</h1>
                                <div className="d-md-flex align-items-center justify-content-between">
                                    {/*<NavLink to='/port/create'>*/}
                                    {/*    <Button*/}
                                    {/*        color="warning"*/}
                                    {/*        className="mb-4 mb-md-0 font-weight-bold"*/}
                                    {/*    >*/}
                                    {/*        Port əlavə et*/}
                                    {/*        <FontAwesomeIcon icon={faPlus} className="ml-2"/>*/}
                                    {/*    </Button>*/}
                                    {/*</NavLink>*/}
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
                                            <div className="col-md-6 mb-4">
                                                <Label for="name" className="font-weight-bold">Port</Label>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    name="name"
                                                    placeholder="Port daxil et"
                                                    defaultValue={selectedRow.name}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="customerType" className="font-weight-bold">Müştəri tipi</Label>
                                                <Select
                                                    id="customerType"
                                                    placeholder="Seç"
                                                    value={this.state.selectedCustomerType}
                                                    options={customer_types}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => option.name}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            customerList: [],
                                                            selectedCustomer: null,
                                                            selectedCustomerType: e
                                                        })
                                                        this.getCustomerList(e.id);
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="customerList" className="font-weight-bold">Müştəri siyahısı</Label>
                                                <Select
                                                    id="customerList"
                                                    placeholder="Seç"
                                                    value={this.state.selectedCustomer}
                                                    options={this.state.customerList}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => {
                                                        if (this.state.selectedCustomerType?.id === 1) {
                                                            return `${option.name} ${option.surname}`
                                                        }
                                                        return option.company_name
                                                    }}
                                                    onChange={(e) => this.setState({ selectedCustomer: e })}
                                                />
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <Label for="areaList" className="font-weight-bold">Ərazilər</Label>
                                                <Select
                                                    id="areaList"
                                                    placeholder="Seç"
                                                    value={this.state.selectedArea}
                                                    options={this.state.areaList}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => option.name}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            selectedArea: e,
                                                            selectedHardware: null,
                                                            selectedCard: null,
                                                        });
                                                        this.getAreaHardwareList(e.id)
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="selectedHardware" className="font-weight-bold">Avadanlıq</Label>
                                                <Select
                                                    id="selectedHardware"
                                                    placeholder="Seç"
                                                    // isDisabled={!this.state.selectedArea}
                                                    value={this.state.selectedHardware}
                                                    options={this.state.hardwareList}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => option.name}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            selectedHardware: e,
                                                            selectedCard: null,
                                                        });
                                                        this.getAreaCardList(e.id)
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="card" className="font-weight-bold">Server</Label>
                                                <Select
                                                    id="card"
                                                    placeholder="Seç"
                                                    // isDisabled={!this.state.selectedArea}
                                                    value={this.state.selectedCard}
                                                    options={this.state.areaCardList}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => option.name}
                                                    onChange={(e) => this.setState({ selectedCard: e })}
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
                                            <h5 className="font-weight-bold">Ərazini silmək istədiyinizdən əminsinizmi?</h5>
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

export default PortList;