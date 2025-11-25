// pages/Login.tsx or app/login/page.tsx
import React from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import LoginCard from '@/components/LoginCard';

const Login: React.FC = () => {
  return (
    <BackgroundWrapper>
      {/* The Login form component with all the logic */}
      <LoginCard />
      <div className='bg-gray-600'>
         .
      </div>
      
      {/* Right section for the marketing content / quote */}
      <div className="hidden md:flex flex-col justify-center items-center p-8 w-1/2 bg-gray-50 rounded-r-lg">
        <p className="text-black italic text-center text-lg mb-8">
          "The best way to predict the future is to create it."
        </p>
        <div className="flex items-center">
          {/* Quote Author/Image Placeholder */}
          <div
            className="w-12 h-12 rounded-full mr-4 bg-white flex items-center justify-center text-gray-600 font-bold"
          >
            A
          </div>
          <div>
            <p className="font-semibold text-black">Abraham Lincoln</p>
            <p className="text-sm text-gray-700">16th U.S. President</p>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default Login;