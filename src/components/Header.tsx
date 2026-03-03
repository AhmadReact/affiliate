"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MessageSquare, Bell, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/store/customer/customerApi";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const displayName = user
    ? `${user.fname}${user.lname ? ` ${user.lname}` : ""}`
    : "Guest";
  const initials = user
    ? `${user.fname?.[0] ?? ""}${user.lname?.[0] ?? ""}`.toUpperCase() || "U"
    : "G";

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const previousUnreadCountRef = useRef<number>(0);

  const { data: notificationsData } = useGetNotificationsQuery(
    { page: 1, page_size: 20 },
    {
      pollingInterval: 15000,
      skip: !user,
    },
  );

  const unreadNotificationsCount = useMemo(
    () =>
      notificationsData?.data?.filter((notification) => !notification.is_read)
        .length ?? 0,
    [notificationsData],
  );

  useEffect(() => {
    if (!notificationsData) return;

    const previous = previousUnreadCountRef.current;
    const current = unreadNotificationsCount;

    if (current > previous && previous !== 0) {
      // Defer state update to avoid cascading renders warning
      setTimeout(() => {
        setToastOpen(true);
      }, 0);
    }

    previousUnreadCountRef.current = current;
  }, [notificationsData, unreadNotificationsCount]);

  const [markAllNotificationsRead, { isLoading: isMarkAllReadLoading }] =
    useMarkAllNotificationsReadMutation();
  const [markNotificationRead] = useMarkNotificationReadMutation();

  const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleToastClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setToastOpen(false);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const handleMarkAllAsRead = async () => {
    if (!unreadNotificationsCount || isMarkAllReadLoading) return;
    try {
      await markAllNotificationsRead().unwrap();
    } catch {
      // ignore error for now
    }
  };

  const handleNotificationClick = (notificationId: number) => {
    markNotificationRead(notificationId);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

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
      <Toolbar
        variant="dense"
        sx={{ justifyContent: "space-between", gap: 1, minHeight: 56 }}
      >
        {/* Hamburger — rendered only when sidebar is not permanently visible */}
        {!isDesktop && (
          <IconButton
            size="small"
            onClick={onMenuClick}
            sx={{ color: "text.secondary" }}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </IconButton>
        )}

        {/* Spacer to push right-side content to the end on desktop */}
        <Box sx={{ flex: 1 }} />

        {/* Right-side actions */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <MessageSquare size={18} />
          </IconButton>

          <IconButton
            size="small"
            sx={{ color: "text.secondary" }}
            onClick={handleBellClick}
          >
            <Badge
              badgeContent={
                unreadNotificationsCount > 0
                  ? unreadNotificationsCount > 99
                    ? "99+"
                    : unreadNotificationsCount
                  : null
              }
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 9,
                  minWidth: 16,
                  height: 16,
                  fontWeight: 700,
                },
              }}
            >
              <Bell size={18} />
            </Badge>
          </IconButton>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ ml: 0.5 }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.primary",
                display: { xs: "none", sm: "block" },
              }}
            >
              {displayName}
            </Typography>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: 12,
                background: "linear-gradient(135deg, #60a5fa, #2563eb)",
              }}
            >
              {initials}
            </Avatar>
            <Button
              size="small"
              variant="outlined"
              onClick={handleLogout}
              sx={{
                ml: 0.5,
                textTransform: "none",
                fontSize: 12,
                paddingInline: 1.25,
                paddingBlock: 0.25,
              }}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Toolbar>

      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 },
        }}
      >
        <Box
          sx={{
            p: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
            >{`You have ${unreadNotificationsCount} unread notification${
              unreadNotificationsCount === 1 ? "" : "s"
            }`}</Typography>
          </Box>
          <Button
            size="small"
            variant="text"
            onClick={handleMarkAllAsRead}
            disabled={!unreadNotificationsCount || isMarkAllReadLoading}
          >
            Mark all as read
          </Button>
        </Box>
        <Divider />
        <List
          dense
          sx={{
            maxHeight: 320,
            overflowY: "auto",
          }}
        >
          {notificationsData?.data?.length ? (
            notificationsData.data.map((notification) => (
              <ListItem
                key={notification.id}
                alignItems="flex-start"
                sx={{
                  bgcolor: notification.is_read
                    ? "background.paper"
                    : "action.hover",
                  cursor: "pointer",
                }}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: notification.is_read ? 400 : 600 }}
                    >
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        {new Date(notification.created_at).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body2" color="text.secondary">
                    No notifications yet.
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Popover>

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleToastClose}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {`You have ${unreadNotificationsCount} new notification${
            unreadNotificationsCount === 1 ? "" : "s"
          }`}
        </Alert>
      </Snackbar>
    </AppBar>
  );
}
