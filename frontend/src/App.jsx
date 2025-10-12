import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import EventList from './pages/EventList';
import Header from './components/Header';
import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<EventList />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
