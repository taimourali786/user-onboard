import { loadingActions } from "./loading"
import { userActions } from "./user";

const registration1Request = (user) => {
    return async (dispatch) => {
        dispatch(loadingActions.startLoading());
        try {
            await performRegistration1(formData);
            dispatch(userActions.setUserStepOne({ user }))
        } catch (error) {
            setLoading(false);
            return;
        }
    }
}

const registration2Request = (user) => {
    return async (dispatch) => {
        dispatch(loadingActions.startLoading());
        try {
            await validateOtp(formData);
            dispatch(userActions.setUserStepTwo({ user }))
        } catch (error) {
            setLoading(false);
            return;
        }
    }
}

const registration3Request = (user) => {
    return async (dispatch) => {
        dispatch(loadingActions.startLoading());
        try {
            await performPost(REGISTRAtION_2, user);
            dispatch(userActions.setUserStepThree({ user }))
        } catch (error) {
            setLoading(false);
            return;
        }
    }
}

const registration4Request = (pref) => {
    return async (dispatch) => {
        dispatch(loadingActions.startLoading());
        try {
            await postPreferences(pref)
            dispatch(userActions.setUserStepFour({ user }))
        } catch (error) {
            setLoading(false);
            return;
        }
    }
}

const registration5Request = (pref) => {
    return async (dispatch) => {
        dispatch(loadingActions.startLoading());
        try {
            await updateCardStatus()
            // dispatch(userActions.setUserStepFour({ user }))
        } catch (error) {
            setLoading(false);
            return;
        }
    }
}

const registration6Request = (imageBase64) => {
    return async (dispatch) => {
        dispatch(loadingActions.startLoading());
        try {
            await postImage(imageBase64);
            // dispatch(userActions.setUserStepFour({ user }))
        } catch (error) {
            setLoading(false);
            return;
        }
    }
}


