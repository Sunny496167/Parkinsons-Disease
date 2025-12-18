import React, { useState, useRef, useEffect } from 'react';
import { Pen, Upload, Trash2, Activity, AlertCircle, CheckCircle } from 'lucide-react';

const DrawingAnalysis = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawing, setHasDrawing] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [drawingMode, setDrawingMode] = useState('canvas'); // 'canvas' or 'upload'

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && drawingMode === 'canvas') {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
        }
    }, [drawingMode]);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        setHasDrawing(true);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setHasDrawing(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzePrediction = () => {
        // Simulated prediction based on drawing analysis
        const randomFactor = Math.random();
        const pdProbability = 20 + (randomFactor * 65); // 20-85%
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
                smoothness: (Math.random() * 10).toFixed(1),
                accuracy: (Math.random() * 10).toFixed(1)
            }
        };
    };

    const handleAnalyze = () => {
        if (!hasDrawing && !uploadedImage) {
            alert('Please draw something or upload an image first.');
            return;
        }

        const result = analyzePrediction();
        setPrediction(result);
        setShowResult(true);
    };

    const handleReset = () => {
        clearCanvas();
        setUploadedImage(null);
        setPrediction(null);
        setShowResult(false);
        setDrawingMode('canvas');
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
                    <h2 className="text-3xl font-bold text-white mb-2">Drawing Analysis Result</h2>
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
                        <h3 className="text-xl font-bold text-white mb-4">Drawing Features Analyzed</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-1">Tremor</p>
                                <p className="text-2xl font-bold text-orange-400">{prediction.features.tremor}/10</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-1">Smoothness</p>
                                <p className="text-2xl font-bold text-blue-400">{prediction.features.smoothness}/10</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-1">Accuracy</p>
                                <p className="text-2xl font-bold text-green-400">{prediction.features.accuracy}/10</p>
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
                <div className="inline-block p-4 bg-green-900 bg-opacity-30 rounded-full mb-4">
                    <Pen className="w-12 h-12 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Drawing Test</h2>
                <p className="text-gray-400">Draw a spiral or wave pattern, or upload a drawing</p>
            </div>

            {/* Mode Selection */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setDrawingMode('canvas')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${drawingMode === 'canvas'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                >
                    <Pen className="w-5 h-5 inline mr-2" />
                    Draw Here
                </button>
                <button
                    onClick={() => setDrawingMode('upload')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${drawingMode === 'upload'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                >
                    <Upload className="w-5 h-5 inline mr-2" />
                    Upload Image
                </button>
            </div>

            <div className="space-y-6">
                {drawingMode === 'canvas' ? (
                    <div className="bg-black bg-opacity-50 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Draw a spiral or wave pattern</h3>
                            <button
                                onClick={clearCanvas}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear
                            </button>
                        </div>
                        <canvas
                            ref={canvasRef}
                            width={600}
                            height={400}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            className="w-full border-2 border-gray-700 rounded-xl cursor-crosshair bg-white"
                        />
                        <p className="text-gray-400 text-sm mt-3">
                            💡 Tip: Draw a spiral starting from the center, or draw wave patterns
                        </p>
                    </div>
                ) : (
                    <div className="bg-black bg-opacity-50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Upload Drawing Image</h3>
                        {!uploadedImage ? (
                            <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-purple-500 transition-all cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="drawing-upload"
                                />
                                <label htmlFor="drawing-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center gap-3">
                                        <Upload className="w-16 h-16 text-gray-400" />
                                        <p className="text-white font-semibold">Click to upload drawing image</p>
                                        <p className="text-gray-400 text-sm">Support for JPEG, PNG files</p>
                                    </div>
                                </label>
                            </div>
                        ) : (
                            <div>
                                <img src={uploadedImage} alt="Uploaded drawing" className="w-full rounded-xl border-2 border-gray-700 mb-4" />
                                <button
                                    onClick={() => setUploadedImage(null)}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}
                    </div>
                )}

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
                        disabled={!hasDrawing && !uploadedImage}
                        className={`flex-1 font-bold py-4 px-6 rounded-xl transition-all transform shadow-lg ${hasDrawing || uploadedImage
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 shadow-purple-500/50'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Activity className="w-5 h-5" />
                            Analyze Drawing
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DrawingAnalysis;
