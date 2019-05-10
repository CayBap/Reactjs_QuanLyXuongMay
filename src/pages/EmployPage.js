import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import {
    Col, Row, Table, Card, CardBody, CardHeader, CardFooter, Label,
    Input , Button
} from 'reactstrap';
import NumberWidget from '../components/Widget/NumberWidget';
import Page from '../components/Page';
import bn from 'utils/bemnames';
import PaginationTable from '../components/Pagination';
import { actGetImportProductSuccess } from '../actions/importProductAct';
import { featchGetDeliveryByUser } from '../services/apis/deliveryService';
const bem = bn.create('product');
const now = new Date();
const nowString = now.getFullYear() + '-' + (now.getMonth()  < 10 ? '0' + (now.getMonth() +1) : now.getMonth() + 1) + '-30';
const lastString = now.getFullYear() + '-' + (now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1) + '-01';

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
class EmployPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            shortName: '',
            unit: '',
            totalPrice: '',
            timeToEnd: '',
            amount: '',
            dataForPage: [],
            entry: 5,
            currentPage: 0,
            id: '',
            delivery: [],
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
            from:lastString,
            to: nowString,
            search:'',
        };
    
      }
    componentWillMount() {
        const {from ,to } = this.state;
          const query = {
              from,
              to,
          };
          featchGetDeliveryByUser(localStorage.getItem('id'),query).then(result => {

              let value1 = 0;
              let value2 = 0;
              let value3 = 0;
              let value4 = 0;
                result.data.forEach(item => {
                    value1 += item.amount * item.productId.priceForEmploy;
                    value2++;
                    if (item.finished) {
                        value3++;
                    } else {
                        value4++;
                    }
                });
              this.setState({ delivery: result.data,value1,value2,value3,value4 });
          })
    }
    componentDidMount() {
        document.querySelector('.navbar-nav').style.display = 'none';
        
    }
    handleClickPull = () => { 
        const {from ,to } = this.state;
        const query = {
            from,
            to,
        };
        featchGetDeliveryByUser(localStorage.getItem('id'), query).then(result => {

            let value1 = 0;
            let value2 = 0;
            let value3 = 0;
            let value4 = 0;
            result.data.forEach(item => {
                value1 += item.amount * item.productId.priceForEmploy;
                value2++;
                if (item.finished) {
                    value3++;
                } else {
                    value4++;
                }
            });
            this.setState({ delivery: result.data, value1, value2, value3, value4 });
        });
    }

    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.state.delivery.slice(page*entry, page*entry+entry),currentPage:page});
    }
    handleChangeInput = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    render() {
        const { currentPage, from, to, search } = this.state;
        let delivery = this.state.delivery;
        // console.log(delivery)
        
        if (this.state.search !== '') { 
            delivery = delivery.filter(item => {
                // return item.
                if(inorgesign(item.productName).search(inorgesign(this.state.search))>=0)
                    return true;
                return false;
            })
        }
        const getSumValueForEmploy =(price) => {
          
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0
            });
            return formatter.format(price);
        }

        
        return (
            <Page
                title="Thợ may"
                breadcrumbs={[ { name: 'Thợ may', active: true }]}>
                <Row>
                    <Col lg={8} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                              Danh sách hàng đã nhận
                                  <div>
                                    <Label for="to" style = {{textTransform:"none"}}>Từ ngày</Label>
                                    <Input type="date" name="from" id="from" value ={from.toString()} onChange = {this.handleChangeInput}  />
                                    <Label for="to" style = {{textTransform:"none"}}>Đến ngày</Label>
                                    <Input type="date" name="to" id="to" value = {to.toString()} onChange = {this.handleChangeInput}   />
                                    <Button onClick = {this.handleClickPull} style={{ marginTop: 10,marginBottom:10 }}>Lọc</Button>
                                    <Input placeholder='Tìm kiếm ...' type="search" name="search" id="search" value = {search} onChange = {this.handleChangeInput}   />
                                  </div>
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên hàng</th>
                                            <th>
                                                Kích thước / màu sắc
                                            </th>
                                            <th>Số lượng</th>
                                            <th>Giá/sản phẩm</th>
                                            <th>Thành tiền</th>
                                            <th>Thời gian nhập</th>
                                            <th>Trạng thái</th>
                                            {/* <th style = {{width:200}}>Thao tác</th> */}
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {
                                            delivery.slice(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry).map((item,index) => {
                                                return (
                                                    <tr  key = {item._id} className = {bem.e('row')} >
                                                        <th scope="row">{index+1}</th>
                                                        <td>{item.productName}</td>
                                                        <td>{item.size +' / '+item.color}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{getSumValueForEmploy(item.productId.priceForEmploy)}</td>
                                                        <td>{getSumValueForEmploy(item.productId.priceForEmploy*item.amount)}</td>

                                                        <td>{item.timeToEnd}</td>
                                                        <td>{item.finished?<span style = {{color:'green'}}>Đã trả</span>:<span style = {{color:'red'}}>Chưa trả</span>}</td>
                                            {/* <td>
                                                <ButtonGroup>
                                                    <Button color = "info">Sửa</Button>
                                                    <Button color = "danger">Xóa</Button>
                                                </ButtonGroup>
                                            </td> */}
                                                </tr>
                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                <PaginationTable data={delivery} entry={10} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col lg={4} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                              Thống kê
                            </CardHeader>
                            <CardBody>
                                <NumberWidget
                                    style = {{margin:10}}
                                title="Tổng thu nhập"
                                subtitle="Tháng này"
                                number={getSumValueForEmploy(this.state.value1)}
                                color="secondary"
                                progress={{
                                    value: 100,
                                    label: 'Tháng trước',
                                }}
                                />
                                <NumberWidget
                                    style = {{margin:10}}
                                title="Tổng số lô đã nhận"
                                subtitle="Tháng này"
                                number={(this.state.value2)}
                                color="primary"
                                progress={{
                                    value: 100,
                                    label: 'Tháng trước',
                                }}
                                />
                                <NumberWidget
                                    style = {{margin:10}}
                                title="Tổng sô lô đã trả"
                                subtitle="Tháng này"
                                number={(this.state.value3)}
                                color="info"
                                progress={{
                                    value: 100,
                                    label: 'Tháng trước',
                                }}
                                />
                                <NumberWidget
                                    style = {{margin:10}}
                                title="Tổng sô lô chưa trả"
                                subtitle="Tháng này"
                                number={(this.state.value4)}
                                color="danger"
                                progress={{
                                    value: 100,
                                    label: 'Tháng trước',
                                }}
                                />
                            </CardBody>
                            <CardFooter>
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
        importProduct: state.importProduct
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetImportProduct: data => {
            dispatch(actGetImportProductSuccess(data));
        },
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(EmployPage);