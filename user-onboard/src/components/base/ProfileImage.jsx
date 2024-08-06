import React, { useState } from 'react';

const ProfileImage = ({ base64Image }) => {
  const [imageUrl, setImageUrl] = useState('');

  const base64ToBlob = (base64, contentType = 'image/png') => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  const convertAndDisplayImage = () => {
    const imageBlob = base64ToBlob(base64Image);
    const imageUrl = URL.createObjectURL(imageBlob);
    setImageUrl(imageUrl);
  };
  React.useEffect(()=>{
    convertAndDisplayImage();
  },[base64Image]);
  return (
    <div>
      {imageUrl && <img className="h-16 w-16 rounded-full" src={imageUrl} alt="User avatar" />}
    </div>
  );
};

export default ProfileImage;
