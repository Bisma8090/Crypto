'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { useAppDispatch } from '@/lib/hooks';
import { setCredentials } from '@/lib/features/authSlice';
import { Suspense } from 'react';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        dispatch(setCredentials({ token, user }));
        setUserName(user?.name || '');
        setSuccess(true);
        setTimeout(() => {
          router.replace('/');
        }, 2000);
      } catch {
        router.replace('/login?error=invalid_callback');
      }
    } else {
      router.replace('/login?error=no_token');
    }
  }, [searchParams, dispatch, router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#050d0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {success ? (
        <>
          <CheckCircleOutlineIcon sx={{ color: '#00e5a0', fontSize: 64 }} />
          <Typography sx={{ color: '#00e5a0', fontSize: 22, fontWeight: 700 }}>
            Successfully Logged In
          </Typography>
          <Typography sx={{ color: '#a0b0a8', fontSize: 16 }}>
            Welcome back{userName ? `, ${userName}` : ''}!
          </Typography>
        </>
      ) : (
        <>
          <CircularProgress sx={{ color: '#00e5a0' }} size={48} />
          <Typography sx={{ color: '#a0b0a8', fontSize: 16 }}>Signing you in...</Typography>
        </>
      )}
    </Box>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <Box sx={{ minHeight: '100vh', background: '#050d0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#00e5a0' }} />
      </Box>
    }>
      <CallbackContent />
    </Suspense>
  );
}
