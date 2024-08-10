import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CollapsibleSection = ({ title, children, defaultCollapsed = true }) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="bg-cool-800 rounded-lg shadow-lg mb-6">
      <button
        className="w-full p-4 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text-2xl font-semibold text-lavender-300">{title}</h3>
        {isCollapsed ? (
          <ChevronDown className="w-6 h-6 text-lavender-300" />
        ) : (
          <ChevronUp className="w-6 h-6 text-lavender-300" />
        )}
      </button>
      {!isCollapsed && <div className="p-6 border-t border-cool-700">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
