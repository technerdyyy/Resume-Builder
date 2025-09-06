import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 bg-black/50">
      <div className=" rounded-2xl p-8 text-center max-w-md mx-4">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
        </div>

        <div className="mt-4 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
