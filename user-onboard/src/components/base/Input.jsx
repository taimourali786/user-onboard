import { TextField } from '@mui/material';

export default function Input(props) {
    return (
    <TextField
        {...props}
        className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
    />)
}