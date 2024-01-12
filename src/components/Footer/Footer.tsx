import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const subMenuItems = {
  payment: [
    'https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8',
    'https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16',
    'https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08',
    'https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c',
    'https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281',
    'https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09',
    'https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06',
    'https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492'
  ],
  carrier: [
    'https://down-vn.img.susercontent.com/file/vn-50009109-159200e3e365de418aae52b840f24185',
    'https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2',
    'https://down-vn.img.susercontent.com/file/77bf96a871418fbc21cc63dd39fb5f15',
    'https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f',
    'https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c',
    'https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63',
    'https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5',
    'https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d',
    'https://down-vn.img.susercontent.com/file/b8348201b4611fc3315b82765d35fc63',
    'https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6'
  ]
}
export default function Footer() {
  const { t } = useTranslation('comon')

  const customerService = useMemo(
    () => [
      t('footer.nav.customer.items.help'),
      t('footer.nav.customer.items.blog'),
      t('footer.nav.customer.items.mall'),
      t('footer.nav.customer.items.how_buy'),
      t('footer.nav.customer.items.how_sell'),
      t('footer.nav.customer.items.payment'),
      t('footer.nav.customer.items.ship'),
      t('footer.nav.customer.items.refund'),
      t('footer.nav.customer.items.contact'),
      t('footer.nav.customer.items.warranty')
    ],
    [t]
  )

  const about = useMemo(
    () => [
      t('footer.nav.about.items.about'),
      t('footer.nav.about.items.career'),
      t('footer.nav.about.items.policies'),
      t('footer.nav.about.items.privacy'),
      t('footer.nav.about.items.genuine'),
      t('footer.nav.about.items.seller'),
      t('footer.nav.about.items.deals'),
      t('footer.nav.about.items.ambassador'),
      t('footer.nav.about.items.Media')
    ],
    [t]
  )

  return (
    <footer className='py-16 bg-neutral-100'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='pb-5 mb-8 grid grid-cols-2 md:grid-cols-5 gap-16 border-b-2'>
          {/* Chăm sóc khách hàng */}
          <div>
            <div className='text-xs font-semibold uppercase mb-4'>{t('footer.nav.customer.title')}</div>
            <ul className='list-none text-xs tracking-wide'>
              {customerService.map((item, index) => (
                <li key={index} className='mb-2'>
                  <Link className='hover:text-orange text-neutral-700' to='#'>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Về Shopee */}
          <div>
            <div className='text-xs font-semibold uppercase mb-4'>{t('footer.nav.about.title')}</div>
            <ul className='list-none text-xs tracking-wide'>
              {about.map((item, index) => (
                <li key={index} className='mb-2'>
                  <Link className='hover:text-orange text-neutral-700' to='#'>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Thanh toán và vận chuyển */}
          <div className='col-span-2 md:col-span-1'>
            <div className='text-xs font-semibold uppercase mb-4'>{t('footer.nav.payment.title')}</div>
            <ul className='list-none text-xs tracking-wide grid grid-cols-3 gap-2'>
              {subMenuItems.payment.map((item, index) => (
                <li key={index} className='mb-2 bg-white p-1 shadow-md rounded-sm'>
                  <Link to='#'>
                    <img className='mx-auto' src={item} alt={String(index)} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className='text-xs font-semibold uppercase my-4'>{t('footer.nav.logistics.title')}</div>
            <ul className='list-none text-xs tracking-wide grid grid-cols-3 gap-2'>
              {subMenuItems.carrier.map((item, index) => (
                <li key={index} className='mb-2 bg-white p-1 shadow-md rounded-sm'>
                  <Link to='#'>
                    <img className='mx-auto' src={item} alt={String(index)} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Theo dõi chúng tôi*/}
          <div>
            <div className='text-xs font-semibold uppercase mb-4'>{t('footer.nav.follow.title')}</div>
            <ul className='list-none text-xs tracking-wide'>
              <li className='flex items-start gap-2 mb-3'>
                <img src='https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5' alt='fb' />
                <Link className='hover:text-orange text-neutral-700' to='#'>
                  FaceBook
                </Link>
              </li>
              <li className='flex items-start gap-2 mb-3'>
                <img src='https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91' alt='ins' />
                <Link className='hover:text-orange text-neutral-700' to='#'>
                  Instagram
                </Link>
              </li>
              <li className='flex items-start gap-2 mb-3'>
                <img src='https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a' alt='linkedin' />
                <Link className='hover:text-orange text-neutral-700' to='#'>
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
          {/* Tải ứng dụng chúng tôi*/}
          <div className='col-sp'>
            <div className='text-xs font-semibold uppercase mb-4'>{t('footer.nav.app.title')}</div>
            <div className='flex gap-2'>
              <div>
                <Link to='#' className='inline-block'>
                  <img
                    className='bg-white p-1 shadow-md '
                    src='https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472'
                    alt='download_qr_code'
                  ></img>
                </Link>
              </div>
              <div className='grid grid-cols-1 gap-1'>
                <Link to='#'>
                  <img
                    className='bg-white p-1 shadow-md '
                    src='https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163'
                    alt='app'
                  />
                </Link>
                <Link to='#'>
                  <img
                    className='bg-white p-1 shadow-md '
                    src='https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def'
                    alt='app'
                  />
                </Link>
                <Link to='#'>
                  <img
                    className='bg-white p-1 shadow-md '
                    src='https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0'
                    alt='app'
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-neutral-700'>
          <div className='lg:col-span-1'>{t('footer.info.reserved')}</div>
          <div className='lg:col-span-2'>{t('footer.info.countries')}</div>
        </div>
        <div className='text-left md:text-center lg:text-center text-sm mt-10 text-neutral-700'>
          <div>{t('footer.info.company')}</div>
          <div className='mt-2'>{t('footer.info.address')}</div>
          <div className='mt-2'>{t('footer.info.manager')}</div>
          <div className='mt-2'>{t('footer.info.tax')}</div>
          <div className='mt-2'>{t('footer.info.copy_right')}</div>
        </div>
      </div>
    </footer>
  )
}
