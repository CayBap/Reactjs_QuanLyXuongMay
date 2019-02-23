import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Col, Row, Table, Card, CardBody, CardHeader,Button,ButtonGroup ,CardFooter,Pagination,PaginationItem,PaginationLink} from 'reactstrap';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import { featchGetProduct } from '../../services/apis/productService';
const bem = bn.create('product');

class ProductPage extends React.Component {
    handleOnClickProduc = id => {
        this.props.history.push('/admin/product/list/detail/' + id);
    }
    componentWillMount() {
        featchGetProduct().then(result => {
            // this.props.onGetCateSuccess(result.data);
            console.log(result)
        });
    }

    render() {
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
                                            <th>Đã bán</th>
                                            <th>Tồn kho</th>
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr  className = {bem.e('row')} onClick = {()=>this.handleOnClickProduc('abc')}>
                                            <th scope="row">1</th>
                                            <td><img style = {{width:'100px'}} alt = "ảnh" src = 'http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg'></img></td>
                                            <td>Quẩn bò trẻ em</td>
                                            <td>50000</td>
                                            <td>5000</td>
                                            <td>2000</td>
                                            <td>3000</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button color = "info">Sửa</Button>
                                                    <Button color = "warning">Khóa</Button>
                                                    <Button color = "danger">Xóa</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem>
                                    <PaginationLink previous href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink href="#">
                                        1
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink href="#">
                                        2
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink href="#">
                                        3
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink href="#">
                                        4
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink href="#">
                                        5
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink next href="#" />
                                    </PaginationItem>
                                </Pagination>
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
            </Page>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoginSuccess: data => {
            // dispatch(actLoginSuccess(data));
        },
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ProductPage);