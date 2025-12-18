import React from 'react';
import { Pill } from 'lucide-react';

const TreatmentPage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="relative mb-8 rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-green-900 via-teal-900 to-black">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <Pill className="w-24 h-24 text-green-300 mx-auto mb-4 animate-pulse" />
                        <h1 className="text-4xl font-bold text-white">Treatment Options</h1>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-950 to-black border border-purple-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Medications</h2>
                    <div className="space-y-4">
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Levodopa (L-dopa)</h3>
                            <p className="text-gray-400 text-sm">The most effective medication, converted to dopamine in the brain. Often combined with carbidopa to prevent premature conversion.</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Dopamine Agonists</h3>
                            <p className="text-gray-400 text-sm">Mimic dopamine effects in the brain. Include pramipexole, ropinirole, and rotigotine.</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">MAO-B Inhibitors</h3>
                            <p className="text-gray-400 text-sm">Prevent breakdown of brain dopamine by inhibiting the enzyme monoamine oxidase B.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Surgical Treatments</h2>
                    <div className="space-y-4">
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Deep Brain Stimulation (DBS)</h3>
                            <p className="text-gray-400 text-sm mb-2">
                                Electrodes implanted in the brain send electrical impulses to regulate abnormal brain activity.
                                Most effective for tremor, rigidity, and slowness of movement.
                            </p>
                            <div className="text-purple-300 text-xs">Recommended for advanced cases when medications become less effective</div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Supportive Therapies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Physical Therapy</h3>
                            <p className="text-gray-400 text-sm">Focuses on balance, flexibility, and reducing fall risk</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Occupational Therapy</h3>
                            <p className="text-gray-400 text-sm">Helps maintain independence in daily activities</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Speech Therapy</h3>
                            <p className="text-gray-400 text-sm">Addresses voice, speech, and swallowing difficulties</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Exercise Programs</h3>
                            <p className="text-gray-400 text-sm">Regular aerobic exercise and strength training</p>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-900 bg-opacity-20 border border-purple-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-purple-300 mb-3">Lifestyle Management</h2>
                    <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <span>Maintain a healthy diet rich in antioxidants and fiber</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <span>Stay physically active with regular exercise routines</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <span>Join support groups and maintain social connections</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <span>Practice stress management and mindfulness techniques</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TreatmentPage;
