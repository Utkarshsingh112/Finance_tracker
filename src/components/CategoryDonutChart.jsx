import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useExpense } from '../contexts/ExpenseContext';

const COLORS = [
  'url(#grad0)', 'url(#grad1)', 'url(#grad2)', 'url(#grad3)', 'url(#grad4)', 'url(#grad5)', 'url(#grad6)', 'url(#grad7)', 'url(#grad8)'
];

const GRADIENTS = [
  ['#60a5fa', '#2563eb'],
  ['#818cf8', '#6366f1'],
  ['#fbbf24', '#f59e42'],
  ['#34d399', '#059669'],
  ['#f472b6', '#be185d'],
  ['#a5b4fc', '#6366f1'],
  ['#38bdf8', '#0ea5e9'],
  ['#f87171', '#ef4444'],
  ['#c084fc', '#a21caf']
];

const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, percent } = payload[0].payload;
    return (
      <div className="rounded-xl shadow-lg px-4 py-2 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700">
        <div className="font-semibold text-gray-800 dark:text-white">{name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-300">{formatCurrency(value)} ({(percent * 100).toFixed(1)}%)</div>
      </div>
    );
  }
  return null;
};

const CategoryDonutChart = () => {
  const { getExpensesByCategory, getTotalExpenses, categories } = useExpense();
  const [activeIndex, setActiveIndex] = useState(null);
  const categoryData = getExpensesByCategory();
  const total = getTotalExpenses();

  const data = categories.map((cat) => ({
    name: cat,
    value: categoryData[cat]?.total || 0,
  })).filter(d => d.value > 0);

  // Custom label with glassmorphism effect
  const CenterLabel = () => (
    <foreignObject x="60" y="90" width="100" height="60">
      <div className="flex flex-col items-center justify-center w-full h-full backdrop-blur-md bg-white/40 dark:bg-gray-900/40 rounded-2xl shadow-lg p-2">
        <span className="font-extrabold text-xl text-gray-800 dark:text-white mb-0.5">{formatCurrency(total)}</span>
        <span className="text-xs text-gray-500 dark:text-gray-300 font-medium">Total Expenses</span>
      </div>
    </foreignObject>
  );

  // Custom label for donut segments
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 28; // further out for clarity
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <g>
        <foreignObject x={x - 28} y={y - 18} width={56} height={36}>
          <div
            className="flex items-center justify-center w-full h-full rounded-xl backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/30 dark:border-gray-700/60 shadow text-xs font-bold text-primary-900 dark:text-primary-50"
            style={{ fontSize: 15 }}
          >
            {(percent * 100).toFixed(0)}%
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-10 w-full relative overflow-hidden">
      {/* SVG Gradients for Pie Segments */}
      <svg width="0" height="0">
        {GRADIENTS.map(([from, to], idx) => (
          <linearGradient id={`grad${idx}`} key={idx} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        ))}
      </svg>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 relative">
        <div className="drop-shadow-xl">
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                data={data.map((d, i) => ({ ...d, percent: total ? d.value / total : 0 }))}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={100}
                labelLine={false}
                label={renderCustomizedLabel}
                dataKey="value"
                isAnimationActive={true}
                animationDuration={900}
                activeIndex={activeIndex}
                activeOuterRadius={110} // pop effect on hover
                onMouseEnter={(_, idx) => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={activeIndex === index ? '#22223b' : '#fff'}
                    strokeWidth={activeIndex === index ? 3 : 1}
                    style={{ filter: activeIndex === index ? 'drop-shadow(0 2px 8px rgba(60,60,120,0.18))' : undefined }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <CenterLabel />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 text-center">
          <span className="font-semibold text-base text-gray-700 dark:text-white">Expense Breakdown</span>
          <div className="text-xs text-gray-500 dark:text-gray-300">Last 28 days</div>
        </div>
      </div>
      <div className="flex-1 w-full md:w-1/2 space-y-4">
        {data.map((entry, idx) => {
          const percent = total ? (entry.value / total) * 100 : 0;
          const isActive = activeIndex === idx;
          return (
            <div
              key={entry.name}
              className={`flex items-center group transition-all duration-200 ${isActive ? 'bg-blue-100/60 dark:bg-blue-900/30 rounded-xl shadow' : ''}`}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{ cursor: 'pointer', padding: isActive ? '0.5rem' : '0' }}
              aria-label={`${entry.name}: ${formatCurrency(entry.value)} (${percent.toFixed(1)}%)`}
            >
              <div className="w-4 h-4 rounded-full mr-4 border-2 border-white shadow-sm" style={{ background: `linear-gradient(135deg, ${GRADIENTS[idx][0]}, ${GRADIENTS[idx][1]})` }}></div>
              <div className="flex-1 text-gray-800 dark:text-gray-200 font-medium truncate">{entry.name}</div>
              <div className="w-36 h-3 bg-gray-200 dark:bg-gray-700 rounded-full mx-4 overflow-hidden">
                <div className="h-3 rounded-full transition-all duration-500" style={{ width: `${percent}%`, background: `linear-gradient(135deg, ${GRADIENTS[idx][0]}, ${GRADIENTS[idx][1]})` }}></div>
              </div>
              <div className="font-semibold text-gray-700 dark:text-white w-20 text-right">{percent.toFixed(1)}%</div>
              <div className="ml-3 text-xs text-gray-500 dark:text-gray-300 w-20 text-right">{formatCurrency(entry.value)}</div>
            </div>
          );
        })}
      </div>
      {/* Decorative blurred circle */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-2xl pointer-events-none" />
    </div>
  );
};

export default CategoryDonutChart; 