import React from "react";
import { Toaster } from "react-hot-toast";
const ToastProvide = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937", // dark gray
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#16a34a", // green
            },
          },

          error: {
            style: {
              background: "#dc2626", // red
            },
          },
        }}
      />
    </div>
  );
};

export default ToastProvide;
