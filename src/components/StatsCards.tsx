import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { TrendingUp, Users, Activity, DollarSign, CreditCard, Clock, LucideIcon } from "lucide-react";

interface CardData {
  label: string;
  value: string;
  sub: string;
  trend?: string;
  period: string;
  icon: LucideIcon;
  accent: string;
  accentBg: string;
}

const CARDS: CardData[] = [
  {
    label: "New Referrals",
    value: "27",
    sub: "103 active lines",
    trend: "+3 this week",
    period: "This Month",
    icon: Users,
    accent: "#2563eb",
    accentBg: "#eff6ff",
  },
  {
    label: "Direct Earnings",
    value: "$734.25",
    sub: "+ $118.40 from sub-affiliates",
    period: "All Time",
    icon: DollarSign,
    accent: "#2563eb",
    accentBg: "#eff6ff",
  },
  {
    label: "Total Paid Out",
    value: "$8,325.50",
    sub: "$2,237.50 paid this month",
    period: "All Time",
    icon: CreditCard,
    accent: "#ea580c",
    accentBg: "#fff7ed",
  },
  {
    label: "Total Referrals",
    value: "118",
    sub: "295 total active lines",
    period: "All Time",
    icon: Activity,
    accent: "#16a34a",
    accentBg: "#f0fdf4",
  },
  {
    label: "Total Earned",
    value: "$852.65",
    sub: "$237.50 pending payout",
    period: "This Month",
    icon: TrendingUp,
    accent: "#2563eb",
    accentBg: "#eff6ff",
  },
  {
    label: "Pending Payout",
    value: "$237.50",
    sub: "Next payout: Feb 28",
    period: "All Time",
    icon: Clock,
    accent: "#d97706",
    accentBg: "#fffbeb",
  },
];

interface StatCardProps extends CardData {}

function StatCard({ label, value, sub, trend, period, icon: Icon, accent, accentBg }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 8px 24px -4px rgb(0 0 0 / 0.10)",
          transform: "translateY(-1px)",
        },
      }}
    >
      {/* Top accent bar */}
      <Box sx={{ height: 3, bgcolor: accent, borderRadius: "12px 12px 0 0" }} />

      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        {/* Header: icon + period */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: 2,
              bgcolor: accentBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={16} style={{ color: accent }} />
          </Box>
          <Typography
            variant="caption"
            sx={{
              bgcolor: "grey.100",
              color: "text.disabled",
              fontWeight: 600,
              px: 1,
              py: 0.25,
              borderRadius: 10,
              fontSize: "0.65rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {period}
          </Typography>
        </Box>

        {/* Label */}
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5, fontSize: "0.8rem" }}
        >
          {label}
        </Typography>

        {/* Value */}
        <Typography
          sx={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "text.primary",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            mb: 1.5,
          }}
        >
          {value}
        </Typography>

        <Divider sx={{ mb: 1.5 }} />

        {/* Footer */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 500 }}>
            {sub}
          </Typography>
          {trend && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
              <TrendingUp size={11} style={{ color: "#16a34a" }} />
              <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600 }}>
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function StatsCards() {
  return (
    <Grid container spacing={2}>
      {CARDS.map((card, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}
