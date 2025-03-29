import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";

const SecuritySettings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col lg:flex-row p-6 lg:p-10">
        <SettingsSidebar />

        <div className="flex-1 p-4 lg:p-8 mt-8 lg:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
          <p className="text-gray-600 mb-6">
            Manage your account security and privacy settings.
          </p>

          <div className="space-y-6">
            {/* Cambio de contraseña */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full p-3 border rounded-lg"
                />
                <button className="bg-black text-white px-6 py-2 rounded-lg">
                  Update Password
                </button>
              </div>
            </div>

            {/* Autenticación de dos factores */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                  Enable 2FA
                </button>
              </div>
            </div>

            {/* Sesiones activas */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Current Device</p>
                    <p className="text-sm text-gray-600">Windows 10 - Chrome</p>
                  </div>
                  <button className="text-red-600 hover:text-red-800">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;