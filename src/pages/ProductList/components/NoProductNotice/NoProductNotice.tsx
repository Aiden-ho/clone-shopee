import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import path from 'src/constants/path.constants'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface NoProductNoticeProps {
  queryConfig: QueryConfig
}
export default function NoProductNotice({ queryConfig }: NoProductNoticeProps) {
  const { name } = queryConfig
  const { t } = useTranslation('home')
  if (name) {
    return (
      // empty product for search
      <div className='w-full flex flex-col gap-2 items-center justify-center h-[350px]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-20 h-20 text-gray-400 mb-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
          />
        </svg>
        <p className='text-xl'>{t('search.empty_notice')}</p>
        <p className='text-gray-400'>{t('search.empty_guide')}</p>
        <Link to={path.home} className='text-orange mt-4'>
          {t('search.empty_action')}
        </Link>
      </div>
    )
  } else {
    // empty product for search
    return (
      <div className='w-full flex flex-col gap-2 items-center justify-center h-[350px]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-20 h-20 text-gray-400 mb-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
          />
        </svg>
        <p className='text-xl'>{t('fetch.empty_notice')}</p>
        <p className='text-gray-400'>{t('fetch.empty_guide')}</p>
      </div>
    )
  }
}
