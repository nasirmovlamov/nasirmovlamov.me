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

class AreaList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            rows: 10,
            page: 1,
            searchText: "",
            data: [],
            isOpenEditModal: false,
            isOpenDeleteModal: false,
            selectedRow: null,
            selectedStatus: null,
            roleList: [],
            selectedRole: null,
        };

    }

    componentDidMount() {
        this.getData(this.state.page, this.state.rows);
        axios.get(config.apiURL + 'api/v1/roles').then(res => {
            if (res.data.status) {
                this.setState({ roleList: res.data.roles.data })
            }
        });
        axios.get(config.apiURL + 'api/v1/city').then(res => {
            if (res.data.status) {
                this.setState({ cityList: res.data.city.filter(x => !x.parent_id) })
            }
        });
    };

    toggleEditModal = () => {
        this.setState({ isOpenEditModal: !this.state.isOpenEditModal });
    }

    toggleDeleteModal = () => {
        this.setState({ isOpenDeleteModal: !this.state.isOpenDeleteModal });
    }

    getData = (page, rows, search, key) => {
        let searchText = "";
        if (search) {
            searchText = `&type=full_name&search=${search}`
        };
        axios.get(config.apiURL + `api/v1/area?page=${page}&per_page=${rows}${searchText}`)
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
                    <p className="mb-0"> Status seçilməyib.</p>
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

        console.log('state', this.state);

        if (this.state.selectedCityRegion) {
            data['city_id'] = this.state.selectedCityRegion.id
        } else {
            if (this.state.selectedCity) {
                if (this.state.selectedCity.child?.length) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-danger m-3">
                            <h5>Uğursuz əməliyyat!</h5>
                            <p className="mb-0">Rayon seçilməyib.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                    return;
                }
                data['city_id'] = this.state.selectedCity.id
            };
        };

        axios.put(config.apiURL + `api/v1/area/${this.state.selectedRow.id}`, data).then(res => {
            if (res.data.status) {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-success m-3">
                        <h5>Uğurlu əməliyyat!</h5>
                        <p className="mb-0">Ərazi uğurla redakdə edildi.</p>
                    </div>), { position: "top-right", duration: 2500 }
                );
                this.getData(this.state.page, this.state.rows);
                this.setState({ selectedRow: null, selectedStatus: null });
                this.toggleEditModal();
            };
        });
    }

    deleteData = () => {
        axios.delete(config.apiURL + `api/v1/area/${this.state.selectedRow.id}`)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Ərazi uğurla silindi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                    this.getData(this.state.page, this.state.rows);
                    this.setState({ selectedRow: null });
                    this.toggleDeleteModal();
                };
            });
    };

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
    };

    handleCityChange = e => {
        this.setState({
            selectedCity: e,
            selectedCityRegion: null,
            cityRegionList: e.child,
        });
    };

    getCityList = parent_id => {
        let renderCities = this.state.cityList.find(x => x.id === parent_id)?.child;
        this.setState({ cityRegionList: renderCities })
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
        },{
            dataField: 'city',
            text: 'Şəhər',
            formatter: (cell, row) => {
                if(row.city?.parent?.name)return row.city.parent.name
                return ""
            }
        },{
            dataField: 'city_section',
            text: 'Rayon',
            formatter: (cell, row) => {
                if(row.city?.name)return row.city.name
                return ""
            }
        },
            {
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
                                    tag={Link} to={`/area/view/${row.id}`}

                                >
                                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                                    Bax
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                    let status = {
                                        id: 0,
                                        name: "Deaktiv",
                                    };
                                    if (row.status === 1) {
                                        status.id = 1
                                        status.name = "Aktiv"
                                    };
                                    this.getCityList(row.city?.parent_id ? row.city.parent_id : row.city.id);

                                    this.setState({
                                        selectedRow: row,
                                        selectedStatus: status,
                                        selectedCity: !row.city.parent ? row.city : row.city?.parent,
                                        selectedCityRegion: !row.city.parent ? null : row.city,
                                    });
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
                                <h1 className="font-weight-bold">Ərazilər</h1>
                                <div className="d-md-flex align-items-center justify-content-between">

                                    <NavLink to='/area/create'>
                                        <Button
                                            color="warning"
                                            className="mb-4 mb-md-0 font-weight-bold"
                                        >
                                            Ərazi əlavə et
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
                                                <Label for="city" className="font-weight-bold">Şəhər</Label>
                                                <Select
                                                    id="city"
                                                    placeholder="Seç"
                                                    value={this.state.selectedCity}
                                                    options={this.state.cityList}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => option.name}
                                                    onChange={(e) => this.handleCityChange(e)}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="region" className="font-weight-bold">Rayon</Label>
                                                <Select
                                                    id="region"
                                                    placeholder="Seç"
                                                    value={this.state.selectedCityRegion}
                                                    options={this.state.cityRegionList}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => option.name}
                                                    onChange={(e) => this.setState({ selectedCityRegion: e })}
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

export default AreaList;