import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader ,CardFooter,
    Pagination,PaginationItem,PaginationLink,
} from 'reactstrap';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
const bem = bn.create('product');

class PublicBoardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    render() {
        return (
            <Page
                title="Bảng công"
                breadcrumbs={[{ name: 'Chấm công', active: false }, { name: 'Bảng công', active: true }]}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                              Bảng công
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên nhân viên</th>
                                            <th>
                                                Ngày sinh
                                            </th>
                                            <th>Số công làm</th>
                                            <th>Lương/ngày</th>
                                            <th>Số ngày nghỉ</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr  className = {bem.e('row')} >
                                            <th scope="row">1</th>
                                            <td>Đỗ Thắng</td>
                                            <td>12/12/1974</td>
                                            <td>12</td>
                                            <td>2000000</td>
                                            <td>12</td>
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
                                    <PaginationItem active>
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
)(PublicBoardPage);