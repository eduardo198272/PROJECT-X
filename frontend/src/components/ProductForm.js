import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Novo estado para armazenar a URL da imagem
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Captura o ID do produto da URL

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

  useEffect(() => {
    if (id) { // Verifica se estamos em modo de edição
      const fetchProduct = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await api.get(`/product/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const product = response.data;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategoryId(product.category_id);
          setExistingImage(product.image); // Armazenar a imagem atual
          setIsEditing(true);
        } catch (error) {
          console.error('Erro ao buscar produto:', error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Gerar a URL da imagem carregada
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', categoryId);
    if (image) {
      formData.append('image', image);
    } else if (existingImage) {
      formData.append('existingImage', existingImage);
    }

    try {
      if (isEditing) {
        await api.put(`/product/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.post('/product', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/dashboard'); // Redireciona para o dashboard após sucesso
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</h2>
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Input
          type="file"
          onChange={handleImageChange} // Alterado para usar a nova função
        />
        {imagePreview && ( // Exibe a imagem carregada antes do envio
          <div>
            <p>Imagem selecionada:</p>
            <img src={imagePreview} alt="Produto" style={{ width: '100px', height: '100px' }} />
          </div>
        )}
        {existingImage && !image && (
          <div>
            <p>Imagem atual:</p>
            <img src={`http://localhost:3000/images/${existingImage}`} alt="Produto" style={{ width: '100px', height: '100px' }} />
          </div>
        )}
        <Button type="submit">{isEditing ? 'Atualizar Produto' : 'Adicionar Produto'}</Button>
        <CancelButton type="button" onClick={() => navigate('/dashboard')}>
          Cancelar
        </CancelButton>
      </Form>
    </Container>
  );
};

export default ProductForm;
