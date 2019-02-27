// import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
// import SourceLink from 'components/SourceLink';
import React from 'react';
// import FaGithub from 'react-icons/lib/fa/github';
import {
  MdAccountCircle,
//   MdBorderAll,
  MdDashboard,
  MdKeyboardArrowDown,
  MdPages,
    MdViewCarousel,
    MdTextFields,
    MdSystemUpdateAlt,
} from 'react-icons/lib/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


const navContents = [
  { to: '/admin/system/user', name: 'Người dùng', exact: false, Icon: MdTextFields },
//   { to: '/admin/system/role', name: 'Vai trò', exact: false, Icon: MdBorderAll },
//   { to: '/admin/system/noti', name: 'Thông báo', exact: false, Icon: MdBorderAll },
];
// const emmployContents = [
//   { to: '/admin/employ/employs', name: 'Danh sách nhân viên', exact: false, Icon: MdTextFields },
//   { to: '/admin/system/publicBoard', name: 'Bảng công', exact: false, Icon: MdBorderAll },
//   { to: '/admin/system/apporal', name: 'Phê duyệt', exact: false, Icon: MdBorderAll },
//   { to: '/admin/system/configation', name: 'Cấu hình', exact: false, Icon: MdBorderAll },
// ];

const productContents = [
    {
        to: '/admin/product/list',
        name: 'Sản phẩm',
        exact: false,
        Icon: MdViewCarousel,
    }, {
        to: '/admin/product/catalog',
        name: 'Danh mục',
        exact: false,
        Icon: MdAccountCircle
    },{
        to: '/admin/product/inventory',
        name: 'Tồn kho',
        exact: true,
        Icon: MdAccountCircle
    },{
        to: '/admin/product/importedProducts',
        name: 'Hàng nhập',
        exact: true,
        Icon: MdAccountCircle
    },{
        to: '/admin/product/exportedProducts',
        name: 'Hàng xuất',
        exact: true,
        Icon: MdAccountCircle
    },{
        to: '/admin/product/delivery',
        name: 'Hàng giao nhân viên',
        exact: true,
        Icon: MdAccountCircle
    },{
        to: '/admin/product/salary',
        name: 'Lương nhân viên',
        exact: true,
        Icon: MdAccountCircle
    },
];

const navItems = [
  { to: '/admin', name: 'Bảng thống kê', exact: true, Icon: MdDashboard },
  
];
const endItems = [
  { to: '/', name: 'Thông tin nhà phát triển', exact: true, Icon: MdDashboard },
//   { to: '/', name: 'Giúp đỡ', exact: true, Icon: MdDashboard },
  
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
    isOpenEmploy:true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            {/* <SourceLink className="navbar-brand d-flex"> */}
              {/* <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              /> */}
              <span className="text-white">
                Quản lý xưởng may
              </span>
            {/* </SourceLink> */}
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                //   className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span >{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

           
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Contents')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdSystemUpdateAlt className={bem.e('nav-item-icon')} />
                  <span >HỆ THỐNG</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenContents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    // className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    {/* <Icon className={bem.e('nav-item-icon')} /> */}
                    <span style = {{marginLeft:25}} >{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span >HÀNG HÓA</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {productContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    // className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    {/* <Icon className={bem.e('nav-item-icon')} /> */}
                    <span  style = {{marginLeft:25}}>{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            
            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Employ')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span >Chấm công</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenEmploy}>
              {emmployContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    // className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <span  style = {{marginLeft:25}}>{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}
                    {endItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                //   className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span >{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
