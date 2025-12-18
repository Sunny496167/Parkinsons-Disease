import React, { useState } from 'react';
import { Brain, Image, Mic, Video, FileText, ChevronRight, Activity } from 'lucide-react';
import QuestionnaireForm from '../components/QuestionnaireForm';
import AudioAnalysis from '../components/AudioAnalysis';
import DrawingAnalysis from '../components/DrawingAnalysis';

const HomePage = () => {
    const [selectedModel, setSelectedModel] = useState(null);

    const models = [
        { id: 'drawing', name: 'Drawing Test', icon: FileText, description: 'Symptom-based drawing assessment', color: 'from-green-500 to-teal-500', type: 'questionnaire' },
        { id: 'audio', name: 'Voice Analysis', icon: Mic, description: 'Symptom-based voice assessment', color: 'from-orange-500 to-red-500', type: 'questionnaire' },
        { id: 'symptoms', name: 'Symptom Assessment', icon: Activity, description: 'Comprehensive symptom questionnaire', color: 'from-purple-500 to-indigo-500', type: 'questionnaire' }
    ];

    const selectedModelData = models.find(m => m.id === selectedModel);

    return (
        <div className="max-w-6xl mx-auto">
            {/* Hero Section with Animated Background */}
            <div className="relative text-center mb-12 pb-12">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <div className="relative z-10">
                    <div className="inline-block mb-6 p-4 bg-purple-900 bg-opacity-30 rounded-full">
                        <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Parkinson's Disease <span className="text-purple-500">Prediction</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        AI-powered early detection using multiple diagnostic modalities
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {models.map(model => {
                    const Icon = model.icon;
                    return (
                        <button
                            key={model.id}
                            onClick={() => setSelectedModel(model.id)}
                            className={`group relative p-8 rounded-2xl border-2 transition-all text-left overflow-hidden ${selectedModel === model.id
                                ? 'border-purple-500 bg-purple-950 bg-opacity-30 scale-105'
                                : 'border-gray-800 bg-gray-900 hover:border-gray-700 hover:scale-102'
                                }`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${model.color} opacity-20 rounded-full blur-2xl transition-all group-hover:opacity-30`}></div>
                            <div className="relative z-10">
                                <div className={`inline-block p-3 rounded-xl mb-4 ${selectedModel === model.id ? 'bg-purple-600' : 'bg-gray-800'}`}>
                                    <Icon className={`w-8 h-8 ${selectedModel === model.id ? 'text-white' : 'text-gray-400'}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
                                <p className="text-gray-400 text-sm mb-3">{model.description}</p>
                                {model.type === 'questionnaire' && (
                                    <div className="inline-block px-3 py-1 bg-purple-600 bg-opacity-30 rounded-full">
                                        <span className="text-purple-300 text-xs font-semibold">Q&A Based</span>
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {selectedModel && selectedModelData && (
                <>
                    {selectedModel === 'audio' ? (
                        <AudioAnalysis onClose={() => setSelectedModel(null)} />
                    ) : selectedModel === 'drawing' ? (
                        <DrawingAnalysis onClose={() => setSelectedModel(null)} />
                    ) : selectedModel === 'symptoms' ? (
                        <QuestionnaireForm onClose={() => setSelectedModel(null)} />
                    ) : null}
                </>
            )}
        </div>
    );
};

export default HomePage;
