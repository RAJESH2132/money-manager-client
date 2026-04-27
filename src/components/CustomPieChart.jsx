import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CustomPieChart = ({
  data = [],
  label = "Total Balance",
  totalAmount = "",
  colors = [],
}) => {
  const safeData = Array.isArray(data) ? data : [];
  const amountText = String(totalAmount ?? "");
  const amountFontSize =
    amountText.length > 12 ? "1.75rem" : amountText.length > 9 ? "2.25rem" : "2.9rem";

  return (
    <div className="w-full pt-6">
      <div className="relative mx-auto h-[360px] w-full max-w-[620px] [&_.recharts-wrapper:focus]:outline-none [&_.recharts-surface:focus]:outline-none [&_.recharts-sector:focus]:outline-none [&_.recharts-sector:focus]:stroke-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              cursor={false}
              formatter={(value) => `₹${Number(value).toLocaleString()}`}
              wrapperStyle={{ zIndex: 30 }}
              contentStyle={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                fontSize: "13px",
                fontWeight: 600,
                zIndex: 30,
              }}
            />
            <Pie
              data={safeData}
              dataKey="value"
              cx="50%"
              cy="47%"
              innerRadius={120}
              outerRadius={160}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              stroke="none"
            >
              {safeData.map((entry, index) => (
                <Cell
                  key={`${entry.name}-${index}`}
                  fill={colors[index] || "#c4c4c4"}
                  tabIndex={-1}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute left-1/2 top-[47%] z-0 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-[15px] font-medium text-gray-500">{label}</p>
          <p
            className="mx-auto mt-1 max-w-[220px] font-bold leading-none tracking-tight text-[#202020] whitespace-nowrap"
            style={{ fontSize: amountFontSize }}
          >
            {totalAmount}
          </p>
        </div>
      </div>

      <div className="-mt-5 flex items-center justify-center gap-10">
        {safeData.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: colors[index] || "#c4c4c4" }}
            />
            <span className="text-sm text-gray-700">{entry.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CustomPieChart;
