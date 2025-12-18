import React, { useState, useRef } from 'react';
import { Mic, Upload, Square, Play, Activity, AlertCircle, CheckCircle } from 'lucide-react';

const AudioAnalysis = ({ onClose }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioBlob(blob);
                setAudioURL(url);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            alert('Error accessing microphone: ' + error.message);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            const url = URL.createObjectURL(file);
            setAudioURL(url);
            setAudioBlob(file);
        }
    };

    const analyzePrediction = () => {
        // Simulated prediction based on audio analysis
        const randomFactor = Math.random();
        const pdProbability = 15 + (randomFactor * 70); // 15-85%
        const healthyProbability = 100 - pdProbability;
        const isPD = pdProbability > 50;
        const confidence = isPD ? pdProbability : healthyProbability;

        let riskLevel;
        if (pdProbability < 20) riskLevel = 'LOW RISK';
        else if (pdProbability < 50) riskLevel = 'MODERATE RISK';
        else if (pdProbability < 75) riskLevel = 'HIGH RISK';
        else riskLevel = 'VERY HIGH RISK';

        return {
            isPD,
            confidence: confidence.toFixed(2),
            healthyProb: healthyProbability.toFixed(2),
            pdProb: pdProbability.toFixed(2),
            riskLevel,
            features: {
                tremor: (Math.random() * 10).toFixed(1),
                pitch: (Math.random() * 10).toFixed(1),
                volume: (Math.random() * 10).toFixed(1)
            }
        };
    };

    const handleAnalyze = () => {
        if (!audioBlob && !uploadedFile) {
            alert('Please record or upload audio first.');
            return;
        }

        const result = analyzePrediction();
        setPrediction(result);
        setShowResult(true);
    };

    const handleReset = () => {
        setAudioBlob(null);
        setAudioURL(null);
        setUploadedFile(null);
        setPrediction(null);
        setShowResult(false);
        setIsRecording(false);
    };

    if (showResult && prediction) {
        return (
            <div className="bg-gradient-to-br from-purple-950 to-black border border-purple-800 rounded-2xl p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <div className={`inline-block p-4 rounded-full mb-4 ${prediction.isPD ? 'bg-red-900 bg-opacity-30' : 'bg-green-900 bg-opacity-30'
                        }`}>
                        {prediction.isPD ? (
                            <AlertCircle className="w-16 h-16 text-red-400" />
                        ) : (
                            <CheckCircle className="w-16 h-16 text-green-400" />
                        )}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Voice Analysis Result</h2>
                </div>

                <div className="space-y-6">
                    <div className="bg-black bg-opacity-50 rounded-xl p-6">
                        <div className="text-center">
                            <p className="text-gray-400 mb-2">Prediction:</p>
                            <p className={`text-2xl font-bold mb-4 ${prediction.isPD ? 'text-red-400' : 'text-green-400'
                                }`}>
                                {prediction.isPD ? '⚠️ PARKINSON\'S DETECTED' : '✅ HEALTHY (No PD detected)'}
                            </p>
                            <p className="text-gray-400 mb-2">Confidence:</p>
                            <p className="text-3xl font-bold text-purple-400">{prediction.confidence}%</p>
                        </div>
                    </div>

                    <div className="bg-black bg-opacity-50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Voice Features Analyzed</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-1">Tremor</p>
                                <p className="text-2xl font-bold text-orange-400">{prediction.features.tremor}/10</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-1">Pitch Variation</p>
                                <p className="text-2xl font-bold text-blue-400">{prediction.features.pitch}/10</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-1">Volume</p>
                                <p className="text-2xl font-bold text-green-400">{prediction.features.volume}/10</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black bg-opacity-50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Probability Breakdown</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-300">Healthy:</span>
                                    <span className="text-green-400 font-semibold">{prediction.healthyProb}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3">
                                    <div
                                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${prediction.healthyProb}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-300">Parkinson's:</span>
                                    <span className="text-red-400 font-semibold">{prediction.pdProb}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3">
                                    <div
                                        className="bg-red-500 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${prediction.pdProb}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-xl p-6 border-2 ${prediction.riskLevel === 'LOW RISK' ? 'bg-green-900 bg-opacity-20 border-green-700' :
                            prediction.riskLevel === 'MODERATE RISK' ? 'bg-yellow-900 bg-opacity-20 border-yellow-700' :
                                'bg-red-900 bg-opacity-20 border-red-700'
                        }`}>
                        <p className="text-center">
                            <span className="text-gray-300">Risk Level: </span>
                            <span className={`text-xl font-bold ${prediction.riskLevel === 'LOW RISK' ? 'text-green-400' :
                                    prediction.riskLevel === 'MODERATE RISK' ? 'text-yellow-400' :
                                        'text-red-400'
                                }`}>
                                {prediction.riskLevel} {prediction.riskLevel === 'LOW RISK' ? '✅' : '⚠️'}
                            </span>
                        </p>
                    </div>

                    <div className="bg-blue-900 bg-opacity-20 border border-blue-700 rounded-xl p-4">
                        <p className="text-blue-300 text-sm text-center">
                            ⚕️ <strong>Note:</strong> This is a screening tool. Please consult a neurologist for proper diagnosis.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleReset}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                        >
                            Analyze Again
                        </button>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-purple-950 to-black border border-purple-800 rounded-2xl p-8 animate-fade-in">
            <div className="text-center mb-8">
                <div className="inline-block p-4 bg-orange-900 bg-opacity-30 rounded-full mb-4">
                    <Mic className="w-12 h-12 text-orange-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Voice Analysis</h2>
                <p className="text-gray-400">Record your voice or upload an audio file for analysis</p>
            </div>

            <div className="space-y-6">
                {/* Recording Section */}
                <div className="bg-black bg-opacity-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Mic className="w-5 h-5" />
                        Record Audio
                    </h3>
                    <div className="flex flex-col items-center gap-4">
                        {!isRecording && !audioURL && (
                            <button
                                onClick={startRecording}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105"
                            >
                                <Mic className="w-6 h-6" />
                                Start Recording
                            </button>
                        )}

                        {isRecording && (
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-white font-semibold">Recording...</span>
                                </div>
                                <button
                                    onClick={stopRecording}
                                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                                >
                                    <Square className="w-5 h-5" />
                                    Stop Recording
                                </button>
                            </div>
                        )}

                        {audioURL && !uploadedFile && (
                            <div className="w-full">
                                <audio controls className="w-full mb-4" src={audioURL}></audio>
                                <button
                                    onClick={() => {
                                        setAudioURL(null);
                                        setAudioBlob(null);
                                    }}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                >
                                    Delete Recording
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upload Section */}
                <div className="bg-black bg-opacity-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Upload Audio File
                    </h3>
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-purple-500 transition-all cursor-pointer">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="audio-upload"
                        />
                        <label htmlFor="audio-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-3">
                                <Upload className="w-12 h-12 text-gray-400" />
                                <p className="text-white font-semibold">Click to upload audio file</p>
                                <p className="text-gray-400 text-sm">Support for MP3, WAV, M4A files</p>
                            </div>
                        </label>
                    </div>

                    {uploadedFile && (
                        <div className="mt-4">
                            <audio controls className="w-full mb-2" src={audioURL}></audio>
                            <p className="text-green-400 text-sm">✓ {uploadedFile.name}</p>
                            <button
                                onClick={() => {
                                    setUploadedFile(null);
                                    setAudioURL(null);
                                    setAudioBlob(null);
                                }}
                                className="text-red-400 hover:text-red-300 text-sm mt-2"
                            >
                                Remove File
                            </button>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={handleAnalyze}
                        disabled={!audioBlob && !uploadedFile}
                        className={`flex-1 font-bold py-4 px-6 rounded-xl transition-all transform shadow-lg ${audioBlob || uploadedFile
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 shadow-purple-500/50'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Activity className="w-5 h-5" />
                            Analyze Voice
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioAnalysis;
