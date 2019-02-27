import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button,ButtonGroup ,CardFooter,
   Modal, ModalHeader, ModalBody, ModalFooter,
    Form,FormGroup,Label,Input
} from 'reactstrap';
import NotificationSystem from 'react-notification-system';
import {
    MdError,
    // MdCardGiftcard,
    MdInfo,
  } from 'react-icons/lib/md';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import PaginationTable from '../../components/Pagination';
import { featchGetImportProduct, featchCreateImportProduct } from '../../services/apis/importProductService';
import { actGetImportProductSuccess } from '../../actions/importProductAct';
const bem = bn.create('product');

class ImportedProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            shortName: '',
            unit: '',
            totalPrice: '',
            timeToEnd: '',
            amount: '',
            dataForPage: [],
            entry: 5,
            currentPage: 0,
            id: '',
        };
    
        this.toggle = this.toggle.bind(this);
      }
      componentWillMount() {
          featchGetImportProduct().then(result => {
            this.props.onGetImportProduct(result.data);
        });
    }

      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    handleSubmitCreate = e => {
        e.preventDefault();
        const { name,shortName,unit,totalPrice,timeToEnd,amount } = this.state;
        const body = {
            name,
            shortName,
            unit,
            totalPrice,
            timeToEnd,
            amount,
        }
        featchCreateImportProduct(body).then(result => {
            if (result.status === 200) {
                this.notificationSystem.addNotification({
                    title: <MdInfo/>,
                    message: 'Thêm mới hàng nhập thành công!',
                    level: 'success',
                });
                featchGetImportProduct().then(result => {
                  this.props.onGetImportProduct(result.data);
                });
                this.setState({ modal: false });
            }
        }).catch(err => {
            this.notificationSystem.addNotification({
                title: <MdError/>,
                message: 'Thêm mới hàng nhập thành công!',
                level: 'error',
            });
        })
    }

    handleChageInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.props.importProduct.importProducts.slice(page*entry, page*entry+entry),currentPage:page});
    }
    render() {
        const { currentPage} = this.state;
        const { importProduct } = this.props;
        const importProducts = importProduct.importProducts || [];
        const getSumValueForEmploy = (price) => {
          
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0
            });
            return formatter.format(price);
          }
        return (
            <Page
                title="Hàng nhập"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Hàng nhập', active: true }]}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                              Danh sách hàng nhập
                                <Button style = {{float:'right'}} size = "sm" outline color='primary' onClick={this.toggle}>Thêm mới</Button>
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên hàng</th>
                                            <th>
                                                Đơn vị
                                            </th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Thời gian nhập</th>
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {
                                            importProducts.slice(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry).map((item,index) => {
                                                return (
                                                    // <tr  key = {item._id} className = {bem.e('row')} onClick = {()=>this.handleOnClickProduc(item._id)}>
                                                    <tr  key = {item._id} className = {bem.e('row')} >
                                                        <th scope="row">{index+1}</th>
                                                        <td>{item.name}</td>
                                                        <td>{item.unit}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{getSumValueForEmploy(item.totalPrice) }</td>
                                                        <td>{item.timeToEnd}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button color = "info">Sửa</Button>
                                                    <Button color = "danger">Xóa</Button>
                                                </ButtonGroup>
                                            </td>
                                                </tr>
                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                <PaginationTable data={importProducts} entry={10} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
                    <Form onSubmit = {this.handleSubmitCreate}>
                        <ModalHeader>Thêm mới hàng nhập</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Tên danh mục</Label>
                                <Input required  value = {this.state.name} onChange = {this.handleChageInput} type="text" name="name" id="name" placeholder="Tên danh mục" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="shortName">Tên ngắn</Label>
                                <Input type="text" value = {this.state.shortName} onChange = {this.handleChageInput}  name="shortName" id="shortName" placeholder="Tên ngắn" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="unit">Đơn vị</Label>
                                <Input required value = {this.state.unit}  onChange = {this.handleChageInput} type="text" name="unit" id="unit" placeholder="Đơn vị" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="totalPrice">Giá</Label>
                                <Input required value = {this.state.totalPrice} onChange = {this.handleChageInput}  type="number" name="totalPrice" id="totalPrice" placeholder="Giá" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="timeToEnd">Thời gian nhập</Label>
                                <Input required value = {this.state.timeToEnd}  onChange = {this.handleChageInput} type="date" name="timeToEnd" id="timeToEnd" placeholder="Thời gian nhập" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="amount">Số lượng</Label>
                                <Input required value = {this.state.amount} onChange = {this.handleChageInput}  type="number" name="amount" id="amount" placeholder="Số lượng" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type = "submit" color="primary" >Lưu</Button>
                            <Button color="secondary" onClick={this.toggle}>Hủy bỏ</Button>
                        </ModalFooter>

                    </Form>
                </Modal>
                <NotificationSystem
                dismissible={false}
                ref={notificationSystem =>
                    (this.notificationSystem = notificationSystem)
                }
                />
            </Page>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        importProduct: state.importProduct
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetImportProduct: data => {
            dispatch(actGetImportProductSuccess(data));
        },
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ImportedProductPage);