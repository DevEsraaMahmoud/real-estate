"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const revenue = [
  { month: "Jan", direct: 420, partner: 180 },
  { month: "Feb", direct: 510, partner: 210 },
  { month: "Mar", direct: 480, partner: 260 },
  { month: "Apr", direct: 620, partner: 240 },
  { month: "May", direct: 700, partner: 310 },
  { month: "Jun", direct: 760, partner: 330 },
];

const views = [
  { name: "direct", value: 38 },
  { name: "organic", value: 32 },
  { name: "paid", value: 18 },
  { name: "partner", value: 12 },
];

const activity = [
  { week: "W1", users: 1200 },
  { week: "W2", users: 1500 },
  { week: "W3", users: 1380 },
  { week: "W4", users: 1720 },
  { week: "W5", users: 1890 },
];

const inquiries = [
  { day: "Mon", count: 24 },
  { day: "Tue", count: 32 },
  { day: "Wed", count: 28 },
  { day: "Thu", count: 40 },
  { day: "Fri", count: 36 },
  { day: "Sat", count: 22 },
  { day: "Sun", count: 18 },
];

const funnel = [
  { stage: "Views", value: 100 },
  { stage: "Saves", value: 58 },
  { stage: "Inquiries", value: 32 },
  { stage: "Tours", value: 18 },
  { stage: "Offers", value: 9 },
];

export function AnalyticsCharts() {
  const t = useTranslations("Analytics");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle>{t("chartRevenue")}</CardTitle>
        </CardHeader>
        <CardContent className="h-72 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenue}>
              <defs>
                <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  borderRadius: 12,
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="direct"
                name={t("legendDirect")}
                stroke="#38bdf8"
                fillOpacity={1}
                fill="url(#colorDirect)"
              />
              <Area
                type="monotone"
                dataKey="partner"
                name={t("legendPartner")}
                stroke="#a78bfa"
                fill="rgba(167,139,250,0.15)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle>{t("chartViews")}</CardTitle>
        </CardHeader>
        <CardContent className="h-72 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={views}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="value" fill="#38bdf8" name={t("tooltipViews")} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle>{t("chartActivity")}</CardTitle>
        </CardHeader>
        <CardContent className="h-72 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  borderRadius: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle>{t("chartInquiries")}</CardTitle>
        </CardHeader>
        <CardContent className="h-72 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={inquiries}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  borderRadius: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#818cf8"
                fill="rgba(129,140,248,0.25)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel border-white/10 lg:col-span-2">
        <CardHeader>
          <CardTitle>{t("chartFunnel")}</CardTitle>
        </CardHeader>
        <CardContent className="h-80 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnel} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} />
              <YAxis dataKey="stage" type="category" stroke="#94a3b8" fontSize={12} width={80} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="value" fill="#34d399" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
