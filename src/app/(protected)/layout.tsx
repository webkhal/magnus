
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Footer from '../components/footer'
import { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div suppressHydrationWarning style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1rem' }}>{children}</main>
      </div>
      <Footer />
    </div>
  )
}