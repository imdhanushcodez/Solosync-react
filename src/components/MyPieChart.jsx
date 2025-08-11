import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

// Example data (you can pass your own via the `data` prop)
const DEFAULT_DATA = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const DEFAULT_COLORS = [
  "#4F46E5", // indigo-600
  "#06B6D4", // cyan-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#10B981", // emerald-500
];

function percentFormatter(value, total) {
  if (!total) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

export default function MyPieChart({
  data = DEFAULT_DATA,
  colors = DEFAULT_COLORS,
  height = 320,
  innerRadius = 60,
  outerRadius = 110,
  showLegend = true,
}) {
  const [hiddenNames, setHiddenNames] = useState(new Set());

  const total = useMemo(() => data.reduce((s, d) => s + (d.value || 0), 0), [data]);

  // Filter out hidden slices so they disappear from the chart and legend counts update
  const visibleData = useMemo(
    () => data.filter((d) => !hiddenNames.has(d.name) && d.value > 0),
    [data, hiddenNames]
  );

  const toggleLegend = (name) => {
    setHiddenNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const tooltipFormatter = (value, name, props) => {
    return [
      `${value} (${percentFormatter(value, total)})`,
      name,
    ];
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    // place label outside with percent
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#374151" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {`${Math.round(percent * 100)}%`}
      </text>
    );
  };

  return (
    <div className="w-full rounded-2xl  bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Pie breakdown</h3>
          <p className="text-sm text-slate-500">Interactive Recharts Pie — click items in the legend to hide/show slices.</p>
        </div>
        <div className="text-sm text-slate-500">Total: <span className="font-medium text-slate-700">{total}</span></div>
      </div>

      <div style={{ height }} className="mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={visibleData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              label={renderCustomizedLabel}
              labelLine={false}
              isAnimationActive={true}
            >
              {visibleData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            <Tooltip formatter={tooltipFormatter} />
            {showLegend && (
              <Legend
                verticalAlign="bottom"
                align="center"
                payload={data.map((d, i) => ({
                  id: d.name,
                  value: `${d.name} — ${d.value} (${percentFormatter(d.value, total)})`,
                  type: "square",
                  color: colors[i % colors.length],
                }))}
                formatter={(value, entry) => (
                  <span className={`cursor-pointer ${hiddenNames.has(entry.id) ? 'line-through text-slate-400' : ''}`} onClick={() => toggleLegend(entry.id)}>
                    {value}
                  </span>
                )}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Accessible custom legend with toggles (works on keyboard/touch) */}
      <div className="mt-3 flex flex-wrap gap-2">
        {data.map((d, i) => {
          const hidden = hiddenNames.has(d.name);
          return (
            <button
              key={d.name}
              onClick={() => toggleLegend(d.name)}
              className={`flex items-center gap-2 rounded-xl px-3 py-1 text-sm font-medium ring-1 ring-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${hidden ? 'opacity-50' : ''}`}
              aria-pressed={hidden}
            >
              <span className="w-3 h-3 rounded" style={{ background: colors[i % colors.length] }} />
              <span className="whitespace-nowrap">{d.name}</span>
              <span className="ml-2 text-slate-500">{d.value}</span>
              <span className="ml-1 text-slate-400">({percentFormatter(d.value, total)})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
