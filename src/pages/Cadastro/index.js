import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cadastro.module.css';

function Cadastro({ isOpen, onClose, onSwitchToLogin }) {
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        senha: '',
        confirmarSenha: ''
    });

    const [errors, setErrors] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        senha: '',
        confirmarSenha: ''
    });

    const [submitStatus, setSubmitStatus] = useState({
        message: '',
        type: ''
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const formatCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const formatTelefone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'nome':
                return value.length < 3 ? 'Nome deve ter pelo menos 3 caracteres' : '';
            case 'cpf':
                return value.replace(/\D/g, '').length !== 11 
                    ? 'CPF deve ter 11 dígitos' 
                    : '';
            case 'email':
                return !value.includes('@') || !value.includes('.com')
                    ? 'Email deve conter @ e .com'
                    : '';
            case 'telefone':
                return value.replace(/\D/g, '').length < 11
                    ? 'Telefone deve ter 11 dígitos'
                    : '';
            case 'senha':
                return value.length < 6
                    ? 'Senha deve ter pelo menos 6 caracteres'
                    : '';
            case 'confirmarSenha':
                return value !== formData.senha
                    ? 'As senhas não coincidem'
                    : '';
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let formattedValue = value;

        if (id === 'cpf') {
            formattedValue = formatCPF(value);
        } else if (id === 'telefone') {
            formattedValue = formatTelefone(value);
        }

        setFormData((prevState) => ({
            ...prevState,
            [id]: formattedValue
        }));

        const error = validateField(id, formattedValue);
        setErrors((prevState) => ({
            ...prevState,
            [id]: error
        }));

        if (id === 'senha') {
            const confirmarSenhaError = formData.confirmarSenha
                ? validateField('confirmarSenha', formData.confirmarSenha)
                : '';
            setErrors((prevState) => ({
                ...prevState,
                confirmarSenha: confirmarSenhaError
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://justix-back.vercel.app/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: formData.nome,
                    cpf: formData.cpf.replace(/\D/g, ''),
                    email: formData.email,
                    telefone: formData.telefone.replace(/\D/g, ''),
                    senha: formData.senha
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSubmitStatus({
                    message: 'Cadastro realizado com sucesso!',
                    type: 'success'
                });
                setTimeout(() => {
                    onClose();
                    onSwitchToLogin(); // Chama a troca para o login
                }, 2000);
            } else {
                throw new Error(data.error || 'Erro ao realizar cadastro');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            setSubmitStatus({
                message: error.message || 'Erro ao conectar com o servidor',
                type: 'error'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div 
                ref={sidebarRef}
                className={`${styles.cadastroContainer} ${isOpen ? styles.open : ''}`}
            >
                <div className={styles.cadastroHeader}>
                    <h2 className={styles.title}>Cadastro</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                {submitStatus.message && (
                    <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                        {submitStatus.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.cadastroForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="text"
                            id="cpf"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            required
                            maxLength="14"
                        />
                        {errors.cpf && <span className={styles.errorText}>{errors.cpf}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="telefone">Telefone:</label>
                        <input
                            type="text"
                            id="telefone"
                            value={formData.telefone}
                            onChange={handleInputChange}
                            required
                            maxLength="15"
                        />
                        {errors.telefone && <span className={styles.errorText}>{errors.telefone}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            value={formData.senha}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.senha && <span className={styles.errorText}>{errors.senha}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            value={formData.confirmarSenha}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.confirmarSenha && (
                            <span className={styles.errorText}>{errors.confirmarSenha}</span>
                        )}
                    </div>

                    <button type="submit" className={styles.submitButton}>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
