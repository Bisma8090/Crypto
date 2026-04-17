'use client';
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useSubscribeMutation } from '@/lib/api/newsletterApi';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribe, { isLoading, isSuccess, isError, error }] = useSubscribeMutation();
  const [localError, setLocalError] = useState('');

  const handleSubmit = async () => {
    setLocalError('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }
    try {
      await subscribe({ email }).unwrap();
      setEmail('');
    } catch (err: any) {}
  };

  const errMsg =
    localError ||
    (isError && ((error as any)?.data?.message || 'Something went wrong. Please try again.'));

  return (
    <Box
      id="newsletter"
      sx={{
        py: { xs: 8, md: 10 },
        background: '#050d0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        {/* Outer glow wrapper */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: '16px',
            p: '2px',
            background: 'transparent',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              padding: '1.5px',
              background: 'linear-gradient(135deg, #00e5a0 0%, #00e5a040 50%, #00e5a0 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            },
            // green glow behind card
            filter: 'drop-shadow(0 0 32px #00e5a055)',
          }}
        >
          {/* Card */}
          <Box
            sx={{
              background: '#0a1a14',
              borderRadius: '14px',
              border: '1px solid #00e5a060',
              px: { xs: 3, md: 6 },
              py: { xs: 4, md: 5 },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                fontWeight: 700,
                color: '#fff',
                mb: { xs: 3, md: 4 },
                textAlign: { xs: 'left', md: 'left' },
              }}
            >
              Want to be aware of all update
            </Typography>

            {isSuccess ? (
              <Alert
                severity="success"
                sx={{
                  background: '#0d2b1f',
                  border: '1px solid #00e5a040',
                  color: '#00e5a0',
                  borderRadius: '12px',
                  fontSize: 15,
                }}
              >
                🎉 Successfully subscribed! Check your email for confirmation.
              </Alert>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: 2, md: 1.5 },
                  alignItems: { xs: 'stretch', md: 'center' },
                }}
              >
                {/* Input with green glow border */}
                <Box
                  sx={{
                    flex: 1,
                    borderRadius: '50px',
                    background: '#fff',
                    border: '2px solid #00e5a0',
                    boxShadow: '0 0 12px #00e5a066, inset 0 0 0 0 transparent',
                    px: 2.5,
                    py: { xs: 1.5, md: 0 },
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: { xs: 56, md: 52 },
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSubmit()}
                    variant="standard"
                    slotProps={{ input: { disableUnderline: true } }}
                    sx={{
                      '& input': {
                        color: '#111',
                        fontSize: 15,
                        '&::placeholder': { color: '#999' },
                      },
                    }}
                  />
                </Box>

                {/* Subscribe button */}
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  variant="contained"
                  sx={{
                    background: '#4ade80',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: 15,
                    px: { xs: 4, md: 4 },
                    py: { xs: 1.8, md: 1.5 },
                    borderRadius: '50px',
                    whiteSpace: 'nowrap',
                    minWidth: { xs: '100%', md: 130 },
                    boxShadow: '0 0 10px #4ade8066',
                    '&:hover': {
                      background: '#6ee7a0',
                      boxShadow: '0 0 18px #4ade8099',
                    },
                  }}
                >
                  {isLoading ? <CircularProgress size={20} sx={{ color: '#000' }} /> : 'Subscribe'}
                </Button>
              </Box>
            )}

            {errMsg && (
              <Typography sx={{ color: '#ff6b6b', mt: 2, fontSize: 14 }}>
                {errMsg}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
