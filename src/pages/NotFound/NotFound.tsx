import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import path from 'src/constants/path.constants'

export default function NotFound() {
  const { t } = useTranslation('comon')
  return (
    <section className='bg-white'>
      <Helmet>
        <title>404 | Shopee Clone</title>
        <meta name='description' content='Thay 404 shopee clone' />
      </Helmet>
      <div className='mx-auto py-16 px-6'>
        <div className='mx-auto text-center'>
          <h1 className='text-gray-500 mb-4 text-7xl tracking-tight font-bold lg:text-9xl'>404</h1>
          <p className='mb-4 text-3xl tracking-tight font-semibold text-gray-600 md:text-4xl'>{t('NotFound.title')}</p>
          <p className='mb-4 text-lg font-light text-gray-600 dark:text-gray-400'>{t('NotFound.decribe')}</p>
          <Link
            to={path.home}
            className='bg-orange inline-flex text-white bg-primary-600 font-medium rounded-sm px-5 py-2.5 text-center my-4'
          >
            {t('NotFound.nav_button')}
          </Link>
        </div>
      </div>
    </section>
  )
}
