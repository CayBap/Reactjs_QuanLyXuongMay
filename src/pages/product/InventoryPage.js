import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Col, Row, Table, Card, CardBody, CardHeader ,CardFooter} from 'reactstrap';
import Page from '../../components/Page';
import bn from 'utils/bemnames';
import PaginationTable from '../../components/Pagination';
import { actGetProductSuccess } from '../../actions/productAct';
import { featchGetProduct } from '../../services/apis/productService';
const bem = bn.create('product');

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataForPage: [],
            entry: 5,
            currentPage: 0,
            modal: false,
            id: '',
        };
    }
    componentWillMount() {
        featchGetProduct().then(result => {
            this.props.onGetProductSuccess(result.data);
        });
    }
    handleChangePage = (page) => {
        const {entry } = this.state;
        this.setState({ dataForPage: this.props.product.products.slice(page*entry, page*entry+entry),currentPage:page});
    }
    render() {
        const { currentPage} = this.state;
        const { product } = this.props;
        let products = product.products || [];
        if (product.products) {
            products =  products.filter(item => {
                return item.inventory > 0;
            })  
        }
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
                title="Tồn kho"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Tồn kho', active: true }]}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                               Hàng tồn kho
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Hình ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá (đồng)</th>
                                            <th>Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        
                                        {
                                            products.slice(currentPage * this.state.entry, currentPage * this.state.entry + this.state.entry).map((item,index) => {
                                                return (
                                                    <tr  key = {item._id} className = {bem.e('row')} >
                                                    <th scope="row">{index+1}</th>
                                                    <td><img style = {{width:'100px'}} alt = "ảnh" src = {item.mainImage?item.mainImage:'https://png.pngtree.com/svg/20161222/the_bottom_bar_icon_selected_merchandise_678940.png'}></img></td>
                                                    <td>{item.name}</td>
                                                    <td>{getSumValueForEmploy(item.price)}</td>
                                                    <td>{item.inventory}</td>
                                                    
                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                            <PaginationTable data={products} entry={this.state.entry} currentPage={this.state.currentPage} handleChangePage={this.handleChangePage}/>
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
        // user: state.user
        product: state.product
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetProductSuccess: data => {
            dispatch(actGetProductSuccess(data));
        },
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ProductPage);