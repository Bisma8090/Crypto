'use client';
import {
  AppBar, Toolbar, Box, IconButton, Drawer,
  List, ListItem, ListItemText, useMediaQuery, useTheme, Avatar, Menu, MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/features/authSlice';

const navLinks = [
  { label: 'How it work', href: '#features' },
  { label: 'Blog', href: '#blog' },
  { label: 'Support', href: '#support' },
];

const socialIcons = [
    { key: 'telegram',  src: '/icon (6).png' },
{ key: 'discord',   src: '/icon (5).png' },
{ key: 'linkedin',  src: '/Vector.png' },
  { key: 'instagram', src: '/icon (3).png' },
  { key: 'facebook',  src: '/icon (2).png' },
  
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          px: { xs: '16px', md: '40px' },
          py: { xs: '10px', md: '14px' },
          minHeight: { xs: 56, md: 64 },
        }}
      >
        {/* ── Logo ── */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Image src="/icon (1).png" alt="Circlechain logo" width={36} height={36} style={{ objectFit: 'contain' }} />
          <Box sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: 18, md: 20 }, letterSpacing: 0.3 }}>
            Circlechain
          </Box>
        </Link>

        {/* ── Desktop Nav Links (center) ── */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: { md: 3.5, lg: 5 }, alignItems: 'center' }}>
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{ color: '#c8d8d0', textDecoration: 'none', fontSize: 15, fontWeight: 400, whiteSpace: 'nowrap' }}
              >
                {l.label}
              </Link>
            ))}
          </Box>
        )}

        {/* ── Right: Social Icons + Auth ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 0.6, lg: 0.8 }, flexShrink: 0 }}>
          {!isMobile && socialIcons.map((s) => (
            <IconButton
              key={s.key}
              size="small"
              sx={{
                border: '1px solid rgba(200,216,208,0.35)',
                borderRadius: '8px',
                width: 34,
                height: 34,
                p: 0,
                '&:hover': { borderColor: '#00e5a0', background: 'rgba(0,229,160,0.06)' },
              }}
            >
              <Image src={s.src} alt={s.key} width={17} height={17} style={{ objectFit: 'contain' }} />
            </IconButton>
          ))}

          {isAuthenticated && (
            <Box sx={{ ml: 1 }}>
              <Avatar
                src={user?.picture}
                alt={user?.name}
                sx={{ width: 34, height: 34, cursor: 'pointer', border: '2px solid #00e5a0' }}
                onClick={(e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}
              />
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem component={Link} href="/profile" onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                <MenuItem onClick={() => { dispatch(logout()); setAnchorEl(null); }}>Logout</MenuItem>
              </Menu>
            </Box>
          )}

          {isMobile && (
            <IconButton sx={{ color: '#fff', p: 0.5 }} onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ fontSize: 26 }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { background: '#0a1a14', width: 260 } } }}
      >
        <List sx={{ pt: 4 }}>
          {navLinks.map((l) => (
            <ListItem key={l.label} component={Link} href={l.href} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={l.label} sx={{ color: '#fff' }} />
            </ListItem>
          ))}
          <ListItem>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {socialIcons.map((s) => (
                <IconButton
                  key={s.key}
                  size="small"
                  sx={{ border: '1px solid rgba(160,176,168,0.35)', borderRadius: '6px', width: 32, height: 32 }}
                >
                  <Image src={s.src} alt={s.key} width={16} height={16} style={{ objectFit: 'contain' }} />
                </IconButton>
              ))}
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
