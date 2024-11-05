import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const CategoryCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const CategoryCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 200px;
  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
  position: relative;
  margin-right: 10px;

  &:hover .action-buttons {
    display: flex;
  }
`;

const CardInfo = styled.div`
  padding: 15px;
`;

const CategoryName = styled.h3`
  font-size: 18px;
  margin: 0 0 10px;
`;

const ParentCategory = styled.p`
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
  color: #94A6A6;
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchCategories();
  }, [navigate]);

  const handleEditClick = (category) => {
    navigate(`/category/edit/${category.id}`, { state: { categoryId: category.id } });
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowModal(true);
    setErrorMessage('');
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get(`/category/dependencies/${categoryToDelete.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.dependencies.length > 0) {
          const dependencyNames = response.data.dependencies.map(dep => dep.name).join(', ');
          setErrorMessage(`Não é possível excluir esta categoria porque ela possui dependências: ${dependencyNames}.`);
          return;
        }

        await api.delete(`/category/${categoryToDelete.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
        setShowModal(false);
        setCategoryToDelete(null);
        setErrorMessage('');
      } catch (error) {
        console.error('Failed to delete category', error);
        if (error.response) {
          setErrorMessage(error.response.data.error || 'Erro desconhecido ao deletar a categoria.');
        } else {
          setErrorMessage('Erro desconhecido ao deletar a categoria.');
        }
      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setCategoryToDelete(null);
    setErrorMessage('');
  };

  return (
    <Container>
      <Title>Categorias</Title>
      <CategoryCarousel>
        {categories.map((category) => (
          <CategoryCard key={category.id}>
            <CardInfo>
              <CategoryName>{category.name}</CategoryName>
              <ParentCategory>
                Categoria pai: {category.parent}
              </ParentCategory>
            </CardInfo>
            <ActionButtons className="action-buttons">
              <ActionButton onClick={() => handleEditClick(category)}>
                <FontAwesomeIcon icon={faEdit} />
              </ActionButton>
              <ActionButton onClick={() => handleDeleteClick(category)}>
                <FontAwesomeIcon icon={faTrash} />
              </ActionButton>
            </ActionButtons>
          </CategoryCard>
        ))}
      </CategoryCarousel>

      {showModal && (
        <Modal>
          <ModalContent>
            <p>Tem certeza de que deseja excluir esta categoria?</p>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <ModalButtons>
              <ModalButton onClick={confirmDelete}>Sim</ModalButton>
              <ModalButton onClick={cancelDelete}>Não</ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default CategoryList;
