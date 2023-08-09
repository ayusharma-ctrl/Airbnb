import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/currentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

// we are using nunito font
const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Follow me at github @ayusharma-ctrl',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // get the info of user
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className='pt-28 pb-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
