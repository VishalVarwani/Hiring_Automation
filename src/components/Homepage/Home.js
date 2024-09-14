import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  
  // Destructure `state` and provide default values
  const { state } = location;
  const userId = state?.id || 'Guest';

  return (
    <div>
      Hello {userId} and welcome to my home
    </div>
  );
}
