import { useState } from "react";
import ServiceList from "./ServiceList";

const ServiceTabs = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm p-1 rounded-lg">
        {["pending", "ongoing", "completed", "canceled"].map((tab) => (
          <button
            key={tab}
            className={`p-2 text-center rounded-md transition-all ${
              activeTab === tab ? "bg-primary text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="mt-4 animate-fade-up">
        <ServiceList status={activeTab} />
      </div>
    </div>
  );
};

export default ServiceTabs;
