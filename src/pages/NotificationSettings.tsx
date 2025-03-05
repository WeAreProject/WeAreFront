import React, { useState } from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [bookingUpdates, setBookingUpdates] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 p-10">
      <Header />
      <SettingsSidebar />
      
      <div className="flex-1 bg-white p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <p className="text-gray-600 mb-6">Manage your account settings and preferences.</p>
        
        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <label className="inline-flex items-center cursor-pointer">
              <div
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-block w-12 h-6 rounded-full ${emailNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${emailNotifications ? 'transform translate-x-6' : ''}`}
                />
              </div>
            </label>
          </div>

          {/* Booking Updates */}
          <div className="flex items-center justify-between">
            <span>Booking Updates</span>
            <label className="inline-flex items-center cursor-pointer">
              <div
                onClick={() => setBookingUpdates(!bookingUpdates)}
                className={`relative inline-block w-12 h-6 rounded-full ${bookingUpdates ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${bookingUpdates ? 'transform translate-x-6' : ''}`}
                />
              </div>
            </label>
          </div>

          {/* Marketing */}
          <div className="flex items-center justify-between">
            <span>Marketing</span>
            <label className="inline-flex items-center cursor-pointer">
              <div
                onClick={() => setMarketing(!marketing)}
                className={`relative inline-block w-12 h-6 rounded-full ${marketing ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${marketing ? 'transform translate-x-6' : ''}`}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;