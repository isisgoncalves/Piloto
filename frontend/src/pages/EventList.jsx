import React, { useState, useEffect } from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Grid,
    Container,
    Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { EventService } from '../services/api';
import EventFilters from '../components/EventFilters';

export default function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async (filters = {}) => {
        try {
            const data = await EventService.getEvents(filters);
            setEvents(data);
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
        }
    };

    const handleFilter = (filters) => {
        loadEvents(filters);
    };

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h4">Eventos Disponíveis</Typography>
                <Button
                    component={Link}
                    to="/create"
                    variant="contained"
                    color="primary"
                >
                    Criar Novo Evento
                </Button>
            </div>
            <EventFilters onFilter={handleFilter} />
            <Grid container spacing={3}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {event.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {new Date(event.date).toLocaleString()}
                                </Typography>
                                <Typography variant="body2">
                                    Local: {event.location}
                                </Typography>
                                <Typography variant="body2" noWrap style={{ marginTop: '10px' }}>
                                    {event.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {events.length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" color="textSecondary">
                            Nenhum evento cadastrado
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}