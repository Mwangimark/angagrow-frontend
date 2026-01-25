import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

const COLORS = [
  "#16a34a", // Excellent - green
  "#facc15", // Good - yellow
  "#ef4444", // Poor - red
  "#9ca3af"  // No vegetation - gray
];

const PlantVigorAnalysis = ({ vigor }) => {
  if (!vigor) return null;

  const data = [
    { name: "Excellent", value: vigor.excellent },
    { name: "Good", value: vigor.good },
    { name: "Poor", value: vigor.poor },
    { name: "No Vegetation", value: vigor.no_vegetation }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🌱 Plant Vigor Distribution
        </h2>
        <p className="text-gray-600">
          Field health breakdown based on vegetation indices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Pie Chart */}
        <div className="w-full h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label={({ value }) => `${value}%`}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="text-center lg:text-left">
          <p className="text-sm text-gray-500 mb-1">
            Average Plant Vigor Score
          </p>
          {/* <p className="text-5xl font-bold text-green-700 mb-4">
            {averageVigor}%
          </p> */}

          <div className="space-y-2 text-sm text-gray-600">
            <p>🟢 Excellent: Highly productive zones</p>
            <p>🟡 Good: Healthy but improvable</p>
            <p>🔴 Poor: Requires intervention</p>
            <p>⚪ No Vegetation: Bare or non-cropped areas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantVigorAnalysis;
