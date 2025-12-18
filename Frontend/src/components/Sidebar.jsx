import React from 'react';
import { Brain, X, Activity, Stethoscope, Pill, BookOpen } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, currentRoute, setCurrentRoute }) => {
    const routes = [
        { id: 'home', label: 'Prediction', icon: Activity },
        { id: 'about', label: 'About Disease', icon: Brain },
        { id: 'symptoms', label: 'Symptoms', icon: Stethoscope },
        { id: 'treatment', label: 'Treatment', icon: Pill },
        { id: 'research', label: 'Research', icon: BookOpen }
    ];

    const handleRouteClick = (routeId) => {
        setCurrentRoute(routeId);
        // Only close sidebar on mobile
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    return (
        <>
            <div className={`fixed top-0 left-0 h-full bg-black border-r border-gray-800 transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-0 md:w-64'} overflow-hidden`}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <Brain className="w-8 h-8 text-purple-500" />
                            <span className="text-xl font-bold text-white">NeuroPredict</span>
                        </div>
                        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white md:hidden">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {routes.map(route => {
                            const Icon = route.icon;
                            return (
                                <button
                                    key={route.id}
                                    onClick={() => handleRouteClick(route.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentRoute === route.id
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{route.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;
