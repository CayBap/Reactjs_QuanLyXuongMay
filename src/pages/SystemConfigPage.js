import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import NotificationSystem from 'react-notification-system';
import AvatarImg from "../assets/img/users/user1.jpg";
import Page from "../components/Page";
import {
    MdError,
    // MdCardGiftcard,
    MdInfo,
  } from 'react-icons/lib/md';
// import bn from "utils/bemnames";
import { actGetImportProductSuccess } from "../actions/importProductAct";
// const bem = bn.create("config-system");
import {featchGetCompany,featchCreateCompany} from '../services/apis/companyService';
class SystemConfigPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        avatar:'',
        name:'',
        shortName:'',
        adress:'',
        email:'',
        phoneNumber:'',
        fax:'',
        urlAvatar:'',

    };
  }
  handleChangeImage = e=>{ 
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
        document.querySelector('#avatar').src  = reader.result;
    };
      this.setState({avatar:e.target.files[0]});
  }
  handleChangeInput = e=>{ 
      this.setState({[e.target.name]:e.target.value});
  }
  componentDidMount(){ 
    featchGetCompany().then(result => {
        // const avatar
        const {
            name,
            shortName,
            adress,
            email,
            phoneNumber,
            fax
        } = result.data;
        console.log(fax, phoneNumber, name)
        const avatar = 'http://localhost:4040/static/company/' + result.data.avatar;
        this.setState({
            avatar,
            name,
            shortName,
            adress,
            email,
            phoneNumber,
            fax
        });
    })
  }
  handleOnSubmit = ()=>{ 
      featchCreateCompany(this.state).then(result=>{ 
        this.notificationSystem.addNotification({
            title: <MdInfo/>,
            message: 'Cập nhập thông tin thành công!',
            level: 'success',
        });
      }).catch(err => { 
        this.notificationSystem.addNotification({
            title: <MdError/>,
            message: 'Cập nhập thông tin thất bại!',
            level: 'error',
        });
      })
  }
  render() {
    return (
      <Page
        title="Thiết lập chung"
        breadcrumbs={[{ name: "Thiết lập chung", active: true }]}
      >
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Card>
              <CardHeader>Thiết lập chung</CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <div>
                      <img
                        alt="Ảnh đại diện"
                        src={this.state.avatar|| AvatarImg}
                        style={{ display: "block",height:200,margin:20 }}
                        id = 'avatar'
                      />
                      <input
                        accept="image/*"
                        type="file"
                        onChange={this.handleChangeImage}
                        name="avatar"
                      />
                    </div>
                  </Col>
                  <Col md={8}>
                    <Form>
                    <FormGroup>
                      <Label for="name">Tên công ty</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value = {this.state.name}
                        placeholder="Tên công ty"
                        onChange = {this.handleChangeInput}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Tên viết tắt</Label>
                      <Input
                        type="text"
                        name="shortName"
                        id="shortName"
                        value = {this.state.shortName}
                        placeholder="Tên viết tắt"
                        onChange = {this.handleChangeInput}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Địa chỉ</Label>
                      <Input
                        type="text"
                        name="adress"
                        value = {this.state.adress}
                        id="adress"
                        placeholder="Địa chỉ"
                        onChange = {this.handleChangeInput}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Email</Label>
                      <Input
                        type="email"
                        value = {this.state.email}
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange = {this.handleChangeInput}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Số điện thoại</Label>
                      <Input
                        type="text"
                        value = {this.state.phoneNumber}
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Số điện thoại"
                        onChange = {this.handleChangeInput}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">FAX</Label>
                      <Input
                        type="text"
                        name="fax"
                        value = {this.state.fax}
                        id="fax"
                        placeholder="FAX"
                        onChange = {this.handleChangeInput}
                      />
                    </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick = {this.handleOnSubmit}>Lưu thông tin </Button>
                <Button onClick = {()=>{ this.props.history.push('/admin')}}  style = {{marginLeft:20}}>Hủy </Button>
              </CardFooter>
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
const mapStateToProps = state => {
  return {
    importProduct: state.importProduct
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetImportProduct: data => {
      dispatch(actGetImportProductSuccess(data));
    }
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SystemConfigPage);
