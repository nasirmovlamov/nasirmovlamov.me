import React from 'react';
import {
    Form,
    Input,
    Label,
} from 'reactstrap';
import axios from 'axios';
import { config, tableConfig } from '../../../config';
class CustomerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
        };

        this.uploadDocRef = React.createRef();
    }

    componentDidMount() {
        axios.get(config.apiURL + "api/v1/card/" + this.props.match.params.id )
            .then(res => {
                if(res.data.status){
                    this.setState({
                        data:res.data.data,

                    })
                }
            });


    }



    toggleTab = activeTab => {
        if (this.state.activeTab !== activeTab) {
            this.setState({ activeTab });
        }
    }


    render() {
        const data = this.state.data;

        return (
            <>
                <div className="bg-white rounded p-4">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h1 className="font-weight-bold">Baxış</h1>

                            </div>
                        </div>
                    </div>

                    <Form className="mb-4">
                        {
                            data?
                                <>
                                    <div className="row pt-2">
                                        <div className="col-md-4 mb-2">
                                            <Label className="text-muted">ID</Label>
                                            <Input
                                                name="id"
                                                placeholder="id"
                                                disabled
                                                defaultValue={data.id}
                                            />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <Label>Aparatın adı</Label>
                                            <Input
                                                name="name"
                                                placeholder="Aparatın adı"
                                                disabled
                                                defaultValue={data.hardware_id}
                                            />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <Label>Ad</Label>
                                            <Input
                                                name="name"
                                                placeholder="Ad"
                                                disabled
                                                defaultValue={data.name}
                                            />
                                        </div>

                                        <div className="col-md-4 mb-2">
                                            <Label>Status</Label>
                                            <Input
                                                name="name"
                                                placeholder="Status"
                                                disabled
                                                defaultValue={data.status}
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


                    {/*<div className="d-flex mb-4">*/}
                    {/*    <Button onClick={() => this.toggleTab(0)} className="mr-3" color={this.state.activeTab === 0?'warning': ''}>Məhsullar</Button>*/}
                    {/*    <Button onClick={() => this.toggleTab(1)} className=""color={this.state.activeTab === 1?'warning': ''}>Əməliyyatlar</Button>*/}
                    {/*</div>*/}
                    {
                        <>
                            {/*<BootstrapTable*/}
                            {/*    bootstrap4*/}
                            {/*    striped*/}
                            {/*    keyField='id'*/}
                            {/*    data={*/}

                            {/*        this.state.activeTab === 0?this.state.userProductList:*/}
                            {/*            this.state.activeTab === 1 ? this.state.userTransactionList :*/}
                            {/*                []*/}
                            {/*    }*/}
                            {/*    {...tableConfig}*/}
                            {/*    columns={this.state.activeTab === 0?paymentColumns:*/}
                            {/*        this.state.activeTab === 1 ? historyColumns :*/}
                            {/*            []*/}
                            {/*    }*/}
                            {/*/>*/}
                        </>
                    }
                </div>

            </>
        )
    }
}

export default CustomerList;