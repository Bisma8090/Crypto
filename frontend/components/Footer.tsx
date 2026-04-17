'use client';
import { Box, Container, Typography, IconButton } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const socialIcons = [
  { key: 'facebook',  src: '/icon (2).png' },
  { key: 'instagram', src: '/icon (3).png' },
  { key: 'linkedin',  src: '/Vector.png' },
  { key: 'discord',   src: '/icon (5).png' },
  { key: 'telegram',  src: '/icon (6).png' },
];

const quickLinks = ['How it work', 'Blog', 'Support'];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{  borderTop: '1px solid rgba(0,229,160,0.15)', py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 5, md: 4 },
            justifyContent: { xs: 'center', md: 'space-between' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* Brand */}
          <Box sx={{ flex: '1 1 280px', maxWidth: 340 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Image src="/icon (1).png" alt="Circlechain logo" width={36} height={36} style={{ objectFit: 'contain' }} />
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 20, letterSpacing: 0.3 }}>
                Circlechain
              </Typography>
            </Box>
            <Typography sx={{ color: '#ffffffff', fontSize: 13.5, lineHeight: 1.85, fontWeight: 600 }}>
              Amet minim mollit non deserunt ullamco est aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniamconsequat sunt nostrud amet.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: '0 1 160px' }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 18, mb: 2.5 }}>Quick Link</Typography>
            {quickLinks.map((l) => (
              <Box key={l} sx={{ mb: 1.5 }}>
                <Link href="#" style={{ color: '#fcfcfcff', textDecoration: 'none', fontSize: 14 }}>{l}</Link>
              </Box>
            ))}
          </Box>

          {/* Social Media */}
          <Box sx={{ flex: '0 1 220px' }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 18, mb: 2.5 }}>Social Media</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              {socialIcons.map((s) => (
                <IconButton
                  key={s.key}
                  size="small"
                  sx={{
                    border: '1px solid rgba(255, 255, 255, 0.94)',
                    borderRadius: '8px',
                    width: 38,
                    height: 38,
                    p: 0,
                    '&:hover': { borderColor: '#00e5a0', background: 'rgba(0,229,160,0.06)' },
                  }}
                >
                  <Image src={s.src} alt={s.key} width={18} height={18} style={{ objectFit: 'contain' }} />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box sx={{ borderTop: '1px solid rgba(200,216,208,0.12)', mt: 5, pt: 3, textAlign: 'right' }}>
          <Typography sx={{ color: '#dae0ddff', fontSize: 13 }}>
            (c) 2022 Circlechain
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
