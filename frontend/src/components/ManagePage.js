import React from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const data = {
  totalRestaurants: 1200,
  general: 800,
  best: 100,
  grade: 200,
  penalized: 100,
};

const pieData = [
  { name: "일반·휴게음식점", value: data.general },
  { name: "모범음식점", value: data.best },
  { name: "위생등급", value: data.grade },
  { name: "행정처분", value: data.penalized },
];

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#F44336"];

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>음식점 통계 관리자 페이지</h2>

      <div className="stat-summary">
        <div className="stat-card">일반·휴게음식점: {data.general}곳</div>
        <div className="stat-card">모범음식점: {data.best}곳</div>
        <div className="stat-card">위생등급 음식점: {data.grade}곳</div>
        <div className="stat-card">행정처분 업소: {data.penalized}곳</div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h4>카테고리별 비율</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>카테고리별 업소 수</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
