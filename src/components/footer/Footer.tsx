import { Link } from 'react-router-dom'

const subMenuItems = {
  customerService: [
    `Trung Tâm Trợ Giúp`,
    `Shopee Blog`,
    `Shopee Mall`,
    `Hướng Dẫn Mua Hàng`,
    `Hướng Dẫn Bán Hàng`,
    `Thanh Toán`,
    `Shopee Xu`,
    'Vận Chuyển',
    'Trả Hàng & Hoàn Tiền',
    'Chăm Sóc Khách Hàng',
    'Chính Sách Bảo Hành'
  ],
  about: [
    ' Giới Thiệu Về Shopee Việt Nam',
    'Tuyển Dụng',
    'Điều Khoản Shopee',
    'Chính Sách Bảo Mật',
    'Chính Hãng',
    'Kênh Người Bán',
    'Flash Sales',
    'Chương Trình Tiếp Thị Liên Kết Shopee',
    'Liên Hệ Với Truyền Thông'
  ],
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
  return (
    <footer className='py-16 bg-neutral-100'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='pb-5 mb-8 grid grid-cols-2 md:grid-cols-5 gap-16 border-b-2'>
          {/* Chăm sóc khách hàng */}
          <div>
            <div className='text-xs font-semibold uppercase mb-4'>Chăm sóc khách hàng</div>
            <ul className='list-none text-xs tracking-wide'>
              {subMenuItems.customerService.map((item, index) => (
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
            <div className='text-xs font-semibold uppercase mb-4'>Vế SHOPEE</div>
            <ul className='list-none text-xs tracking-wide'>
              {subMenuItems.about.map((item, index) => (
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
            <div className='text-xs font-semibold uppercase mb-4'>Thanh toán</div>
            <ul className='list-none text-xs tracking-wide grid grid-cols-3 gap-2'>
              {subMenuItems.payment.map((item, index) => (
                <li key={index} className='mb-2 bg-white p-1 shadow-md rounded-sm'>
                  <Link to='#'>
                    <img className='mx-auto' src={item} alt={String(index)} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className='text-xs font-semibold uppercase my-4'>Vận chuyển</div>
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
            <div className='text-xs font-semibold uppercase mb-4'>Theo dõi chúng tôi trên</div>
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
            <div className='text-xs font-semibold uppercase mb-4'>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</div>
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
          <div className='lg:col-span-1'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className='lg:col-span-2'>
            Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México
            Colombia Chile
          </div>
        </div>
        <div className='text-center text-sm mt-10 text-neutral-700'>
          <div>Công ty TNHH Shopee</div>
          <div className='mt-2'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-2'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}
