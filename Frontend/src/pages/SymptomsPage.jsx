import React from 'react';
import { Stethoscope } from 'lucide-react';

const SymptomsPage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="relative mb-8 rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-red-900 via-orange-900 to-black">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <Stethoscope className="w-24 h-24 text-orange-300 mx-auto mb-4 animate-pulse" />
                        <h1 className="text-4xl font-bold text-white">Symptoms & Signs</h1>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-950 to-black border border-purple-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Primary Motor Symptoms</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Tremor</h3>
                            <p className="text-gray-400 text-sm">Rhythmic shaking, usually starts in hands or fingers at rest</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Bradykinesia</h3>
                            <p className="text-gray-400 text-sm">Slowness of movement, making simple tasks difficult</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Rigidity</h3>
                            <p className="text-gray-400 text-sm">Muscle stiffness occurring in any part of the body</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Postural Instability</h3>
                            <p className="text-gray-400 text-sm">Impaired balance and coordination</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Non-Motor Symptoms</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <div>
                                <h3 className="text-white font-semibold">Cognitive Changes</h3>
                                <p className="text-gray-400 text-sm">Memory problems, difficulty concentrating</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <div>
                                <h3 className="text-white font-semibold">Sleep Disorders</h3>
                                <p className="text-gray-400 text-sm">Insomnia, REM sleep behavior disorder</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <div>
                                <h3 className="text-white font-semibold">Mood Disorders</h3>
                                <p className="text-gray-400 text-sm">Depression, anxiety, apathy</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <div>
                                <h3 className="text-white font-semibold">Autonomic Dysfunction</h3>
                                <p className="text-gray-400 text-sm">Blood pressure changes, digestive issues</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-900 bg-opacity-20 border border-purple-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-purple-300 mb-3">Early Warning Signs</h2>
                    <p className="text-gray-300 mb-4">Watch for these subtle early indicators:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-black bg-opacity-50 p-3 rounded-lg text-sm text-gray-300">
                            Small handwriting (micrographia)
                        </div>
                        <div className="bg-black bg-opacity-50 p-3 rounded-lg text-sm text-gray-300">
                            Loss of smell
                        </div>
                        <div className="bg-black bg-opacity-50 p-3 rounded-lg text-sm text-gray-300">
                            Trouble sleeping
                        </div>
                        <div className="bg-black bg-opacity-50 p-3 rounded-lg text-sm text-gray-300">
                            Voice changes
                        </div>
                        <div className="bg-black bg-opacity-50 p-3 rounded-lg text-sm text-gray-300">
                            Facial masking
                        </div>
                        <div className="bg-black bg-opacity-50 p-3 rounded-lg text-sm text-gray-300">
                            Constipation
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SymptomsPage;
