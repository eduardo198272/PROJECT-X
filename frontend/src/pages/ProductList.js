import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import styled from 'styled-components';

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 200px;
  overflow: hidden;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin: 0 0 10px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #007bff;
  margin: 10px 0;
`;

const ProductCategory = styled.p`
  font-size: 14px;
  color: #888;
  margin: 10px 0;
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/products', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchProducts();
  }, [navigate]);

  return (
    <ProductContainer>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage src={`http://localhost:3000/images/${product.image}`} alt={product.name} />
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>R${product.price.toFixed(2)}</ProductPrice>
            <ProductCategory>Categoria: {product.category_name}</ProductCategory>
          </ProductInfo>
        </ProductCard>
      ))}
    </ProductContainer>
  );
};

export default ProductList;
