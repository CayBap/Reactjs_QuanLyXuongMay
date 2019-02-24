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
import { featchGetProduct } from '../../services/apis/productService';
import { actGetDeliverySuccess } from '../../actions/deliveryAct';
import { featchGetUser } from '../../services/apis/userService';
import { featchGetDelivery ,featchCreateDelivery, featchDeleteDelivery, featchUpdateDelivery, featchUpdateStatusDelivery} from '../../services/apis/deliveryService';
const bem = bn.create('product');

class DeliveryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            password:'',
            email:'',
            lastName:'',
            firstName:'',
            dob:'',
            gender:'',
            role:'',
            modal: false,
            dataForPage: [],
            entry: 5,
            currentPage: 0,
            products: [],
            deleteModal: false,
            state: '',
            users: [],
            selectedProduct: null,
            selectedUser:null
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
      componentWillMount() {
         
          featchGetProduct().then(result => {
            this.setState({ products: result.data });
          })
          featchGetUser().then(result => {
              console.log(result)
            this.setState({ users: result.data });
          })
           featchGetDelivery().then(result => {
            this.props.onGetDelivery(result.data);
          });
    }

    toggle() {
        this.setState({ state: 'add' });
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    deleteToggle(id) {
        if (id) {
            this.setState({id})
        }
        this.setState(prevState => ({
            deleteModal: !prevState.deleteModal
          }));
    }
    handleChange = (selectedProduct) => {
        this.setState({ productName:selectedProduct.label });
        this.setState({ productId: selectedProduct.value });
        this.setState({selectedProduct})

      }
    handleChangeUser = (selectedUser) => {
        this.setState({ productName:selectedUser.label });
        this.setState({ userId: selectedUser.value });
        this.setState({selectedUser})

      }
    handleSubmitCreate = e => {
        e.preventDefault();
        const { name, userId, timeToEnd, amount, productId,color,size, } = this.state;
        if (name !== "") {
            const body = {
                nameForUser: this.state.selectedUser.label,
                productName: this.state.selectedProduct.label,
                userId: userId,
                productId: productId,
                color,
                size,
                timeToEnd,
                amount,
            }
            if (this.state.state === 'add') {
                featchCreateDelivery(body).then(result => {
                    if (result.status === 200) {
                        this.notificationSystem.addNotification({
                            title: <MdInfo/>,
                            message: 'Thêm mới hàng nhập thành công!',
                            level: 'success',
                        });
                        featchGetDelivery().then(result => {
                          this.props.onGetDelivery(result.data);
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
            if (this.state.state === 'update') {
                featchUpdateDelivery(this.state.id,body).then(result => {
                    if (result.status === 200) {
                        this.notificationSystem.addNotification({
                            title: <MdInfo/>,
                            message: 'Cập nhập hàng nhập thành công!',
                            level: 'success',
                        });
                        featchGetDelivery().then(result => {
                          this.props.onGetDelivery(result.data);
                        });
                        this.setState({ modal: false });
                    }
                }).catch(err => {
                    this.notificationSystem.addNotification({
                        title: <MdError/>,
                        message: 'Cập nhập hàng nhập thành công!',
                        level: 'error',
                    });
                })
            }
        } else {
            this.setState({ isRed: true });
        }
    }

    handleChageInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.props.delivery.deliverys.slice(page*entry, page*entry+entry),currentPage:page});
    }
    handleOnDelete = () => {
        this.setState({
            deleteModal:false
        })
        featchDeleteDelivery(this.state.id).then(result=>{
            if (result.status === 200) {
                featchGetDelivery().then(result => {
                    this.props.onGetDelivery(result.data);
                });
                this.notificationSystem.addNotification({
                    title: <MdInfo/>,
                    message: 'Xóa hàng xuất thành công!',
                    level: 'success',
                });
               
            } else {
                this.notificationSystem.addNotification({
                    title: <MdError/>,
                    message: 'Xóa hàng xuất thất bại!',
                    level: 'error',
                });
            }
        }).catch(err => {
            this.notificationSystem.addNotification({
                title: <MdError/>,
                message: 'Xóa hàng xuất thất bại!',
                level: 'error',
            });
        })
    }
    handleUpdateStatus = (id) => {
        
        featchUpdateStatusDelivery(id).then(result=>{
            if (result.status === 200) {
                featchGetDelivery().then(result => {
                    this.props.onGetDelivery(result.data);
                });
                this.notificationSystem.addNotification({
                    title: <MdInfo/>,
                    message: 'Cập nhập trạng thái thành công!',
                    level: 'success',
                });
               
            } else {
                this.notificationSystem.addNotification({
                    title: <MdError/>,
                    message: 'Cập nhập trạng thái thất bại!',
                    level: 'error',
                });
            }
        }).catch(err => {
            this.notificationSystem.addNotification({
                title: <MdError/>,
                message: 'Cập nhập trạng thái thất bại!',
                level: 'error',
            });
        })
    }
    handleUpdate = (id) => {
        this.setState({ id, state: 'update' });
        this.setState({ modal: true });
        const { delivery} = this.props;
        const deliverys = delivery.deliverys || [];
        const product = deliverys.find(item => {
            return item._id === id;
        });
        const cuProduct = this.state.products.find(item => {
            return item._id === product.productId;
        });
        this.setState({ selectedProduct: cuProduct, amount: product.amount, timeToEnd: product.timeToEnd, color:product.color,size:product.size });
    }
    render() {
        const { currentPage ,products = [],users=[]} = this.state;
        const { delivery} = this.props;
        const deliverys = delivery.deliverys || [];
        const newProducts = products.map(item => {
            return {
                value: item._id,
                label: item.name
            };
        });
        const newUsers = users.map(item => {
            return {
                value: item._id,
                label: item.lastName + " " +item.firstName,
            };
        });
        
        return (
            <Page
                title="Giao hàng"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Giao hàng', active: true }]}>
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
                                            <th>Tên thợ</th>
                                            <th>số lượng</th>
                                            <th>Màu sắc</th>
                                            <th>Kích  thước</th>
                                            <th>Ngày giao</th>
                                            <th>Trạng thái</th>
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {
                                            deliverys.slice(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry).map((item,index) => {
                                                return (
                                                    // <tr  key = {item._id} className = {bem.e('row')} onClick = {()=>this.handleOnClickProduc(item._id)}>
                                                    <tr  key = {item._id} className = {bem.e('row')} >
                                                        <th scope="row">{index+1}</th>
                                                        <td>{item.productName}</td>
                                                        <td>{item.nameForUser}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.color}</td>
                                                        <td>{item.size}</td>
                                                        <td>{item.timeToEnd}</td>
                                                        <td>  <Button color={item.finished ? "success" : "warning"} onClick={() => this.handleUpdateStatus(item._id)}>{item.finished?"Đã trả":"Chưa trả"}</Button></td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button color = "info" onClick = {()=>this.handleUpdate(item._id)}>Sửa</Button>
                                                    <Button color = "danger" onClick = {()=>this.deleteToggle(item._id)} >Xóa</Button>
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
                                <PaginationTable data={deliverys} entry={this.state.entry} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
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
                                    
                                    value={this.state.selectedProduct}
                                    onChange={this.handleChange}
                                    options={newProducts}
                                    placeholder  = "Lựa chọn ..."
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="name">Thợ may</Label>
                                <Select 
                                    
                                    value={this.state.selectedUser}
                                    onChange={this.handleChangeUser}
                                    options={newUsers}
                                    placeholder  = "Lựa chọn ..."
                                />
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="size">Kích thước</Label>
                                <Input  value = {this.state.size} onChange = {this.handleChageInput}  type="text" name="size" id="size" placeholder="Kích thước" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="color">Màu sắc</Label>
                                <Input  value = {this.state.color} onChange = {this.handleChageInput}  type="text" name="color" id="color" placeholder="Màu sắc" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="amount">Số lượng</Label>
                                <Input required value = {this.state.amount} onChange = {this.handleChageInput}  type="number" name="amount" id="amount" placeholder="Số lượng" />
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
                <Modal isOpen={this.state.deleteModal} toggle={()=>this.deleteToggle()} className={this.props.className}>
                    <ModalHeader toggle={()=>this.deleteToggle()} >Cảnh báo</ModalHeader>
                    <ModalBody>
                        Bạn có chắc chắn muốn xóa sản phẩm?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleOnDelete}>Xóa</Button>{' '}
                        <Button color="secondary" onClick={()=>this.deleteToggle()} >Hủy</Button>
                    </ModalFooter>
                </Modal>
            </Page>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        delivery: state.delivery,
        product:state.product
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetDelivery: data => {
            dispatch(actGetDeliverySuccess(data));
        },
       
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(DeliveryPage);