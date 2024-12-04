import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './css.module.css';
import ContainerHome from '../ContainerHome';

const ForunsFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const forumAtivo = location.state?.forum || null;

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
    if (forumAtivo) {
      setFormData(forumAtivo);
      if (forumAtivo.imagem) {
        setPreviewUrl(`https://justix-back.vercel.app/uploads/${forumAtivo.imagem}`);
      }
    }
  }, [forumAtivo]);

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

      if (forumAtivo) {
        await axios.put(
          `https://justix-back.vercel.app/foruns/${forumAtivo.id_forum}`,
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        await axios.post(
          'https://justix-back.vercel.app/foruns',
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      navigate('/admin/dashboard/foruns');
    } catch (err) {
      console.error('Erro ao salvar fórum:', err);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/foruns');
  };

  return (
    <ContainerHome>
      <section className={styles.loginSection}>
    <div className={styles.loginContainer}>
      <h3 className={styles.title}>{forumAtivo ? 'Editar Fórum' : 'Novo Fórum'}</h3>
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
        <di className={styles.formGroup}v>
          <label>Endereço:</label>
          <input
            type="text"
            value={formData.endereco}
            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          />
        </di>
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
          {forumAtivo ? 'Salvar Alterações' : 'Criar Fórum'}
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

export default ForunsFormPageO;