"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { MessageSquare, Bell } from "lucide-react";

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
        height: 56,
        justifyContent: "center",
      }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: "flex-end", gap: 1, minHeight: 56 }}>
        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <MessageSquare size={18} />
        </IconButton>

        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <Badge
            badgeContent="9+"
            color="error"
            sx={{ "& .MuiBadge-badge": { fontSize: 9, minWidth: 16, height: 16, fontWeight: 700 } }}
          >
            <Bell size={18} />
          </Badge>
        </IconButton>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: 0.5 }}>
          <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
            Daniel
          </Typography>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: 12,
              background: "linear-gradient(135deg, #60a5fa, #2563eb)",
            }}
          >
            D
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
