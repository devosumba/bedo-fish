import React from 'react';

const HelloBadge = () => {
  return (
    <div className="relative flex items-center justify-center overflow-visible">
      {/* Hello Badge (pill) wrapped in an inline-block so the accent can be anchored to its edge */}
      <div className="relative inline-block z-10">
        <div className="flex items-center justify-center border border-black rounded-full px-4 py-2">
          <span className="text-black font-medium">Hello!</span>
        </div>
      </div>
    </div>
  );
};

export default HelloBadge;