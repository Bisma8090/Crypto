'use client';
import { Box, Container, Typography } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';

const cryptos = [
  { symbol: 'BTC', name: 'Bitcoin',   price: '$56,623.54', change: '1.41%',  up: true,  color: '#f7931a' },
  { symbol: 'ETH', name: 'Ethereum',  price: '$4,267.40',  change: '3.2%',   up: true,  color: '#627eea' },
  { symbol: 'BNB', name: 'Binance',   price: '$587.74',    change: '0.9%',   up: true,  color: '#f3ba2f' },
  { symbol: 'USDT', name: 'Tether',   price: '$1.00',      change: '0.01%',  up: true,  color: '#26a17b' },
  { symbol: 'XRP', name: 'Ripple',    price: '$0.78',      change: '1.2%',   up: false, color: '#00aae4' },
  { symbol: 'SOL', name: 'Solana',    price: '$98.45',     change: '5.1%',   up: true,  color: '#9945ff' },
  { symbol: 'ADA', name: 'Cardano',   price: '$0.52',      change: '0.8%',   up: false, color: '#4a90d9' },
  { symbol: 'DOGE', name: 'Dogecoin', price: '$0.089',     change: '2.3%',   up: true,  color: '#c2a633' },
  { symbol: 'DOT', name: 'Polkadot',  price: '$6.34',      change: '1.5%',   up: false, color: '#e6007a' },
  { symbol: 'AVAX', name: 'Avalanche',price: '$14,267.90', change: '2.2%',   up: true,  color: '#e84142' },
  { symbol: 'LINK', name: 'Chainlink',price: '$14.82',     change: '3.7%',   up: true,  color: '#2a5ada' },
  { symbol: 'MATIC', name: 'Polygon', price: '$0.92',      change: '0.4%',   up: false, color: '#8247e5' },
];

function Sparkline({ up }: { up: boolean }) {
  const color = '#00e5a0';
  const points = up
    ? '0,28 12,24 24,20 36,22 48,14 60,10 72,8 84,4'
    : '0,4 12,8 24,6 36,12 48,16 60,20 72,18 84,24';
  return (
    <svg width="90" height="32" viewBox="0 0 90 32" style={{ display: 'block' }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MarketTrendSection() {
  return (
    <Box id="market" sx={{ py: { xs: 8, md: 10 }, background: '#050d0a' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            fontWeight: 700,
            color: '#fff',
            mb: 6,
            textAlign: 'center',
          }}
        >
          Market Trend
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
          {cryptos.map((c) => {
            const glowColor = '#00e5a0';
            return (
              <Box key={c.symbol} sx={{ flex: '1 1 240px', minWidth: 0 }}>
                <Box
                  sx={{
                    background: '#0a0f0d',
                    border: `1.5px solid ${glowColor}`,
                    borderRadius: '16px',
                    p: '20px 22px',
                    boxShadow: `0 0 12px ${glowColor}55, 0 0 28px ${glowColor}22`,
                    cursor: 'pointer',
                  }}
                >
                  {/* Top row: icon + symbol/name + arrow */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {/* Coin icon circle */}
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          background: c.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          fontSize: 13,
                          color: '#fff',
                          flexShrink: 0,
                          letterSpacing: '-0.5px',
                        }}
                      >
                        {c.symbol.slice(0, 2)}
                      </Box>
                      {/* Symbol + Name */}
                      <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>
                          {c.symbol}
                        </Typography>
                        <Typography sx={{ color: '#8a9e96', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                          {c.name}
                        </Typography>
                      </Box>
                    </Box>
                    {/* Arrow icon */}
                    {c.up
                      ? <NorthEastIcon sx={{ color: '#fff', fontSize: 20, opacity: 0.85 }} />
                      : <SouthWestIcon sx={{ color: '#fff', fontSize: 20, opacity: 0.85 }} />
                    }
                  </Box>

                  {/* Divider line */}
                  <Box sx={{ height: '1px', background: '#1a2e24', mb: 2 }} />

                  {/* Price + sparkline row */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 22, lineHeight: 1.2, mb: 0.5 }}>
                        {c.price}
                      </Typography>
                      <Typography sx={{ color: '#fff', fontWeight: 500, fontSize: 14, opacity: 0.75 }}>
                        {c.up ? '+' : '-'}{c.change}
                      </Typography>
                    </Box>
                    <Sparkline up={c.up} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
