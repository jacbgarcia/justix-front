import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './css.module.css';
import ContainerHome from '../ContainerHome';

const PortaisFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const portaisAtivo = location.state?.portais || null;

  const [formData, setFormData] = useState({
    nome: '',
    url: '',
    avaliacao_media: 2.00 // valor padrão conforme backend
  });

  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (portaisAtivo) {
      setFormData({
        nome: portaisAtivo.nome || '',
        url: portaisAtivo.url || '',
        avaliacao_media: portaisAtivo.avaliacao_media || 2.00
      });
      
      // Corrigindo a URL do preview
      if (portaisAtivo.imagem) {
        // Remove o /uploads/ duplicado se necessário
        const imagemPath = portaisAtivo.imagem.startsWith('/uploads/') 
          ? portaisAtivo.imagem 
          : `/uploads/${portaisAtivo.imagem}`;
        setPreviewUrl(`https://justix-back.vercel.app${imagemPath}`);
      }
    }
  }, [portaisAtivo]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Arquivo muito grande. Máximo 5MB.');
        return;
      }
      setImagemFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const submitFormData = new FormData();
      
      // Validação da URL
      try {
        new URL(formData.url);
      } catch (e) {
        setError('URL inválida. Inclua http:// ou https://');
        return;
      }

      // Adiciona os campos ao FormData
      submitFormData.append('nome', formData.nome);
      submitFormData.append('url', formData.url);
      submitFormData.append('avaliacao_media', formData.avaliacao_media);

      // Adiciona a imagem apenas se uma nova imagem foi selecionada
      if (imagemFile) {
        submitFormData.append('imagem', imagemFile);
      }

      if (portaisAtivo) {
        // Corrigindo o nome do parâmetro ID
        const response = await axios.put(
          `https://justix-back.vercel.app/portais/${portaisAtivo.id_portal || portaisAtivo.id_portais}`,
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log('Resposta da atualização:', response.data);
      } else {
        const response = await axios.post(
          'https://justix-back.vercel.app/portais',
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log('Resposta da criação:', response.data);
      }
      navigate('/admin/dashboard/portais');
    } catch (err) {
      console.error('Erro ao salvar portal:', err);
      setError(err.response?.data?.error || 'Erro ao salvar o portal');
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/portais');
  };

  return (
    <ContainerHome>
      <section className={styles.loginSection}>
        <div className={styles.loginContainer}>
          <h3 className={styles.title}>{portaisAtivo ? 'Editar Portal' : 'Novo Portal'}</h3>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label>Nome:</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                minLength={3}
                maxLength={255}
              />
            </div>
            <div className={styles.formGroup}>
              <label>URL:</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
                placeholder="https://exemplo.com"
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
              {portaisAtivo ? 'Salvar Alterações' : 'Criar Portal'}
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

export default PortaisFormPageO;