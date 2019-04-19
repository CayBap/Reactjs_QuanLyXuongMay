import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,CardFooter ,Button} from 'reactstrap';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import {featchGetBoard} from '../../services/apis/userService';
import PaginationTable from '../../components/Pagination';
const bem = bn.create('user');

class SalaryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            entry: 5,
            currentPage: 0,
            // userId,
            // month,
            // year,
        }
    }
    componentWillMount() {
        featchGetBoard().then(result => {
            if (result.status === 200) {
                this.setState({ board: result.data });
            }
        })
    }
    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.state.board.slice(page*entry, page*entry+entry),currentPage:page});
    }
    
    render() {
        const { board } = this.state;
        const getSumValue = (obj) => {
            let sum = 0;
            obj.forEach(item => {
                sum += item.amount;
            })
            return sum;
        }
        const getSumValueForEmploy = (obj) => {
            let sum = 0;
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0
            });
            obj.forEach(item => {
                // console.log(item.amount,item.productUser.price)
                sum += item.amount * item.productId.priceForEmploy;
            });
            // console.log(sum)
            return formatter.format(sum);
        }
        return (
            <Page
                // className="DashboardPage"
                title="Lương nhân viên"
                breadcrumbs={[{ name: 'Hệ thống', active: false }, { name: 'Lương nhân viên', active: true }]}>
                <Row>
                    <Col lg={12} md={6} sm={6} xs={12}>
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
                                            <th>Sô lô </th>
                                            <th>Số sản phẩm</th>
                                            <th>Tổng lương</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            board.slice(this.state.currentPage * this.state.entry, this.state.currentPage* this.state.entry + this.state.entry).map((item,index) => {
                                              
                                                return (
                                                    <tr key = {item.user._id
                                                    }  className = {bem.e('row')}>
                                                    <th scope="row">{index+1+this.state.currentPage*this.state.entry}</th>
                                                        <td>{item.user.lastName + " "+item.user.firstName}</td>
                                                        <td>{item.productUser.length}</td>
                                                        <td>{
                                                            getSumValue(item.productUser)
                                                            // console.log(item)
                                                        }</td>
                                                        <td>{getSumValueForEmploy(item.productUser)}</td>
                                                        <td style = {{width:100}}><Button>Xuất bảng lương</Button></td>
                                                    {/* <td>{item.productUser.length}</td> */}
                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                            <PaginationTable data={board} entry={this.state.entry} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
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
)(SalaryPage);