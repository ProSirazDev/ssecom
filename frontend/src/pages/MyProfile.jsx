import React, { useState } from 'react'
// import AccountInfo from './AccountInfo'
// import OrderHistory from './OrderHistory'
// import Settings from './Settings'
import Orders from './Orders'

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('account')

  const renderContent = () => {
    switch (activeTab) {
    //   case 'account':
    //     return <AccountInfo />
      case 'orders':
        return <Orders />
    //   case 'settings':
    //     return <Settings />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-6">My Profile</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                activeTab === 'account'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Account Info
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                activeTab === 'orders'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Order History
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                activeTab === 'settings'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Settings
            </button>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto bg-white">
        {renderContent()}
      </main>
    </div>
  )
}

export default MyProfile
