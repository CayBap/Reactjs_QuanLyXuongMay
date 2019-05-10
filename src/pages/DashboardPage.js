import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
//   CardGroup,
  Row,
  Col,
} from 'reactstrap';

import {
  MdPersonPin,
//   MdRateReview,
//   MdThumbUp,
//   MdShare,
} from 'react-icons/lib/md';

// import {
//   productsData,
// } from 'demos/dashboardPage';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import UserProgressTable from 'components/UserProgressTable';
import {
    NumberWidget,
    // IconWidget
} from 'components/Widget';

import { featchGetUser, featchGetBoard } from '../services/apis/userService';
import { featchGetProduct } from '../services/apis/productService';
import { featchGetExportProduct } from '../services/apis/exportProductService';
import { featchGetImportProduct } from '../services/apis/importProductService';
import avatar from '../assets/person-icon.png'
// const avatar = 'http://localhost:4040/static/'+localStorage.getItem('avatar');
class DashboardPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            users: [],
            board: [],
            exportPro: [],
            importPro : [],
        }
    }
    componentWillMount() {
      
    // this is needed, because InfiniteCalendar forces window scroll
        window.scrollTo(0, 0);
        featchGetUser().then(result => {
            // console.log(result)
            this.setState({ users: result.data });
        });
        featchGetProduct().then(result => {
            this.setState({ products: result.data });
        });
        featchGetBoard().then(result => {
            this.setState({ board: result.data });
        });
        featchGetExportProduct().then(result => {
            this.setState({ exportPro: result.data });
        })
        featchGetImportProduct().then(result => {
            this.setState({ importPro: result.data });
        })
  }

  render() {

      const { products, users=[] ,board,importPro,exportPro} = this.state;
      const getSumValueForEmploy = (price) => {
          
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        });
        return formatter.format(price);
      }
      
    const getSumValueForEmploy1 = (obj) => {
        let sum = 0;
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        });
        obj.forEach(item => {
            sum += item.amount * item.productId.price;
        });

        return formatter.format(sum);
    }
      const newUsers = users.map(item => {
          return {
              avatar: avatar,
              name: item.lastName + ' ' + item.firstName,
              date: item.dob,
              gender: item.gender
              //   progress
          }
      });
      const newBoard = board.map(item => {
          return {
            avatar: avatar,
            name: item.user.lastName + ' ' + item.user.firstName,
            date: item.user.dob,
              gender: item.user.gender,
              total: getSumValueForEmploy1(item.productUser),
          }
      })
      const getSum = (arr) => {
          let sum = 0;
          arr.forEach(item => {
              sum += item.totalPrice;
          });
          return sum;
      }
    return (
      <Page
        className="DashboardPage"
        title="Bảng thống kê"
        breadcrumbs={[{ name: 'Bảng thống kê', active: true }]}>
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Tổng thu"
              subtitle="Tháng sau"
              number={getSumValueForEmploy(getSum(exportPro))}
              color="secondary"
              progress={{
                value: 100,
                label: 'Tháng trước',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Tổng chi"
              subtitle="Tháng sau"
              number={getSumValueForEmploy(getSum(importPro))}
              color="secondary"
              progress={{
                value: 100,
                label: 'Tháng trước',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Số nhân viên"
              subtitle="Tháng sau"
              number={users.length}
              color="secondary"
              progress={{
                value: 100,
                label: 'Tháng trước',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Số  sản phẩm"
              subtitle="Tháng sau"
              number={products.length}
              color="secondary"
              progress={{
                value: 100,
                label: 'Tháng trước',
              }}
            />
          </Col>
        </Row>
{/* 
        <CardGroup style={{ marginBottom: '1rem' }}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            title="50+ Likes"
            subtitle="People you like"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="10+ Reviews"
            subtitle="New Reviews"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdShare}
            title="30+ Shares"
            subtitle="New Shares"
          />
        </CardGroup> */}

        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Sản phẩm mới</CardHeader>
              <CardBody>
                {products.slice(0,5).map(
                    ( item ) => (
                        <ProductMedia
                      key={item._id}
                      image={item.mainImage}
                      title={item.name}
                      description={item.description}
                      right={getSumValueForEmploy(item.price)}
                    />
                  )
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Nhân viên mới</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'Họ tên',
                    'Ngày sinh',
                    'Giới tính',
                    '%',
                  ]}
                  usersData={newUsers}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Sản phẩm bán chạy</CardHeader>
              <CardBody>
              {products.slice(0,5).map(
                    ( item ) => (
                        <ProductMedia
                      key={item._id}
                      image={item.mainImage}
                      title={item.name}
                      description={item.description}
                      right={getSumValueForEmploy(item.price)}
                    />
                  )
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Nhân viên thu nhập cao</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'Họ tênn',
                    'Ngày sinh',
                    'Giới tính',
                    'Tổng lương',
                  ]}
                                usersData={newBoard.sort((a, b) => {
                                    return parseFloat(a.total) > parseFloat(b.total);
                  })}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Page>
    );
  }
}
export default DashboardPage;
