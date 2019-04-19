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
// const bem = bn.create("config-system");
import {featchProfile,featchUpdateProfile} from '../services/apis/userService';
class UserInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        avatar:'',
        name:'',
        shortName:'',
        adress:'',
        email:'',
        phoneNumber:'',
        dob:'',
        urlAvatar:'',
        firstName:'',
        lastName:'',
        gender:true,
        phone:'',
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
      console.log(e)
      this.setState({[e.target.name]:e.target.value});
  }
  componentDidMount(){ 
    featchProfile().then(result => {
        // const avatar
        const {
            name,
            lastName,
            firstName,
            adress,
            email,
            phone,
            dob,
            gender,
        } = result.data;
        const avatar = 'http://localhost:4040/static/company/' + result.data.avatar;
        this.setState({
            avatar,
            name,
            lastName,
            firstName,
            adress,
            email,
            phone,
            dob,
            gender,
        });
    })
  }
  handleOnSubmit = ()=>{ 
    featchUpdateProfile(this.state).then(result=>{ 
        console.log(result)
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
        title="Thông tin cá nhân"
        breadcrumbs={[{ name: "Thông tin cá nhân", active: true }]}
      >
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Card>
              <CardHeader>Thông tin cá nhân</CardHeader>
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
                      <Label for="name">Tên</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value = {this.state.firstName}
                        placeholder="Tên"
                        onChange = {this.handleChangeInput}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Họ</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value = {this.state.lastName}
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
                        value = {this.state.phone}
                        name="phone"
                        id="phone"
                        placeholder="Số điện thoại"
                        onChange = {this.handleChangeInput}
                      />
                    </FormGroup>
                    <FormGroup>
                    <Label for="gender">Giới tính</Label>
                    <Input required value={this.state.gender} onChange={this.handleChangeInput} type="select" name="gender" id="gender" >
                        <option value = {true}>Nam</option>
                        <option value = {false}>Nữ</option>
                    </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Ngày sinh</Label>
                      <Input
                        type="date"
                        name="dob"
                        value = {this.state.dob}
                        id="dob"
                        placeholder="dob"
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
    userInfo: state.userInfo
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserInfoPage);
