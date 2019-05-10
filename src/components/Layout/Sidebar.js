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
    MdAssignmentTurnedIn,
    MdAttachMoney,
    MdInfo,
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
  { to: '/admin/system/user', name: 'Người dùng', exact: false, Icon: MdTextFields ,code:'PM1'},
  { to: '/admin/system/role', name: 'Phân quyền', exact: false, Icon: '',code:'PM2' },
  { to: '/admin/system/general', name: 'Thiết lập chung', exact: false, Icon: '',code:'PM3' },
  { to: '/admin/system/userInfo', name: 'Thông tin cá nhân', exact: false, Icon: '' },
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
        code:'PM4'
    }, {
        to: '/admin/product/catalog',
        name: 'Danh mục',
        exact: false,
        Icon: MdAccountCircle,
        code:'PM5'
    },{
        to: '/admin/product/inventory',
        name: 'Tồn kho',
        exact: true,
        Icon: MdAccountCircle,
        code:'PM6'
    },{
        to: '/admin/product/importedProducts',
        name: 'Hàng nhập',
        exact: true,
        Icon: MdAccountCircle,
        code:'PM7'
    },{
        to: '/admin/product/exportedProducts',
        name: 'Hàng xuất',
        exact: true,
        Icon: MdAccountCircle,
        code:'PM8'
    }
];

const navItems = [
  { to: '/admin', name: 'Bảng thống kê', exact: true, Icon: MdDashboard },
  
];
const endItems = [
  { to: '/admin/product/delivery', name: 'Hàng giao nhân viên', exact: true, Icon: MdAssignmentTurnedIn, code:'PM9' },
  { to: '/admin/product/salary', name: 'Lương nhân viên', exact: true, Icon: MdAttachMoney, code:'PM10' },
//   { to: 'https://dothang.hitclub.top/', name: 'Thông tin nhà phát triển', exact: true, Icon: MdInfo },
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
        const permistion = JSON.parse(localStorage.getItem('permistion')).map(item => item.code);
    return (
      <aside className={bem.b()}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar style = {{display:'flex',justifyContent:'center',marginTop:20}}>
            {/* <SourceLink className="navbar-brand d-flex"> */}
              {/* <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              /> */}
              <h3 className="text-white">
                Quản lý xưởng may
              </h3>
            {/* </SourceLink> */}
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')} >
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
              {navContents.map(({ to, name, exact, Icon,code }, index) => (
                <NavItem key={index} className={bem.e('nav-item')} hidden ={!permistion.includes(code)}>
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
                  <span >KHO</span>
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
              {productContents.map(({ to, name, exact, Icon ,code}, index) => (
                <NavItem key={index} className={bem.e('nav-item')} hidden ={!permistion.includes(code)}>
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
                    {endItems.map(({ to, name, exact, Icon,code }, index) => (
              <NavItem key={index} className={bem.e('nav-item')} hidden ={!permistion.includes(code)}>
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
            <NavItem key={'abc'} className={bem.e('nav-item')}>
                <a
                style = {{marginLeft:15,color:'white',textDecoration:'none'}}
                //   className="text-uppercase"
                rel="noopener noreferrer"
                  tag={NavLink}
                  href='https://dothang.hitclub.top/'
                  activeClassName="active"
                 >
                  <MdInfo className={bem.e('nav-item-icon')} />
                  <span >Thông tin nhà phát triển</span>
                </a>
              </NavItem>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
