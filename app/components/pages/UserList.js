import React from 'react';
import axios from 'axios';
import {cellEditConfig, config, tableConfig} from "../../config";
import BootstrapTable from 'react-bootstrap-table-next';
import {
  Form,
  Button,
  Input,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup, Label
} from 'reactstrap';
import Loader from "../common/Loader";
import {faEye, faEyeSlash, faKey, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import toast from "toasted-notes";
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import Header from "../common/Header";

class UserList extends React.Component {
  state = {
    data: null,
    showAddModal: false,
    showResetModal: false
  }

  constructor(props) {
    super(props);
    window.global = this;

    this.getData = this.getData.bind(this);
    this.createData = this.createData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.removeData = this.removeData.bind(this);
  }

  toggleAddModal = () => {
    this.setState(prevState => ({showAddModal: !prevState.showAddModal}));
  }

  toggleResetModal = (id) => {
    this.setState(prevState => ({
      showResetModal: !prevState.showResetModal,
      resetId: !prevState.showResetModal ? id : prevState.resetId
    }));
  }

  getData() {
    this.setState({loading: true});
    axios.get(config.apiURL + "user").then(res => {
      this.setState({
        loading: false,
        data: res.data.data
      });
    });
  }

  createData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    axios.post(config.apiURL + "user/create", data)
      .then(res => {
        if (res.data.status === "success") {
          this.setState(prevState => ({
            data: [
              ...prevState.data,
              res.data.data
            ]
          }));

          toast.notify(() => (
            <div className="alert alert-success m-3">
              <h5>Uğurlu əməliyyat!</h5>
              <p className="mb-0">İstifadəçi uğurla əlavə edildi.</p>
            </div>), {position: "top-right", duration: 2500});
        }
      });

    e.target.reset();
  }

  updateData(oldValue, newValue, row, column) {
    if (oldValue !== newValue) {
      if (column.dataField === "username") {
        axios.put(config.apiURL + "user/changeUsername/" + row.id, {
          username: row.username
        }).then(res => {
          if (res.data.status === "success") {
            toast.notify(() => (
              <div className="alert alert-success m-3">
                <h5>Uğurlu əməliyyat!</h5>
                <p className="mb-0">İstifadəçi adı uğurla dəyişdirildi.</p>
              </div>), {position: "top-right", duration: 2500});
          }
        });
      } else {
        axios.put(config.apiURL + "user/update/" + row.id, {
          firstName: row.firstName,
          lastName: row.lastName,
          role: row.role
        }).then(res => {
          if (res.data.status === "success") {
            toast.notify(() => (
              <div className="alert alert-success m-3">
                <h5>Uğurlu əməliyyat!</h5>
                <p className="mb-0">İstifadəçi məlumatları uğurla dəyişdirildi.</p>
              </div>), {position: "top-right", duration: 2500});
          }
        });
      }
    }
  }

  toggleStatus(id, index, status) {
    let data = this.state.data;
    data[index].status = (status === 1 ? 2 : 1);

    this.setState({
      data: data
    });

    axios.put(config.apiURL + "user/" + (status === 1 ? "deactivate/" : "activate/") + id)
      .then(res => {
        if (res.data.status === "success") {
          toast.notify(() => (
            <div className="alert alert-success m-3">
              <h5>Uğurlu əməliyyat!</h5>
              <p className="mb-0">İstifadəçi uğurla {status === 1 ? "deaktivləşdirildi" : "aktivləşdirildi"}.</p>
            </div>), {position: "top-right", duration: 2500});
        }
      });
  }

  resetPass(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    axios.put(config.apiURL + "user/changePassword/" + this.state.resetId, data)
      .then(res => {
        if (res.data.status === "success") {
          toast.notify(() => (
            <div className="alert alert-success m-3">
              <h5>Uğurlu əməliyyat!</h5>
              <p className="mb-0">Şifrə uğurla dəyişdirildi.</p>
            </div>), {position: "top-right", duration: 2500});
        }
      });

    e.target.reset();
  }

  removeData(id, index) {
    axios.delete(config.apiURL + "user/delete/" + id)
      .then(res => {
        if (res.data.status === "success") {
          let data = this.state.data;
          data.splice(index, 1);
          this.setState({
            data: data
          });
          toast.notify(() => (
            <div className="alert alert-success m-3">
              <h5>Uğurlu əməliyyat!</h5>
              <p className="mb-0">Müfakat uğurla silindi.</p>
            </div>), {position: "top-right", duration: 2500});
        }
      })
  }

  componentDidMount() {
    // this.getData();
    this.setState({data: []})
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'username',
      text: 'İstifadəçi adı'
    }, {
      dataField: 'firstName',
      text: 'Ad'
    }, {
      dataField: 'lastName',
      text: 'Soyad'
    }, {
      dataField: 'role',
      text: 'Role',
      editor: {
        type: Type.SELECT,
        options: [{
          value: "SUPER_ADMIN",
          label: "SUPER_ADMIN"
        }, {
          value: "ADMIN",
          label: "ADMIN"
        }, {
          value: "MANAGER",
          label: "MANAGER"
        }, {
          value: "OPERATOR",
          label: "OPERATOR"
        }]
      }
    }, {
      dataField: 'createdAt',
      text: 'Yaradılma vaxtı',
      editable: false
    }, {
      dataField: 'updatedAt',
      text: 'Redaktə vaxtı',
      editable: false
    }, {
      dataField: 'status',
      text: "",
      editable: false,
      align: 'right',
      formatter: (cell, row, index) => {
        return <div style={{minWidth: '80px'}}>
          <Button
            color="light ml-2"
            size="sm"
            id={"status" + index}
            onClick={() => this.toggleStatus(row.id, index, row.status)}
          >
            <FontAwesomeIcon
              icon={cell === 1 ? faEye : faEyeSlash}
              className="c-pointer"
            />
          </Button>
          <Button
            color="light ml-2"
            size="sm"
            id={"reset" + index}
            onClick={() => this.toggleResetModal(row.id)}
          >
            <FontAwesomeIcon
              icon={faKey}
              className="c-pointer"
            />
          </Button>
          <Button
            color="danger ml-2"
            size="sm"
            id={"delete" + index}
            onClick={() => this.removeData(row.id, index)}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="c-pointer"
            />
          </Button>

          <UncontrolledTooltip placement="top" target={"status" + index}>
            İstifadəçini {cell === 1 ? "deaktivləşdir" : "aktivləşdir"}
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="top" target={"reset" + index}>
            Şifrəni sıfırla
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="top" target={"delete" + index}>
            İstifadəçini sil
          </UncontrolledTooltip>
        </div>;
      }
    }];

    return (
      <React.Fragment>
        <Header title="İstifadəçilərin listi" addButton={this.toggleAddModal} addButtonTitle="Əlavə et"/>
        {
          this.state.data ?
            <div className="mt-4">
              {
                this.state.data.length > 0 ?
                  <BootstrapTable
                    keyField='id'
                    data={this.state.data}
                    columns={columns}
                    {...tableConfig}
                    cellEdit={
                      cellEditFactory({
                        ...cellEditConfig,
                        afterSaveCell: this.updateData
                      })
                    }
                  />
                  : <div className="alert alert-info">
                    Axtardığınız səhifəyə uyğun məlumat yoxdur.
                  </div>
              }
            </div> :
            <Loader/>
        }
        <Modal isOpen={this.state.showAddModal} toggle={this.toggleAddModal} centered>
          <Form onSubmit={e => this.createData(e)}>
            <ModalHeader toggle={this.toggleAddModal}>İstifadəçi əlavə et</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label htmlFor="firstName" className="font-weight-bold">Ad</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Adı daxil edin"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastName" className="font-weight-bold">Soyad</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Soyadı daxil edin"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="username" className="font-weight-bold">İstifadəçi adı</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="İstifadəçi adını daxil edin"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password" className="font-weight-bold">Şifrə</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Şifrəni daxil edin"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="role" className="font-weight-bold">İstifadəçi rolu</Label>
                <Input
                  type="select"
                  id="role"
                  name="role"
                >
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="OPERATOR">OPERATOR</option>
                </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="light" onClick={this.toggleAddModal}>Ləğv et</Button>
              <Button color="success" type="submit" onClick={this.toggleAddModal}>Əlavə et</Button>
            </ModalFooter>
          </Form>
        </Modal>

        <Modal isOpen={this.state.showResetModal} toggle={this.toggleResetModal} centered>
          <Form onSubmit={e => this.resetPass(e)}>
            <ModalHeader toggle={this.toggleResetModal}>Şifrəni sıfırla</ModalHeader>
            <ModalBody>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Yeni şifrəni daxil edin"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="light" onClick={this.toggleResetModal}>Ləğv et</Button>
              <Button color="success" type="submit" onClick={this.toggleResetModal}>Dəyiş</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UserList;
