import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";

const SupportSettings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col lg:flex-row p-6 lg:p-10">
        <SettingsSidebar />

        <div className="flex-1 p-4 lg:p-8 mt-8 lg:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Support Settings</h2>
          <p className="text-gray-600 mb-6">
            Manage your support preferences and contact information.
          </p>

          <div className="space-y-6">
            {/* Preferencias de soporte */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Support Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive support updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive support updates via push notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Support Email"
                  className="w-full p-3 border rounded-lg"
                  defaultValue="support@example.com"
                />
                <input
                  type="tel"
                  placeholder="Support Phone"
                  className="w-full p-3 border rounded-lg"
                  defaultValue="+1 (555) 123-4567"
                />
                <textarea
                  placeholder="Additional Contact Information"
                  className="w-full p-3 border rounded-lg h-32"
                  defaultValue="Please contact me during business hours (9 AM - 5 PM EST)"
                />
                <button className="bg-black text-white px-6 py-2 rounded-lg">
                  Update Contact Info
                </button>
              </div>
            </div>

            {/* Historial de soporte */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Support History</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Technical Issue</p>
                      <p className="text-sm text-gray-600">Resolved on March 15, 2024</p>
                    </div>
                    <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      Resolved
                    </span>
                  </div>
                  <p className="text-gray-600">Issue with payment processing was resolved after updating payment information.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Account Access</p>
                      <p className="text-sm text-gray-600">Resolved on March 10, 2024</p>
                    </div>
                    <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      Resolved
                    </span>
                  </div>
                  <p className="text-gray-600">Password reset completed successfully.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSettings;