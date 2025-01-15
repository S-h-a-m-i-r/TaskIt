import React from 'react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  button1Title: string;
  button2Title: string;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, button1Title, button2Title }) => {
  return (
    <div className="bg-gray-800 rounded-full flex">
      <button
        onClick={() => setActiveTab(button1Title)}
        className={`flex justify-center w-1/2 max-md:w-40 px-6 py-4 rounded-full text-sm font-medium transition-colors ${
          activeTab === button1Title
            ? 'bg-gradient-to-r from-[#85BB65] to-[#EEC358] text-white'
            : 'bg-transparent text-gray-400 hover:text-white'
        }`}
      >
        {button1Title}
      </button>
      <button
        onClick={() => setActiveTab(button2Title)}
        className={`flex justify-center w-1/2 max-md:w-40 px-6 py-4 rounded-full text-sm font-medium transition-colors ${
          activeTab === button2Title
            ? 'bg-gradient-to-r from-[#85BB65] to-[#EEC358] text-white'
            : 'bg-transparent text-gray-400 hover:text-white'
        }`}
      >
        {button2Title}
      </button>
    </div>
  );
};

export default Tabs;