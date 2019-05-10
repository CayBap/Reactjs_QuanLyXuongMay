import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Card, CardBody, CardHeader, Button, CardFooter,FormGroup,Label,Input ,CustomInput,Form} from 'reactstrap';
import { Link } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import {
    MdError,
    // MdCardGiftcard,
    MdInfo,
  } from 'react-icons/lib/md';
import Page from '../../components/Page';
// import bn from 'utils/bemnames';
import { actGetCateSuccess } from '../../actions/cateAct';
import { featchGetCate,  } from '../../services/apis/cateService';
import {  featchGetAProduct, featchUpdateProduct } from '../../services/apis/productService';
// const bem = bn.create('product');

class EditProductPage extends React.Component {
    constructor(props) {
		super(props);
        this.state = { 
            name: '',
            shortName: '',
            description: '',
            size: '',
            color: '',
            amount: '',
            price: "",
            priceForEmploy: '',
            cate: '',
            subImage:[],
          };
	}

    handleOnClickProduc = id => {
        this.props.history.push('/admin/product/list/detail/' + id);
    }
    componentWillMount() {
        featchGetCate().then(result => {
            this.props.onGetCateSuccess(result.data);
        });
        const arrPath = window.location.pathname.split('/');
        const id = arrPath[arrPath.length - 1];
        featchGetAProduct(id).then(result => {
            if (result.status === 200) {
                const data = result.data;
                const { name,shortName,description,size,color,amount,price,priceForEmploy,cate,subImage} = data;
                this.setState({
                    id,
                    name,
                    shortName,
                    description,
                    size,
                    color,
                    amount,
                    price,
                    priceForEmploy,
                    cate,
                    subImage,
                });
            }
        })
        // console.log()
        // featchGetACate()

    }
    handleChageInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleOnClickCreateProduct = (e) => {
        e.preventDefault();
        const { name, shortName, description, size, color, amount, price, priceForEmploy, cate, subImage } = this.state;
        let newSize = size;
        let newColor = color;
        if (typeof size ==='string') {
            newSize = size !== '' ? size.split(',') : undefined;
        }
        if (typeof color ==='string') {
            newColor = color !== '' ? color.split(',') : undefined;
        }
        const arrPath = window.location.pathname.split('/');
        const id = arrPath[arrPath.length - 1];
        const body = {
            name,
            shortName,
            size: newSize ,
            color: newColor,
            description,
            amount,
            price,
            priceForEmploy,
            cate,
            subImage
        }
        featchUpdateProduct(id,body).then(result => {
            if (result.status === 200) {
                this.notificationSystem.addNotification({
                    title: <MdInfo/>,
                    message: 'Cập nhập sản phẩm thành công!',
                    level: 'success',
                });
                setTimeout(() => {
                    this.props.history.push('/admin/product/list');
                }, 1000);
            } else {
                this.notificationSystem.addNotification({
                    title: <MdError/>,
                    message: 'Cập nhập sản phẩm thất bại!',
                    level: 'error',
                });
            }
           
        })
    }
    
    render() {
        console.log(this.state.subImage)
        const { cate } = this.props;
        const cates = cate.cates || [];
        return (
            <Page
                title="Sản phẩm"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Sản phẩm' }, { name: 'Thêm sản', active: true }]}>
                <Row>
                    <Col lg={4} md={6} sm={6} xs={12}>
                        <Card>
                            <CardHeader>
                                <span style= {{textAlign:'center'}}> Ảnh minh họa</span>
                            </CardHeader>
                                <CardBody>
                              
                                    <ImagesUploader
                                        url="http://localhost:4040/api/upload"
                                        optimisticPreviews
                                        onLoadEnd={(err, result) => {
                                            if (err) {
                                                // console.error(err);
                                            }
                                            if (result) {
                                                this.setState({ subImage: result });
                                            }
                                        }}
                                        multiple ={true}
                                        images = {this.state.subImage}
                                    
                                    label="Tải ảnh sản phẩm"
                                    />
                                </CardBody>
                                
                        </Card>
                    </Col>
                    <Col lg={8} md={6} sm={6} xs={12}>
                        <Card>
                            <Form  onSubmit= {this.handleOnClickCreateProduct}>
                              <CardHeader>
                                    Thông tin sản phẩm
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col lg={8}>
                                    
                                            <FormGroup>
                                                <Label for="name">Tên</Label>
                                                <Input required type="text" name="name" id="name" placeholder="Tên sản phẩm" value={this.state.name} onChange = {this.handleChageInput}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="shortName">Tên ngắn</Label>
                                                <Input  type="text" required name="shortName" id="shortName" placeholder="Tên ngắn" value={this.state.shortName} onChange = {this.handleChageInput}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label  for="description">Miêu tả</Label>
                                                <Input type="textarea" name="description" id="description" placeholder="Miêu tả" value={this.state.description} onChange = {this.handleChageInput}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label  for="size">Kích thước (các kích thước các nhau bởi dấu ",")</Label>
                                                <Input type="text" name="size" id="size" placeholder="Kích trước" value={this.state.size} onChange = {this.handleChageInput}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label  for="color">Màu sác (các màu sắc các nhau bởi dấu ",")</Label>
                                                <Input type="text" name="color" id="color" placeholder="Màu sắc" value={this.state.color} onChange = {this.handleChageInput}/>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <Label  for="amount">Số lượng</Label>
                                                <Input required type="text" name="amount" id="amount" placeholder="Số lượng" value={this.state.amount} onChange = {this.handleChageInput} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label  for="price">Giá bán</Label>
                                                <Input required type="text" name="price" id="price" placeholder="Giá bán" value={this.state.price} onChange = {this.handleChageInput}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label  for="priceForEmploy">Công thợ</Label>
                                                <Input required type="text" name="priceForEmploy" id="priceForEmploy" placeholder="Công thợ" value={this.state.priceForEmploy} onChange = {this.handleChageInput}/>
                                            </FormGroup>
                                      
                                            <FormGroup>
                                                <Label  for="cate">Danh mục</Label>
                                                <CustomInput  required type="select" id="cate" name="cate" value={this.state.cate} onChange={this.handleChageInput}>
                                                    <option selected>--Chọn danh mục--</option>
                                                    {cates.map(item => {
                                                        return <option key ={item._id} value={item._id}>{item.name}</option>
                                                    })}

                                                </CustomInput>
                                            </FormGroup> 
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button type="submit" size="sm" color='primary' >Lưu</Button>
                                    <Button type='submit' style = {{float:'right'}}  size = "sm"  color='secondary'><Link to = "/admin/product/list/add" style= {{color:'white',textDecoration:'none'}}>Hủy</Link></Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                 
                </Row>
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
        cate:state.cate,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetCateSuccess: data => {
            dispatch(actGetCateSuccess(data));
        },
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(EditProductPage);