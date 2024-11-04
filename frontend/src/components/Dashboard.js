import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import ProductList from '../pages/ProductList';
import CategoryList from '../pages/CategoryList';
import { useNavigate } from 'react-router-dom';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: #007bff;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 50%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #ddd;
  font-size: 16px;
  outline: none;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 15px;
  color: #666;
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 32px;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  color: black;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};  
  width: 200px;
`;

const MenuItem = styled.a`
  display: block;
  padding: 15px 20px;  
  text-decoration: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setMenuOpen(true);
  const handleMouseLeave = () => setMenuOpen(false);

  return (
    <div>
      <Header>
        <Logo>Minha Loja</Logo>
        <SearchBar>
          <SearchInput placeholder="Pesquisar produtos..." />
          <SearchIcon />
        </SearchBar>
        <Profile
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ProfileIcon />
          <DropdownMenu $isOpen={menuOpen}>
            <MenuItem href="/account">Minha Conta</MenuItem>
            <MenuItem onClick={() => navigate('/products/create')}>Criar Produto</MenuItem>
            <MenuItem onClick={() => navigate('/categories/create')}>Criar Categoria</MenuItem>
          </DropdownMenu>
        </Profile>
      </Header>
      <div>
        <h1>Bem-vindo ao Dashboard</h1>
        <ProductList /> 
        <CategoryList /> 
      </div>
    </div>
  );
};

export default Dashboard;
