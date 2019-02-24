import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Col, Row, Table, Card, CardBody, CardHeader, Button, ButtonGroup, CardFooter,ModalHeader,Modal,ModalBody ,ModalFooter} from 'reactstrap';
import {
    MdError,
    MdInfo,
} from 'react-icons/lib/md';
import NotificationSystem from 'react-notification-system';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import { featchGetProduct, featchDeleteProduct } from '../../services/apis/productService';
import { actGetProductSuccess } from '../../actions/productAct';
import PaginationTable from '../../components/Pagination';
const bem = bn.create('product');

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataForPage: [],
            entry: 5,
            currentPage: 0,
            modal: false,
            id: '',
        };
        this.toggle = this.toggle.bind(this);
    }
    
    handleOnClickProduc = id => {
        this.props.history.push('/admin/product/list/detail/' + id);
    }
    componentWillMount() {
        featchGetProduct().then(result => {
            this.props.onGetProductSuccess(result.data);
        });
    }
    toggle(id) {
        this.setState({id});
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.props.product.products.slice(page*entry, page*entry+entry),currentPage:page});
    }
    handleOnDelete = () => {
        this.setState({ modal: false });
        featchDeleteProduct(this.state.id).then(result=>{
            if (result.status === 200) {
                featchGetProduct().then(result => {
                    this.props.onGetProductSuccess(result.data);
                });
                this.notificationSystem.addNotification({
                    title: <MdInfo/>,
                    message: 'Xóa sản phẩm thành công!',
                    level: 'success',
                });
            } else {
                this.notificationSystem.addNotification({
                    title: <MdError/>,
                    message: 'Xóa sản phẩm thất bại!',
                    level: 'error',
                });
            }
        }).catch(err => {
            this.notificationSystem.addNotification({
                title: <MdError/>,
                message: 'Xóa sản phẩm thất bại!',
                level: 'error',
            });
        })
    }
    render() {
        const { currentPage} = this.state;
        const { product } = this.props;
        const products = product.products || [];
        return (
            <Page
                title="Sản phẩm"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Sản phẩm', active: true }]}>
                <Row>
                    <Col lg={8} md={6} sm={6} xs={12}>
                        <Card>
                            <CardHeader>
                               Danh sách sản phẩm
                                <Button style = {{float:'right'}}  size = "sm"  color='primary'><Link to = "/admin/product/list/add" style= {{color:'white',textDecoration:'none'}}>Thêm mới</Link></Button>
                                {/* <Link Component = {<Button></Button>} to= "/admin/product/list/add" style = {{float:'right'}} size = "sm" outline color='primary' >Thêm mới</Link> */}
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Hình ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá (đồng)</th>
                                            <th>Tổng số</th>
                                            {/* <th>Đã bán</th>
                                            <th>Tồn kho</th> */}
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            products.slice(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry).map((item,index) => {
                                                return (
                                                    // <tr  key = {item._id} className = {bem.e('row')} onClick = {()=>this.handleOnClickProduc(item._id)}>
                                                    <tr  key = {item._id} className = {bem.e('row')} >
                                                    <th scope="row">{index+1}</th>
                                                    <td><img style = {{width:'100px'}} alt = "ảnh" src = {item.mainImage?item.mainImage:'https://png.pngtree.com/svg/20161222/the_bottom_bar_icon_selected_merchandise_678940.png'}></img></td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.amount}</td>
                                                    <td>
                                                        <ButtonGroup>
                                                            <Button color = "info" ><Link style = {{textDecoration:'none',color:'white'}} to = {'/admin/product/list/edit/'+item._id}>Sửa</Link></Button>
                                                            {/* <Button color = "warning">Khóa</Button> */}
                                                            <Button color = "danger" onClick = {()=>this.toggle(item._id)}>Xóa</Button>
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
                            <PaginationTable data={products} entry={10} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} sm={6} xs={12}>
                    <Card>
                        <CardHeader>
                               <span style= {{textAlign:'center'}}> Top sản phẩm</span>
                        </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Hình</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className = {bem.e('row')}>
                                            <th scope="row">1</th>
                                            <td><img src = "http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg" alt = "quan" style = {{width:50}}></img></td>
                                            <td>Quần bò</td>
                                            <td>1000</td>
                                        </tr>
                                       
                                        <tr className = {bem.e('row')}>
                                            <th scope="row">1</th>
                                            <td><img src = "http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg" alt = "quan" style = {{width:50}}></img></td>
                                            <td>Quần bò</td>
                                            <td>1000</td>
                                        </tr>
                                       
                                        <tr className = {bem.e('row')}>
                                            <th scope="row">1</th>
                                            <td><img src = "http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg" alt = "quan" style = {{width:50}}></img></td>
                                            <td>Quần bò</td>
                                            <td>1000</td>
                                        </tr>
                                       
                                        <tr className = {bem.e('row')}>
                                            <th scope="row">1</th>
                                            <td><img src = "http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg" alt = "quan" style = {{width:50}}></img></td>
                                            <td>Quần bò</td>
                                            <td>1000</td>
                                        </tr>
                                       
                                        <tr className = {bem.e('row')}>
                                            <th scope="row">1</th>
                                            <td><img src = "http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg" alt = "quan" style = {{width:50}}></img></td>
                                            <td>Quần bò</td>
                                            <td>1000</td>
                                        </tr>
                                       
                                       
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Cảnh báo</ModalHeader>
                    <ModalBody>
                        Bạn có chắc chắn muốn xóa sản phẩm?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleOnDelete}>Xóa</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
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
        // user: state.user
        product: state.product
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetProductSuccess: data => {
            dispatch(actGetProductSuccess(data));
        },
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ProductPage);