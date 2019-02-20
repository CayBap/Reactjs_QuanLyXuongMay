import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button,ButtonGroup ,CardFooter,
    Pagination,PaginationItem,PaginationLink,Modal, ModalHeader, ModalBody, ModalFooter,
    Form,FormGroup,Label,Input
} from 'reactstrap';
import {
    MdError,
    // MdCardGiftcard,
    MdInfo,
  } from 'react-icons/lib/md';
import NotificationSystem from 'react-notification-system';
import { featchCreateCate, featchGetCate, featchDeleteCate } from '../../services/apis/cateService';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import { actGetCateSuccess } from '../../actions/cateAct';
const bem = bn.create('product');

class CatalogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalUpdate: false,
            name:"",
            shortName:'',
            description:'',
        };
    
        this.toggle = this.toggle.bind(this);
      }
    componentWillMount() {
        featchGetCate().then(result => {
            // console.log(result.data)
            this.props.onGetCateSuccess(result.data)
        });
    }
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    toggleUpdate() {
        this.setState(prevState => ({
          modalUpdate: !prevState.modalUpdate
        }));
      }
    handleOnClickProduc = id => {
        this.props.history.push('/admin/product/detail/' + id);
    }
    handleChangeInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSaveCate = () => {
        const { name, shortName, description } = this.state;
        this.setState(prevState => ({
            modal: !prevState.modal
          }));
        const body = {
            name,
            shortName,
            description,
        };
        featchCreateCate(body).then(result => {
            this.notificationSystem.addNotification({
                title: <MdInfo/>,
                message: 'Thêm mới danh mục thành công!',
                level: 'success',
            });
            featchGetCate().then(result => {
                // console.log(result.data)
                this.props.onGetCateSuccess(result.data)
            });
        }).catch(err => {
            this.notificationSystem.addNotification({
                title: <MdError/>,
                message: 'Thêm mới danh mục thất bại!',
                level: 'error',
              });
        })
    }
    handleDeleteCate = (id) => {
        featchDeleteCate(id).then(result => {
            this.notificationSystem.addNotification({
                title: <MdInfo/>,
                message: 'Xóa danh mục thành công!',
                level: 'success',
            });
            featchGetCate().then(result => {
                // console.log(result.data)
                this.props.onGetCateSuccess(result.data)
            });
        }).catch(err => {
            this.notificationSystem.addNotification({
                title: <MdError/>,
                message: 'Xóa danh mục thất bại!',
                level: 'error',
              });
        })

    }
    handleOpenUpdateModel = (id) => {
        this.toggleUpdate();

    }
    render() {
        const { name, shortName, description } = this.state;
        const { cate } = this.props;
        const cates = cate.cates || [];
        return (
            <Page
                title="Danh mục"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Danh mục', active: true }]}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                              Danh sách danh mục
                                <Button style = {{float:'right'}} size = "sm" outline color='primary' onClick={this.toggle}>Thêm mới</Button>
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên danh mục</th>
                                            <th>Mô tả</th>
                                            <th>Tên ngắn</th>
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            cates.map((item,index) => {
                                                return <tr  className = {bem.e('row')} >
                                                    <th scope="row">{index}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.shortName}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Button color = "info" onClick = {()=>this.handleOpenUpdateModel(item._id)}>Sửa</Button>
                                                        <Button color = "danger" onClick = {()=>this.handleDeleteCate(item._id)}>Xóa</Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                            })
                                        }
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
                            <Input type="text" name="name" id="name" value ={name} onChange = {this.handleChangeInput} placeholder="Tên danh mục" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="shortName">Tên ngắn</Label>
                            <Input type="email" name="shortName" id="shortName" value = {shortName} onChange = {this.handleChangeInput}  placeholder="Tên ngắn" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="description">Miêu tả</Label>
                            <Input type="textarea"   name="description" id="description" value = {description} onChange = {this.handleChangeInput} placeholder="Miêu tả" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={ this.handleSaveCate}>Lưu</Button>
                        <Button color="secondary" onClick={this.toggle}>Hủy bỏ</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalUpdate} toggle={this.toggleUpdate} className={this.props.className} >
                    <ModalHeader>Cập nhập danh mục</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                            <Label for="name">Tên danh mục</Label>
                            <Input type="text" name="name" id="name" value ={name} onChange = {this.handleChangeInput} placeholder="Tên danh mục" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="shortName">Tên ngắn</Label>
                            <Input type="email" name="shortName" id="shortName" value = {shortName} onChange = {this.handleChangeInput}  placeholder="Tên ngắn" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="description">Miêu tả</Label>
                            <Input type="textarea"   name="description" id="description" value = {description} onChange = {this.handleChangeInput} placeholder="Miêu tả" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={ this.handleSaveCate}>Lưu</Button>
                        <Button color="secondary" onClick={this.toggleUpdate}>Hủy bỏ</Button>
                    </ModalFooter>
                </Modal>
                <NotificationSystem
                dismissible={false}
                ref={notificationSystem =>
                    (this.notificationSystem = notificationSystem)
                }
                
                // style={NOTIFICATION_SYSTEM_STYLE}
                />
            </Page>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        cate:state.cate
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
)(CatalogPage);