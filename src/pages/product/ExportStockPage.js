import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button ,CardFooter,
   Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup,Label,Input
} from 'reactstrap';
import Select from 'react-select';
import NotificationSystem from 'react-notification-system';
import {
    MdError,
    // MdCardGiftcard,
    MdInfo,
  } from 'react-icons/lib/md';
import Page from '../../components/Page';
import { featchGetProduct } from '../../services/apis/productService';
import { featchCreateExportProduct ,} from '../../services/apis/exportProductService';
const now = new Date();
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
    data.forEach((item, index) => {
        console.log(item)
        trs += `
        <tr>
            <td style="text-align:center; width:38px"><span >${index}</span></td>
            <td style="width:151px"><span >${item.name}</span></td>
            <td style="width:129px"><span >${item.amount}</span></td>
            <td style="width:148px"><span >${formatValue(item.price)}</span></td>
            <td style="width:173px"><span >${formatValue(item.price * item.amount)}</span></td>
        </tr>
        `;
    });
    return trs;
}
class ExportStockPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selectProduct: [],
            selectedOption: null,
            invoice:true,
            customer: {
                name: '',
                phone: '',
                email: '',
            },
        };
    
    }
    componentWillMount() { 
        featchGetProduct().then(result => {
            // console.log(result)
            const products = result.data;
            this.setState({products})
        });
    }
    handleChange = product => { 
        const { selectProduct,products } = this.state;
        const cuProduct = products.find(item => {
            return item._id === product.value;
        });
        cuProduct.label = cuProduct.name;
        cuProduct.value = cuProduct._id;
        this.setState({ selectedOption: cuProduct });
        selectProduct.push(cuProduct);

    }
    handleChangeSelectOption = (product) => { 
        this.setState({ selectedOption: product });
    }
    handleChangeInput = (e) => { 
        const { selectedOption } = this.state;
        if (e.target.name === 'selectAmount') { 
            if (e.target.value <= selectedOption.inventory) { 
                selectedOption[e.target.name] = e.target.value;
            }
        }else 
        selectedOption[e.target.name] = e.target.value;
        this.setState({ selectedOption });
    }
    handleChangeInvoice = e => { 
        console.log(e.target.value)
        const {invoice } = this.state;
        // this.setState({ [e.target.name]: e.target.checked });
        this.setState({invoice:!invoice})
    }
  
    handleRemove = (item) => { 
        const { selectProduct } = this.state;
        const newSelectProduct = selectProduct.filter(product => {
            if (product._id !== item._id) {
                return true
            } return false;
        });
        if (this.state.selectedOption._id === item._id) { 
            this.setState({ selectProduct: newSelectProduct ,selectedOption:null});
        } else
        this.setState({ selectProduct: newSelectProduct });
    }
    handleChangeCustomer = e => { 
        const { customer } = this.state;
        customer[e.target.name] = e.target.value;
        this.setState({ customer })
    }
    render() {
        const { products,selectProduct,selectedOption } = this.state;
        const renderProduct = products.map(item => {
            return {
                value: item._id,
                label:item.name,
            }
        })
        let totalPrice = 0;
        selectProduct.forEach(item => {
            totalPrice += item.price * item.selectAmount;
        });
        const setCurency = (price) => {
          
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0
            });
            return formatter.format(price);
          }
        return (
            <Page
                title="Xuất kho"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Xuất kho', active: true }]}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                              Xuất kho
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs='8'>
                                        <FormGroup>
                                            <Label for="name">Sản phẩm</Label>
                                            <Select 
                                                
                                                value={this.state.selectedOption}
                                                onChange={this.handleChange}
                                                options={renderProduct}
                                                placeholder  = "Lựa chọn sản phẩm ..."
                                                        />
                                           
                                        </FormGroup>
                                        <Table>
                                            <tr>
                                                    <th>
                                                        STT
                                                    </th>
                                                    <th>
                                                        Hình ảnh
                                                    </th>
                                                    <th>
                                                        Tên sản phẩm
                                                    </th>
                                                    <th>
                                                        Giá thành
                                                    </th>
                                                    <th>
                                                        Số lượng
                                                    </th>
                                                    <th>
                                                        Thao tác
                                                    </th>
                                                </tr>
                                                {
                                                    selectProduct.map((item,index) => { 
                                                        return (
                                                            <tr key = {index}>
                                                                <td>
                                                                    {index+1}
                                                            </td>
                                                                <td>
                                                                    <img src = {item.mainImage} style ={{height:50}} alt = {item.name}></img>
                                                            </td>
                                                                <td>
                                                                    {item.name}
                                                            </td>
                                                                <td>
                                                                    {item.price}
                                                            </td>
                                                                <td>
                                                                    {item.selectAmount||null}
                                                            </td>
                                                                <td>
                                                                    <Button color='primary' onClick = {()=>this.handleChangeSelectOption(item)} style = {{marginRight:10}}>Cập nhập thông tin</Button>
                                                                    <Button color='secondary' onClick = {()=>this.handleRemove(item)}>Xóa</Button>
                                                            </td>
                                                            </tr>
                                                        );
                                                    })                                                         
                                                }
                                        </Table>
                                        <FormGroup>
                                            <Label for="name">Họ tên khách</Label>
                                          <Input type = 'text' name='name' value = {this.state.customer.name} id='name' onChange= {this.handleChangeCustomer}></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="phone">Số điện thoại</Label>
                                          <Input type = 'text' name='phone' value = {this.state.customer.phone} id='phone' onChange= {this.handleChangeCustomer}></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                          <Input type = 'text' name='email' value = {this.state.customer.email} id = 'email' onChange= {this.handleChangeCustomer}></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs='4'>
                                        {selectedOption ? (
                                            <div>
                                                <h4>Thông tin sản phẩm xuất</h4>
                                                <img src={selectedOption.mainImage} style = {{height:100}} alt = {selectedOption.name}></img>
                                                  
                                             <p>Tên sản phẩm: <b>{selectedOption.name}</b></p>
                                             <p>Số lượng còn lại:  <b>{(selectedOption.inventory)}</b></p>
                                             <p>Giá thành:  <b>{setCurency(selectedOption.price)}</b></p>
                                             <p>Đơn giá:  <b>{setCurency(selectedOption.price*selectedOption.selectAmount||0)}</b></p>
                                             
                                             <FormGroup>
                                                 <Label for="amount">Số lượng (<i>số lượng cần nhỏ hơn số lượng trong kho</i>)</Label>
                                                 <Input type="number" name="selectAmount" max= {selectedOption.inventory} id="selectAmount" value = {selectedOption.selectAmount||''}  onChange = {this.handleChangeInput}  />
                                             </FormGroup>
                                             <FormGroup>
                                                 <Label for="amount">Kích thước</Label>
                                                    <Input type="select" name="sizeSelect" value={selectedOption.sizeSelect || ''} id="sizeSelect" onChange={this.handleChangeInput}  >
                                                    <option >Lựa chọn kích thước ...</option>
                                                        { 
                                                            selectedOption.size.map(item => { 
                                                                return (
                                                                    <option value = {item} key={item}>{item}</option>
                                                                )
                                                            })
                                                        }
                                                    </Input>
                                             </FormGroup>
                                             <FormGroup>
                                                 <Label for="amount">Màu sắc</Label>
                                                    <Input type="select" name="colorSelect" value={selectedOption.colorSelect || ''} id="colorSelect" onChange={this.handleChangeInput}  >
                                                    <option >Lựa chọn màu sắc ...</option>
                                                        { 
                                                            
                                                            selectedOption.color.map(item => { 
                                                                return (
                                                                    <option key={item} value = {item}>{item}</option>
                                                                )
                                                            })
                                                        }
                                                    </Input>
                                             </FormGroup>
                                           </div>
                                       ):null}
                                       
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter style = {{display:'flex',justifyContent:'space-between'}}>
                                <p>Tổng hóa đơn(<i>Bạn cần nhập số lượng cho các sản phẩm</i>) : <b>{setCurency(totalPrice||0)}</b></p>
                                <div style = {{display:'flex',justifyContent:'space-between'}}>
                                <FormGroup check style = {{marginRight:20}}>
                                <Label check>
                                    <Input  type="checkbox" checked = {this.state.invoice} onChange ={this.handleChangeInvoice} />
                                                        Xuất hóa đơn
                                </Label>
                                </FormGroup>
                                    <Button disabled={selectProduct.length===0||!totalPrice||this.state.customer.name===''} onClick = {this.handleSubmitCreate} color = "primary" >Xuất hàng</Button>    
                                </div>
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
    handleSubmitCreate = e => {
        e.preventDefault();
        const {   selectProduct,customer} = this.state;
        let totalPrice = 0;
        let amount = 0;
        const products = selectProduct.map(item => {
            return {
                name: item.name,
                color: item.colorSelect,
                size: item.sizeSelect,
                amount: item.selectAmount,
                productId: item._id,
                price:item.price,
            };
        });
        selectProduct.forEach(item => {
            totalPrice += item.price * item.selectAmount;
            amount += item.selectAmount;
        });
        const body = {
            totalPrice,
            amount,
            products,
            customer,
        }
        featchCreateExportProduct(body).then(result => {
            featchGetProduct().then(data => {
                // console.log(result)
                const products = data.data;
                this.setState({ products, selectProduct: [], selectedOption: null });
            });
        
            this.notificationSystem.addNotification({
                title: <MdInfo/>,
                message: 'Tạo đơn hàng xuất thành công!',
                level: 'success',
            });
           if(this.state.invoice){ 
            const { exportProduct,company } = result.data;
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
    
    <h2 style="text-align:center"><span ><strong>HÓA ĐƠN XUẤT KHO</strong></span></h2>
    
    <p><br />
    <span >Họ tên khách hàng : ${customer.name}</span></p>
    
    <p><span >Số điện thoại: ${customer.phone}</span></p>
    
    
    <p><span >Email: ${customer.email}</span></p>
    
    
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
                showData(exportProduct.products)
                }
           
            <tr>
                <td colspan="4" rowspan="1" style="text-align:center; width:99px">
                <p><span ><strong>Tổng tiền</strong></span></p>
                </td>
                <td style="width:173px"><span ><strong>${formatValue(totalPrice)}</strong></span></td>
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
    
                <p><span >${localStorage.getItem('name')}</span></p>
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
     
           }

        }).catch(e => { 
            this.notificationSystem.addNotification({
                title: <MdError/>,
                message: 'Tạo đơn hàng xuất thất bại!',
                level: 'error',
            });
        })
}
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        exportProduct: state.exportProduct,
        product:state.product
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        // onGetExportProduct: data => {
        //     dispatch(actGetExportProductSuccess(data));
        // },
        // onGetProduct: data => {
        //     dispatch(actGetProductSuccess(data));
        // }
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ExportStockPage);