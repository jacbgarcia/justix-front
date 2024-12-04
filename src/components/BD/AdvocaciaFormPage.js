import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './css.module.css';
import ContainerHome from '../ContainerHome';

const AdvocaciaFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const advocaciaAtivo = location.state?.advocacia || null;

  const [formData, setFormData] = useState({
    nome: '',
    profissao: '',
    experiencia: '',
    escritorio: '',
    endereco: '',
    avaliacao_media: 0
  });

  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (advocaciaAtivo) {
      setFormData(advocaciaAtivo);
      if (advocaciaAtivo.imagem) {
        setPreviewUrl(`https://justix-back.vercel.app/uploads/${advocaciaAtivo.imagem}`);
      }
    }
  }, [advocaciaAtivo]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  
  const handleProfissaoChange = (e) => {
    const profissaoSelecionada = e.target.value;
    
    
    const novoFormData = {
      nome: formData.nome,
      profissao: profissaoSelecionada,
      experiencia: '',
      escritorio: '',
      endereco: '',
      avaliacao_media: 0
    };

    setFormData(novoFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.profissao === '') {
      alert('Por favor, selecione uma profissão');
      return;
    }

    try {
      const submitFormData = new FormData();
      
     
      submitFormData.append('nome', formData.nome);
      submitFormData.append('profissao', formData.profissao);
      submitFormData.append('avaliacao_media', formData.avaliacao_media);

     
      switch (formData.profissao) {
        case 'Escritório':
          submitFormData.append('endereco', formData.endereco);
          break;
        case 'Advogado':
          submitFormData.append('experiencia', formData.experiencia);
          submitFormData.append('escritorio', formData.escritorio);
          break;
        case 'Promotor':
          submitFormData.append('experiencia', formData.experiencia);
          break;
        default:
         
          break;
      }

     
      if (imagemFile) {
        submitFormData.append('imagem', imagemFile);
      }

      if (advocaciaAtivo) {
        await axios.put(
          `https://justix-back.vercel.app/advocacia/${advocaciaAtivo.id_advocacia}`,
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        await axios.post(
          'https://justix-back.vercel.app/advocacia',
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      navigate('/admin/dashboard/advocacia');
    } catch (err) {
      console.error('Erro ao salvar profissional:', err);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/advocacia');
  };

   
  const shouldShowField = (fieldName) => {
    switch (formData.profissao) {
      case 'Escritório':
        return ['nome', 'endereco', 'avaliacao_media'].includes(fieldName);
      case 'Advogado':
        return ['nome', 'experiencia', 'escritorio', 'avaliacao_media'].includes(fieldName);
      case 'Promotor':
        return ['nome', 'experiencia', 'avaliacao_media'].includes(fieldName);
      default:
        return true;
    }
  };

  return (
    <ContainerHome>
      <section className={styles.loginSection}>
        <div className={styles.loginContainer}>
          <h3 className={styles.title}>
            {advocaciaAtivo ? 'Editar Profissional' : 'Novo Profissional'}
          </h3>
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
              <label>Profissão:</label>
              <select
                value={formData.profissao}
                onChange={handleProfissaoChange}
                required
                className={styles.selectInput}
              >
                <option value="">Selecione...</option>
                <option value="Escritório">Escritório</option>
                <option value="Advogado">Advogado</option>
                <option value="Promotor">Promotor</option>
              </select>
            </div>
            {shouldShowField('experiencia') && (
              <div className={styles.formGroup}>
                <label>Experiência:</label>
                <input
                  type="text"
                  value={formData.experiencia}
                  onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                  required
                />
              </div>
            )}
            {shouldShowField('escritorio') && (
              <div className={styles.formGroup}>
                <label>Escritório:</label>
                <input
                  type="text"
                  value={formData.escritorio}
                  onChange={(e) => setFormData({ ...formData, escritorio: e.target.value })}
                  required
                />
              </div>
            )}
            {shouldShowField('endereco') && (
              <div className={styles.formGroup}>
                <label>Endereço:</label>
                <input
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  required
                />
              </div>
            )}
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
              {advocaciaAtivo ? 'Salvar Alterações' : 'Criar Profissional'}
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

export default AdvocaciaFormPageO;