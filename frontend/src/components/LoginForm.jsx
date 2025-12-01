import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    Card, 
    CardContent, 
    Typography, 
    Snackbar, 
    Alert,
    CircularProgress,
    Box,
    Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api';

export default function LoginForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [registerData, setRegisterData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateField = (field, value, isRegister = false) => {
        switch(field) {
            case 'full_name':
                if (!value) return 'Nome completo é obrigatório';
                if (value.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
                if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return 'Nome deve conter apenas letras';
                break;
            case 'email':
                if (!value) return 'Email é obrigatório';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
                break;
            case 'password':
                if (!value) return 'Senha é obrigatória';
                if (isRegister && value.length < 8) return 'Senha deve ter pelo menos 8 caracteres';
                if (isRegister && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    return 'Senha deve ter pelo menos 1 letra maiúscula, 1 minúscula e 1 número';
                }
                // Para login, não validar comprimento ou complexidade
                break;
            case 'confirmPassword':
                if (!value) return 'Confirmação de senha é obrigatória';
                if (value !== registerData.password) return 'Senhas não coincidem';
                break;
        }
        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(credentials).forEach((field) => {
            const error = validateField(field, credentials[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field) => {
        const error = validateField(field, credentials[field]);
        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted!', { email: credentials.email, password: '***' });
        
        if (!validateForm()) {
            console.log('Validation failed:', errors);
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await AuthService.login({
                email: credentials.email,
                password: credentials.password,
            });
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('userEmail', credentials.email);
            
            let userData = null;
            // Buscar dados do usuário para pegar o nome completo
            try {
                const userResponse = await fetch('http://127.0.0.1:8000/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${response.access_token}`
                    }
                });
                if (userResponse.ok) {
                    userData = await userResponse.json();
                    if (userData.full_name) {
                        localStorage.setItem('userFullName', userData.full_name);
                    }
                }
            } catch (err) {
                console.log('Não foi possível buscar dados do usuário:', err);
            }
            
            const userName = userData ? userData.full_name : credentials.email;
            setSuccessMessage(`Bem-vindo(a), ${userName}! Login realizado com sucesso.`);
            setTimeout(() => {
                navigate('/');
                window.location.reload(); // Força atualização do header
            }, 1500);
        } catch (error) {
            console.error('Erro detalhado no login:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: error.config
            });
            
            let backendError = 'Email ou senha incorretos. Verifique suas credenciais.';
            if (error.response?.status === 401) {
                backendError = 'Email ou senha incorretos. Tente novamente.';
            } else if (error.response?.status === 422) {
                backendError = 'Dados inválidos. Verifique o formato do email.';
            } else if (error.response?.data?.detail) {
                backendError = error.response.data.detail;
            } else if (!error.response) {
                backendError = 'Erro de conexão. Verifique se o servidor está ativo.';
            }
            setErrorMessage(backendError);
            setSuccessMessage(''); // Limpa mensagem de sucesso
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(registerData).forEach((field) => {
            const error = validateField(field, registerData[field], true);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        setErrorMessage('');

        try {
            await AuthService.register({
                full_name: registerData.full_name,
                email: registerData.email,
                password: registerData.password
            });
            setSuccessMessage('Conta criada com sucesso! Fazendo login...');
            
            // Auto-login após registro
            setTimeout(async () => {
                try {
                    const loginResponse = await AuthService.login({
                        email: registerData.email,
                        password: registerData.password,
                    });
                    
                    localStorage.setItem('access_token', loginResponse.access_token);
                    localStorage.setItem('userEmail', registerData.email);
                    localStorage.setItem('userFullName', registerData.full_name);
                    
                    setSuccessMessage(`Bem-vindo(a), ${registerData.full_name}! Redirecionando...`);
                    
                    setTimeout(() => {
                        navigate('/');
                        window.location.reload();
                    }, 1000);
                } catch (loginError) {
                    console.error('Erro no auto-login:', loginError);
                    setSuccessMessage('Conta criada com sucesso! Faça login para continuar.');
                    setShowRegister(false); // Voltar para tela de login
                }
            }, 500);
        } catch (error) {
            console.error('Erro no registro:', error);
            let backendError = 'Erro ao criar conta';
            if (error.response?.data?.detail) {
                if (error.response.data.detail === 'Email already registered') {
                    backendError = 'Este email já está cadastrado. Tente fazer login ou use outro email.';
                } else {
                    backendError = error.response.data.detail;
                }
            } else if (!error.response) {
                backendError = 'Erro de conexão. Verifique se o servidor está ativo.';
            } else if (error.message) {
                backendError = `Erro de conexão: ${error.message}`;
            }
            setErrorMessage(backendError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4" style={{paddingTop: '0', paddingBottom: '0'}}>
            <Card sx={{ width: '100%', maxWidth: 400 }}>
                <CardContent>
                <Typography variant="h5" gutterBottom>
                    {showRegister ? 'Criar Conta' : 'Login'}
                </Typography>
                
                {!showRegister ? (
                    // Formulário de Login
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            onBlur={() => handleBlur('email')}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            onBlur={() => handleBlur('password')}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            required
                            fullWidth
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            disabled={loading}
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Entrar'}
                        </Button>
                    </Box>
                ) : (
                    // Formulário de Registro
                    <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Nome Completo"
                            value={registerData.full_name}
                            onChange={(e) => setRegisterData({ ...registerData, full_name: e.target.value })}
                            onBlur={() => {
                                const error = validateField('full_name', registerData.full_name, true);
                                setErrors((prev) => ({ ...prev, full_name: error }));
                            }}
                            error={Boolean(errors.full_name)}
                            helperText={errors.full_name}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            onBlur={() => {
                                const error = validateField('email', registerData.email, true);
                                setErrors((prev) => ({ ...prev, email: error }));
                            }}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            onBlur={() => {
                                const error = validateField('password', registerData.password, true);
                                setErrors((prev) => ({ ...prev, password: error }));
                            }}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Confirmar Senha"
                            type="password"
                            value={registerData.confirmPassword}
                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                            onBlur={() => {
                                const error = validateField('confirmPassword', registerData.confirmPassword, true);
                                setErrors((prev) => ({ ...prev, confirmPassword: error }));
                            }}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword}
                            required
                            fullWidth
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            disabled={loading}
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Criar Conta'}
                        </Button>
                    </Box>
                )}
                
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Link 
                        component="button" 
                        variant="body2" 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            setShowRegister(!showRegister);
                            setErrors({});
                            setErrorMessage('');
                            setSuccessMessage('');
                        }}
                    >
                        {showRegister ? 'Já tem conta? Fazer login' : 'Não tem conta? Registre-se'}
                    </Link>
                </Box>
                </CardContent>
                
                {/* Snackbar para Erro */}
                <Snackbar 
                    open={Boolean(errorMessage)} 
                    autoHideDuration={6000} 
                    onClose={() => setErrorMessage('')}
                >
                    <Alert severity="error" onClose={() => setErrorMessage('')}>
                        {typeof errorMessage === 'string' ? errorMessage : 'Erro desconhecido'}
                    </Alert>
                </Snackbar>
                
                {/* Snackbar para Sucesso */}
                <Snackbar 
                    open={Boolean(successMessage)} 
                    autoHideDuration={3000} 
                    onClose={() => setSuccessMessage('')}
                >
                    <Alert severity="success" onClose={() => setSuccessMessage('')}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            </Card>
        </div>
    );
}