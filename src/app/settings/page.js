"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Moon,
  Sun,
  User,
  HelpCircle,
  Info,
  Mail,
  Heart,
  Settings as SettingsIcon,
  Bell,
  Globe,
  Type,
  Crown,
} from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState("Medium");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen p-4 sm:p-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 sm:p-6">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded w-24 sm:w-32 mb-6 sm:mb-8"></div>
            <div className="space-y-3 sm:space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-14 sm:h-16 bg-gray-300 dark:bg-gray-600 rounded-lg"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const settingsOptions = [
    {
      title: "Theme",
      description: `Switch to ${theme === "light" ? "dark" : "light"} mode`,
      icon: theme === "light" ? Moon : Sun,
      action: () => setTheme(theme === "light" ? "dark" : "light"),
      type: "button",
      value: theme === "light" ? "Light Mode" : "Dark Mode",
    },
    {
      title: "Notifications",
      description: "Manage your notification preferences",
      icon: Bell,
      action: () => setNotifications(!notifications),
      type: "toggle",
      value: notifications,
    },
    {
      title: "Language",
      description: "Change your preferred language",
      icon: Globe,
      type: "select",
      value: language,
      options: ["English", "Hindi", "Spanish", "French"],
      action: setLanguage,
    },
    {
      title: "Font Size",
      description: "Adjust text size for better readability",
      icon: Type,
      type: "select",
      value: fontSize,
      options: ["Small", "Medium", "Large"],
      action: setFontSize,
    },
  ];

  const quickLinks = [
    {
      title: "User Profile",
      description: "Manage your personal information",
      icon: User,
      href: "/user-Profile",
      color: "bg-blue-500",
    },
    {
      title: "Need Help",
      description: "Get support and assistance",
      icon: HelpCircle,
      href: "/contact",
      color: "bg-green-500",
    },
    {
      title: "About",
      description: "Learn more about our app",
      icon: Info,
      href: "/about",
      color: "bg-purple-500",
    },
    {
      title: "Contact Us",
      description: "Get in touch with our team",
      icon: Mail,
      href: "/contact",
      color: "bg-orange-500",
    },
    {
      title: "Wishlist",
      description: "Manage your saved items",
      icon: Heart,
      href: "/wishlist",
      color: "bg-red-500",
    },
    {
      title: "Subscription",
      description: "Manage or upgrade your subscription plan",
      icon: Crown,
      href: "/subscription",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm sm:rounded-lg sm:my-5">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <SettingsIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
        </div>

        {/* Main Settings */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
            Preferences
          </h2>
          <div className="grid gap-4">
            {settingsOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={option.title}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                          option.title === "Theme" && theme === "dark"
                            ? "bg-yellow-100 dark:bg-yellow-900"
                            : "bg-blue-100 dark:bg-blue-900"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            option.title === "Theme" && theme === "dark"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-blue-600 dark:text-blue-400"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {option.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {option.title === "Theme"
                            ? `Currently using ${
                                theme === "light" ? "light" : "dark"
                              } mode. Switch to ${
                                theme === "light" ? "dark" : "light"
                              } mode`
                            : option.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {option.type === "button" && (
                        <>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {option.value}
                          </span>
                          <button
                            onClick={option.action}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                          >
                            Switch
                          </button>
                        </>
                      )}

                      {option.type === "toggle" && (
                        <button
                          onClick={option.action}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                            option.value
                              ? "bg-blue-600"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                              option.value ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      )}

                      {option.type === "select" && (
                        <select
                          value={option.value}
                          onChange={(e) => option.action(e.target.value)}
                          className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {option.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {quickLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 ${link.color} rounded-lg group-hover:scale-110 transition-transform duration-200`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* App Info */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              App Version 1.0.0 | © 2025 OtakuAdda. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
