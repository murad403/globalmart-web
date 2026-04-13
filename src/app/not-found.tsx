'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home, X } from 'lucide-react'
import notFoundImage from '@/assets/others/notfound.png'
import { Button } from '@/components/ui/button'

const NotFoundPage = () => {
  const router = useRouter()

  return (
    <section className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center gap-20 md:justify-between md:flex-row flex-col">


        <Image
          src={notFoundImage}
          alt="404 not found"
          className="h-auto w-full max-w-md object-contain"
          width={758}
          height={565}
        />

        <div className="mx-auto w-full max-w-md lg:mx-0">
          <div className='flex flex-col justify-center items-center'>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#ff4d4f] text-[#ff4d4f]">
              <X className="h-7 w-7" strokeWidth={1.75} />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-title">404, Page not founds</h1>
            <p className="mt-4 max-w-105 text-sm leading-6 text-description text-center">
              Something went wrong. It&apos;s look that your requested could not be found.
              It&apos;s look like the link is broken or the page is removed.
            </p>
          </div>

          <div className="mt-7 flex justify-center items-center gap-3">
            <Button
              type="button"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              GO BACK
            </Button>

            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-sm border border-main bg-white px-5 text-xs font-semibold text-main transition hover:bg-blue-50"
            >
              <Home className="h-3.5 w-3.5" />
              GO TO HOME
            </Link>
          </div>
        </div>
      </div>
    </section >
  )
}

export default NotFoundPage
