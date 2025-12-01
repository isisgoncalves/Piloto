import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    Typography, 
    Box, 
    Alert, 
    Snackbar,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { EventService } from '../services/api';

export default function EventForm() {
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [createdEventTitle, setCreatedEventTitle] = useState('');

    const validateField = (field, value) => {
        let error = '';
        
        if (!value || value.toString().trim() === '') {
            switch(field) {
                case 'title': return 'Título é obrigatório';
                case 'description': return 'Descrição é obrigatória';
                case 'date': return 'Data é obrigatória';
                case 'location': return 'Local é obrigatório';
                default: return `${field} é obrigatório`;
            }
        }

        switch(field) {
            case 'title':
                if (value.length < 3) return 'O título deve ter pelo menos 3 caracteres';
                if (value.length > 200) return 'O título deve ter no máximo 200 caracteres';
                if (!/^[a-zA-ZÀ-ÿ0-9\s\-\.\,\!\?]+$/.test(value)) return 'Título contém caracteres inválidos';
                break;
                
            case 'description':
                if (value.length < 10) return 'A descrição deve ter pelo menos 10 caracteres';
                if (value.length > 1000) return 'A descrição deve ter no máximo 1000 caracteres';
                break;
                
            case 'start_date':
                if (!value) return 'Data de início é obrigatória';
                const startDate = new Date(value);
                const now = new Date();
                if (isNaN(startDate.getTime())) return 'Formato de data inválido';
                if (startDate <= now) return 'A data de início deve ser no futuro';
                const maxDate = new Date();
                maxDate.setFullYear(maxDate.getFullYear() + 2);
                if (startDate > maxDate) return 'A data não pode ser superior a 2 anos';
                break;
                
            case 'end_date':
                if (!value) return 'Data de fim é obrigatória';
                const endDate = new Date(value);
                const startDateForCompare = new Date(event.start_date);
                if (isNaN(endDate.getTime())) return 'Formato de data inválido';
                if (event.start_date && endDate <= startDateForCompare) return 'A data de fim deve ser posterior à data de início';
                break;
                
            case 'location':
                if (value.length < 3) return 'O local deve ter pelo menos 3 caracteres';
                if (value.length > 200) return 'O local deve ter no máximo 200 caracteres';
                break;
        }
        
        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(event).forEach((field) => {
            const error = validateField(field, event[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field) => {
        const error = validateField(field, event[field]);
        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setErrorMessage('');
        
        try {
            // Verificar se o usuário está autenticado
            const token = localStorage.getItem('access_token');
            if (!token) {
                setErrorMessage('Você precisa estar logado para criar eventos');
                setLoading(false);
                return;
            }
            
            // Validar datas antes de enviar
            if (!event.start_date) {
                setErrorMessage('Data de início é obrigatória');
                setLoading(false);
                return;
            }
            
            if (!event.end_date) {
                setErrorMessage('Data de fim é obrigatória');
                setLoading(false);
                return;
            }
            
            const eventData = {
                title: event.title.trim(),
                description: event.description.trim(),
                start_date: event.start_date,
                end_date: event.end_date,
                location: event.location.trim()
            };
            
            console.log('Dados do evento antes de enviar:', eventData);
            console.log('Token presente:', !!token);
            await EventService.createEvent(eventData);
            
            // Armazenar título do evento criado e mostrar modal
            setCreatedEventTitle(event.title.trim());
            setShowSuccessModal(true);
            
            // Limpar o formulário
            setEvent({ title: '', description: '', start_date: '', end_date: '', location: '' });
            setErrors({});
            
        } catch (error) {
            setErrorMessage(error.response?.data?.detail || 'Erro ao criar evento');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Criar Novo Evento
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Título"
                            value={event.title}
                            onChange={(e) => setEvent({ ...event, title: e.target.value })}
                            onBlur={() => handleBlur('title')}
                            error={Boolean(errors.title)}
                            helperText={errors.title}
                            required
                        />
                        <TextField
                            label="Descrição"
                            multiline
                            rows={4}
                            value={event.description}
                            onChange={(e) => setEvent({ ...event, description: e.target.value })}
                            onBlur={() => handleBlur('description')}
                            error={Boolean(errors.description)}
                            helperText={errors.description}
                            required
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Data de Início"
                                type="datetime-local"
                                value={event.start_date}
                                onChange={(e) => setEvent({ ...event, start_date: e.target.value })}
                                onBlur={() => handleBlur('start_date')}
                                error={Boolean(errors.start_date)}
                                helperText={errors.start_date}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Data de Fim"
                                type="datetime-local"
                                value={event.end_date}
                                onChange={(e) => setEvent({ ...event, end_date: e.target.value })}
                                onBlur={() => handleBlur('end_date')}
                                error={Boolean(errors.end_date)}
                                helperText={errors.end_date}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />
                        </Box>
                        <TextField
                            label="Local"
                            value={event.location}
                            onChange={(e) => setEvent({ ...event, location: e.target.value })}
                            onBlur={() => handleBlur('location')}
                            error={Boolean(errors.location)}
                            helperText={errors.location}
                            required
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Criar Evento'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            
            {/* Modal de Sucesso */}
            <Dialog 
                open={showSuccessModal} 
                onClose={() => setShowSuccessModal(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
                    <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                    <Typography variant="h5" component="div">
                        Evento Criado com Sucesso!
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                        O evento "<strong>{createdEventTitle}</strong>" foi cadastrado com sucesso no sistema.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => {
                            setShowSuccessModal(false);
                            navigate('/');
                        }}
                    >
                        Visualizar Eventos
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="primary"
                        onClick={() => setShowSuccessModal(false)}
                    >
                        Criar Novo Evento
                    </Button>
                    <Button 
                        variant="text" 
                        color="primary"
                        onClick={() => {
                            setShowSuccessModal(false);
                            navigate('/');
                        }}
                    >
                        Ir para Início
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar 
                open={Boolean(successMessage)} 
                autoHideDuration={6000} 
                onClose={() => setSuccessMessage('')}
            >
                <Alert severity="success" onClose={() => setSuccessMessage('')}>
                    {successMessage}
                </Alert>
            </Snackbar>

            <Snackbar 
                open={Boolean(errorMessage)} 
                autoHideDuration={6000} 
                onClose={() => setErrorMessage('')}
            >
                <Alert severity="error" onClose={() => setErrorMessage('')}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
}