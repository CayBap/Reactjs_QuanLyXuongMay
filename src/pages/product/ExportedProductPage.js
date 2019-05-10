import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Col, Row, Table, Card, CardBody, CardHeader,Button,ButtonGroup ,CardFooter,

} from 'reactstrap';
import {
    MdError,
    // MdCardGiftcard,
    MdInfo,
  } from 'react-icons/lib/md';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import PaginationTable from '../../components/Pagination';
import { featchGetExportProduct, featchCreateExportProduct, featchUpdateExportProduct } from '../../services/apis/exportProductService';
import { featchGetProduct } from '../../services/apis/productService';
import { featchGetCompany } from '../../services/apis/companyService';
import { actGetExportProductSuccess } from '../../actions/exportProductAct';
import { actGetProductSuccess } from '../../actions/productAct';
const bem = bn.create('product');
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
class ExportedProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            // shortName: '',
            // unit: '',
            totalPrice: '',
            timeToEnd: '',
            amount: '',
            dataForPage: [],
            entry: 5,
            currentPage: 0,
            id: '',
            productId:'',
            selectedOption: null,
            isRed: false,
            products: [],
            deleteModal: false,
            state:'',
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
      componentWillMount() {
         
          featchGetProduct().then(result => {
            this.setState({ products: result.data });
          })
           featchGetExportProduct().then(result => {
            this.props.onGetExportProduct(result.data);
              
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
    handleChange = (selectedOption) => {
        this.setState({ name:selectedOption.label });
        this.setState({ productId: selectedOption.value });
        this.setState({ selectedOption });

      }
    handleSubmitCreate = e => {
        e.preventDefault();
        const { name, totalPrice, timeToEnd, amount, productId } = this.state;
        if (name !== "") {
            const body = {
                name,
                totalPrice,
                timeToEnd,
                amount,
                productId,
            }
            if (this.state.state === 'add') {
                featchCreateExportProduct(body).then(result => {
                    if (result.status === 200) {
                        this.notificationSystem.addNotification({
                            title: <MdInfo/>,
                            message: 'Thêm mới hàng xuất thành công!',
                            level: 'success',
                        });
                        featchGetExportProduct().then(result => {
                          this.props.onGetExportProduct(result.data);
                        });
                        this.setState({ modal: false });
                    }
                }).catch(err => {
                    this.notificationSystem.addNotification({
                        title: <MdError/>,
                        message: 'Thêm mới hàng xuất thất bại!',
                        level: 'error',
                    });
                })
            }
            if (this.state.state === 'update') {
                featchUpdateExportProduct(this.state.id,body).then(result => {
                    if (result.status === 200) {
                        this.notificationSystem.addNotification({
                            title: <MdInfo/>,
                            message: 'Cập nhập hàng xuất thành công!',
                            level: 'success',
                        });
                        featchGetExportProduct().then(result => {
                          this.props.onGetExportProduct(result.data);
                        });
                        this.setState({ modal: false });
                    
                    }
                }).catch(err => {
                    this.notificationSystem.addNotification({
                        title: <MdError/>,
                        message: 'Cập nhập hàng xuất thất bại!',
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
        this.setState({ dataForPage: this.props.exportProduct.exportProducts.slice(page*entry, page*entry+entry),currentPage:page});
    }
  
    handleType = (e) => {
        const product = this.state.products.find(item => {
            return item._id === this.state.selectedOption.value;
        })
        this.setState({ totalPrice: product.price * e.target.value });
    }
    exportReport = async (item) => { 
        const company =(await featchGetCompany()).data;
        console.log(company)
        const { products ,customer} = item;
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
<span >Họ tên khách hàng : ${customer.name||''}</span></p>

<p><span >Số điện thoại: ${customer.phone||""}</span></p>


<p><span >Email: ${customer.email||''}</span></p>


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
            showData(products)
            }
       
        <tr>
            <td colspan="4" rowspan="1" style="text-align:center; width:99px">
            <p><span ><strong>Tổng tiền</strong></span></p>
            </td>
            <td style="width:173px"><span ><strong>${formatValue(item.totalPrice)}</strong></span></td>
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
    handelRedirect = ()=>{ 
        this.props.history.push('/admin/product/export');
    }
    render() {
        const { currentPage } = this.state;
        const { exportProduct} = this.props;
        const exportProducts = exportProduct.exportProducts || [];
        const getSumValueForEmploy = (price) => {
          
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0
            });
            return formatter.format(price);
          }
        return (
            <Page
                title="Hàng xuất"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Hàng xuất', active: true }]}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                              Danh sách hàng xuất
                                <Button style = {{float:'right'}} size = "sm" outline color='primary' onClick={this.handelRedirect}>Xuất kho</Button>
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên hàng</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Thời gian xuất</th>
                                            <th style = {{width:200}}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {
                                            exportProducts.slice(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry).map((item,index) => {
                                                return (
                                                    // <tr  key = {item._id} className = {bem.e('row')} onClick = {()=>this.handleOnClickProduc(item._id)}>
                                                    <tr  key = {item._id} className = {bem.e('row')} >
                                                        <th scope="row">{index+1}</th>
                                                        <td>{item.products.map(item => item.name).join()}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{getSumValueForEmploy(item.totalPrice)}</td>
                                                        <td>{item.createdAt}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button color = "info" onClick = {()=>this.exportReport(item)}>Xuất hóa đơn</Button>
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
                                <PaginationTable data={exportProducts} entry={this.state.entry} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
           
            </Page>
        );
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
        onGetExportProduct: data => {
            dispatch(actGetExportProductSuccess(data));
        },
        onGetProduct: data => {
            dispatch(actGetProductSuccess(data));
        }
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ExportedProductPage);