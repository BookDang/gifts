'use cleint'

import React from 'react'

const LoginPage: React.FC = () => {
  return (
    <div className="login-container bg-login-bg-gradient w-screen h-screen relative">
      <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white absolute shadow-md rounded-xl w-full max-w-md">
        <div className="login-wrap w-full">
          <div className="form-title rounded-t-xl bg-amber-500 py-5">
            <h1 className="text-2xl font-bold text-center text-white">Login</h1>
          </div>
          <div className="login-form px-4 py-6"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
