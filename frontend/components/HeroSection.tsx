'use client';
import { Box, Button, Typography, Container } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          // desktop: green glow bottom-left; mobile: center glow
          'radial-gradient(ellipse 60% 50% at 10% 90%, rgba(0,200,130,0.18) 0%, transparent 65%),' +
          'radial-gradient(ellipse 40% 35% at 80% 60%, rgba(0,180,110,0.07) 0%, transparent 60%),' +
          '#060e0a',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: '72px', md: '80px' },
        pb: { xs: 6, md: 0 },
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ px: { xs: '16px', md: '40px' } }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 5, md: 2 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* ── Left: Text + Buttons ── */}
          <Box sx={{ flex: '1 1 400px', maxWidth: { xs: '100%', md: 520 } }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.4rem', md: '2.9rem', lg: '3.3rem' },
                fontWeight: 800,
                lineHeight: 1.12,
                color: '#fff',
                mb: 2.5,
                letterSpacing: '-0.01em',
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
              }}
            >
              Save, Buy and Sell<br />
              Your blockchain<br />
              asset
            </Typography>

            <Typography
              sx={{
                color: '#e3e4e3ff',
                fontSize: { xs: 14, md: 18 },
                mb: { xs: 4, md: 4.5 },
                lineHeight: 1.7,
              }}
            >
              The easy to manage and trade<br />your cryptocurency asset
            </Typography>

            {/* Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              {/* Connect Wallet — teal filled */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'rgba(160,240,210,0.85)',
                  color: '#0a1a10',
                  fontWeight: 700,
                  px: { xs: 4, md: 4.5 },
                  py: 1,
                  fontSize: { xs: 14, md: 14 },
                  minWidth: { xs: 200, sm: 'auto' },
                  '&:hover': {
                    background: 'rgba(160,240,210,1)',
                    boxShadow: 'none',
                  },
                }}
              >
                Connect Wallet
              </Button>

              {/* Start Trading — white outlined */}
              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="/login"
                sx={{
                  borderColor: 'rgba(255,255,255,0.85)',
                  borderWidth: '1.5px',
                  background: 'rgba(255, 255, 255, 0.94)',
                  color: '#363434ff',
                  fontWeight: 700,
                  px: { xs: 4, md: 4.5 },
                  py: 1,
                  fontSize: { xs: 14, md: 14 },
                  borderRadius: '29px',
                  textTransform: 'none',
                  minWidth: { xs: 200, sm: 'auto' },
                  '&:hover': {
                    background: 'rgba(160,240,210,0.85)',
                    borderColor: '#fff',
                  },
                }}
              >
                Start Trading
              </Button>
            </Box>
          </Box>

          {/* ── Right: Hero Image ── */}
          <Box
            sx={{
              flex: '1 1 460px',
              maxWidth: { xs: 360, sm: 420, md: 620 },
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Image
              src="/hero.png"
              alt="Hero illustration"
              width={620}
              height={520}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}