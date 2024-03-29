import { useContext } from 'react'
import Popover from '../Popover'
import { Link } from 'react-router-dom'
import path from 'src/constants/path.constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthApi from 'src/apis/auth.api'
import { AppContext } from 'src/context/app.context'
import { purchaseStatusConst } from 'src/constants/purchase.constants'
import { getAvatarURL } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { language } from 'src/types/i18n.type'
import { locales } from 'src/i18n/i18n'
import classNames from 'classnames'

export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { i18n, t } = useTranslation('comon')
  const currentLang = locales[i18n.language as language]
  const LogoutMutation = useMutation({
    mutationFn: AuthApi.logoutApi,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatusConst.inCart }] })
    }
  })

  const handleChangeLang = (lang: language) => {
    i18n.changeLanguage(lang)
  }

  const handleLogOut = () => {
    LogoutMutation.mutate()
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div className='col-span-1 items-center hidden'>
        <div className='pr-2 text-white hover:text-gray-200 text-sm cursor-pointer border-r-2 border-gray-200 border-opacity-30'>
          {t('nav_header.seller')}
        </div>
        <div className='pl-2 pr-2 text-white hover:text-gray-200 text-sm cursor-pointer border-r-2 border-gray-200 border-opacity-30'>
          {t('nav_header.application')}
        </div>
        <div className='pl-2 pr-2 text-white text-sm flex items-center gap-2'>
          <span>{t('nav_header.social')}</span>
          <div className='flex items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              version='1.1'
              width={512}
              height={512}
              x={0}
              y={0}
              viewBox='0 0 49.652 49.652'
              className='w-4 h-4 fill-white hover:fill-slate-200 cursor-pointer'
            >
              <g>
                <path
                  d='M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z'
                  opacity={1}
                  data-original='#000000'
                />
              </g>
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              version='1.1'
              width={512}
              height={512}
              x={0}
              y={0}
              viewBox='0 0 512 512'
              className='w-4 h-4 fill-white hover:fill-slate-200 cursor-pointer'
            >
              <g>
                <path
                  d='M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0'
                  opacity={1}
                  data-original='#000000'
                />
                <path
                  d='M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0'
                  opacity={1}
                  data-original='#000000'
                />
                <path
                  d='M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0'
                  opacity={1}
                  data-original='#000000'
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className='col-span-1 flex md:justify-end gap-5 md:col-start-2 justify-between'>
        {/*Notice flex*/}
        <div className='text-white hover:text-gray-200 text-sm cursor-pointer items-center gap-1 hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
            />
          </svg>
          <span>{t('nav_header.noti')}</span>
        </div>
        {/*Help flex*/}
        <div className='text-white hover:text-gray-200 text-sm cursor-pointer items-center gap-1 hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
            />
          </svg>
          <span>{t('nav_header.help')}</span>
        </div>
        {/*Language*/}
        <div className='flex items-center md:hidden text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5 mr-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <div className='flex items-center text-sm gap-2 text-gray-200'>
            <button
              className={classNames('', {
                'bg-white px-1 rounded-md text-orange': i18n.language === 'vi'
              })}
              onClick={() => handleChangeLang('vi')}
            >
              VN
            </button>
            <span className='border-l-2 border-white border-opacity-80 w-1 h-3'></span>
            <button
              className={classNames('', {
                'bg-white px-1 rounded-md text-orange': i18n.language === 'en'
              })}
              onClick={() => handleChangeLang('en')}
            >
              EN
            </button>
          </div>
        </div>
        <Popover
          className='text-white hover:text-gray-200 text-sm cursor-pointer md:flex items-center gap-1 hidden'
          placement='bottom-end'
          renderPopover={
            <div className='flex flex-col bg-white min-w-[10rem] text-sm'>
              <button className='text-gray-800 hover:text-orange p-3 text-left' onClick={() => handleChangeLang('vi')}>
                Tiếng Việt
              </button>
              <button className='text-gray-800 hover:text-orange p-3 text-left' onClick={() => handleChangeLang('en')}>
                English
              </button>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <span>{currentLang}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </Popover>
        {/*User info*/}
        {isAuthenticated ? (
          <Popover
            className='text-white hover:text-gray-200 text-sm cursor-pointer'
            placement='bottom-end'
            renderPopover={
              <div className='flex flex-col bg-white min-w-[7rem] text-sm '>
                <Link className='text-gray-800 hover:text-teal-400 hover:bg-gray-50 p-3 text-left' to={path.profile}>
                  {t('user.account')}
                </Link>
                <Link className='text-gray-800 hover:text-teal-400 hover:bg-gray-50 p-3 text-left' to={path.purchases}>
                  {t('user.order')}
                </Link>
                <button
                  onClick={handleLogOut}
                  className='text-gray-800 hover:text-teal-400 hover:bg-gray-50 p-3 text-left'
                >
                  {t('user.logout')}
                </button>
              </div>
            }
          >
            <Link to={path.profile} className=' flex items-center gap-1'>
              <div className='w-5 h-5 flex-shrink-0'>
                <img src={getAvatarURL(profile?.avatar)} alt='avatar' className='w-full h-full rounded-full' />
              </div>
              <span>{profile?.email}</span>
            </Link>
          </Popover>
        ) : (
          <div className='text-white text-sm cursor-pointer flex items-center gap-3'>
            <Link className='hover:text-gray-200' to={path.register}>
              {t('nav_header.register')}
            </Link>
            <span className='border-l-2 border-white border-opacity-80 w-1 h-3'></span>
            <Link className='hover:text-gray-200' to={path.login}>
              {t('nav_header.login')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
