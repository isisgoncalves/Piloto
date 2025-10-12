import React from 'react';
import {
    Paper,
    TextField,
    Grid,
    Button,
} from '@mui/material';

export default function EventFilters({ onFilter }) {
    const [filters, setFilters] = React.useState({
        title: '',
        startDate: '',
        endDate: '',
        location: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter(filters);
    };

    const handleClear = () => {
        setFilters({
            title: '',
            startDate: '',
            endDate: '',
            location: ''
        });
        onFilter({});
    };

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Título do Evento"
                            name="title"
                            value={filters.title}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Local"
                            name="location"
                            value={filters.location}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            fullWidth
                            label="Data Inicial"
                            name="startDate"
                            type="date"
                            value={filters.startDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            fullWidth
                            label="Data Final"
                            name="endDate"
                            type="date"
                            value={filters.endDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} md={2} sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Filtrar
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClear}
                            fullWidth
                        >
                            Limpar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}