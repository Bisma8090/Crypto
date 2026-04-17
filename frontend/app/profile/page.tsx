'use client';
import {
  Box, Container, Typography, Paper, Avatar, Chip, Button, Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedIcon from '@mui/icons-material/Verified';
import Navbar from '@/components/Navbar';
import { useAppSelector } from '@/lib/hooks';
import { useGetProfileQuery } from '@/lib/api/userApi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const { data: profile } = useGetProfileQuery(undefined, { skip: !isAuthenticated });

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const displayUser = profile || user;

  return (
    <>
      <Navbar />
      <Box sx={{ background: '#050d0a', minHeight: '100vh', pt: 10, pb: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 4 }}>Profile</Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {/* Profile Card */}
            <Box sx={{ flex: '0 1 280px' }}>
              <Paper
                elevation={0}
                sx={{
                  background: 'linear-gradient(135deg,#0d2b1f,#0a1a12)',
                  border: '1px solid #1a3a2a',
                  borderRadius: '16px',
                  p: 3,
                  textAlign: 'center',
                }}
              >
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  <Avatar
                    src={displayUser?.picture}
                    alt={displayUser?.name}
                    sx={{ width: 90, height: 90, border: '3px solid #00e5a0', fontSize: 36 }}
                  >
                    {displayUser?.name?.[0]?.toUpperCase()}
                  </Avatar>
                  <Box
                    sx={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 24, height: 24, borderRadius: '50%',
                      background: '#00e5a0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <VerifiedIcon sx={{ fontSize: 14, color: '#000' }} />
                  </Box>
                </Box>

                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 18, mb: 0.5 }}>
                  {displayUser?.name || 'User'}
                </Typography>
                <Typography sx={{ color: '#a0b0a8', fontSize: 13, mb: 2 }}>
                  {displayUser?.email}
                </Typography>

                <Chip
                  label="Verified Trader"
                  size="small"
                  sx={{ background: '#00e5a015', color: '#00e5a0', border: '1px solid #00e5a030', mb: 2 }}
                />

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{
                    borderColor: '#1a3a2a',
                    color: '#a0b0a8',
                    '&:hover': { borderColor: '#00e5a0', color: '#00e5a0' },
                  }}
                >
                  Edit Profile
                </Button>
              </Paper>
            </Box>

            {/* Details */}
            <Box sx={{ flex: '1 1 320px' }}>
              <Paper
                elevation={0}
                sx={{
                  background: 'linear-gradient(135deg,#0d2b1f,#0a1a12)',
                  border: '1px solid #1a3a2a',
                  borderRadius: '16px',
                  p: 3,
                }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 16, mb: 3 }}>
                  Account Information
                </Typography>

                {[
                  { icon: <EmailIcon sx={{ fontSize: 18, color: '#00e5a0' }} />, label: 'Email', value: displayUser?.email || '—' },
                  { icon: <VerifiedIcon sx={{ fontSize: 18, color: '#00e5a0' }} />, label: 'Auth Provider', value: 'Google SSO' },
                  {
                    icon: <CalendarTodayIcon sx={{ fontSize: 18, color: '#00e5a0' }} />,
                    label: 'Member Since',
                    value: (displayUser as any)?.createdAt
                      ? new Date((displayUser as any).createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                      : '—',
                  },
                ].map((item, i) => (
                  <Box key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                      <Box
                        sx={{
                          width: 36, height: 36, borderRadius: '8px',
                          background: '#00e5a010',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#a0b0a8', fontSize: 12, mb: 0.3 }}>{item.label}</Typography>
                        <Typography sx={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{item.value}</Typography>
                      </Box>
                    </Box>
                    {i < 2 && <Divider sx={{ borderColor: '#1a3a2a' }} />}
                  </Box>
                ))}
              </Paper>

              {/* Stats */}
              <Paper
                elevation={0}
                sx={{
                  background: 'linear-gradient(135deg,#0d2b1f,#0a1a12)',
                  border: '1px solid #1a3a2a',
                  borderRadius: '16px',
                  p: 3,
                  mt: 3,
                }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 16, mb: 3 }}>Trading Stats</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {[
                    { label: 'Total Trades', value: '142' },
                    { label: 'Win Rate', value: '68%' },
                    { label: 'Portfolio Value', value: '$23,718' },
                    { label: 'Total Profit', value: '+$4,230' },
                  ].map((s, i) => (
                    <Box
                      key={i}
                      sx={{
                        flex: '1 1 120px',
                        background: '#0a1510',
                        border: '1px solid #1a3a2a',
                        borderRadius: '10px',
                        p: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#00e5a0', fontWeight: 800, fontSize: 20 }}>{s.value}</Typography>
                      <Typography sx={{ color: '#a0b0a8', fontSize: 12 }}>{s.label}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
