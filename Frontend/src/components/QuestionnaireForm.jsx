import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

const QuestionnaireForm = ({ onClose }) => {
    const [answers, setAnswers] = useState({
        rigidity: '',
        bradykinesia: '',
        tremor: '',
        handwriting: '',
        posture: '',
        walking: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const questions = [
        {
            id: 'rigidity',
            label: 'How would you rate your muscle stiffness/rigidity?',
            description: '0 = None, 10 = Severe'
        },
        {
            id: 'bradykinesia',
            label: 'How would you rate slowness of movement?',
            description: '0 = None, 10 = Severe'
        },
        {
            id: 'tremor',
            label: 'How would you rate your hand tremor?',
            description: '0 = None, 10 = Severe'
        },
        {
            id: 'handwriting',
            label: 'Has your handwriting changed (smaller/messy)?',
            description: '0 = No change, 10 = Severe change'
        },
        {
            id: 'posture',
            label: 'Do you have balance/posture problems?',
            description: '0 = None, 10 = Severe'
        },
        {
            id: 'walking',
            label: 'Do you have difficulty walking?',
            description: '0 = None, 10 = Severe'
        }
    ];

    const handleInputChange = (id, value) => {
        const numValue = parseInt(value);
        if (value === '' || (numValue >= 0 && numValue <= 10)) {
            setAnswers(prev => ({ ...prev, [id]: value }));
        }
    };

    const calculatePrediction = () => {
        // Simple prediction logic based on total score
        const total = Object.values(answers).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
        const avgScore = total / 6;

        // Calculate probabilities (simplified model)
        let pdProbability;
        if (avgScore < 2) {
            pdProbability = 2 + (avgScore * 3); // 2-8%
        } else if (avgScore < 5) {
            pdProbability = 8 + ((avgScore - 2) * 10); // 8-38%
        } else {
            pdProbability = 38 + ((avgScore - 5) * 12); // 38-98%
        }

        pdProbability = Math.min(98, Math.max(2, pdProbability));
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
            riskLevel
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all questions are answered
        const allAnswered = Object.values(answers).every(val => val !== '');
        if (!allAnswered) {
            alert('Please answer all questions before submitting.');
            return;
        }

        const result = calculatePrediction();
        setPrediction(result);
        setShowResult(true);
    };

    const handleReset = () => {
        setAnswers({
            rigidity: '',
            bradykinesia: '',
            tremor: '',
            handwriting: '',
            posture: '',
            walking: ''
        });
        setPrediction(null);
        setShowResult(false);
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
                    <h2 className="text-3xl font-bold text-white mb-2">Prediction Result</h2>
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
                            Take Test Again
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
                <div className="inline-block p-4 bg-purple-900 bg-opacity-30 rounded-full mb-4">
                    <Activity className="w-12 h-12 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Parkinson's Disease Screening</h2>
                <p className="text-gray-400">Please answer the following questions on a scale of 0-10</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {questions.map((question, index) => (
                    <div key={question.id} className="bg-black bg-opacity-50 rounded-xl p-6">
                        <label className="block mb-4">
                            <div className="flex items-start gap-3 mb-3">
                                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <p className="text-white font-semibold mb-1">{question.label}</p>
                                    <p className="text-gray-400 text-sm">{question.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    value={answers[question.id]}
                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-purple-500 transition-all"
                                    placeholder="Enter 0-10"
                                    required
                                />
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 text-sm">0</span>
                                    <div className="w-32 bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(parseInt(answers[question.id]) || 0) * 10}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-gray-500 text-sm">10</span>
                                </div>
                            </div>
                        </label>
                    </div>
                ))}

                <div className="flex gap-4 pt-4">
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Activity className="w-5 h-5" />
                            Analyze & Predict
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuestionnaireForm;
