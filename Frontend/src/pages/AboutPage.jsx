import React from 'react';
import { Brain } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Hero Image Section */}
            <div className="relative mb-8 rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-purple-900 via-purple-800 to-black">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <Brain className="w-24 h-24 text-purple-300 mx-auto mb-4 animate-pulse" />
                        <h1 className="text-4xl font-bold text-white">About Parkinson's Disease</h1>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="space-y-6">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-700 transition-all">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-900 bg-opacity-30 rounded-lg">
                            <Brain className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-purple-400 mb-4">What is Parkinson's Disease?</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Parkinson's disease is a progressive neurodegenerative disorder that affects movement control.
                                It occurs when nerve cells in the brain that produce dopamine become impaired or die.
                                Dopamine is a neurotransmitter that plays a crucial role in sending messages to the part
                                of the brain that controls movement and coordination.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-700 transition-all">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Key Facts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-900 to-black p-4 rounded-lg border border-blue-800">
                            <div className="text-3xl font-bold text-blue-400 mb-2">10M+</div>
                            <p className="text-gray-300 text-sm">People affected worldwide</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-900 to-black p-4 rounded-lg border border-green-800">
                            <div className="text-3xl font-bold text-green-400 mb-2">60+</div>
                            <p className="text-gray-300 text-sm">Typical age of onset</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-900 to-black p-4 rounded-lg border border-orange-800">
                            <div className="text-3xl font-bold text-orange-400 mb-2">1.5x</div>
                            <p className="text-gray-300 text-sm">Higher risk in men</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900 to-black p-4 rounded-lg border border-purple-800">
                            <div className="text-3xl font-bold text-purple-400 mb-2">Early</div>
                            <p className="text-gray-300 text-sm">Detection improves outcomes</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Causes & Risk Factors</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        While the exact cause remains unknown, several factors may increase the risk:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-purple-300 font-semibold mb-2">Genetic Factors</h3>
                            <p className="text-gray-400 text-sm">Specific gene mutations can increase susceptibility</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-purple-300 font-semibold mb-2">Environmental Factors</h3>
                            <p className="text-gray-400 text-sm">Exposure to toxins and pesticides</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-purple-300 font-semibold mb-2">Age</h3>
                            <p className="text-gray-400 text-sm">Risk increases with advancing age</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-purple-300 font-semibold mb-2">Gender</h3>
                            <p className="text-gray-400 text-sm">More common in males</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
