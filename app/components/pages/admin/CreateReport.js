import React from 'react';
import {
    Button,
    Form,
    Input,
    Label
} from 'reactstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faFileExcel,
    faPrint
} from '@fortawesome/free-solid-svg-icons';

class CreateReport extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="page-header">
                        <h1 className="font-weight-bold">Hesabat yarat</h1>
                        <div>
                            <Button
                                color="white"
                                className="ml-2"
                            >
                                <FontAwesomeIcon icon={faPrint} />
                            </Button>
                            <Button
                                color="white"
                                className="ml-2"
                            >
                                <FontAwesomeIcon icon={faFileExcel} />
                            </Button>
                        </div>
                    </div>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <div className="row">
                            <div className="col-md-6 col-lg-4 mb-4">
                                <Label for="beinDate" className="font-weight-bold">Tarixdən</Label>
                                <Input
                                    type="date"
                                    name="beinDate"
                                    className="mb-4"
                                />
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <Label for="endDate" className="font-weight-bold">Tarixədək</Label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    className="mb-4"
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-6 col-lg-4 mb-4">
                                <Label className="font-weight-bold d-block mb-4">Şirkətlərə görə:</Label>
                                <Label for="company" className="font-weight-bold">Şirkət</Label>
                                <Select
                                    id="company"
                                    placeholder="Şirkət seçin"
                                    value={null}
                                    options={[]}
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <Label className="font-weight-bold d-block mb-4">Kart nömrələrinə görə:</Label>
                                <div className="d-flex">
                                    <div>
                                        <Label for="beginId" className="font-weight-bold">İD-dən</Label>
                                        <Input
                                            id="beginId"
                                            type="text"
                                            placeholder="Daxil et"
                                        />
                                    </div>
                                    <div className="arrow-component">
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </div>
                                    <div>
                                        <Label for="endId" className="font-weight-bold">İD-dək</Label>
                                        <Input
                                            id="endId"
                                            type="text"
                                            placeholder="Daxil et"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <Label className="font-weight-bold d-block mb-4">Kart istifadəçi tipinə görə:</Label>
                                <Label for="userType" className="font-weight-bold">İstifadəçi tipi</Label>
                                <Select
                                    id="userType"
                                    placeholder="Seç"
                                    value={null}
                                    options={[]}
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-6 col-lg-4 mb-4">
                                <Label className="font-weight-bold d-block mb-4">Departament:</Label>
                                <Label for="department" className="font-weight-bold">Departament</Label>
                                <Select
                                    id="department"
                                    placeholder="Seç"
                                    value={null}
                                    options={[]}
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <Label className="font-weight-bold d-block mb-4">Şöbə:</Label>
                                <Label for="division" className="font-weight-bold">Şöbə</Label>
                                <Select
                                    id="division"
                                    placeholder="Seç"
                                    value={null}
                                    options={[]}
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                />
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <Label className="font-weight-bold d-block mb-4">Vəzifə:</Label>
                                <Label for="position" className="font-weight-bold">Vəzifə</Label>
                                <Select
                                    id="position"
                                    placeholder="Seç"
                                    value={null}
                                    options={[]}
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                />
                            </div>
                        </div>
                        <hr />
                        {/* submit */}
                        <div className="row">
                            <div className="col-md-12 text-md-right">
                                <Button
                                    color="danger"
                                    className="font-weight-bold ml-2"
                                >
                                    Ləğv et
                                </Button>
                                <Button
                                    color="success"
                                    className="font-weight-bold ml-2"
                                >
                                    Yarat
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </>
        )
    }
}

export default CreateReport;