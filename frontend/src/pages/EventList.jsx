import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventService } from '../services/api';
import EventFilters from '../components/EventFilters';
import Dashboard from '../components/Dashboard';
import EventModal from '../components/EventModal';

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        loadEvents();
    }, []);
    
    const handleFilter = (filters) => {
        console.log('Aplicando filtros:', filters);
        loadEvents(filters);
    };
    
    const handleRefresh = () => {
        console.log('Recarregando eventos...');
        loadEvents();
    };

    const loadEvents = async (filters = {}) => {
        setLoading(true);
        setError('');
        try {
            const data = await EventService.getEvents(filters);
            console.log('Dados carregados:', data);
            setEvents(Array.isArray(data) ? data : []);
            if (!Array.isArray(data) || data.length === 0) {
                setError('');
            }
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
            if (error.response?.status === 404) {
                setError('');
                setEvents([]);
            } else if (error.response?.status === 500) {
                setError('Erro no servidor. Verifique a conexão com o banco de dados.');
            } else if (error.response?.status === 0 || !error.response) {
                setError('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
            } else {
                setError(`Erro ${error.response?.status}: ${error.response?.data?.detail || 'Erro desconhecido'}`);
            }
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
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

    const isEventPast = (event) => {
        const endDate = new Date(event.end_date || event.start_date);
        return endDate < new Date();
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEvent(null);
    };

    const handleEventUpdated = () => {
        loadEvents();
    };



    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary-800 via-primary-900 to-primary-900 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2" style={{color: 'rgb(55, 55, 55)'}}>
                            Gerenciamento de Eventos
                        </h1>
                        <p className="text-gray-300">
                            Visualize e gerencie todos os eventos cadastrados no sistema
                        </p>
                    </div>
                    {localStorage.getItem('token') && (
                        <Link
                            to="/create"
                            className="btn-primary"
                        >
                            + Novo Evento
                        </Link>
                    )}
                </div>
            </div>

            {/* Dashboard */}
            <Dashboard events={events} />
            
            {/* Filters */}
            <EventFilters onFilter={handleFilter} />

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-800">{error}</p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                /* Events Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {events.map((event) => (
                        <div 
                            key={event.id}
                            className={`card p-6 event-card cursor-pointer hover:shadow-lg transition-shadow ${isEventPast(event) ? 'opacity-60' : ''}`}
                            onClick={() => handleEventClick(event)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                    {event.title}
                                </h3>
                                {isEventPast(event) && (
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        Finalizado
                                    </span>
                                )}
                            </div>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    {formatDate(event.start_date)}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    {event.location}
                                </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 line-clamp-3">
                                {event.description}
                            </p>
                        </div>
                    ))}
                    
                    {/* Empty State */}
                    {!loading && events.length === 0 && !error && (
                        <div className="col-span-full">
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Nenhum evento encontrado
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Comece criando seu primeiro evento no sistema.
                                </p>
                                {localStorage.getItem('token') && (
                                    <Link
                                        to="/create"
                                        className="btn-primary"
                                    >
                                        Criar Primeiro Evento
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Event Modal */}
            <EventModal 
                event={selectedEvent}
                open={modalOpen}
                onClose={handleCloseModal}
                onEventUpdated={handleEventUpdated}
            />
        </div>
    );
}