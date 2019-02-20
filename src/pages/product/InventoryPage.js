import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button ,CardFooter,Pagination,PaginationItem,PaginationLink} from 'reactstrap';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
const bem = bn.create('product');

class ProductPage extends React.Component {
    handleOnClickProduc = id => {
        this.props.history.push('/admin/product/detail/' + id);
    }
    render() {
        return (
            <Page
                title="Tồn kho"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Tồn kho', active: true }]}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                               Hàng tồn kho
                                <Button style = {{float:'right'}} size = "sm" outline color='primary'>Thêm mới</Button>
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Hình ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá (đồng)</th>
                                            <th>Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr  className = {bem.e('row')} onClick = {()=>this.handleOnClickProduc('abc')}>
                                            <th scope="row">1</th>
                                            <td><img style = {{width:'100px'}} alt = "ảnh" src = 'http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg'></img></td>
                                            <td>Quẩn bò trẻ em</td>
                                            <td>50000</td>
                                            <td>3000</td>
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