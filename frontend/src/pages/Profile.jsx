import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Divider, Button, TextField, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import api from '../services/api';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(localStorage.getItem('userFullName') || 'Nome não informado');
    const [originalFullName, setOriginalFullName] = useState(localStorage.getItem('userFullName') || 'Nome não informado');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    
    const userEmail = localStorage.getItem('userEmail') || 'usuário@sistema.com';

    const handleEdit = () => {
        setOriginalFullName(fullName);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFullName(originalFullName);
        setIsEditing(false);
    };

    const handleSave = async () => {
        // Validações
        if (!fullName || !fullName.trim()) {
            setSnackbar({
                open: true,
                message: 'Nome completo não pode estar vazio',
                severity: 'error'
            });
            return;
        }

        if (fullName.trim().length < 2) {
            setSnackbar({
                open: true,
                message: 'Nome completo deve ter pelo menos 2 caracteres',
                severity: 'error'
            });
            return;
        }

        if (fullName.trim().length > 100) {
            setSnackbar({
                open: true,
                message: 'Nome completo deve ter no máximo 100 caracteres',
                severity: 'error'
            });
            return;
        }

        // Verificar se há mudança
        if (fullName.trim() === originalFullName.trim()) {
            setIsEditing(false);
            setSnackbar({
                open: true,
                message: 'Nenhuma alteração foi feita',
                severity: 'info'
            });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setSnackbar({
                    open: true,
                    message: 'Sessão expirada. Faça login novamente.',
                    severity: 'error'
                });
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }, 2000);
                return;
            }

            const response = await api.put('/auth/profile', { full_name: fullName.trim() });

            if (response.status === 200) {
                localStorage.setItem('userFullName', fullName.trim());
                setOriginalFullName(fullName.trim());
                setIsEditing(false);
                setSnackbar({
                    open: true,
                    message: 'Perfil atualizado com sucesso!',
                    severity: 'success'
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            
            if (error.response?.status === 401) {
                setSnackbar({
                    open: true,
                    message: 'Sessão expirada. Redirecionando para login...',
                    severity: 'error'
                });
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }, 2000);
            } else if (error.response?.status === 400) {
                setSnackbar({
                    open: true,
                    message: 'Dados inválidos. Verifique as informações.',
                    severity: 'error'
                });
            } else if (error.response?.status === 500) {
                setSnackbar({
                    open: true,
                    message: 'Erro interno do servidor. Tente novamente mais tarde.',
                    severity: 'error'
                });
            } else {
                setSnackbar({
                    open: true,
                    message: 'Erro ao atualizar perfil. Verifique sua conexão.',
                    severity: 'error'
                });
            }
            
            // Reverter mudanças em caso de erro
            setFullName(originalFullName);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    
    return (
        <div className="max-w-2xl mx-auto py-8">
            <Card>
                <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Meu Perfil
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Gerencie suas informações pessoais
                        </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">
                                Informações da Conta
                            </Typography>
                            {!isEditing ? (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={handleEdit}
                                    variant="outlined"
                                    size="small"
                                >
                                    Editar
                                </Button>
                            ) : (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        startIcon={<SaveIcon />}
                                        onClick={handleSave}
                                        variant="contained"
                                        size="small"
                                        disabled={loading}
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        startIcon={<CancelIcon />}
                                        onClick={handleCancel}
                                        variant="outlined"
                                        size="small"
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                    Nome Completo
                                </Typography>
                                {isEditing ? (
                                    <TextField
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        disabled={loading}
                                    />
                                ) : (
                                    <Typography variant="body1">
                                        {fullName}
                                    </Typography>
                                )}
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Email
                                </Typography>
                                <Typography variant="body1">
                                    {userEmail}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Status
                                </Typography>
                                <Typography variant="body1" color="success.main">
                                    Ativo
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}