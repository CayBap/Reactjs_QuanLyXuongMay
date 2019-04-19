import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button,ButtonGroup ,CardFooter,
   Modal, ModalHeader, ModalBody, ModalFooter,
    Form,FormGroup,Label,Input
} from 'reactstrap';
import NotificationSystem from 'react-notification-system';
import {
    MdError,
    // MdCardGiftcard,
    MdInfo,
  } from 'react-icons/lib/md';
import Page from '../components/Page';
import bn from 'utils/bemnames';
import PaginationTable from '../components/Pagination';
import { featchGetRole, featchCreateRole, featchDeleteRole, featchUpdateRole } from '../services/apis/roleService';
import { actGetRoleSuccess } from '../actions/roleAct';
const bem = bn.create('user');

class RolePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            parrent:'',
            description: '',
            isLocked:false,
            role:'',
            modal: false,
            dataForPage: [],
            entry: 5,
            currentPage: 0,
            id: '',
            userId:'',
            isRed: false,
            roles: [],
            deleteModal: false,
            state:'',
        };
    
        this.toggle = this.toggle.bind(this);
    }
      componentWillMount() {
          featchGetRole().then(result => {
            this.props.onGetRole(result.data);
              
          });
    }

    toggle() {
        this.setState({ state: 'add' });
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    deleteToggle(id) {
        if (id) {
            this.setState({id})
        }
        this.setState(prevState => ({
            deleteModal: !prevState.deleteModal
          }));
    }

    handleSubmitCreate = e => {
        e.preventDefault();
        const { name,parrent,description } = this.state;
        if (name !== "") {
            const body = {
                name,parrent,description
            }
            if (this.state.state === 'add') {
                featchCreateRole(body).then(result => {
                    if (result.status === 200) {
                        this.notificationSystem.addNotification({
                            title: <MdInfo/>,
                            message: 'Thêm mới vai trò thành công!',
                            level: 'success',
                        });
                        // this.state.name = '';
                        // this.state.parrent = '';
                        // this.state.description = '';
                        this.setState({name: '', parrent: '', description: ''});
                        
                        featchGetRole().then(result => {
                          this.props.onGetRole(result.data);
                        });
                        this.setState({ modal: false });
                    }
                }).catch(err => {
                    this.notificationSystem.addNotification({
                        title: <MdError/>,
                        message: 'Thêm mới vai trò thất bại!',
                        level: 'error',
                    });
                })
            }
            if (this.state.state === 'update') {
                featchUpdateRole(this.state.id,body).then(result => {
                    if (result.status === 200) {
                        this.notificationSystem.addNotification({
                            title: <MdInfo/>,
                            message: 'Cập nhập hàng nhập thành công!',
                            level: 'success',
                        });
                        featchGetRole().then(result => {
                          this.props.onGetRole(result.data);
                        });
                        this.setState({ modal: false });
                    }
                }).catch(err => {
                    this.notificationSystem.addNotification({
                        title: <MdError/>,
                        message: 'Cập nhập hàng nhập thành công!',
                        level: 'error',
                    });
                })
            }
        } else {
            this.setState({ isRed: true });
        }
    }

    handleChageInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.props.role.roles.slice(page*entry, page*entry+entry),currentPage:page});
    }
    handleOnDelete = () => {
        this.setState({ deleteModal: false });
        featchDeleteRole(this.state.id).then(result=>{
            if (result.status === 200) {
                featchGetRole().then(result => {
                    this.props.onGetRole(result.data);
                });
                this.notificationSystem.addNotification({
                    title: <MdInfo/>,
                    message: 'Xóa vai trò thành công!',
                    level: 'success',
                });
                this.setState({

                })
            } else {
                this.notificationSystem.addNotification({
                    title: <MdError/>,
                    message: 'Xóa vai trò thất bại!',
                    level: 'error',
                });
            }
        }).catch(err => {
            this.notificationSystem.addNotification({
                title: <MdError/>,
                message: 'Xóa vai trò thất bại!',
                level: 'error',
            });
        })
    }
    handleUpdate = (id) => {
        this.setState({ id, state: 'update' });
        this.setState({ modal: true });
        const { role } = this.props;
        const roles = role.roles || [];
        const cuRole = roles.find(item => {
            return item._id === id;
        });
       
        const { name, parrent, description ,isLocked} = cuRole;
        this.setState({ name, parrent: (parrent ? parrent._id : ''), description,isLocked });
    }
    render() {
        const { currentPage } = this.state;
        const { role} = this.props;
        const roles = role.roles || [];
        return (
            <Page
                title="Vai trò"
                breadcrumbs={[{ name: 'Hệ thống', active: false }, { name: 'Vai trò', active: true }]}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                              Danh sách vai trò
                                <Button style = {{float:'right'}} size = "sm" outline color='primary' onClick={this.toggle}>Thêm mới</Button>
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên vai trò</th>
                                            <th>Quyền cha</th>
                                            <th>Slug</th>
                                            <th>Trạng thái</th>
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {
                                        roles.slice(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry).map((item,index) => {
                                            return (
                                                // <tr  key = {item._id} className = {bem.e('row')} onClick = {()=>this.handleOnClickProduc(item._id)}>
                                                <tr  key = {item._id} className = {bem.e('row')} >
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.parrent?item.parrent.name:''}</td>
                                                    <td>{item.slug}</td>
                                                    <td>{item.isLocked?'Đã khóa':'Hoạt động'}</td>
                                                    <td>
                                                        <ButtonGroup>
                                                            <Button color = "info" onClick = {()=>this.handleUpdate(item._id)}>Sửa</Button>
                                                            <Button color = "danger" onClick = {()=>this.deleteToggle(item._id)} >Xóa</Button>
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
                                <PaginationTable data={roles} entry={this.state.entry} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
                    <Form onSubmit = {this.handleSubmitCreate}>
                        <ModalHeader>Thêm mới vai trò</ModalHeader>
                        <ModalBody>
                            
                            <FormGroup>
                                <Label for="phone">Tên vai trò</Label>
                                <Input required value = {this.state.name} onChange = {this.handleChageInput}  type="text" name="name" id="name" placeholder="Tên vai trò" />
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="gender">Thuộc vai trò</Label>
                                <Input  value={this.state.parrent} onChange={this.handleChageInput} type="select" name="parrent" id="parrent" >
                                <option value=''>--Lựa chọn vai trò cha--</option>
                                    {

                                        roles.filter(item => !item.parrent).map(item => { 
                                            // console.log(item._id,item.name)
                                            return  <option value={item._id} key = {item._id}>{item.name}</option>
                                        })
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="gender">Trạng thái</Label>
                                <Input  value={this.state.isLocked} onChange={this.handleChageInput} type="select" name="isLocked" id="isLocked" >
                                <option value=''>--Trạng thái--</option>
                                <option value={true}>Hoạt động</option>
                                <option value={false}>Khóa</option>
                                   
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="role">Mô tả</Label>
                                <Input  value={this.state.description} onChange={this.handleChageInput} type="textarea" name="description" id="description" >
                                   
                                </Input>
                            </FormGroup>
                           
                        </ModalBody>
                        <ModalFooter>
                            <Button type = "submit" color="primary" >Lưu</Button>
                            <Button color="secondary" onClick={this.toggle}>Hủy bỏ</Button>
                        </ModalFooter>

                    </Form>
                </Modal>
                <NotificationSystem
                dismissible={false}
                ref={notificationSystem =>
                    (this.notificationSystem = notificationSystem)
                }
                />
                <Modal isOpen={this.state.deleteModal} toggle={()=>this.deleteToggle()} className={this.props.className}>
                    <ModalHeader toggle={()=>this.deleteToggle()} >Cảnh báo</ModalHeader>
                    <ModalBody>
                        Bạn có chắc chắn muốn xóa sản phẩm?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleOnDelete}>Xóa</Button>{' '}
                        <Button color="secondary" onClick={()=>this.deleteToggle()} >Hủy</Button>
                    </ModalFooter>
                </Modal>
            </Page>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        role:state.role
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
     
        onGetRole: data => {
            dispatch(actGetRoleSuccess(data));
        }
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(RolePage);