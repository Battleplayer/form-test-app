import {useState} from "react";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";

function App() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});

    const handlePrev = () => {
        setStep(prev => prev - 1);
    }
    const handleNext = (data) => {
        setFormData(prev => ({...prev, ...data}));
        if (step === 2) {
            return console.log({...formData, ...data});
        }
        setStep(prev => prev + 1);
    }

    return (
        <div className='container'>
            <h1>epic form</h1>
            <h3>Step: {step + 1}</h3>
            <div>
                {step === 0 && <Step1 handleNext={handleNext} handlePrev={handlePrev} data={formData}/>}
                {step === 1 && <Step2 handleNext={handleNext} handlePrev={handlePrev} data={formData}/>}
                {step === 2 && <Step3 handleNext={handleNext} handlePrev={handlePrev} data={formData}/>}
            </div>
        </div>
    );
}

export default App;
