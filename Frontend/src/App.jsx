import React, { useState } from 'react';
import { Brain, Image, Mic, Video, FileText, Menu, X, ChevronRight, Activity, Stethoscope, Pill, BookOpen } from 'lucide-react';

// Sidebar Component
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentRoute === route.id 
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

// Home Page - Prediction
const HomePage = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  
  const models = [
    { id: 'mri', name: 'MRI Scan Analysis', icon: Image, description: 'Upload brain MRI scans for detailed analysis', color: 'from-blue-500 to-purple-500' },
    { id: 'drawing', name: 'Drawing Test', icon: FileText, description: 'Analyze spiral and wave drawing patterns', color: 'from-green-500 to-teal-500' },
    { id: 'audio', name: 'Voice Analysis', icon: Mic, description: 'Detect voice tremors and speech patterns', color: 'from-orange-500 to-red-500' },
    { id: 'video', name: 'Movement Analysis', icon: Video, description: 'Analyze motor movements and gait', color: 'from-pink-500 to-purple-500' }
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {models.map(model => {
          const Icon = model.icon;
          return (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`group relative p-8 rounded-2xl border-2 transition-all text-left overflow-hidden ${
                selectedModel === model.id
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
                <p className="text-gray-400">{model.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {selectedModel && (
        <div className="bg-gradient-to-br from-purple-950 to-black border border-purple-800 rounded-2xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Your {models.find(m => m.id === selectedModel)?.name}</h2>
          
          <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-purple-500 transition-all cursor-pointer bg-gray-900 bg-opacity-50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-900 rounded-full flex items-center justify-center animate-bounce">
                <ChevronRight className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold mb-2 text-lg">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-sm">Support for JPEG, PNG, MP4, MP3, WAV files</p>
                <p className="text-purple-400 text-xs mt-2">Maximum file size: 50MB</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50">
            <span className="flex items-center justify-center gap-2">
              <Activity className="w-5 h-5" />
              Analyze & Predict
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

// About Page
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

// Symptoms Page
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

// Treatment Page
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

// Research Page
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

// Main App Component
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('home');

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'symptoms':
        return <SymptomsPage />;
      case 'treatment':
        return <TreatmentPage />;
      case 'research':
        return <ResearchPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      
      <div className="flex flex-col min-h-screen">
        <header className="border-b border-gray-800 bg-black bg-opacity-80 backdrop-blur-sm sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white transition-colors md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-500" />
              <span className="text-lg font-bold">NeuroPredict AI</span>
            </div>
            
            <div className="w-6" />
          </div>
        </header>

        <main className="flex-1 px-6 py-12 md:ml-64">
          {renderPage()}
        </main>

        <footer className="border-t border-gray-800 px-6 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>NeuroPredict AI - Advanced Parkinson's Disease Prediction System</p>
            <p className="mt-2">For research and educational purposes. Always consult healthcare professionals.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;