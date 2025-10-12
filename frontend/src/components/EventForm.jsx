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
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EventService } from '../services/api';

export default function EventForm() {
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!event.title) newErrors.title = 'Título é obrigatório';
        if (!event.description) newErrors.description = 'Descrição é obrigatória';
        if (!event.date) newErrors.date = 'Data é obrigatória';
        if (!event.location) newErrors.location = 'Local é obrigatório';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setErrorMessage('');
        
        try {
            await EventService.createEvent(event);
            setSuccessMessage('Evento criado com sucesso!');
            setEvent({ title: '', description: '', date: '', location: '' });
            setTimeout(() => {
                navigate('/');
            }, 2000);
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
                            error={Boolean(errors.description)}
                            helperText={errors.description}
                            required
                        />
                        <TextField
                            label="Data"
                            type="datetime-local"
                            value={event.date}
                            onChange={(e) => setEvent({ ...event, date: e.target.value })}
                            error={Boolean(errors.date)}
                            helperText={errors.date}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            label="Local"
                            value={event.location}
                            onChange={(e) => setEvent({ ...event, location: e.target.value })}
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