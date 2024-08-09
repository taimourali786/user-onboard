import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
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
import { REGISTRAtION_2 } from '../ApiUrl';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/base/Spinner';
import { useSuccess } from '../context/SuccessContext';

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
    dob: new Date().toJSON().slice(0, 10),
    address1: "",
    address2: "",
    city: "",
    country: ""
  },
  step4: {},
  step5: {
    cardNumber: "",
    expiry: "",
    name: "",
  },
  step6: {}
}
const otpExpiryTimeSeconds = 120;

const buildInitialState = (user) => {
  const state = initialUserState;
  state.step1 = {
    email: user.email,
    password: "*********",
    confirmPassword: "*********",
    completed: true,
    passwordDisabled: true
  }
  state.step2.completed = user.otpVerified || false;
  state.step3 = {
    address1: user.address.address1 || "",
    address2: user.address.address2 || "",
    city: user.address.city || "",
    country: user.address.country || "",
    completed: true,
    dob: user.dob !== "0001-01-01" ? user.dob : new Date().toJSON().slice(0, 10)

  }
  const prefList = user.userPreferences;
  for (const pref of prefList) {
    state.step4[[pref.preferenceId]] = pref.preferenceValue
  }
  return state;

}
function RegistrationPage() {
  const { performRegistration1, sendOtp, validateOtp, performPost,
    getPreferences, postPreferences, postImage, updateCardStatus } = useHttpClient();
  const { user, isAuthenticated, logout, refreshUser } = React.useContext(AuthContext);
  const { handleSuccess } = useSuccess();
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [credentials, setCredentials] = React.useState(initialUserState);
  const [loading, setLoading] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [otpExpired, setOtpExpired] = React.useState(true);
  const [preferences, setPreferences] = React.useState({});
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

  React.useEffect(() => {
    if (isAuthenticated) {
      const state = user === null ? initialUserState : buildInitialState(user);
      setCredentials(() => ({ ...state }));
      fetchPref();
    } else {
      setCredentials(() => ({ ...initialUserState }));
    }
  }, [isAuthenticated, user]);

  const fetchPref = async () => {
    const pref = await getPreferences();
    setPreferences(pref);
  }

  const handleNext = () => {
    if (activeStep === 0 && credentials.step2.completed === true) {
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleSkip = () => {
    if (activeStep === 4) {
      handleNext();
    } else if (activeStep === 5) {
      handleSuccess("User Creation Complete!");
      logout();
      navigate("/login");
    }
  }
  const handleStepOneNext = async (formData) => {
    if (credentials.step1.completed === false) {
      setLoading(true)
      try {
        await performRegistration1(formData);
      } catch (error) {
        setLoading(false);
        return;
      }
      setCredentials(prevData => ({
        ...prevData,
        step1: {
          ...formData,
          completed: true
        }
      }))
      refreshUser();
      setOtpExpired(false);
      setTimeLeft(otpExpiryTimeSeconds);
    }
    handleNext();
    setLoading(false);

  }

  const verifyOtp = async (otp) => {
    if (credentials.step2.completed === false) {
      setLoading(true);
      try {
        await validateOtp(otp);
      } catch (error) {
        setLoading(false);
        return;
      }
      setCredentials(prevValue => ({
        ...prevValue,
        step2: {
          completed: true
        }
      }))
      setLoading(false);
      setOtpExpired(false);
      setTimeLeft(otpExpiryTimeSeconds);
    }
    handleNext();
  }
  const resendOtp = async () => {
    setLoading(true);
    try {
      await sendOtp(credentials.step1.email);
      setTimeLeft(otpExpiryTimeSeconds);
      setOtpExpired(false);
    } catch {
      setLoading(false);
    }
  }
  const handleStepThreeNext = async (formData) => {
    setLoading(true);
    try {
      await performPost(REGISTRAtION_2, formData);
    } catch (error) {
      setLoading(false);
      return;
    }
    setCredentials(prevData => ({
      ...prevData,
      step3: {
        ...prevData,
      }
    }))
    setLoading(false);
    handleNext();
  }

  const handleStepFourNext = async (formData) => {
    setLoading(true);
    await postPreferences(formData);
    setLoading(false);
    handleNext();
  }

  const handleStepFiveNext = async (formData) => {
    setLoading(true);
    await updateCardStatus();
    setLoading(false);
    handleNext();
  }

  const handleStepSixNext = async (imageBase64) => {
    setLoading(true);
    await postImage(imageBase64);
    setLoading(false);
    handleSuccess("User Creation Complete!");
    logout();
    navigate("/login");
  }

  const handleBack = () => {
    if (activeStep === 2 && credentials.step2.completed === true) {
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const onLogin = () => {
    logout();
    navigate("/login");
  }

  const handleChange = (name, value, step) => {
    setCredentials(p => ({
      ...p,
      [step]: {
        ...p[step],
        [name]: value
      }
    }))
  }

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
    <>
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
                {Math.abs(activeStep - 0) <= 5 ? <Step1 credentials={credentials.step1} handleNext={handleStepOneNext} handleChange={handleChange} /> : null}
              </div>
              <div>
                {Math.abs(activeStep - 1) <= 5 ? <Step2 credentials={credentials.step2}
                  otpExpiry={timeLeft}
                  otpExpired={otpExpired}
                  sendOtp={resendOtp}
                  handleNext={verifyOtp}
                /> : null}
              </div>
              <div>
                {Math.abs(activeStep - 2) <= 5 ? <Step3 handleNext={handleStepThreeNext} credentials={credentials.step3} handleChange={handleChange} /> : null}
              </div>
              <div>
                {Math.abs(activeStep - 3) <= 5 ? <Step4 handleNext={handleStepFourNext} credentials={credentials.step4} preferences={preferences} /> : null}
              </div>
              <div>
                {Math.abs(activeStep - 4) <= 5 ? <Step5 handleNext={handleStepFiveNext} credentials={credentials.step5} handleChange={handleChange}/> : null}
              </div>
              <div>
                {Math.abs(activeStep - 5) <= 5 ? <Step6 handleNext={handleStepSixNext} credentials={credentials.step6} /> : null}
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
                <button className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 hover:underline" onClick={onLogin}>Log in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default RegistrationPage;