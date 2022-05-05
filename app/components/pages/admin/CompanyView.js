import React from 'react';
import {
    Button,
    Form,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Collapse,
    CardBody,
    Card,
    Table,
    CardFooter, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faMapMarkerAlt,
    faPlus,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
import toast from "toasted-notes";
import Select from 'react-select';
import { dataStatus } from '../../../store/staticData';
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from 'react-redux';

class CompanyView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeHomeId: null,
            activeTableTab: 0,
            data: null,
            companyHomes: {},
            selectedNewProductList: [],
            isOpenCreateHomeModal: false,
            isOpenAddProductModal: false,
            isOpenDeleteProductModal: false,
            isOpenEditModal: false,
            isOpenDeleteModal: false,
            isOpenPortCreate: true,
            selectedPort: null,
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

    getData = (page, rows, activeHomeId) => {
        axios.get(config.apiURL + "api/v1/company/" + this.props.match.params.id)
            .then(res => {
                if (res.status) {
                    this.setState({
                        data: res.data.company,
                        activeHomeId: activeHomeId ? activeHomeId : res.data.company.homes.length ? res.data.company.homes[0].id : null,
                        companyHomes: {},
                    });
                    if (res.data.company.homes.length) {
                        res.data.company.homes.map((item, index) => {
                            axios.get(config.apiURL + `api/v1/homes/${item.id}`).then(res => {
                                if (res.status) {
                                    let companyHomes = this.state.companyHomes;
                                    companyHomes[item.id] = res.data.home;
                                    this.setState({
                                        companyHomes: companyHomes,
                                    })
                                }
                            });
                        });
                    };
                };
            });
    };

    togglePortCreate = () => {
        this.setState({ isOpenPortCreate: !this.state.isOpenPortCreate })
    };

    toggleCreateHomeModal = () => {
        this.setState({ isOpenCreateHomeModal: !this.state.isOpenCreateHomeModal });
    };

    toggleAddProductModal = () => {
        this.setState({ isOpenAddProductModal: !this.state.isOpenAddProductModal });
    };

    toggleDeleteProductModal = () => {
        this.setState({ isOpenDeleteProductModal: !this.state.isOpenDeleteProductModal });
    };

    toggleEditModal = () => {
        this.setState({ isOpenEditModal: !this.state.isOpenEditModal });
    };

    toggleDeleteModal = () => {
        this.setState({ isOpenDeleteModal: !this.state.isOpenDeleteModal });
    };

    toggleTab = activeHomeId => {
        if (this.state.activeHomeId === activeHomeId) {
            this.setState({ activeHomeId: null });
        } else {
            this.setState({ activeHomeId });
        }
    };

    toggleTableTab = activeTableTab => {
        if (this.state.activeHomeId !== activeTableTab) {
            this.setState({ activeTableTab });
        }
    };

    createData = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        };

        if (!data.address) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ünvan daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };
        if (!data.phone) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Telefon daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        if (this.state.isOpenPortCreate) {
            if (!this.state.selectedPort) {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-danger m-3">
                        <h5>Uğursuz əməliyyat!</h5>
                        <p className="mb-0">Port daxil edilməyib.</p>
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
            if (!this.state.selectedHardware) {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-danger m-3">
                        <h5>Uğursuz əməliyyat!</h5>
                        <p className="mb-0">Avadanlıq seçilməyib.</p>
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

            data['port'] = 1;
            data['port_name'] = this.state.selectedPort.id;
            data["user_type"] = 'company';
            data["status"] = this.state.selectedStatus.id;
            data["card_id"] = this.state.selectedCard.id;
            data["hardware_id"] = this.state.selectedHardware.id;
        };

        data['person_id'] = this.state.data.id;

        axios.post(config.apiURL + 'api/v1/homes', data)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Müştəri ünvanı uğurla əlavə edildi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                };
                this.getData(this.state.page, this.state.rows, this.state.activeHomeId);
                this.toggleCreateHomeModal();
            });

    };

    editData = e => {
        e.preventDefault();

        if (!this.state.selectedAddress) return;

        const formData = new FormData(e.target);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        };

        if (!data.address) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Ünvan daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };
        if (!data.phone) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Telefon daxil edilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };

        // port create
        if (!this.state.selectedPort) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Port daxil edilməyib.</p>
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
        if (!this.state.selectedHardware) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Avadanlıq seçilməyib.</p>
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
        // if (!data.ip) {
        //     toast.notify(({ onClose }) => (
        //         <div className="alert alert-danger m-3">
        //             <h5>Uğursuz əməliyyat!</h5>
        //             <p className="mb-0">IP address seçilməyib.</p>
        //         </div>), { position: "top-right", duration: 2500 }
        //     );
        //     return;
        // };

        data['port'] = 1;
        data['port_name'] = this.state.selectedPort.id;
        data['person_id'] = this.state.data.id;
        data["status"] = this.state.selectedStatus.id;
        data["card_id"] = this.state.selectedCard.id;
        data["hardware_id"] = this.state.selectedHardware.id;

        console.log(data)

        axios.put(config.apiURL + `api/v1/homes/${this.state.selectedAddress.id}`, data)
            .then(res => {
                if (res.data.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Müştəri ünvanı uğurla redakdə edildi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                };
                this.getData(this.state.page, this.state.rows, this.state.activeHomeId);
                this.toggleEditModal();
                this.setState({ selectedAddress: null })
            });
    };

    deleteData = () => {
        if (!this.state.selectedAddress) return;

        axios.delete(config.apiURL + `api/v1/homes/${this.state.selectedAddress.id}`)
            .then(res => {
                if (res.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Müştəri ünvanı uğurla silindi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                    this.getData(this.state.page, this.state.rows, this.state.activeHomeId);
                    this.toggleDeleteModal();
                };
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
        }

        axios.get(config.apiURL + `api/v1/card?type=hardware_id&search=${hardwareId}`).then(res => {
            if (res.data.status) {
                this.setState({ areaCardList: res.data.data.data })
            };
        });
    };

    getHomeDetailsById = homeId => {
        if (!homeId) return;

        if (!this.state.companyHomes[homeId]) return;

        let home = this.state.companyHomes[homeId];

        this.setState({
            selectedAddress: home,
            selectedStatus: dataStatus.find(x => x.id === home.port?.status),
            selectedCard: home.port?.card,
            selectedHardware: home.port?.card?.hardware,
            selectedArea: home.port?.card?.hardware?.area,
            selectedPort: home.port,
            selectedIp: home.ip
        })
    }

    getAllProductList = currentProductIdList => {
        axios.get(config.apiURL + 'api/v1/shared/products').then(res => {
            if (res.status) {
                this.setState({
                    allProductList: res.data.products.filter(item => !currentProductIdList.includes(item.id))
                });
            };
        });
    };

    attachProduct = () => {
        if (!this.state.activeHomeId) return;
        // if (!this.state.selectedNewProductList.length) {
        //     toast.notify(({ onClose }) => (
        //         <div className="alert alert-danger m-3">
        //             <h5>Uğursuz əməliyyat!</h5>
        //             <p className="mb-0">Məhsul seçilməyib.</p>
        //         </div>), { position: "top-right", duration: 2500 }
        //     );
        //     return;
        // };
        if (!this.state.selectedNewProduct) {
            toast.notify(({ onClose }) => (
                <div className="alert alert-danger m-3">
                    <h5>Uğursuz əməliyyat!</h5>
                    <p className="mb-0">Məhsul seçilməyib.</p>
                </div>), { position: "top-right", duration: 2500 }
            );
            return;
        };
        // if (!this.state.selectedNewProduct.started_at) {
        //     toast.notify(({ onClose }) => (
        //         <div className="alert alert-danger m-3">
        //             <h5>Uğursuz əməliyyat!</h5>
        //             <p className="mb-0">Başlama tarixi seçilməyib.</p>
        //         </div>), { position: "top-right", duration: 2500 }
        //     );
        //     return;
        // };
        // if (!this.state.selectedNewProduct.ended_at) {
        //     toast.notify(({ onClose }) => (
        //         <div className="alert alert-danger m-3">
        //             <h5>Uğursuz əməliyyat!</h5>
        //             <p className="mb-0">Bitmə tarixi seçilməyib.</p>
        //         </div>), { position: "top-right", duration: 2500 }
        //     );
        //     return;
        // };
        // if (!this.state.selectedStatus) {
        //     toast.notify(({ onClose }) => (
        //         <div className="alert alert-danger m-3">
        //             <h5>Uğursuz əməliyyat!</h5>
        //             <p className="mb-0">Status seçilməyib.</p>
        //         </div>), { position: "top-right", duration: 2500 }
        //     );
        //     return;
        // };

        // let product_list = [];
        // this.state.selectedNewProductList.map(item => {
        //     product_list.push({
        //         product_id: item.id,
        //     })
        // });

        let data = this.state.selectedNewProduct;

        axios.post(config.apiURL + `api/v1/homes/${this.state.activeHomeId}/attach`, {
            // products: product_list,
            products: [{
                product_id: data.id,
                // started_at: data.started_at,
                // ended_at: data.ended_at,
                // status: this.state.selectedStatus.id,
            }]
        }).then(res => {
            if (res.status) {
                toast.notify(({ onClose }) => (
                    <div className="alert alert-success m-3">
                        <h5>Uğurlu əməliyyat!</h5>
                        <p className="mb-0">
                            {this.state.selectedNewProductList.length > 1 ? 'Məhsullar ' : 'Məhsul '}
                            əlavə edildi.
                        </p>
                    </div>), { position: "top-right", duration: 2500 }
                );
                this.getData(this.state.page, this.state.rows, this.state.activeHomeId);
                this.setState({ selectedNewProductList: [] });
                this.toggleAddProductModal();
            }
        });
    };

    detachProduct = () => {
        if (!this.state.activeHomeId) return;
        if (!this.state.selectedProductRow) return;

        axios.post(config.apiURL + `api/v1/homes/${this.state.activeHomeId}/detach`, {
            products: this.state.selectedProductRow.id
        })
            .then(res => {
                if (res.status) {
                    toast.notify(({ onClose }) => (
                        <div className="alert alert-success m-3">
                            <h5>Uğurlu əməliyyat!</h5>
                            <p className="mb-0">Məhsul uğurla silindi.</p>
                        </div>), { position: "top-right", duration: 2500 }
                    );
                    this.getData(this.state.page, this.state.rows, this.state.activeHomeId);
                    this.setState({ selectedProductRow: null });
                    this.toggleDeleteProductModal();
                };
            });
    };

    onCloseModal = () => {
        this.setState({
            selectedStatus: null,
            selectedArea: null,
            selectedHardware: null,
            selectedCard: null,
            selectedPort: null,
        });
    };

    render() {
        const data = this.state.data;

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
                                        this.setState({ selectedProductRow: row })
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
            dataField: 'status_name',
            text: 'Status',
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
                                <h1 className="font-weight-bold">Şirkət məlumatları</h1>
                            </div>
                        </div>
                    </div>
                    <Form className="mb-4">
                        {
                            data ?
                                <>
                                    <div className="row pt-2">
                                        <div className="col-md-6 mb-4">
                                            <Label className="font-weight-bold text-muted">ID</Label>
                                            <Input
                                                disabled
                                                defaultValue={data.id}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <Label className='font-weight-bold'>Ad</Label>
                                            <Input
                                                disabled
                                                defaultValue={data.company_name}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <Label className='font-weight-bold'>VÖEN</Label>
                                            <Input
                                                disabled
                                                defaultValue={data.tax_id}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <Label className='font-weight-bold'>Telefon nömrəsi</Label>
                                            <Input
                                                disabled
                                                defaultValue={data.phone}
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
                    <div className="row mb-4">
                        <div className="col-md-12 mb-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className='font-weight-bold'>Ünvanlar</h4>
                                <Button
                                    color='warning'
                                    className='font-weight-bold'
                                    onClick={this.toggleCreateHomeModal}
                                >
                                    Ünvan əlavə et
                                    <FontAwesomeIcon icon={faPlus} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                        {
                            this.state.data?.homes.length ? this.state.data.homes.map((item, index) => {
                                return <div
                                    key={index}
                                    className="col-md-12 mb-4"
                                >
                                    <div className="custom-collapse">
                                        <Button
                                            color="warning"
                                            block
                                            onClick={() => this.toggleTab(item.id)}
                                            style={{ marginBottom: '1rem' }}
                                        >
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                            {item.address}
                                        </Button>
                                        <Collapse isOpen={item.id === this.state.activeHomeId}>
                                            <Card>
                                                <CardBody>
                                                    <Table borderless>
                                                        <tbody>
                                                            <tr>
                                                                <td>Məhsul</td>
                                                                <td>
                                                                    {
                                                                        this.state.companyHomes[item.id] &&
                                                                            this.state.companyHomes[item.id].products?.length ?
                                                                            this.state.companyHomes[item.id].products[0].name
                                                                            :
                                                                            ''
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Ünvan kodu</td>
                                                                <td>{item.id}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Balans</td>
                                                                <td>{item.balance} AZN</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Telefon</td>
                                                                <td>{item.phone}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Ünvan</td>
                                                                <td>{item.address}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Yaraılma tarixi</td>
                                                                <td>{item.created_at}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Ərazi</td>
                                                                <td>
                                                                    {
                                                                        this.state.companyHomes[item.id] ?
                                                                            this.state.companyHomes[item.id]?.port?.card?.hardware?.area?.name
                                                                            :
                                                                            ''
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Avadanlıq</td>
                                                                <td>
                                                                    {
                                                                        this.state.companyHomes[item.id] ?
                                                                            this.state.companyHomes[item.id].port?.card?.hardware?.name
                                                                            :
                                                                            ''
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kart</td>
                                                                <td>
                                                                    {
                                                                        this.state.companyHomes[item.id] ?
                                                                            this.state.companyHomes[item.id].port?.card?.name
                                                                            :
                                                                            ''
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Port</td>
                                                                <td>
                                                                    {
                                                                        this.state.companyHomes[item.id] ?
                                                                            this.state.companyHomes[item.id].port?.name
                                                                            :
                                                                            ''
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>IP address</td>
                                                                <td>
                                                                    {
                                                                        this.state.companyHomes[item.id] ?
                                                                            this.state.companyHomes[item.id].ip
                                                                            :
                                                                            ''
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                    <div className="d-flex mb-4">
                                                        <Button
                                                            onClick={() => this.toggleTableTab(0)}
                                                            className="mb-2 mr-3"
                                                            color={this.state.activeTableTab === 0 ? 'warning' : ''}
                                                        >
                                                            Qoşulduğu xidmətlər
                                                        </Button>
                                                        <Button
                                                            onClick={() => this.toggleTableTab(1)}
                                                            className="mb-2 mr-3"
                                                            color={this.state.activeTableTab === 1 ? 'warning' : ''}
                                                        >
                                                            Ödənişlər
                                                        </Button>
                                                        <Button
                                                            onClick={() => this.toggleTableTab(2)}
                                                            className="mb-2 mr-3"
                                                            color={this.state.activeTableTab === 2 ? 'warning' : ''}
                                                        >
                                                            İstifadə olunmuş xidmətlər
                                                        </Button>
                                                        {
                                                            this.props.permissions?.length &&
                                                            this.props.permissions.indexOf('permission:product-store') !== -1 &&
                                                            this.state.activeTableTab === 0 &&
                                                            <Button
                                                                color="white"
                                                                className="mb-2 ml-auto"
                                                                onClick={() => {
                                                                    if (this.state.companyHomes[item.id]) {
                                                                        this.getAllProductList(this.state.companyHomes[item.id].products.map(x => x.id));
                                                                        this.toggleAddProductModal();
                                                                    };
                                                                }}
                                                            >
                                                                Məhsul əlavə et
                                                                <FontAwesomeIcon icon={faPlus} className="ml-2" />
                                                            </Button>
                                                        }
                                                    </div>
                                                    {
                                                        this.state.companyHomes[item.id]
                                                            ?
                                                            <BootstrapTable
                                                                bootstrap4
                                                                striped
                                                                keyField='id'
                                                                {...tableConfig}
                                                                data={
                                                                    this.state.companyHomes[item.id] ?
                                                                        this.state.activeTableTab === 0 ?
                                                                            this.state.companyHomes[item.id].products
                                                                            :
                                                                            this.state.activeTableTab === 1 ?
                                                                                this.state.companyHomes[item.id].transactions
                                                                                :
                                                                                this.state.activeTableTab === 2 ?
                                                                                    this.state.companyHomes[item.id].charging
                                                                                    : []
                                                                        :
                                                                        []
                                                                }
                                                                columns={
                                                                    this.state.activeTableTab === 0 ? productColumns
                                                                        :
                                                                        this.state.activeTableTab === 1 ? transactionColumns
                                                                            :
                                                                            this.state.activeTableTab === 2 ? chargingColumns
                                                                                : []
                                                                }
                                                            />
                                                            :
                                                            <div className="alert alert-üarning">
                                                                Məhsul yoxdur.
                                                            </div>
                                                    }
                                                </CardBody>
                                                <CardFooter>
                                                    <Button
                                                        className='ml-2'
                                                        color='default'
                                                        onClick={() => {
                                                            this.getHomeDetailsById(item.id)
                                                            this.toggleEditModal();
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                                        Redakdə et
                                                    </Button>
                                                    <Button
                                                        className='ml-2'
                                                        color='default'
                                                        onClick={() => {
                                                            this.toggleDeleteModal();
                                                            this.setState({
                                                                selectedAddress: this.state.data?.homes.find(x => x.id === item.id)
                                                            });
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                                                        Sil
                                                    </Button>
                                                    {/* <Link
                                                        to={`/company/home/${item.id}`}
                                                        className='btn btn-warning ml-2 font-weight-bold'
                                                    >
                                                        <FontAwesomeIcon icon={faShare} className="mr-2" />
                                                        Ətraflı
                                                    </Link> */}
                                                </CardFooter>
                                            </Card>
                                        </Collapse>
                                    </div>
                                </div>
                            })
                                :
                                <div className="col-md-12 mb-4">
                                    <div className="alert alert-warning">
                                        Müştəri ünvanı tapılmadı.
                                    </div>
                                </div>
                        }

                    </div>
                </div>
                {/* create modal */}
                <Modal
                    size="lg"
                    centered
                    isOpen={this.state.isOpenCreateHomeModal}
                    onClosed={this.onCloseModal}
                >
                    <ModalHeader toggle={this.toggleCreateHomeModal}>Ünvan əlavə et</ModalHeader>

                    <Form onSubmit={e => this.createData(e)}>
                        {
                            data ?
                                <>
                                    <ModalBody>
                                        <div className="row pt-2">
                                            <div className="col-md-6 mb-4">
                                                <Label className="font-weight-bold">Müştəri</Label>
                                                <Input
                                                    disabled
                                                    value={
                                                        `#${data.id} ` +
                                                        (data.company_name ? data.company_name + ' ' : '')
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="phone" className="font-weight-bold">Telefon</Label>
                                                <Input
                                                    name="phone"
                                                    placeholder="Telefon daxil et"
                                                />
                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <Label for="address" className="font-weight-bold">Ünvan</Label>
                                                <Input
                                                    type="textarea"
                                                    rows="3"
                                                    name="address"
                                                    placeholder="Ünvan daxil et"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 my-4">
                                                <div className="d-flex">
                                                    <h4 className='font-weight-bold mb-0 mr-3'>Port əlavə et</h4>
                                                    <div>
                                                        <input
                                                            type='checkbox'
                                                            className='ios8-switch ios8-switch-lg'
                                                            id='create-port'
                                                            checked={this.state.isOpenPortCreate}
                                                            onChange={this.togglePortCreate}
                                                        />
                                                        <label htmlFor='create-port'></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.isOpenPortCreate &&
                                            <div className="row pt-2">
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
                                                    <Label for="selectedHardware"
                                                        className="font-weight-bold">Avadanlıq</Label>
                                                    <Select
                                                        id="selectedHardware"
                                                        placeholder="Seç"
                                                        isDisabled={!this.state.selectedArea}
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
                                                        isDisabled={!this.state.selectedArea}
                                                        value={this.state.selectedCard}
                                                        options={this.state.areaCardList}
                                                        getOptionValue={option => option.id}
                                                        getOptionLabel={option => option.name}
                                                        onChange={(e) => this.setState({ selectedCard: e })}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <Label for="port" className="font-weight-bold">Port</Label>
                                                    <Select
                                                        id="port"
                                                        placeholder="Seç"
                                                        isDisabled={!this.state.selectedCard}
                                                        value={this.state.selectedPort}
                                                        options={this.state.selectedCard?.ports}
                                                        getOptionValue={option => option.id}
                                                        getOptionLabel={option => option.name}
                                                        isOptionDisabled={(option) => option.is_disabled}
                                                        onChange={(e) => this.setState({ selectedPort: e })}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <Label for="ip" className="font-weight-bold">IP address</Label>
                                                    <Input
                                                        name="ip"
                                                        placeholder="IP address daxil et"
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-4">
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
                                        }
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="default" onClick={this.toggleCreateHomeModal}>Ləğv et</Button>
                                        <Button
                                            type="submit"
                                            color="success"
                                            className="font-weight-bold"
                                        >
                                            Təsdiqlə
                                        </Button>
                                    </ModalFooter></>
                                :
                                <div className="alert alert-warning">
                                    Müştəri ünvanı tapılmadı.
                                </div>
                        }
                    </Form>
                </Modal>
                {/* add product modal */}
                <Modal isOpen={this.state.isOpenAddProductModal} centered size="md">
                    <ModalHeader toggle={this.toggleAddProductModal}>Məhsul əlavə et</ModalHeader>
                    <ModalBody>
                        <div className="row pt-2">
                            <div className="col-md-12 mb-4">
                                <Label for="product" className="font-weight-bold">Məhsul</Label>
                                <Select
                                    id="product"
                                    placeholder="Seç"
                                    // isMulti
                                    // value={this.state.selectedNewProductList}
                                    value={this.state.selectedNewProduct}
                                    options={this.state.allProductList}
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    // onChange={(e) => this.setState({ selectedNewProductList: e })}
                                    onChange={(e) => this.setState({ selectedNewProduct: e })}
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
                {/* delete detach product modal */}
                <Modal isOpen={this.state.isOpenDeleteProductModal} centered size="md">
                    <ModalHeader toggle={this.toggleDeleteProductModal}></ModalHeader>
                    {
                        this.state.selectedProductRow ?
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
                {/* edit modal */}
                <Modal isOpen={this.state.isOpenEditModal} centered size="lg">
                    <ModalHeader toggle={this.toggleEditModal}>Redakdə et</ModalHeader>
                    <Form onSubmit={e => this.editData(e)}>
                        {
                            this.state.selectedAddress ?
                                <>
                                    <ModalBody>
                                        <div className="row pt-2">
                                            <div className="col-md-12 mb-4">
                                                <Label className="font-weight-bold">Müştəri</Label>
                                                <Input
                                                    disabled
                                                    value={
                                                        `#${data.id} ` +
                                                        (data.company_name ? data.company_name : '')
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label className="font-weight-bold">Ünvan kodu</Label>
                                                <Input
                                                    disabled
                                                    value={this.state.selectedAddress.id}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <Label for="phone" className="font-weight-bold">Telefon</Label>
                                                <Input
                                                    name="phone"
                                                    placeholder="Telefon daxil et"
                                                    defaultValue={this.state.selectedAddress.phone}
                                                />
                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <Label for="address" className="font-weight-bold">Ünvan</Label>
                                                <Input
                                                    type="textarea"
                                                    rows="4"
                                                    name="address"
                                                    placeholder="Ünvan daxil et"
                                                    defaultValue={this.state.selectedAddress.address}
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
                                            <div className="col-md-6 mb-4">
                                                <Label for="port" className="font-weight-bold">Port</Label>
                                                <Select
                                                    id="port"
                                                    placeholder="Seç"
                                                    isDisabled={!this.state.selectedCard}
                                                    value={this.state.selectedPort}
                                                    options={this.state.selectedCard?.ports}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => option.name}
                                                    isOptionDisabled={(option) => option.is_disabled}
                                                    onChange={(e) => this.setState({ selectedPort: e })}
                                                />
                                            </div>
                                            {/* <div className="col-md-6 mb-4">
                                                <Label for="ip" className="font-weight-bold">IP address</Label>
                                                <Input
                                                    name="ip"
                                                    placeholder=" IP address"
                                                    defaultValue={this.state.selectedIp}
                                                />
                                            </div> */}
                                            <div className="col-md-6  mb-4">
                                                <Label for="status" className="font-weight-bold">Status</Label>
                                                <Select
                                                    id="status"
                                                    placeholder="Seç"
                                                    value={this.state.selectedStatus}
                                                    options={dataStatus}
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
                <Modal isOpen={this.state.isOpenDeleteModal} centered size="md">
                    <ModalHeader toggle={this.toggleDeleteModal}></ModalHeader>
                    {
                        this.state.selectedAddress ?
                            <>
                                <ModalBody>
                                    <div className="row pt-2">
                                        <div className="col-md-12 text-center mb-4">
                                            <h4 className="font-weight-bold">Seçilən ünvanı silmək istədiyinizdən əminsinizmi?</h4>
                                            <h5>#{this.state.selectedAddress.id}</h5>
                                            <h5>{this.state.selectedAddress.address}</h5>
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

const mapStateToProps = store => store;
export default connect(mapStateToProps)(CompanyView);