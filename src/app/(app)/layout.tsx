import './globals.scss';

export const metadata = {
  title: 'Payload',
  description: 'Payload CMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='tw'>{children}</body>
    </html>
  );
}
