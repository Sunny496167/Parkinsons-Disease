import React from 'react';
import { BookOpen } from 'lucide-react';

const ResearchPage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="relative mb-8 rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-blue-900 via-indigo-900 to-black">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <BookOpen className="w-24 h-24 text-blue-300 mx-auto mb-4 animate-pulse" />
                        <h1 className="text-4xl font-bold text-white">Current Research</h1>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-950 to-black border border-purple-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">AI in Diagnosis</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Artificial intelligence and machine learning are revolutionizing Parkinson's disease detection.
                        Our platform uses advanced neural networks to analyze multiple data modalities for early detection.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-purple-300 font-semibold mb-2">MRI Analysis</h3>
                            <p className="text-gray-400 text-sm">Deep learning models detect subtle brain changes before symptoms appear</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-purple-300 font-semibold mb-2">Voice Analysis</h3>
                            <p className="text-gray-400 text-sm">AI detects micro-variations in speech patterns and vocal tremors</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Emerging Therapies</h2>
                    <div className="space-y-4">
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Gene Therapy</h3>
                            <p className="text-gray-400 text-sm">
                                Researchers are developing gene therapies to restore dopamine production and protect
                                remaining neurons from degeneration.
                            </p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Stem Cell Research</h3>
                            <p className="text-gray-400 text-sm">
                                Clinical trials exploring stem cell transplantation to replace damaged dopamine-producing neurons.
                            </p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Neuroprotective Drugs</h3>
                            <p className="text-gray-400 text-sm">
                                Development of medications that could slow or stop disease progression by protecting brain cells.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Biomarker Discovery</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Scientists are identifying biological markers that could enable earlier diagnosis and better
                        tracking of disease progression.
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <span className="text-gray-300">Blood-based biomarkers for early detection</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <span className="text-gray-300">Advanced neuroimaging techniques</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <span className="text-gray-300">Genetic screening for risk assessment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResearchPage;
