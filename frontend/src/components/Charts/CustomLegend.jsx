import React from 'react'

const CustomLegend = ({ payload }) => {
  return (
    // ✅ Removed redundant gap-2 (space-x-6 already handles horizontal spacing)
    // ✅ Added flex-wrap so it wraps neatly on smaller containers
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-3">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-x-2">
          {/* ✅ Slightly larger dot for better visibility */}
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend