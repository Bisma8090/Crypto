'use client';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

const features = [
  {
    title: 'Access Token Market',
    desc: 'Buy and sell token anytime and anywhere',
  },
  {
    title: 'User Friendly Interface',
    desc: 'Easy to navigate',
  },
  {
    title: 'Ownership Token control',
    desc: 'Be in control and own as many asset as possible',
  },
];

export default function FeaturesSection() {
  return (
    <Box
      id="features"
      sx={{
        background: '#060e0a',
        py: { xs: 8, md: 10 },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: '16px', md: '40px' } }}>

        {/* ── Heading ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '1.55rem', sm: '1.9rem', md: '2.3rem' },
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              mb: 1.5,
              fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            }}
          >
            Global Decentralize currency based on<br />blockchain technology
          </Typography>
          <Typography
            sx={{
              color: '#4caf82',
              fontSize: { xs: 13, md: 15 },
              fontWeight: 500,
            }}
          >
            Web3 is the latest efficient technology
          </Typography>
        </Box>

        {/* ── Desktop: side-by-side | Mobile: stacked ── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'center' },
            gap: { xs: 5, md: 0 },
          }}
        >

          {/* ── Left: Illustration ── */}
          <Box
            sx={{
              flex: { md: '0 0 52%' },
              width: { xs: '100%', md: '52%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // On desktop, pull right to overlap the cards
              position: 'relative',
              zIndex: 2,
              mr: { md: '-60px' },
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', sm: 420, md: 520 },
                maxWidth: 540,
                aspectRatio: '1 / 0.85',
                position: 'relative',
                // green glow behind illustration
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse 70% 60% at 40% 55%, rgba(0,200,120,0.22) 0%, transparent 70%)',
                  zIndex: 0,
                },
              }}
            >
              <Image
                src="/Illustration (1).png"
                alt="Blockchain illustration"
                fill
                style={{ objectFit: 'contain', zIndex: 1 }}
              />
            </Box>
          </Box>

          {/* ── Right: Feature Cards ── */}
          <Box
            sx={{
              flex: { md: '0 0 55%' },
              width: { xs: '100%', md: '55%' },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2, md: 2.5 },
              zIndex: 1,
            }}
          >
            {features.map((f, i) => (
              <Box
                key={i}
                sx={{
                  // Figma: left dark navy → right bright green
                  background: 'linear-gradient(90deg, rgba(196,196,196,0) 0%, rgba(115,253,170,0.89) 100%)',
                  borderRadius: '14px',
                  px: { xs: 3, md: 4 },
                  py: { xs: 2.5, md: 3 },
                  textAlign: { xs: 'center', md: 'right' },
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: { xs: 15, md: 17 },
                    mb: 0.6,
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  }}
                >
                  {f.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#1a1a2e',
                    fontSize: { xs: 13, md: 14 },
                    lineHeight: 1.55,
                    fontWeight: 500,
                  }}
                >
                  {f.desc}
                </Typography>
              </Box>
            ))}
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
