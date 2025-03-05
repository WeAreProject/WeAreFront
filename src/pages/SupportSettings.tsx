import React from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";

const SupportSettings = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 p-10">
      <Header />
      <SettingsSidebar />
      <div className="flex-1 bg-white p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Support</h2>
        <p className="text-gray-600 mb-6">Manage your account settings and preferences.</p>
        
        {/* Contact Support Section */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold">Contact Support</h3>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg"
            rows={4}
          />
          <button className="bg-black text-white px-6 py-2 rounded-lg">
            Send Message
          </button>
        </div>

        {/* View FAQs Section */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold">View FAQs</h3>
          <button className="text-blue-500 hover:underline">
            Frequently Asked Questions
          </button>
        </div>

        {/* Legal Documents Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Legal Documents</h3>
          <div className="flex flex-col space-y-2">
            <button className="text-blue-500 hover:underline">
              Terms of Service
            </button>
            <button className="text-blue-500 hover:underline">
              Privacy Policy
            </button>
            <button className="text-blue-500 hover:underline">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSettings;