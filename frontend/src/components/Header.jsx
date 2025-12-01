import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);
    
    // Função para obter primeira letra do nome completo do usuário
    const getUserInitial = () => {
        const fullName = localStorage.getItem('userFullName');
        if (fullName && fullName.trim()) {
            // Pega a primeira letra do primeiro nome
            return fullName.trim().charAt(0).toUpperCase();
        }
        return 'U'; // Fallback
    };
    
    useEffect(() => {
        // Verificar se usuário está logado
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
    }, []);

    // Fechar menu ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userFullName');
        setIsAuthenticated(false);
        setShowMenu(false);
        navigate('/login');
    };

    return (
        <header className="gradient-header">
            <div className="mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" style={{maxWidth: '100rem'}}>
                <div className="flex justify-between items-center h-16">
                    {/* Logo e Título */}
                    <RouterLink 
                        to="/" 
                        className="flex items-center space-x-3 hover:opacity-80 transition-opacity no-underline"
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-white hidden sm:block">
                            Sistema de Gerenciamento de Eventos
                        </h1>
                        <h1 className="text-xl font-bold text-white sm:hidden">
                            SGE
                        </h1>
                    </RouterLink>
                    
                    {/* Navegação */}
                    <div className="flex items-center space-x-1">
                        <RouterLink 
                            to="/" 
                            className="nav-link px-3 py-2 rounded-md text-sm font-medium no-underline"
                            style={{color: '#d1d5db', textDecoration: 'none'}}
                        >
                            Eventos
                        </RouterLink>
                        
                        {isAuthenticated ? (
                            <>
                                <RouterLink 
                                    to="/create" 
                                    className="nav-link px-3 py-2 rounded-md text-sm font-medium hidden sm:block no-underline"
                                    style={{color: '#d1d5db', textDecoration: 'none'}}
                                >
                                    Criar Evento
                                </RouterLink>
                                
                                <div className="relative" ref={dropdownRef}>
                                    <button 
                                        onClick={() => setShowMenu(!showMenu)}
                                        className="flex items-center space-x-1 text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                        style={{backgroundColor: '#374151', border: 'none', outline: 'none'}}
                                    >
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                                            {getUserInitial()}
                                        </div>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    
                                    {showMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform -translate-x-2">
                                            <RouterLink 
                                                to="/profile" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                onClick={() => setShowMenu(false)}
                                            >
                                                Meu Perfil
                                            </RouterLink>
                                            <hr className="my-1" />
                                            <button 
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                Sair
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <RouterLink 
                                to="/login"
                                className="btn-primary"
                            >
                                Entrar
                            </RouterLink>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}