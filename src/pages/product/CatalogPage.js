import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button,ButtonGroup ,CardFooter,
   Modal, ModalHeader, ModalBody, ModalFooter,
    Form,FormGroup,Label,Input
} from 'reactstrap';
import {
    MdError,
    // MdCardGiftcard,
    MdInfo,
  } from 'react-icons/lib/md';
import NotificationSystem from 'react-notification-system';
import { featchCreateCate, featchGetCate, featchDeleteCate, featchUpdateCate } from '../../services/apis/cateService';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import { actGetCateSuccess } from '../../actions/cateAct';
import PaginationTable from '../../components/Pagination';
const bem = bn.create('product');

class CatalogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalUpdate: false,
            name:"",
            shortName:'',
            description: '',
            updateName: '',
            updateShortName: '',
            updateDescription: '',
            // currentCate:{},
            id: '',
            dataForPage: [],
            entry: 5,
            currentPage:0,
        };
    
        this.toggle = this.toggle.bind(this);
      }
    componentWillMount() {
        featchGetCate().then(result => {
            this.props.onGetCateSuccess(result.data);
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
    handleCloseModel = () => {
        this.setState({ modalUpdate: false });
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
            //    this.setState({ dataForPage: result.data.slice(0, this.state.entry) });
                this.props.onGetCateSuccess(result.data);
            });
            this.setState({ description: '', name: '', id:'', shortName: '' });
        }).catch(err => {
            this.notificationSystem.addNotification({
                title: <MdError/>,
                message: 'Thêm mới danh mục thất bại!',
                level: 'error',
              });
        })
    }
    handleUpdateCate = () => {
        featchUpdateCate(this.state.id, { name: this.state.updateName, shortName: this.state.updateShortName, description: this.state.updateDescription }).then(result => {
            featchGetCate().then(result => {
                // console.log(result.data)
                this.notificationSystem.addNotification({
                    title: <MdInfo />,
                    message: 'Cập nhập danh mục thành công!',
                    level: 'success',
                });
            //    this.setState({ dataForPage: result.data.slice(0, this.state.entry) });
            this.props.onGetCateSuccess(result.data);
            });
            this.setState({ modalUpdate: false });
        }).catch(err => {
            this.notificationSystem.addNotification({
                title: <MdError />,
                message: 'Cập nhập danh mục thất bại!',
                level: 'error',
            });
        });

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
                this.setState({ updateDescription: '', updateName: '', id, updateShortName: '' });
                // this.setState({ dataForPage: result.data.slice(0, this.state.entry) });
                this.props.onGetCateSuccess(result.data);
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
        const currentCate = this.props.cate.cates.find(item => {
           return item._id === id;
        })
        if (currentCate) {
            this.setState({ updateDescription: currentCate.description, updateName: currentCate.name, id, updateShortName: currentCate.shortName });
            this.toggleUpdate();
        }

    }
    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.props.cate.cates.slice(page*entry, page*entry+entry),currentPage:page});
    }
    render() {
        const { name, shortName, description,updateName,updateDescription,updateShortName,currentPage} = this.state;
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
                                            cates.slice(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry).map((item, index) => {
                                                console.log(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry)
                                                return <tr key = {index}  className = {bem.e('row')} >
                                                    <th scope="row">{ currentPage * this.state.entry+index+1}</th>
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
                                <PaginationTable data={cates} entry={10} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
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
                <Modal isOpen={this.state.modalUpdate} toggle={this.handleCloseModel} className={this.props.className} >
                    <ModalHeader>Cập nhập danh mục</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                            <Label for="updateName">Tên danh mục</Label>
                            <Input type="text" name="updateName" id="updateName" value ={updateName} onChange = {this.handleChangeInput} placeholder="Tên danh mục" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="updateShortName">Tên ngắn</Label>
                            <Input type="text" name="updateShortName" id="updateShortName" value = {updateShortName} onChange = {this.handleChangeInput}  placeholder="Tên ngắn" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="updateDescription">Miêu tả</Label>
                            <Input type="textarea"   name="updateDescription" id="updateDescription" value = {updateDescription} onChange = {this.handleChangeInput} placeholder="Miêu tả" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={ this.handleUpdateCate}>Lưu</Button>
                        <Button color="secondary" onClick={this.handleCloseModel}>Hủy bỏ</Button>
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