import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  position: relative;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 200px;
  overflow: hidden;
  text-align: center;
  &:hover .action-buttons {
    display: flex;
  }
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

const ActionButtons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
  flex-direction: row;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: gray;
`;

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:first-child {
    background-color: #007bff;
    color: white;
  }
  &:last-child {
    background-color: #ccc;
    color: black;
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
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

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/product/${productToDelete.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(products.filter(p => p.id !== productToDelete.id));
        setShowModal(false);
        setProductToDelete(null);
      } catch (error) {
        console.error('Failed to delete product', error.response ? error.response.data : error.message);
      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  const handleEditClick = (product) => {
    navigate(`/products/edit/${product.id}`, { state: { productId: product.id } });
  };  

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
          <ActionButtons className="action-buttons">
            <ActionButton className="edit" onClick={() => handleEditClick(product)}>
              <FontAwesomeIcon icon={faEdit} />
            </ActionButton>
            <ActionButton className="delete" onClick={() => handleDeleteClick(product)}>
              <FontAwesomeIcon icon={faTrash} />
            </ActionButton>
          </ActionButtons>
        </ProductCard>
      ))}

      {showModal && (
        <Modal>
          <ModalContent>
            <p>Tem certeza de que deseja excluir este produto?</p>
            <ModalButtons>
              <ModalButton onClick={confirmDelete}>Sim</ModalButton>
              <ModalButton onClick={cancelDelete}>Não</ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </ProductContainer>
  );
};

export default ProductList;
