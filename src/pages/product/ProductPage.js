import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Col, Input,Row, Table, Card, CardBody, CardHeader, Button, ButtonGroup, CardFooter,ModalHeader,Modal,ModalBody ,ModalFooter} from 'reactstrap';
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

const inorgesign = alias => {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');

    // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    return str;
  };
class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataForPage: [],
            entry: 5,
            currentPage: 0,
            modal: false,
            id: '',
            searchName:'',
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
    handleChangeInput = (event) => {
 
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        const { currentPage} = this.state;
        const { product } = this.props;
        let products = product.products || [];
        if (this.state.searchName !== '') { 
            products = products.filter(item => {
                // return item.
                if(inorgesign(item.name).search(inorgesign(this.state.searchName))>=0)
                    return true;
                return false;
            })
        }
        const getSumValueForEmploy =(price) => {
          
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0
            });
            return formatter.format(price);
          }
        return (
            <Page
                title="Sản phẩm"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Sản phẩm', active: true }]}>
                <Row>
                    <Col lg={8} md={6} sm={6} xs={12}>
                        <Card>
                            <CardHeader>
                               Danh sách sản phẩm
                                  
                               <div style = {{float:"right",display:'flex'}} >
                                    <Input onChange={this.handleChangeInput} name='searchName' value={this.state.searchName} type="search" placeholder='Tìm kiếm' style = {{width:200}}></Input>
                               <Button style = {{marginLeft:10}}  size = "sm"  color='primary'><Link to = "/admin/product/list/add" style= {{color:'white',textDecoration:'none'}}>Thêm mới</Link></Button>
                               </div>
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
                                                    <td>{getSumValueForEmploy(item.price)}</td>
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
                            <PaginationTable data={products} entry={this.state.entry} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
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
                                      
                                        {
                                            products.sort((a, b) => {
                                                return b.amount-a.amount;
                                            }).slice(0, 5).map((item,index) => {
                                               return ( <tr key = {item._id} className = {bem.e('row')}>
                                               <th scope="row">{index+1}</th>
                                           <td><img src = {item.mainImage} alt = "quan" style = {{width:50}}></img></td>
                                               <td>{item.name}</td>
                                               <td>{item.amount}</td>
                                       </tr>)
                                            })
                                       }
                                       
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