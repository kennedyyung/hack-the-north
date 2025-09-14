export default function Legend() {
  const legendItems = [
    { type: 'work', label: 'Work', color: 'bg-blue-500' },
    { type: 'school', label: 'School', color: 'bg-purple-500' },
    { type: 'personal', label: 'Personal', color: 'bg-pink-500' },
    { type: 'deadline', label: 'Deadline', color: 'bg-red-500' },
    { type: 'shopping', label: 'Shopping', color: 'bg-green-500' },
    { type: 'family', label: 'Family', color: 'bg-yellow-500' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Legend</h3>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.type} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
