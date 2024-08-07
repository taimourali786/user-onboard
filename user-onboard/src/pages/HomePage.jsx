import { useState, useContext, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext.jsx';
import ProfileImage from "../components/base/ProfileImage.jsx";
import Spinner from "../components/base/Spinner.jsx";
import UserInfo from "./child-pages/UserInfo.jsx";

const initialUser = {
  email: "abc@gmail.com",
  password: "********",
  preferences: [
    { preferenceId: 1, preferenceName: "Preference1", preferenceValue: true },
    { preferenceId: 2, preferenceName: "Preference2", preferenceValue: false },
    { preferenceId: 3, preferenceName: "Preference3", preferenceValue: false },
    { preferenceId: 4, preferenceName: "Preference4", preferenceValue: false },
    { preferenceId: 5, preferenceName: "Preference5", preferenceValue: true },
  ]
}
export default function HomePage() {
  const { logout, user , authLoading} = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(authLoading);
  },[authLoading]);

  let preferenceCheckboxes = Object.values(initialUser.preferences).map(pref => {
    return <FormControlLabel
      key={pref.preferenceId}
      control={
        <Checkbox
          key={pref.preferenceId}
          name={pref.preferenceName}
          onChange={event => handleCheckChanged(pref.preferenceId, event.target.checked)}
          checked={pref.preferenceValue}
          disabled
        />
      }
      label={pref.preferenceName}
    />
  })
  // preferenceCheckboxes = Object.values(preferences).map(pref => {
  //   return <FormControlLabel
  //     key={pref.preferenceId}
  //     control={
  //       <Checkbox
  //         key={pref.preferenceId}
  //         name={pref.preferenceName}
  //         onChange={event => handleCheckChanged(pref.preferenceId, event.target.checked)}
  //         checked={userPreferences[pref.preferenceId]}
  //         disabled
  //       />
  //     }
  //     label={pref.preferenceName}
  //   />
  // })

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  // let preferenceCheckboxes = Object.values(user.preferences).map((prefKey, prefValue) => (
  //     <FormControlLabel
  //         key={prefKey}
  //         control={<Checkbox name={prefKey} checked={prefValue} disabled />}
  //         label={`${prefKey}`}
  //     />
  // ));


  return (
    <>
    <Spinner loading={loading} />
      <main>
        <div className="flex h-screen bg-gray-100">
          {/* Left Navigation Menu */}
          {/* <div className="bg-indigo-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            <h1 className="text-3xl font-bold text-white pl-2">Brand</h1>
            <nav>
              <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">Home</Link>
              <Link to="/dashboard/module1" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">Module 1</Link>
              <Link to="/dashboard/module2" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">Module 2</Link>
            </nav>
          </div> */}

          {/* Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navigation Bar */}
            <header className="flex justify-between items-center p-4 shadow-md bg-white">
              <div className="text-xl">Dashboard</div>
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                <ProfileImage 
                    base64Image={user?.userImage?.imageBase64} 
                    fallBackSrc="/src/assets/user-profile.svg"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                    <span className="block px-4 py-2 text-sm text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={logout}>Logout</span>
                  </div>
                )}
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4">
              {/* <Routes>
                <Route path="/dashboard/module1" element={<div>Content 1</div>} />
                <Route path="/dashboard/module2" element={<div>Content 2</div>} />
                <Route path="/dashboard" element={<div>Welcome to the dashboard!</div>} />
              </Routes> */}
              <UserInfo preferences={preferenceCheckboxes || <p>No Preferences Exist for the user</p> }/>
            </main>
          </div>
        </div>
        {/* <Typography>{user.email}</Typography>
                <Typography>{user.password}</Typography>
                {preferenceCheckboxes}

                <Button onClick={logout}>
                    Logout
                </Button> */}
      </main >
    </>
  )
}