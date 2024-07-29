import Navbar from '@/components/nav/Navbar';
import './globals.css'
export const metadata = {
  title: 'NextJS',
  description: 'NextJS',
}
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Sidebar from '@/components/nav/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className='bg-gray-50 w-full h-screen overflow-clip flex flex-col'>
          <Navbar/>
          <main className='w-full h-full flex flex-col md:flex-row'>
            <Sidebar/>
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  )
}
