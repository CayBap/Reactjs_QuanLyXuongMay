import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button,ButtonGroup } from 'reactstrap';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
const bem = bn.create('user');

class SalaryPage extends React.Component {
   
    render() {
        console.log(bem.e('row'))
        return (
            <Page
                // className="DashboardPage"
                title="Lương nhân viên"
                breadcrumbs={[{ name: 'Hệ thống', active: false }, { name: 'Lương nhân viên', active: true }]}>
                <Row>
                    <Col lg={8} md={6} sm={6} xs={12}>
                        <Card>
                            <CardHeader>
                                Danh sách người dùng
                        </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Họ tên</th>
                                            <th>Vai trò</th>
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr  className = {bem.e('row')}>
                                            <th scope="row">1</th>
                                            <td>Đỗ Hoa</td>
                                            <td>Quản trị</td>
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
                        </Card>
                    </Col>
                    <Col lg={4} md={6} sm={6} xs={12}>
                    <Card>
                            <CardHeader>
                                Top doanh thu
                        </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Họ tên</th>
                                            <th>Doanh thu</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className = {bem.e('row')}>
                                            <th scope="row">1</th>
                                            <td>Đỗ Thắng</td>
                                            <td>10 triệu</td>
                                        </tr>
                                        <tr className = {bem.e('row')}>
                                            <th scope="row">1</th>
                                            <td>Đỗ Thắng</td>
                                            <td>10 triệu</td>
                                        </tr>
                                        <tr className = {bem.e('row')}>
                                            <th scope="row">1</th>
                                            <td>Đỗ Thắng</td>
                                            <td>10 triệu</td>
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
)(SalaryPage);