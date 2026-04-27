import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const CustomLineChart = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];

  if (!safeData.length) {
    return <div style={{ height: "300px" }}>No data</div>;
  }

  const chartData = {
    labels: safeData.map((item) => item.month),
    datasets: [
      {
        label: "Amount",
        data: safeData.map((item) => Number(item.totalAmount)),
        borderColor: "#7B61FF",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#7B61FF",

        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );

          gradient.addColorStop(0, "rgba(123,97,255,0.4)");
          gradient.addColorStop(1, "rgba(123,97,255,0)");

          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    // ✅ Horizontal hover
    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: { display: false },

      tooltip: {
        enabled: false,
        mode: "index",
        intersect: false,

        external: function (context) {
          const { chart, tooltip } = context;

          let tooltipEl = document.getElementById("custom-tooltip");

          // Create tooltip element
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "custom-tooltip";

            Object.assign(tooltipEl.style, {
              position: "absolute",
              background: "#fff",
              borderRadius: "10px",
              padding: "10px 12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              pointerEvents: "none",
              transition: "all 0.15s ease",
              fontFamily: "Inter, sans-serif",
              minWidth: "150px",
            });

            document.body.appendChild(tooltipEl);
          }

          // Hide tooltip
          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          const index = tooltip.dataPoints[0].dataIndex;
          const item = safeData[index];

          // Tooltip UI
          tooltipEl.innerHTML = `
            <div style="color:#8A8A8A; font-size:12px; margin-bottom:4px;">
              ${item.month}
            </div>

            <div style="font-size:13px; font-weight:600; margin-bottom:8px;">
              Total: 
              <span style="color:#7B61FF; font-weight:700;">
                ₹${Number(item.totalAmount).toLocaleString()}
              </span>
            </div>

            <div style="font-size:11px; color:#A0A0A0; margin-bottom:4px;">
              Details:
            </div>

            ${
              item.items?.length
                ? item.items
                    .map(
                      (i) => `
                        <div style="font-size:12px; color:#333; margin-bottom:2px;">
                          ${i.name}: ₹${Number(i.amount).toLocaleString()}
                        </div>
                      `
                    )
                    .join("")
                : `<div style="font-size:12px; color:#999;">No data</div>`
            }
          `;

          const rect = chart.canvas.getBoundingClientRect();

          // --- Smart horizontal positioning ---
          const tooltipWidth = tooltipEl.offsetWidth;
          const padding = 12;

          let left =
            rect.left + window.pageXOffset + tooltip.caretX;

          if (left + tooltipWidth + padding > window.innerWidth) {
            left = window.innerWidth - tooltipWidth - padding;
          }

          if (left < padding) {
            left = padding;
          }

          // --- Smart vertical positioning ---
          const tooltipHeight = tooltipEl.offsetHeight;

          let top =
            rect.top +
            window.pageYOffset +
            tooltip.caretY -
            tooltipHeight -
            10;

          if (top < 10) {
            top =
              rect.top +
              window.pageYOffset +
              tooltip.caretY +
              10;
          }

          tooltipEl.style.opacity = 1;
          tooltipEl.style.left = left + "px";
          tooltipEl.style.top = top + "px";
        },
      },
    },

    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { display: false },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CustomLineChart;