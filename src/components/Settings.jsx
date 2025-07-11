import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, Moon, Sun, Mail, Smartphone } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

// Move components outside to prevent re-renders
const SettingCard = ({ title, description, children, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
  >
    <div className="flex items-start space-x-3 sm:space-x-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-300" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm sm:text-base">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
        {children}
      </div>
    </div>
  </motion.div>
);

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-primary-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, updateUser } = useUser();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">Manage your account preferences and app settings</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Profile Settings */}
        <SettingCard
          title="Profile Information"
          description="Update your personal information and profile picture"
          icon={User}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <button className="px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs sm:text-sm">
                Change Photo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={e => updateUser({ name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={e => updateUser({ email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Notification Settings */}
        <SettingCard
          title="Notifications"
          description="Choose how you want to be notified about account activity"
          icon={Bell}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">Email Notifications</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                </div>
              </div>
              <Toggle
                enabled={notifications.email}
                onChange={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">Push Notifications</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Get notified on your device</p>
                </div>
              </div>
              <Toggle
                enabled={notifications.push}
                onChange={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">SMS Notifications</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Receive text messages</p>
                </div>
              </div>
              <Toggle
                enabled={notifications.sms}
                onChange={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
              />
            </div>
          </div>
        </SettingCard>

        {/* Appearance Settings */}
        <SettingCard
          title="Appearance"
          description="Customize the look and feel of your app"
          icon={Palette}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isDarkMode ? <Moon className="w-5 h-5 text-gray-400 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">Dark Mode</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                </div>
              </div>
              <Toggle enabled={isDarkMode} onChange={toggleTheme} />
            </div>
          </div>
        </SettingCard>

        {/* Security Settings */}
        <SettingCard
          title="Security & Privacy"
          description="Manage your account security and privacy settings"
          icon={Shield}
        >
          <div className="space-y-4 flex flex-col md:flex-row md:space-y-0 md:gap-4">
            <button className="w-full md:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
              Change Password
            </button>
            <button className="w-full md:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
              Two-Factor Authentication
            </button>
            <button className="w-full md:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
              Privacy Settings
            </button>
          </div>
        </SettingCard>

        {/* Language & Region */}
        <SettingCard
          title="Language & Region"
          description="Set your preferred language and regional settings"
          icon={Globe}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
              <select className="w-full md:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:placeholder-gray-400">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
              <select className="w-full md:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:placeholder-gray-400">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
              </select>
            </div>
          </div>
        </SettingCard>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
