import "./globals.css";
import Providers from "./providers";
import { Fira_Code } from 'next/font/google';

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata = {
  title: "clify",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={firaCode.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
