import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from "./css.module.css";
import ContainerHome from '../ContainerHome';

const TribunaisFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tribunalAtivo = location.state?.tribunal || null;

  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    estado: '',
    endereco: '',
    cep: '',
    avaliacao_media: 0
  });

  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (tribunalAtivo) {
      setFormData(tribunalAtivo);
      if (tribunalAtivo.imagem) {
        setPreviewUrl(`https://justix-back.vercel.app/uploads/tribunais/${tribunalAtivo.imagem}`);
      }
    }
  }, [tribunalAtivo]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitFormData = new FormData();
      
    
      Object.keys(formData).forEach(key => {
        submitFormData.append(key, formData[key]);
      });

     
      if (imagemFile) {
        submitFormData.append('imagem', imagemFile);
      }

      if (tribunalAtivo) {
        await axios.put(
          `https://justix-back.vercel.app/tribunais/${tribunalAtivo.id_tribunal}`,
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        await axios.post(
          'https://justix-back.vercel.app/tribunais',
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      navigate('/admin/dashboard/tribunais');
    } catch (err) {
      console.error('Erro ao salvar tribunal:', err);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/tribunais');
  };

  return (
    <ContainerHome>
    <section className={styles.loginSection}>
    <div className={styles.loginContainer}>
      <h3 className={styles.title}>{tribunalAtivo ? 'Editar Tribunal' : 'Novo Tribunal'}</h3>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label>Nome:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Cidade:</label>
          <input
            type="text"
            value={formData.cidade}
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Estado:</label>
          <input
            type="text"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Endereço:</label>
          <input
            type="text"
            value={formData.endereco}
            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>CEP:</label>
          <input
            type="text"
            value={formData.cep}
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Foto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
          />
          {previewUrl && (
            <div>
              <img 
                src={previewUrl} 
                alt="Preview" 
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            </div>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          {tribunalAtivo ? 'Salvar Alterações' : 'Criar Tribunal'}
        </button>
        <button type="button" onClick={handleCancel} className={styles.submitButton}>
          Cancelar
        </button>
      </form>
    </div>
    </section>
    </ContainerHome>
  );
};

export default TribunaisFormPageO;