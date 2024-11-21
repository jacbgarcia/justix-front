import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login({ isOpen, onClose }) {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [errors, setErrors] = useState({ email: '', senha: '' });
    const [error, setError] = useState('');
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const validateEmail = (email) => {
        if (!email) return 'Email é obrigatório';
        if (!email.includes('@')) return 'Email deve conter @';
        if (!email.includes('.com')) return 'Email deve conter .com';
        return '';
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateEmail(formData.email);
        const senhaError = !formData.senha ? 'Senha é obrigatória' : '';

        if (emailError || senhaError) {
            setErrors({ email: emailError, senha: senhaError });
            return;
        }

        try {
            const response = await fetch('https://justix-back.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuarios', JSON.stringify(data.user));
                
                login({
                    user: data.user,
                    token: data.token
                });

                onClose();
                
                switch(data.user.role) {
                    case 'admin':
                        navigate('/admin/dashboard/tribunais');
                        break;
                    default:
                        navigate('/user/');
                }
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Erro ao fazer login');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div 
                ref={sidebarRef}
                className={`${styles.loginContainer} ${isOpen ? styles.open : ''}`}
            >
                <div className={styles.loginHeader}>
                    <h2 className={styles.title}>LOGIN</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                {error && <span className={styles.errorText}>{error}</span>}
                
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? styles.inputError : ''}
                            required
                        />
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            value={formData.senha}
                            onChange={handleInputChange}
                            className={errors.senha ? styles.inputError : ''}
                            required
                        />
                        {errors.senha && <span className={styles.errorText}>{errors.senha}</span>}
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;