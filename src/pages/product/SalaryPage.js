import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,CardFooter ,Button,Modal,ModalHeader,ModalBody,Form,Label,Input,ModalFooter,FormGroup} from 'reactstrap';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import {featchGetBoard, featchExport,featchAddLog} from '../../services/apis/userService';
import PaginationTable from '../../components/Pagination';
const bem = bn.create('user');

const now = new Date();
const nowString = now.getFullYear() + '-' + (now.getMonth()  < 10 ? '0' + (now.getMonth() +1) : now.getMonth() + 1) + '-30';
const lastString = now.getFullYear() + '-' + (now.getMonth() < 10 ? '0' + (now.getMonth()+1) : now.getMonth() +1) + '-01';
const formatValue = (value) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });
   
    // console.log(sum)
    return formatter.format(value);
}
const showData = (data) => { 
    let trs = '';
    console.log(data)
    data.forEach((item, index) => {
        console.log(item)
        trs += `
        <tr>
            <td style="text-align:center; width:38px"><span >${index}</span></td>
            <td style="width:151px"><span >${item.productName}</span></td>
            <td style="width:129px"><span >${item.amount}</span></td>
            <td style="width:148px"><span >${formatValue(item.productId.priceForEmploy)}</span></td>
            <td style="width:173px"><span >${formatValue(item.productId.priceForEmploy * item.amount)}</span></td>
        </tr>
        `;
    });
    return trs;
}
const inorgesign = alias => {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');

    // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    return str;
  };
class SalaryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mainBoard:[],
            board: [],
            entry: 5,
            currentPage: 0,
            modal: false,
            from: lastString,
            to: nowString,
            fullName: localStorage.getItem('name'),
            userId: '',
            searchName: '',
            modalLog: false,
            logSelect:[],
            // userId,
            // month,
            // year,
        }
    }
    componentWillMount() {
        featchGetBoard(this.state.from,this.state.to).then(result => {
            if (result.status === 200) {
                this.setState({ board: result.data });
                this.setState({ mainBoard: result.data });
            }
        })
    }
    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.state.board.slice(page*entry, page*entry+entry),currentPage:page});
    }
     getSumValueForEmploy = (obj) => {
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
    handleChangeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleClickSearch = () => {
        const { mainBoard } = this.state;
        const board = mainBoard.filter(item => {
            // return item.
            const fullName = inorgesign(item.user.lastName + ' ' + item.user.firstName);
            if(fullName.search(inorgesign(this.state.searchName))>=0)
                return true;
            return false;
        })
        this.setState({ board });
    }
    render() {
        const { board, from, to, fullName } = this.state;
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
                sum += item.amount * item.productId.priceForEmploy;
            });
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
                                <FormGroup>
                            <Label for="from" style = {{textTransform:"none"}}>Từ ngày</Label>
                            <Input type="date" name="from" id="from" value ={from.toString()} onChange = {this.handleChangeInput}  />
                            </FormGroup>
                            <FormGroup>
                            <Label for="to" style = {{textTransform:"none"}}>Đến ngày</Label>
                            <Input type="date" name="to" id="to" value = {to.toString()} onChange = {this.handleChangeInput}   />
                            </FormGroup>
                                <Button onClick={() => { 
                                    featchGetBoard(this.state.from,this.state.to).then(result => {
                                        if (result.status === 200) {
                                            this.setState({ board: result.data });
                                        }
                                    })
                            }}>Lọc</Button>
                        </CardHeader>
                            <CardHeader>
                                <Input  onChange={this.handleChangeInput} name='searchName' value={this.state.searchName} type="search" style={{ width: 200 ,float:"left"}} placeholder='Tìm kiếm nhân viên ...'></Input>
                                <Button onClick = {this.handleClickSearch} style = {{marginLeft:20}}>Tìm kiếm</Button>
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
                                                        <td style = {{width:250}}>
                                                        <Button color='primary' style={{marginRight:10}} onClick ={()=>this.toggleLog(item.log)}>Logs </Button>
                                                        <Button onClick ={()=>this.selectUser(item.user._id)}>Xuất bảng lương</Button>
                                                        </td>
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
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
                    <ModalHeader>Xuất bảng lương</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="from">Từ ngày</Label>
                                <Input type="date" name="from" id="from" value ={from.toString()} onChange = {this.handleChangeInput}  />
                            </FormGroup>
                            <FormGroup>
                                <Label for="to">Đến ngày</Label>
                                <Input type="date" name="to" id="to" value = {to.toString()} onChange = {this.handleChangeInput}   />
                            </FormGroup>
                            <FormGroup>
                                <Label for="fullName">Họ tên người xuất</Label>
                                <Input type="text" name="fullName" id="fullName" value = {fullName} onChange = {this.handleChangeInput}  placeholder="Họ tên người xuất" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={ this.onPrint}>Xuất</Button>
                        <Button color="secondary" onClick={this.toggle}>Hủy bỏ</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalLog} toggle={()=>this.toggleLog()} className={this.props.className} style = {{maxWidth:700}} >
                    <ModalHeader>Xuất bảng lương</ModalHeader>
                    <ModalBody>
                        <Table>
                            <thead>
                                <th>STT</th>
                                <th>Thời gian tạo</th>
                                <th>Người xuất</th>
                                <th>Tên nhân viên</th>
                                <th>Lương</th>
                            </thead>
                            {
                                this.state.logSelect ? this.state.logSelect.map((item, index) => {
                                    const dateTime = new Date(item.createdAt);
                                    return (
                                        <tr key= {index}>
                                            <td>{index}</td>
                                            <td>{dateTime.getDate() + '/' + dateTime.getMonth() + '/' + dateTime.getFullYear()}</td>
                                           
                                            <td>{item.createdBy.lastName + " " + item.createdBy.firstName}</td>
                                            <td>{item.userId.lastName + " " + item.userId.firstName}</td>
                                            <td>{item.salary}</td>
                                        </tr>
                                    )
                                }) : null
                            }
                       </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={()=>this.toggleLog()}>Đóng</Button>
                    </ModalFooter>
                </Modal>
            </Page>
        );
    }
    selectUser = (id)=>{ 
        this.setState({ modal: true, userId: id });
    }
    toggle =()=> {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    toggleLog = (log) => {
        if (log) { 
            this.setState({
                logSelect: log,
            });
        }

        this.setState(prevState => ({
          modalLog: !prevState.modalLog
        }));
    }
    handleChangeInput = (e) => { 
        this.setState({ [e.target.name]: e.target.value });
    }
    onPrint = () => {
        
        const { userId } = this.state;
        const sefl = this;

        featchExport(userId, this.state.from, this.state.to).then(result => {
            const {
                data,
            } = result;
            if (data) {
                const {
                    user,
                    company
                } = data;
                const body = {
                    userId: user._id,
                    salary: sefl.getSumValueForEmploy(data.products),
                };
                featchAddLog(body).then(log => {
                    var mywindow = window.open('', 'PRINT');

                    // mywindow.document.write('<html><head><title>' + document.title  + '</title>');
                    mywindow.document.write('</head><body >');
                    // mywindow.document.write('<h1>' + document.title  + '</h1>');
                    mywindow.document.write(`
            <style>
            #table {
                border-collapse: collapse;
              }
              
              #table, #table>th, #table>td {
                border: 1px solid black;
              }
            </style>
            <table border="0" cellpadding="0" cellspacing="0" style="width:100%">
            <tbody>
                <tr>
                    <td>
                    <p style="text-align:center">&nbsp;</p>
        
                    <p style="text-align:center"><span ><strong>${company.name}</strong></span></p>
        
                    <p style="text-align:center"><span >Địa chỉ: ${company.adress}</span></p>
        
                    <p>&nbsp;</p>
                    </td>
                    <td style="text-align:center">
                    <p><span ><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></span></p>
        
                    <p><span >Độc lập - Tự do - Hạnh phúc</span></p>
                    </td>
                </tr>
            </tbody>
            </table>
            
            <h2 style="text-align:center"><span ><strong>BẢNG LƯƠNG NHÂN VIÊN</strong></span></h2>
            
            <p><br />
            <span >Họ tên : ${user.lastName + " " + user.firstName}</span></p>
            
            <p><span >Số điện thoại: ${user.phone}</span></p>
            
            <p><span >Địa chỉ : Cụm 8 - Hiệp Thuận - Phúc Thọ - Hà Nội</span></p>
            
            <p><span >Email: ${user.email}</span></p>
            
            <p><span >Giới tính: ${user.gender ? 'Nam' : 'Nữ'}</span></p>
            <p><span >Thời gian sản xuất: từ ${this.state.from + " đến " + this.state.to}</span></p>
            
            <h3><span ><strong>Danh sách sản phẩm</strong></span></h3>
            
            <table border="1" cellpadding="0" cellspacing="0" style="width:100%" id='table'>
                <thead>
                    <tr>
                        <td style="text-align:center; width:38px"><span ><strong>STT</strong></span></td>
                        <td style="text-align:center; width:300px"><span ><strong>Tên SP</strong></span></td>
                        <td style="text-align:center; width:129px"><span ><strong>Số Lượng</strong></span></td>
                        <td style="text-align:center; width:148px"><span ><strong>Đơn giá</strong></span></td>
                        <td style="text-align:center; width:173px"><span ><strong>Thành tiền</strong></span></td>
                    </tr>
                </thead>
                <tbody>
                  ${
                        showData(data.products)
                        }
                   
                    <tr>
                        <td colspan="4" rowspan="1" style="text-align:center; width:99px">
                        <p><span ><strong>Tổng lương</strong></span></p>
                        </td>
                        <td style="width:173px"><span ><strong>${sefl.getSumValueForEmploy(data.products)}</strong></span></td>
                    </tr>
                </tbody>
            </table>
            
            <p>&nbsp;</p>
            
            <p>&nbsp;</p>
            
            <table border="0" cellpadding="0" cellspacing="0" style="width:100%">
                <tbody>
                    <tr>
                        <td style="width:336px">
                        <p><span >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>
            
                        <p>&nbsp;</p>
                        </td>
                        <td style="text-align:center; width:255px">
                        <p><span >Hà Nội, ${now.getHours()} giờ ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}</span></p>
            
                        <p><span ><strong>Nhân viên xuất</strong></span></p>
            
                        <p><span >(ký tên)</span></p>
            
                        <p>&nbsp;</p>
            
                        <p>&nbsp;</p>
            
                        <p>&nbsp;</p>
            
                        <p><span >${this.state.fullName}</span></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        
            `);
                    mywindow.document.write('</body></html>');

                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/

                    mywindow.print();
                    mywindow.close();
                });
            
            }
            

        }).catch(err => {
            alert('Lỗi');
        })

        return true;
        //nội dung

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