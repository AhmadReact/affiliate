"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  LayoutDashboard,
  Users,
  Network,
  DollarSign,
  Megaphone,
  Settings,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Referrals", icon: Users, href: "/referrals" },
  { label: "Network", icon: Network, href: "/network" },
  { label: "Earnings", icon: DollarSign, href: "/earnings" },
  { label: "Marketing Tools", icon: Megaphone, href: "/marketing-tools" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        width: 208,
        minHeight: "100vh",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        boxShadow: 1,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2.5, py: 2.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: "primary.main",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
          }}
        >
          <ChevronLeft size={16} />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>
          Kosher<Box component="span" sx={{ color: "primary.main" }}>Phone</Box>
        </Typography>
      </Box>

      <Divider />

      {/* Nav */}
      <List sx={{ flex: 1, py: 1.5, px: 1 }}>
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <ListItem key={label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={href}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 1.5,
                  "&.Mui-selected": {
                    bgcolor: "primary.50",
                    color: "primary.main",
                    "&:hover": { bgcolor: "primary.50" },
                  },
                  "&.Mui-selected .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                  "&:not(.Mui-selected)": {
                    color: "text.secondary",
                  },
                  "&:not(.Mui-selected) .MuiListItemIcon-root": {
                    color: "text.disabled",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Icon size={18} />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: "0.8125rem", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
