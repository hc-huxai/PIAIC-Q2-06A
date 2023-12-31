"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface OverviewProps {
  data: any[];
  className?: string;
}

export const Overview: React.FC<OverviewProps> = ({ data, className }) => {
  return (
    <ResponsiveContainer width={"100%"} height={350} className={className}>
      <BarChart data={data}>
        <XAxis
          dataKey={"month"}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(total) => `PKR${total}`}
        />
        <Bar dataKey={"amount"} fill="#3493db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};