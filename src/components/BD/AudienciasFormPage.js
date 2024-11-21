import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './css.module.css';
import ContainerHome from '../ContainerHome';

const AudienciasFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const juizAtivo = location.state?.juiz || null;

  const [formData, setFormData] = useState({
    nome: '',
    tempo_servico: '',
    casos_julgados: '',
    avaliacao_media: 0
  });

  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  useEffect(() => {
    if (juizAtivo) {
      setFormData(juizAtivo);
      if (juizAtivo.imagem) {
        setPreviewUrl(`https://justix-back.vercel.app/uploads/${juizAtivo.imagem}`);
      }
    }
  }, [juizAtivo]);

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
      
      // Adiciona todos os campos do formulário ao FormData
      Object.keys(formData).forEach(key => {
        submitFormData.append(key, formData[key]);
      });

      // Adiciona a imagem apenas se uma nova imagem foi selecionada
      if (imagemFile) {
        submitFormData.append('imagem', imagemFile);
      }

      if (juizAtivo) {
        await axios.put(
          `https://justix-back.vercel.app/juiz/${juizAtivo.id_juiz}`,
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        await axios.post(
          'https://justix-back.vercel.app/juiz',
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      navigate('/admin/dashboard/juiz');
    } catch (err) {
      console.error('Erro ao salvar juiz:', err);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/juiz');
  };

  return (
    <ContainerHome>
      <section className={styles.loginSection}>
    <div className={styles.loginContainer}>
      <h3 className={styles.title}>{juizAtivo ? 'Editar Juiz' : 'Novo Juiz'}</h3>
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
          <label>Tempo de Serviço:</label>
          <input
            type="text"
            value={formData.tempo_servico}
            onChange={(e) => setFormData({ ...formData, tempo_servico: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Casos Julgados:</label>
          <input
            type="text"
            value={formData.casos_julgados}
            onChange={(e) => setFormData({ ...formData, casos_julgados: e.target.value })}
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
          {juizAtivo ? 'Salvar Alterações' : 'Criar Juiz'}
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

export default AudienciasFormPageO;