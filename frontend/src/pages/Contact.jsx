import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ទំនាក់ទំនង <span className='text-gray-700 font-semibold'>ពួកយើង</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm' >
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-cenetr items-start gap-6' >
          <p className='font-semibold text-lg text-gray-600'>មជ្ឈមណ្ឌលពូកយើង</p>
          <p className='text-gray-500'>Toul Kork<br /> Phnom Penh, Cambodia</p>
          <p className='text-gray-500'>Tel: (855) 168 168 168<br /> Email: ruppcare@gmail.com</p>
        </div>


      </div>



    </div>
  )
}

export default Contact
