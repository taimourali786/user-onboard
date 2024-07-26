import { useState } from "react";
import Button from "../components/Button";
import StepCard from "../components/StepCard";

const registrationInitialData = {
    email: '',
    password: '',
    
} 
export default function RegistrationPage() {

    const [step, setStep] = useState(1);

    const onNextClick = () => {
        setStep(prevValue => prevValue + 1);
    }
    const onSkipClicked = () => {
        if( step === 4 ){
            setStep(prevValue => prevValue + 1);
        } else if(step === 5){
            onSubmitClick();
        } else{
            return;
        }

    }
    const onBackClick = () => {
        setStep(prevValue => prevValue - 1);
    }
    const onSubmitClick = () => {

    }
    console.log(step);

    return (
        <main>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                    <StepCard step={step}/>
                    <div className="flex flex-row-reverse gap-5">
                        {step === 4 || step === 5 ? <span onClick={onSkipClicked}>Skip</span> : undefined}
                        {step < 5 ? <Button type="button" handleClick={onNextClick}>Next</Button>
                            : <Button type="button" handleClick={onSubmitClick}>Submit</Button>}

                        {step === 1 ? undefined : <Button type="button" handleClick={onBackClick}>Back</Button>}
                    </div>
                </div>
            </div>
        </main>
    )
}