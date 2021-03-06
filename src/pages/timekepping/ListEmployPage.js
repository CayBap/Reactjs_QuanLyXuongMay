import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button,ButtonGroup ,CardFooter,
    Pagination,PaginationItem,PaginationLink,Modal, ModalHeader, ModalBody, ModalFooter,
    Form,FormGroup,Label,Input
} from 'reactstrap';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
const bem = bn.create('product');

class ListEmployPage extends React.Component {
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
                title="Danh sách nhân sự"
                breadcrumbs={[{ name: 'Chấm công', active: false }, { name: 'Danh sách nhân sự', active: true }]}>
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
                                            <th>Tên nhân viên</th>
                                            <th>
                                                phòng ban
                                            </th>
                                            <th>Ngày sinh</th>
                                            <th>số điện</th>
                                            <th>Thời gian nhập</th>
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr  className = {bem.e('row')} >
                                            <th scope="row">1</th>
                                            <td>Đỗ Thắng</td>
                                            <td>Phòng nhân sự</td>
                                            <td>12/12/1974</td>
                                            <td>0987456123</td>
                                            <td>01/01/2019</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button color = "info">Sửa</Button>
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
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
                    <ModalHeader>Thêm mới danh mục</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                            <Label for="name">Tên danh mục</Label>
                            <Input type="text" name="name" id="name" placeholder="Tên danh mục" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="shortName">Tên ngắn</Label>
                            <Input type="email" name="shortName" id="shortName" placeholder="Tên danh mục" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="description">Miêu tả</Label>
                            <Input type="textarea"   name="description" id="description" placeholder="Tên danh mục" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Lưu</Button>
                        <Button color="secondary" onClick={this.toggle}>Hủy bỏ</Button>
                    </ModalFooter>
                </Modal>
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
)(ListEmployPage);