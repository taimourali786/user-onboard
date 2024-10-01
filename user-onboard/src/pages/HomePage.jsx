import { useState, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useAuth } from '../context/AuthContext.jsx';
import ProfileImage from "../components/base/ProfileImage.jsx";
import UserInfo from "./child-pages/UserInfo.jsx";
export function HomePage() {
  const { logout, user } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  let preferenceCheckboxes =
    Object.values(user !== null ? user.userPreferences : []).map(pref => {
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

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <>
      <main>
        <div className="flex h-screen bg-gray-100">
          <div className="flex-1 flex flex-col overflow-hidden">
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
            <main className="flex-1 overflow-y-auto p-4">
              <UserInfo preferences={preferenceCheckboxes || <p>No Preferences Exist for the user</p>}
                userData={user} />
            </main>
          </div>
        </div>
      </main >

    </>
  )
}