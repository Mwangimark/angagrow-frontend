import React from "react";

function DroneImageTable() {
  const sampleData = [
    { id: 1, lat: 0.2285, lon: 36.5881, alt: 1912.3 },
    { id: 2, lat: 0.2284, lon: 36.5882, alt: 1912.2 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-gray-700 font-semibold mb-2">Drone Images</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Latitude</th>
            <th className="border px-2 py-1">Longitude</th>
            <th className="border px-2 py-1">Altitude</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row) => (
            <tr key={row.id}>
              <td className="border px-2 py-1">{row.id}</td>
              <td className="border px-2 py-1">{row.lat}</td>
              <td className="border px-2 py-1">{row.lon}</td>
              <td className="border px-2 py-1">{row.alt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DroneImageTable;
