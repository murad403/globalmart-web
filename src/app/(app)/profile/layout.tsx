import type { ReactNode } from 'react'
import ProfileSidebar from './_components/ProfileSidebar'

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="container mx-auto px-4 py-6 md:px-4 xl:px-0 md:pt-12">
      <div className="grid items-start gap-5 lg:grid-cols-[290px_minmax(0,1fr)]">
        <ProfileSidebar />
        <div>{children}</div>
      </div>
    </section>
  )
}

export default ProfileLayout
