import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './pages/EventList';
import EventForm from './components/EventForm';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-8" style={{maxWidth: '100rem'}}>
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/create" element={<EventForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
