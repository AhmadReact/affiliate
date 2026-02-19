"use client";
import { useState } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ChevronDown, Search, Calendar, ArrowUpDown } from "lucide-react";

type SimColor = "green" | "yellow" | "red";
type StatusColor = "green" | "gray";

interface Referral {
  id: number;
  customer: string;
  city: string;
  dateSignedUp: string;
  planType: string;
  simStatus: string;
  simColor: SimColor;
  monthlyElem: string;
  commsEarned: string;
  status: string;
  statusColor: StatusColor;
}

const referrals: Referral[] = [
  { id: 1, customer: "J. Cohen", city: "Brooklyn, NY", dateSignedUp: "Feb 2, 2024", planType: "Basic", simStatus: "Active", simColor: "green", monthlyElem: "$25", commsEarned: "$56.15", status: "Active", statusColor: "green" },
  { id: 2, customer: "David Sternberg", city: "Lakewood, NJ", dateSignedUp: "Jan 18, 2024", planType: "Premium", simStatus: "Pending SIM Shipment", simColor: "yellow", monthlyElem: "$25", commsEarned: "$31.00", status: "Active", statusColor: "green" },
  { id: 3, customer: "Aharon Klein", city: "Monsey, NY", dateSignedUp: "Jan 18, 2024", planType: "Unlimited", simStatus: "Pending", simColor: "yellow", monthlyElem: "$25", commsEarned: "$31.00", status: "Active", statusColor: "green" },
  { id: 4, customer: "Rivky Friedman", city: "Miami, FL", dateSignedUp: "Feb 8, 2024", planType: "Pixronum", simStatus: "Cancelled", simColor: "red", monthlyElem: "$25", commsEarned: "$82.15", status: "Active", statusColor: "green" },
  { id: 5, customer: "Sara Berg", city: "Passaic, NJ", dateSignedUp: "Jan 30, 2024", planType: "Unlimited", simStatus: "Cancelled", simColor: "red", monthlyElem: "$25", commsEarned: "$62.25", status: "7/11", statusColor: "gray" },
];

const simChipSx: Record<SimColor, object> = {
  green: { bgcolor: "#dcfce7", color: "#15803d" },
  yellow: { bgcolor: "#fefce8", color: "#a16207", border: "1px solid #fde68a" },
  red: { bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" },
};

const statusChipSx: Record<StatusColor, object> = {
  green: { bgcolor: "#dcfce7", color: "#15803d" },
  gray: { bgcolor: "#f1f5f9", color: "#475569" },
};

const TABS = ["All", "Active", "Cancelled"];
const COLUMNS = ["Customer", "City / State", "Date Signed Up", "Plan Type", "SIM Status", "Monthly Elem", "Comms Earned", "Status"];
const SORTABLE = ["Date Signed Up", "Plan Type"];

export default function ReferralList() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card elevation={0}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.5, flexWrap: "wrap", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
            Referral List
          </Typography>
          <Tabs
            value={activeTab}
            onChange={(_, v: number) => setActiveTab(v)}
            sx={{ minHeight: 32, "& .MuiTabs-indicator": { height: 2, borderRadius: 1 } }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab}
                label={tab}
                sx={{
                  minHeight: 32,
                  py: 0.5,
                  px: 1.5,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {(["May", "May", "May"] as const).map((label, i) => (
            <Button
              key={i}
              variant="outlined"
              size="small"
              endIcon={i === 0 ? <Calendar size={12} /> : <ChevronDown size={12} />}
              sx={{
                borderColor: "divider",
                color: "text.secondary",
                fontSize: "0.75rem",
                py: 0.5,
                px: 1.5,
                minWidth: "auto",
                "& .MuiButton-endIcon": { ml: 0.5 },
              }}
            >
              {label}
            </Button>
          ))}
          <IconButton size="small" sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1.5, color: "text.secondary", p: 0.75 }}>
            <Search size={13} />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      {/* Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableCell key={col} sx={{ whiteSpace: "nowrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {col}
                    {SORTABLE.includes(col) && <ArrowUpDown size={10} style={{ color: "#cbd5e1" }} />}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {referrals.map((row, i) => (
              <TableRow
                key={row.id}
                sx={{
                  bgcolor: i % 2 !== 0 ? "grey.50" : "background.paper",
                  "&:hover": { bgcolor: "#eff6ff" },
                  "&:last-child td": { border: 0 },
                }}
              >
                <TableCell sx={{ fontWeight: 600, color: "text.primary", whiteSpace: "nowrap" }}>
                  {row.customer}
                </TableCell>
                <TableCell sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>{row.city}</TableCell>
                <TableCell sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>{row.dateSignedUp}</TableCell>
                <TableCell sx={{ color: "text.primary", whiteSpace: "nowrap" }}>{row.planType}</TableCell>
                <TableCell>
                  <Chip
                    label={row.simStatus}
                    size="small"
                    sx={{ height: 20, ...simChipSx[row.simColor], whiteSpace: "nowrap" }}
                  />
                </TableCell>
                <TableCell sx={{ color: "text.primary", fontWeight: 500 }}>{row.monthlyElem}</TableCell>
                <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>{row.commsEarned}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{ height: 20, ...statusChipSx[row.statusColor] }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      {/* Pagination */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.5 }}>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          Showing 1–5 of 118 referrals
        </Typography>
        <Pagination
          count={3}
          defaultPage={1}
          size="small"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": { fontSize: "0.75rem", minWidth: 28, height: 28 },
            "& .Mui-selected": { bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } },
          }}
        />
      </Box>
    </Card>
  );
}
