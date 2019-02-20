import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import {
    Col, Row, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem,
    TabContent, TabPane, Nav, NavItem, NavLink,Badge
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Page from '../../components/Page';
// import bn from 'utils/bemnames';
// const bem = bn.create('product');
const items = [
    {
        src: 'http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'http://ladykids.com.vn/wp-content/uploads/2017/12/e.jpg',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];
class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0, activeTab: '1' };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img style={{ maxWidth: '100%' }} src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });
        return (
            <Page
                title="Chi tiết"
                breadcrumbs={[{ name: 'Hàng hóa', active: false }, { name: 'Sản phẩm', active: false }, { name: 'Quần bò trẻ em', active: true }]}>
                <Row>
                    <Col lg={4} md={6} sm={6} xs={12}>
                        <Carousel
                            activeIndex={activeIndex}
                            next={this.next}
                            previous={this.previous}
                        >
                            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </Carousel>
                    </Col>
                    <Col lg={8} md={6} sm={6} xs={12}>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Sản phẩm
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Mô tả
                            </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <br></br>
                                <Row>
                                    <Col sm="12">
                                        <h4>Quần bỏ trẻ em</h4>
                                        <p>Giá bán:  <b style={{ color: 'red' }}>50.000đ</b></p>
                                        <p>Số lượng:  <b>3000</b></p>
                                        <p>Tồn kho:   <b>2000</b></p>
                                        <p>Đã bán:   <b>1000</b></p>
                                        <p>Danh mục: <Link to='/'>Quần áo trẻ em</Link></p>
                                        <p>Kích thước: {' '}
                                            <Badge color="primary"> 1 </Badge> {' '}
                                            <Badge color="primary">2</Badge>{' '}
                                            <Badge color="primary">3</Badge>{' '}
                                            <Badge color="primary">4</Badge>{' '}
                                        </p>
                                        <p>Màu sắc:   <b>Xanh , Đen</b></p>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                    <p>Thông tin chi tiết: <b>Quần Kaki Đen QK172</b></p>
                                    <p> - Mã sản phẩm: <b>QK172-DEN</b></p>
                                    <p>- Chất liệu: <b>Kaki</b></p>
                                    <p>- Thích hợp: đi làm, đi học, đi chơi, dự tiệc, phối cùng sơ mi, áo thun có cổ, blazer...</p>
                                    </Col>
                                   
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Page>
        );
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
)(ProductPage);