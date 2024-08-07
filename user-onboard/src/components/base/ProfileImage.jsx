import React, { useState } from 'react';

const ProfileImage = ({ base64Image, fallBackSrc }) => {
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
    if(base64Image) { 
      const imageBlob = base64ToBlob(base64Image);
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
    } else {
      setImageUrl(fallBackSrc);
    }
  };
  React.useEffect(()=>{
    convertAndDisplayImage();
  },[base64Image, fallBackSrc]);
  return (
    <img 
      src={imageUrl} 
      alt="User avatar"
      className="h-8 w-8 rounded-full"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = fallbackSrc;
      }}
    />
  );
};

export default ProfileImage;
