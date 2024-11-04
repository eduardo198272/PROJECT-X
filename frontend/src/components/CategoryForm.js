import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [categories, setCategories] = useState([]);
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
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const parsedParentId = parentId ? parseInt(parentId, 10) : null;

    try {
      await api.post('/category', { name, parent_id: parsedParentId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Adicionar Categoria</h2>
        <Input
          type="text"
          placeholder="Nome da Categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        >
          <option value="">Selecione a categoria pai (opcional)</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Button type="submit">Adicionar Categoria</Button>
        <CancelButton type="button" onClick={() => navigate('/dashboard')}>
          Cancelar
        </CancelButton>
      </Form>
    </Container>
  );
};

export default CategoryForm;
