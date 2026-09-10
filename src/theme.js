 // app/theme.ts
    'use client';
    import { createTheme } from '@mui/material/styles';
    import { Roboto } from 'next/font/google';
    import { Poppins, Afacad } from 'next/font/google'

    const roboto = Roboto({
      weight: ['300', '400', '500', '700'],
      subsets: ['latin'],
      display: 'swap',
    });

    const poppins = Poppins({
      weight: ['400', '500', '600', '700'],
      subsets: ['latin'],
      display: 'swap',
    })

    const afacad = Afacad({
      weight: ['400', '500', '600'],
      subsets: ['latin'],
      display: 'swap',
    })

    const theme = createTheme({
      typography: {
        fontFamily: poppins.style.fontFamily,
      },
      // Add other theme customizations here, like palette, spacing, etc.
    });


    export default theme;