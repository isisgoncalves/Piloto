import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { EventService } from '../services/api';

export default function EventModal({ event, open, onClose, onEventUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || '',
                description: event.description || '',
                start_date: event.start_date ? formatDateForInput(event.start_date) : '',
                end_date: event.end_date ? formatDateForInput(event.end_date) : '',
                location: event.location || ''
            });
        }
    }, [event]);

    const formatDateForInput = (dateString) => {
        try {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        } catch {
            return '';
        }
    };

    const formatDateForDisplay = (dateString) => {
        try {
            return new Date(dateString).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Data inválida';
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setError('');
    };

    const handleCancel = () => {
        if (event) {
            setFormData({
                title: event.title || '',
                description: event.description || '',
                start_date: event.start_date ? formatDateForInput(event.start_date) : '',
                end_date: event.end_date ? formatDateForInput(event.end_date) : '',
                location: event.location || ''
            });
        }
        setIsEditing(false);
        setError('');
    };

    const handleSave = async () => {
        // Validação
        if (!formData.title || !formData.start_date || !formData.end_date || !formData.location) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        if (new Date(formData.start_date) > new Date(formData.end_date)) {
            setError('A data de início deve ser anterior à data de fim');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await EventService.updateEvent(event.id, {
                title: formData.title,
                description: formData.description,
                start_date: new Date(formData.start_date).toISOString(),
                end_date: new Date(formData.end_date).toISOString(),
                location: formData.location
            });
            
            setIsEditing(false);
            if (onEventUpdated) {
                onEventUpdated();
            }
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            setError(error.response?.data?.detail || 'Erro ao atualizar evento');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Tem certeza que deseja excluir este evento?')) {
            return;
        }

        setLoading(true);
        try {
            await EventService.deleteEvent(event.id);
            if (onEventUpdated) {
                onEventUpdated();
            }
            onClose();
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
            setError(error.response?.data?.detail || 'Erro ao excluir evento');
        } finally {
            setLoading(false);
        }
    };

    if (!event) return null;

    const isEventPast = new Date(event.end_date || event.start_date) < new Date();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <span>{isEditing ? 'Editar Evento' : 'Detalhes do Evento'}</span>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            
            <DialogContent dividers>
                {error && (
                    <Box mb={2} p={2} bgcolor="error.light" borderRadius={1}>
                        <span style={{ color: 'white' }}>{error}</span>
                    </Box>
                )}

                {isEventPast && !isEditing && (
                    <Box mb={2} p={2} bgcolor="grey.200" borderRadius={1}>
                        <span>Este evento já foi finalizado</span>
                    </Box>
                )}

                <Box display="flex" flexDirection="column" gap={2}>
                    {!isEditing ? (
                        <>
                            <div>
                                <strong>Título:</strong>
                                <p>{event.title}</p>
                            </div>
                            <div>
                                <strong>Descrição:</strong>
                                <p>{event.description}</p>
                            </div>
                            <div>
                                <strong>Data de Início:</strong>
                                <p>{formatDateForDisplay(event.start_date)}</p>
                            </div>
                            <div>
                                <strong>Data de Fim:</strong>
                                <p>{formatDateForDisplay(event.end_date)}</p>
                            </div>
                            <div>
                                <strong>Local:</strong>
                                <p>{event.location}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <TextField
                                label="Título"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Descrição"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                fullWidth
                                multiline
                                rows={4}
                                required
                            />
                            <TextField
                                label="Data de Início"
                                type="datetime-local"
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Data de Fim"
                                type="datetime-local"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Local"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                fullWidth
                                required
                            />
                        </>
                    )}
                </Box>
            </DialogContent>
            
            <DialogActions>
                {!isEditing ? (
                    <>
                        <Button onClick={handleDelete} color="error" disabled={loading}>
                            Excluir
                        </Button>
                        <Button onClick={handleEdit} color="primary" variant="contained">
                            Editar
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleCancel} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSave} color="primary" variant="contained" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}
