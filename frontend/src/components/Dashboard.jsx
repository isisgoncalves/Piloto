import React from 'react';

export default function Dashboard({ events }) {
    const totalEvents = events.length;
    const now = new Date();
    const activeEvents = events.filter(event => {
        const endDate = new Date(event.end_date || event.start_date);
        return endDate >= now;
    }).length;
    const pastEvents = totalEvents - activeEvents;
    const thisMonth = events.filter(event => {
        const eventDate = new Date(event.start_date);
        return eventDate.getMonth() === now.getMonth() && 
               eventDate.getFullYear() === now.getFullYear();
    }).length;

    const stats = [
        {
            title: 'Total de Eventos',
            value: totalEvents,
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
            ),
            color: 'text-blue-600',
            bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
            iconBg: 'bg-blue-500'
        },
        {
            title: 'Eventos Ativos',
            value: activeEvents,
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            ),
            color: 'text-gray-600',
            bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
            iconBg: 'bg-gray-500'
        },
        {
            title: 'Eventos Passados',
            value: pastEvents,
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
            ),
            color: 'text-gray-600',
            bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
            iconBg: 'bg-gray-500'
        },
        {
            title: 'Este Mês',
            value: thisMonth,
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'text-gray-600',
            bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
            iconBg: 'bg-gray-500'
        }
    ];

    return (
        <div className="mb-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Painel de Controle</h2>
                <p className="text-gray-800">Visão geral dos eventos cadastrados no sistema</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                    <div 
                        key={index}
                        className={`card p-6 ${stat.bgColor} border-l-4 border-l-${stat.iconBg.replace('bg-', '').replace('-500', '-400')}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    {stat.title}
                                </p>
                                <p className={`text-3xl font-bold ${stat.color}`}>
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`${stat.iconBg} p-3 rounded-full`}>
                                <div className="text-white">
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}