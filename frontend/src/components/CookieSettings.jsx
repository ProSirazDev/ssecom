// CookieSettings.jsx
import React, { useState, useEffect } from "react";

const CookieSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie_preferences");
    if (!consent) {
      setShowModal(true);
    }
  }, []);

  const savePreferences = (prefs) => {
    localStorage.setItem("cookie_preferences", JSON.stringify(prefs));
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    const allPrefs = { essential: true, analytics: true, marketing: true };
    savePreferences(allPrefs);
  };

  const handleRejectAll = () => {
    const minimalPrefs = { essential: true, analytics: false, marketing: false };
    savePreferences(minimalPrefs);
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
          <h2 className="text-lg font-semibold mb-4">Cookie Preferences</h2>
          <p className="text-sm text-gray-600 mb-4">
            We use cookies to enhance your experience. Manage your preferences below.
          </p>

          <div className="space-y-2">
            <label className="flex justify-between">
              <span>Essential Cookies (Required)</span>
              <input type="checkbox" checked disabled />
            </label>
            <label className="flex justify-between">
              <span>Analytics Cookies</span>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() =>
                  setPreferences({ ...preferences, analytics: !preferences.analytics })
                }
              />
            </label>
            <label className="flex justify-between">
              <span>Marketing Cookies</span>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() =>
                  setPreferences({ ...preferences, marketing: !preferences.marketing })
                }
              />
            </label>
          </div>

          <div className="mt-6 flex justify-between gap-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm"
              onClick={handleRejectAll}
            >
              Reject All
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
              onClick={() => savePreferences(preferences)}
            >
              Save Preferences
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
              onClick={handleAcceptAll}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CookieSettings;
