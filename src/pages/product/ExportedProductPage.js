import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button,ButtonGroup ,CardFooter,
   Modal, ModalHeader, ModalBody, ModalFooter,
    Form,FormGroup,Label,Input
} from 'reactstrap';
import Select from 'react-select';
import NotificationSystem from 'react-notification-system';
import {
    MdError,
    // MdCardGiftcard,
    MdInfo,
  } from 'react-icons/lib/md';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import PaginationTable from '../../components/Pagination';
import { featchGetExportProduct, featchCreateExportProduct } from '../../services/apis/exportProductService';
import { featchGetProduct } from '../../services/apis/productService';
import { actGetExportProductSuccess } from '../../actions/exportProductAct';
import { actGetProductSuccess } from '../../actions/productAct';
const bem = bn.create('product');

class ExportedProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            // shortName: '',
            // unit: '',
            totalPrice: '',
            timeToEnd: '',
            amount: '',
            dataForPage: [],
            entry: 5,
            currentPage: 0,
            id: '',
            productId:'',
            selectedOption: null,
            isRed: false,
            products: []
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
      componentWillMount() {
         
          featchGetProduct().then(result => {
            this.setState({ products: result.data });
          })
           featchGetExportProduct().then(result => {
            this.props.onGetExportProduct(result.data);
              
          });
    }

      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    handleChange = (selectedOption) => {
        this.setState({ name:selectedOption.label });
        this.setState({ productId: selectedOption.value });
        this.setState({selectedOption})

      }
    handleSubmitCreate = e => {
        e.preventDefault();
        const { name, totalPrice, timeToEnd, amount, productId } = this.state;
        if (name !== "") {
            const body = {
                name,
                totalPrice,
                timeToEnd,
                amount,
                productId,
            }
            featchCreateExportProduct(body).then(result => {
                if (result.status === 200) {
                    this.notificationSystem.addNotification({
                        title: <MdInfo/>,
                        message: 'Thêm mới hàng nhập thành công!',
                        level: 'success',
                    });
                    featchGetExportProduct().then(result => {
                      this.props.onGetExportProduct(result.data);
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
        } else {
            this.setState({ isRed: true });
        }
    }

    handleChageInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.props.exportProduct.exportProducts.slice(page*entry, page*entry+entry),currentPage:page});
    }
    render() {
        const { currentPage ,products} = this.state;
        const { exportProduct} = this.props;
        const exportProducts = exportProduct.exportProducts || [];
        const  newProducts = products.map(item => { return { value: item._id, label: item.name } });
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
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Thời gian xuất</th>
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {
                                            exportProducts.slice(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry).map((item,index) => {
                                                return (
                                                    // <tr  key = {item._id} className = {bem.e('row')} onClick = {()=>this.handleOnClickProduc(item._id)}>
                                                    <tr  key = {item._id} className = {bem.e('row')} >
                                                        <th scope="row">{index+1}</th>
                                                        <td>{item.name}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.totalPrice}</td>
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
                                <PaginationTable data={exportProducts} entry={10} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
                    <Form onSubmit = {this.handleSubmitCreate}>
                        <ModalHeader>Thêm mới hàng nhập</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Sản phẩm</Label>
                                <Select 
                                    
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={newProducts}
                                    placeholder  = "Lựa chọn ..."
                                />
                            </FormGroup>
                           
                            <FormGroup>
                                <Label for="amount">Số lượng</Label>
                                <Input required value = {this.state.amount} onChange = {this.handleChageInput}  type="number" name="amount" id="amount" placeholder="Số lượng" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="totalPrice">Giá</Label>
                                <Input required value = {this.state.totalPrice} onChange = {this.handleChageInput}  type="number" name="totalPrice" id="totalPrice" placeholder="Giá" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="timeToEnd">Thời gian nhập</Label>
                                <Input required value = {this.state.timeToEnd}  onChange = {this.handleChageInput} type="date" name="timeToEnd" id="timeToEnd" placeholder="Thời gian nhập" />
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
    // console.log(state)
    return {
        exportProduct: state.exportProduct,
        product:state.product
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetExportProduct: data => {
            dispatch(actGetExportProductSuccess(data));
        },
        onGetProduct: data => {
            dispatch(actGetProductSuccess(data));
        }
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ExportedProductPage);