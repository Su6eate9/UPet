
import React, { useState } from 'react';

interface OnboardingProps {
  // Fix: changed onComplete signature to accept data to match handleAddPet in App.tsx
  onComplete: (data: any) => void;
  onBack: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog',
    breed: '',
    weight: 6.5,
    energy: 'active'
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    // Fix: pass formData to onComplete to fulfill the expected argument
    else onComplete(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-8 px-6 pt-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold dark:text-white mb-2">Let's meet your pet</h1>
              <p className="text-text-muted">Tell us their name and species.</p>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold dark:text-white ml-1">Pet's Name</label>
              <input 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-16 rounded-3xl border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark text-lg px-6 dark:text-white"
                placeholder="e.g., Bella"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold dark:text-white">Species</h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {['dog', 'cat', 'bird', 'rabbit'].map(s => (
                  <button 
                    key={s}
                    onClick={() => setFormData({ ...formData, species: s })}
                    className={`flex flex-col items-center gap-2 p-4 rounded-3xl transition-all border-2 ${formData.species === s ? 'bg-primary border-primary scale-105' : 'bg-white dark:bg-card-dark border-gray-100 dark:border-gray-800'}`}
                  >
                    <div className="size-16 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">{s === 'dog' ? 'pets' : s === 'cat' ? 'cruelty_free' : s === 'bird' ? 'flutter_dash' : 'pest_control_rodent'}</span>
                    </div>
                    <span className="text-xs font-bold uppercase">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-8 px-6 pt-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold dark:text-white mb-2">Tell us more</h1>
              <p className="text-text-muted">Knowing their breed helps us tailor tips.</p>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold dark:text-white ml-1">Breed</label>
              <input 
                value={formData.breed}
                onChange={e => setFormData({ ...formData, breed: e.target.value })}
                className="w-full h-16 rounded-3xl border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark px-6 dark:text-white"
                placeholder="Search breed..."
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-8 px-6 pt-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold dark:text-white mb-2">Health & Weight</h1>
              <p className="text-text-muted">We use this for medication and diet plans.</p>
            </div>
            <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
              <p className="text-sm font-bold text-text-muted mb-8 uppercase tracking-widest">Current Weight</p>
              <div className="flex items-center justify-center gap-6">
                <button onClick={() => setFormData({...formData, weight: Math.max(0, formData.weight - 0.5)})} className="size-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center dark:text-white">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <div className="text-6xl font-extrabold dark:text-white">{formData.weight}<span className="text-xl text-text-muted ml-1">kg</span></div>
                <button onClick={() => setFormData({...formData, weight: formData.weight + 0.5})} className="size-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center dark:text-white">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-8 px-6 pt-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold dark:text-white mb-2">Energy Level</h1>
              <p className="text-text-muted">How would you describe their activity?</p>
            </div>
            <div className="flex flex-col gap-4">
              {['Active', 'Calm'].map(e => (
                <button 
                  key={e}
                  onClick={() => setFormData({ ...formData, energy: e.toLowerCase() })}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${formData.energy === e.toLowerCase() ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-transparent bg-white dark:bg-card-dark'}`}
                >
                  <div className={`size-12 rounded-full flex items-center justify-center ${formData.energy === e.toLowerCase() ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-text-muted'}`}>
                    <span className="material-symbols-outlined text-2xl">{e === 'Active' ? 'bolt' : 'self_improvement'}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold dark:text-white">{e}</p>
                    <p className="text-xs text-text-muted">{e === 'Active' ? 'Loves to run and explore' : 'Prefers naps and relaxation'}</p>
                  </div>
                  {formData.energy === e.toLowerCase() && <span className="material-symbols-outlined text-primary">check_circle</span>}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-32">
      <header className="p-6 flex items-center justify-between">
        <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
          <span className="material-symbols-outlined dark:text-white">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          {[1,2,3,4].map(s => (
            <div key={s} className={`h-1.5 rounded-full transition-all ${step === s ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`} />
          ))}
        </div>
        <div className="w-10" />
      </header>
      
      {renderStep()}

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent max-w-md mx-auto">
        <button 
          onClick={nextStep}
          className="w-full h-14 rounded-full bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {step === 4 ? 'Finish & Start Tracking' : 'Continue'}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
