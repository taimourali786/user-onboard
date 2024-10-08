import { Typography } from '@mui/material';

const FormField = ({ htmlFor, labelText, value, isInvalid, errorMessage, handleChange, inputStyles, containerStyles, handleBlur, errorCaptionStyle, errorStyle, ...props }) => {
  const inputStyle = `${inputStyles} mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm`;

  return (
    <div className={containerStyles}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{labelText}</label>
      <input
        className={inputStyle}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        style={isInvalid ? errorStyle : {}}
        {...props}
      />
      <Typography variant="caption" style={{ ...errorCaptionStyle, height: '10px', visibility: isInvalid ? 'visible' : 'hidden' }}>
        {errorMessage}
      </Typography>
    </div>
  );
};

export default FormField;