import React from 'react'

export function DetailsLayout({ children, asideContent, relatedCourse }) {
  return (
    <>
        <div className='mt-12 md:flex md:gap-[5%]'>
            <aside className="md:w-[38%] w-full border-2">
                <div className='flex flex-col border-3 rounded-3xl p-3 h-fit gap-5 sticky top-0'>
                    {asideContent}
                </div>
            </aside>

            <main className='md:w-[57%] w-full flex flex-col gap-6'>
                {children}
            </main>
        </div>
        <div className="my-6">
            {relatedCourse}
        </div>
    </>
  )
}
