


import { Box } from '@mui/material';
import { useState } from 'react';
import { validateStep5 } from '../../utils/Validator.js';


const initialError = {
    cardValid: true,
    expiryValid: true,
    cvvValid: true,
    nameValid: true,
    addressValid: true,
    message: ""
}
const Step6 = ({ userData, handleNext }) => {
    const [formData, setFormData] = useState(userData);
    const [error, setError] = useState(initialError);

    const onNextClick = (event) => {
        event.preventDefault();
        const error = validateStep5(formData);
        if (error.cardValid
            && error.expiryValid
            && error.cvvValid
            && error.nameValid
            && error.addressValid
        ) {
            handleNext();
        } else {
            setError(error);
        }
    }
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 10485760) { // 10MB limit
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            alert('File is too large or invalid type.');
        }
    };
    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }
        console.log(previewUrl)
        console.log('Uploading file:', selectedFile);
    };
    const nextEnabled = formData.cardNumber !== "" && formData.expiry !== "" && formData.cvv !== ""
        && formData.name !== "" && formData.address !== "";
    return (
        <div className="max-w-md mx-auto text-center bg-white px-6">
        <header className="mb-4">
          <h1 className="text-2xl font-bold mb-1">Upload Profile Picture</h1>
          <p className="text-[15px] text-slate-500">Please upload an image of yourself for profile purposes.</p>
        </header>
        <Box className="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
            <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 z-50" onChange={handleFileChange} />
            <div className="text-center">
                <img className="mx-auto h-12 w-12" src="/src/assets/image-upload.svg" alt="Upload Icon" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label className="relative cursor-pointer">
                    <span>Drag and drop </span>
                    <span className="text-indigo-600"> or browse </span>
                    <span>to upload</span>
                </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
            </p>
            </div>
            {previewUrl && <img src={previewUrl} className="mt-4 mx-auto max-h-40" alt="Preview" />}
        </Box>
        <div>
            <Box display="flex" justifyContent="flex-end" mt={2} alignItems="flex-end">
                <button type="submit" onClick={onNextClick} disabled={!formData.cardNumber || !formData.expiry || !formData.name}
                className={`inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ${
                    formData.cardNumber && formData.expiry && formData.name
                        ? 'bg-indigo-500 hover:bg-indigo-600' 
                        : 'bg-indigo-300 cursor-not-allowed'
                }`}
                >                    
                    Submit
                </button>
            </Box>
        </div>
    </div>
    );
}

export default Step6;