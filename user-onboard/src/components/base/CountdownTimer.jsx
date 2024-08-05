import React, { useState, useEffect } from 'react';

const CountdownTimer = ({timeLeft}) => {
    
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div>
            <p>{formatTime(timeLeft)}</p>
        </div>
    );
};

export default CountdownTimer;
