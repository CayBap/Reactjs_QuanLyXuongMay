import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import classnames from 'classnames';
import {
    Col, Row, Card, CardBody, CardHeader, 
    Nav, NavItem, NavLink, TabContent, TabPane, 
} from 'reactstrap';
import Page from '../../components/Page';
// import bn from 'utils/bemnames';
import TakeLeave from '../../components/TakeLeave';
import ComeLateBackSoon from '../../components/ComeLateBackSoon';
import TimeKeepingDevice from '../../components/TimeKeepingDevice';
// const bem = bn.create('product');

class ApprovalPage extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <Page
                title="Bảng công"
                breadcrumbs={[{ name: 'Chấm công', active: false }, { name: 'Bảng công', active: true }]}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                                Bảng công
                            </CardHeader>
                            <CardBody>
                                <div>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggle('1'); }}
                                            >
                                                Xin nghỉ phép
                                    </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggle('2'); }}
                                            >
                                                Đi muộn về sớm
                                    </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '3' })}
                                                onClick={() => { this.toggle('3'); }}
                                            >
                                                Thiết bị chấm công
                                    </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <TakeLeave></TakeLeave>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <ComeLateBackSoon></ComeLateBackSoon>
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <TimeKeepingDevice></TimeKeepingDevice>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </CardBody>

                        </Card>
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
)(ApprovalPage);