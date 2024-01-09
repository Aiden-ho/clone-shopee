import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AsideFilter from '../AsideFilter'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/Category.type'
import { useTranslation } from 'react-i18next'

type ExpandFilter = {
  categories: Category[]
  queryConfig: QueryConfig
}
export default function ExpandFilter({ categories, queryConfig }: ExpandFilter) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { t } = useTranslation('home')
  return (
    <motion.div className='lg:hidden flex flex-col bg-gray-200'>
      <div
        className='flex justify-between items-center cursor-pointer py-3 px-3'
        onClick={() => setIsOpen((prev) => !prev)}
        aria-hidden='true'
      >
        <span className='text-gray-600 text-sm'>{t('asidefilter.title_mobile')}</span>
        <div className='p-2 rounded-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 md:w-6 md:h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>
        </div>
      </div>
      {isOpen && (
        <AnimatePresence>
          <motion.div className='border-t-[1px] border-gray-300 px-4 py-2 bg-white'>
            <AsideFilter categories={categories} queryConfig={queryConfig} />
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  )
}
