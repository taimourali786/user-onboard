import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import Step1 from '../components/formsteps/Step-1';
import Step2 from '../components/formsteps/Step-2';
import Step3 from '../components/formsteps/Step-3';
import Step4 from '../components/formsteps/Step-4';

const initialUserState = {
  step1: {
    email: "",
    password: "",
    confirmPassword: ""
  },
  step3: {
    dob: "",
    address1: "",
    address2: "",
    city: "",
    country: ""
  },
  step4: {
    pref1: true,
    pref2: false,
    pref3: false,
    pref4: true,
    pref5: false
  },
  step5: {},
  step6: {}
}
function RegistrationPage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [userData, setUserData] = React.useState(initialUserState);
  const maxSteps = 6;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleSkip = ()=> {
    //perform some functions
    handleNext();
  }
  const handleStepOneNext = (formData) => {
    // calll api
    handleNext();
  }
  const handleStepThreeNext = (formData) => {
    // calll api
    handleNext();
  }

  const handleStepFoureNext = (formData) => {
    // calll api
    handleNext();
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  let heading = null;
  if (activeStep === 0) {
    heading = "Account Details"
  } else if (activeStep === 1) {
    heading = "Verify Your Email"
  } else if (activeStep === 2) {
    heading = "Personal Information"
  } else if (activeStep === 3) {
    heading = "User Preferences"
  } else if (activeStep === 4) {
    heading = "Credit Card Details"
  } else if (activeStep === 5) {
    heading = "Profile Picture"
  }
  let skipEnabled = activeStep < 4
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography>{heading}</Typography>

        </Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
        >
          <div>
            {Math.abs(activeStep - 0) <= 5 ? <Step1 userData={userData.step1} handleNext={handleStepOneNext} /> : null}
          </div>
          <div>
            {Math.abs(activeStep - 1) <= 5 ? <Step2 handleNext={handleNext} /> : null}
          </div>
          <div>
            {Math.abs(activeStep - 2) <= 5 ? <Step3 handleNext={handleStepThreeNext} userData={userData.step3} /> : null}
          </div>
          <div>
            {Math.abs(activeStep - 3) <= 5 ? <Step4 handleNext={handleStepFoureNext} userData={userData.step4} /> : null}
          </div>
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={skipEnabled}
            >
              {activeStep <= 4 ? "Skip" : "Skip and Submit"}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default RegistrationPage;
