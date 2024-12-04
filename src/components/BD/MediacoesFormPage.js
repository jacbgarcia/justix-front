import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './css.module.css';
import ContainerHome from '../ContainerHome';


const MediacoesFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mediadorAtivo = location.state?.mediador || null;

  const [formData, setFormData] = useState({
    nome: '',
    estado: '',
    avaliacao_media: 0
  });

  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (mediadorAtivo) {
      setFormData(mediadorAtivo);
      if (mediadorAtivo.imagem) {
        setPreviewUrl(`https://justix-back.vercel.app/uploads/mediador/${mediadorAtivo.imagem}`);
      }
    }
  }, [mediadorAtivo]);

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

      if (mediadorAtivo) {
        await axios.put(
          `https://justix-back.vercel.app/mediador/${mediadorAtivo.id_mediador}`,
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        await axios.post(
          'https://justix-back.vercel.app/mediador',
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      navigate('/admin/dashboard/mediador');
    } catch (err) {
      console.error('Erro ao salvar mediador:', err);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/mediador');
  };

  return (
    <ContainerHome>
      <section className={styles.loginSection}>
    <div className={styles.loginContainer}>
      <h3 className={styles.title}>{mediadorAtivo ? 'Editar Mediador' : 'Novo Mediador'}</h3>
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
          <label>Estado:</label>
          <input
            type="text"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            required
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
          {mediadorAtivo ? 'Salvar Alterações' : 'Criar Mediador'}
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

export default MediacoesFormPageO;