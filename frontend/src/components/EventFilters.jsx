import React from 'react';

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
        console.log('Filtros aplicados:', filters);
        if (onFilter) {
            onFilter(filters);
        } else {
            console.error('onFilter function not provided');
        }
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
        <div className="card p-6 mb-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Filtros de Busca</h3>
                <p className="text-sm text-gray-600">Use os filtros abaixo para encontrar eventos específicos</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4 mb-4">
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Título do Evento
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={filters.title}
                            onChange={handleChange}
                            placeholder="Digite o título..."
                            className="input-field"
                        />
                    </div>
                    
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Local
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={filters.location}
                            onChange={handleChange}
                            placeholder="Digite o local..."
                            className="input-field"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data Inicial
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data Final
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        Filtrar Eventos
                    </button>
                    
                    <button
                        type="button"
                        onClick={handleClear}
                        className="btn-secondary"
                    >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Limpar Filtros
                    </button>
                </div>
            </form>
        </div>
    );
}