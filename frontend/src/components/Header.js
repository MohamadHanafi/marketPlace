import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer as Link } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const renderLoginLink = () => {
    return (
      <Link to='/login'>
        <Nav.Link>
          <i className='fas fa-user' /> Sign In
        </Nav.Link>
      </Link>
    );
  };

  const renderUserInfoDropdown = () => {
    return (
      <NavDropdown title={userInfo.name}>
        <Link to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </Link>
        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    );
  };

  const renderUserAdminDropdown = () => {
    return (
      <NavDropdown title='Admin' id='adminMenu'>
        <Link to='/admin/userList'>
          <NavDropdown.Item>Users</NavDropdown.Item>
        </Link>
        <Link to='/admin/productList'>
          <NavDropdown.Item>Products</NavDropdown.Item>
        </Link>
        <Link to='/admin/orderList'>
          <NavDropdown.Item>Orders</NavDropdown.Item>
        </Link>
      </NavDropdown>
    );
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Link to='/'>
            <Navbar.Brand>MyShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Link to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart' /> Cart
                </Nav.Link>
              </Link>
              {userInfo ? renderUserInfoDropdown() : renderLoginLink()};
              {userInfo && userInfo.isAdmin && renderUserAdminDropdown()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
