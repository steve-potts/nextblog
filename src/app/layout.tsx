import Navbar from '@/components/nav/Navbar';
import './globals.css'
export const metadata = {
  title: 'NextJS template with TypeScript, TailwindCSS, and MongoDB',
  description: 'NextJS template with TypeScript, TailwindCSS, and MongoDB, created by @clipper.',
}
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className='bg-gray-50'>
          <Navbar/>
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
