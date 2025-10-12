import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sistema de Eventos
                </Typography>
                <Box>
                    <Button 
                        color="inherit" 
                        component={RouterLink} 
                        to="/"
                    >
                        Eventos
                    </Button>
                    <Button 
                        color="inherit" 
                        component={RouterLink} 
                        to="/create"
                    >
                        Criar Evento
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}