import React from "react";

export default function StatsCard({ title, value, icon: Icon, bgColor, delay }) {
  return (
    <div className={`rounded-lg shadow-md p-6 flex items-center space-x-4 ${bgColor}`} style={{ animationDelay: `${delay}s` }}>
      <Icon className="w-8 h-8 text-white" />
      <div>
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
}
