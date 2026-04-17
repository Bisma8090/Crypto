'use client';
import {
  Box, Button, Typography, Divider, Paper, CircularProgress,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 30%, #00e5a015 0%, transparent 60%), #050d0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg,#0d2b1f,#0a1a12)',
          border: '1px solid #1a3a2a',
          borderRadius: '20px',
          p: { xs: 3, md: 5 },
          width: '100%',
          maxWidth: 440,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, justifyContent: 'center' }}>
          <Box
            sx={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg,#00e5a0,#00b37a)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            }}
          >
            ⬡
          </Box>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Circlechain</Typography>
        </Box>

        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, textAlign: 'center', mb: 1 }}>
          Welcome Back
        </Typography>
        <Typography sx={{ color: '#a0b0a8', textAlign: 'center', mb: 4, fontSize: 14 }}>
          Sign in to manage your crypto assets
        </Typography>

        {/* Google SSO Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{
            borderColor: '#1a3a2a',
            color: '#fff',
            py: 1.5,
            fontSize: 15,
            fontWeight: 600,
            background: '#0d1f1a',
            '&:hover': {
              background: '#0d2b1f',
              borderColor: '#00e5a0',
            },
          }}
        >
          Continue with Google
        </Button>

        <Divider sx={{ my: 3, borderColor: '#1a3a2a' }}>
          <Typography sx={{ color: '#4a6a5a', fontSize: 12, px: 1 }}>OR</Typography>
        </Divider>

        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: '#a0b0a8', fontSize: 14 }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: '#00e5a0', textDecoration: 'none', fontWeight: 600 }}>
              Sign up
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Link href="/" style={{ color: '#4a6a5a', textDecoration: 'none', fontSize: 13 }}>
            ← Back to home
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
