import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import Step1 from '../components/formsteps/Step-1';
import Step2 from '../components/formsteps/Step-2';
import Step3 from '../components/formsteps/Step-3';
import Step4 from '../components/formsteps/Step-4';
import Step5 from '../components/formsteps/Step-5';
import Step6 from '../components/formsteps/Step-6';
import FormHeading from '../components/base/FormHeading';
import { useHttpClient } from '../HttpClient';
import Logo from '../components/base/Logo';
import Spinner from '../components/base/Spinner'; // Import the Spinner component

import { REGISTRAtION_2 } from '../ApiUrl';
import { AuthContext } from '../context/AuthContext';

const initialUserState = {
  step1: {
    email: "",
    password: "",
    confirmPassword: "",
    completed: false,
    passwordDisabled: false
  },
  step2: {
    completed: false
  },
  step3: {
    dob: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    completed: false
  },
  step4: {},
  step5: {
    cardNumber: "",
    expiry: "",
    name: "",
  },
  step6: {}
}
const otpExpiryTimeSeconds = 5;

const buildInitialState = (user) => {
  const state = initialUserState;
  state.step1 = {
    email: user.email,
    password: "*",
    confirmPassword: "*",
    completed: true,
    passwordDisabled: true
  }
  state.step2.completed = user.otpVerified || true; // FIXME: Make this false
  state.step3 = {
    address1: user.address.address1 || "",
    address2: user.address.address2 || "",
    city: user.address.city || "",
    country: user.address.country || "",
    completed: true

  }
  const prefList = user.userPreferences;
  for (const pref of prefList) {
    state.step4[[pref.preferenceId]] = pref.preferenceValue
  }
  return state;

}
function RegistrationPage() {
  const { performRegistration1, sendOtp, validateOtp, performPost, getPreferences, postPreferences, postImage } = useHttpClient();
  const { user, isAuthenticated } = React.useContext(AuthContext);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [userData, setUserData] = React.useState(initialUserState);
  const [loading, setLoading] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [otpExpired, setOtpExpired] = React.useState(true);
  const [preferences, setPreferences] = React.useState({});
  const navigate = useNavigate();
  const maxSteps = 6;

  React.useEffect(() => {
    if (timeLeft === 0) {
      setOtpExpired(true);
      return
    };

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // React.useEffect(() => {
  //   if (user !== null) {
  //     setUserData(buildInitialState(user));
  //   } else {
  //     setUserData(initialUserState);
  //   }
  // }, [user]);

  React.useEffect(() => {
    if (isAuthenticated) {

      fetchPref();
    }
  }, [isAuthenticated]);

  const fetchPref = async () => {
    const pref = await getPreferences();
    setPreferences(pref);
  }

  const handleNext = () => {
    if (activeStep === 0 && userData.step2.completed === true) {
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleSkip = () => {
    if (activeStep === 4) {
      handleNext();
    } else if (activeStep === 5) {
      navigate("/");
    }
  }

  const handleStepOneNext = async (formData) => {
    if (userData.step1.completed === false) {
      setLoading(true)
      try {
        await performRegistration1(formData);
      } catch (error) {
        setLoading(false);
        return;
      }
      setUserData(prevData => ({
        ...prevData,
        step1: {
          ...formData,
          completed: true
        }
      }))
      setOtpExpired(false);
      setTimeLeft(otpExpiryTimeSeconds);
    }
    handleNext();
    setLoading(false);
  };

  const verifyOtp = async (otp) => {
    if (userData.step2.completed === false) {
      setLoading(true);
      try {
        await validateOtp(otp);
      } catch (error) {
        setLoading(false);
        return;
      }
      setUserData(prevValue => ({
        ...prevValue,
        step2: {
          completed:true
        }
      }))
      setOtpExpired(false);
      setTimeLeft(otpExpiryTimeSeconds);
    }
    handleNext();
    setLoading(false);
  }

  const resendOtp = async () => {
    setLoading(true);
    try {
      await sendOtp(userData.step1.email);
      setTimeLeft(otpExpiryTimeSeconds);
      setOtpExpired(false);
    } finally {
      setLoading(false);
    }
  }

  const handleStepThreeNext = async (formData) => {
    setLoading(true);
    try {
      await performPost(REGISTRAtION_2, formData);
      setUserData((prevValue) => ({
        ...prevValue,
        step3: {
          ...formData
        },
      }));
    } finally {
      handleNext();
      setLoading(false);
    }
  };

  const handleStepFourNext = async (formData) => {
    setLoading(true);
    try {
      await postPreferences(formData);
    } catch (error) {
      setLoading(false);
      return;
    }
    setUserData(prevData => ({
      ...prevData,
      step3: {
        ...prevData,
      }
    }))
    handleNext();
    setLoading(false);
  }

  const handleStepFiveNext = (formData) => {
    setLoading(true);
    handleNext();
  };

  const handleStepSixNext = async (imageBase64) => {
    setLoading(true);
    await postImage(imageBase64);
    navigate("/");

  }

  const handleBack = () => {
    if (activeStep === 2 && userData.step2.completed === true) {
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
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
  return (<>
    <Spinner loading={loading} />
    <div className="flex min-h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          <Logo />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-lg w-full bg-white shadow-xl rounded-xl p-6">
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
            <FormHeading>{heading}</FormHeading>
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
              {Math.abs(activeStep - 1) <= 5 ? <Step2 userData={userData.step2}
                otpExpiry={timeLeft}
                otpExpired={otpExpired}
                sendOtp={resendOtp}
                handleNext={verifyOtp}
              /> : null}
            </div>
            <div>
              {Math.abs(activeStep - 2) <= 5 ? <Step3 handleNext={handleStepThreeNext} userData={userData.step3} /> : null}
            </div>
            <div>
              {Math.abs(activeStep - 3) <= 5 ? <Step4 handleNext={handleStepFourNext} userData={userData.step4} preferences={preferences} /> : null}
            </div>
            <div>
              {Math.abs(activeStep - 4) <= 5 ? <Step5 handleNext={handleStepFiveNext} userData={userData.step5} /> : null}
            </div>
            <div>
              {Math.abs(activeStep - 5) <= 5 ? <Step6 handleNext={handleStepSixNext} userData={userData.step6} /> : null}
            </div>
          </SwipeableViews>
          <div className='mb-5'>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleSkip}
                  disabled={skipEnabled}
                  sx={{ color: '#6366F1' }}
                >
                  {activeStep <= 4 ? "Skip" : "Skip & Submit"}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}
                  sx={{ color: '#6366F1' }}>
                  Back
                </Button>
              }
              sx={{
                '& .MuiMobileStepper-dot': {
                  backgroundColor: '#E0E7FF', // Lighter tone for inactive dots
                },
                '& .MuiMobileStepper-dotActive': {
                  backgroundColor: '#6366F1', // Lighter tone for active dot
                },
              }}
            />
          </div>
          <div className="flex items-center justify-center align-middle">
            <div className="text-sm">
              Already have an account?
              <Link to="/login" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>

  );
}
export default RegistrationPage;
