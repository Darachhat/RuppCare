import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>អំពី <span className='text-gray-700 font-medium'>ពួកយើង</span> </p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>សូមស្វាគមន៍មកកាន់ RUPPCare ដៃគូដែលអ្នកអាចទុកចិត្តបានក្នុងការគ្រប់គ្រងតម្រូវការសុខភាពរបស់អ្នកយ៉ាងងាយស្រួលនិងមានប្រសិទ្ធភាព។ នៅ RUPPCare យើងយល់ច្បាស់អំពីបញ្ហាដែលបុគ្គលជាច្រើនជួបប្រទះក្នុងការកក់ជួបគ្រូពេទ្យ និងគ្រប់គ្រងកំណត់ត្រាសុខភាពរបស់ពួកគេ។</p>
          <p>RUPPCare ប្តេជ្ញាចិត្តក្នុងការអភិវឌ្ឍបច្ចេកវិទ្យាសុខភាព។ យើងខិតខំបន្តប្រឹងប្រែងដើម្បីពង្រឹងវេទិការបស់យើង ដោយបញ្ចូលបច្ចេកវិទ្យាបច្ចេកទេសថ្មីៗ ដើម្បីកែលម្អបទពិសោធន៍អ្នកប្រើ និងផ្តល់សេវាកម្មប្រសើរ។ មិនថាអ្នកកំពុងកក់ជួបលើកដំបូង ឬគ្រប់គ្រងការថែទាំអោយមានប្រសិទ្ធភាព ក្រុម RUPPCare តែងតែឈរជាប់គាំទ្រអ្នកគ្រប់ជំហាន។</p>
          <b className='text-gray-800'>ទស្សនៈរបស់យើង</b>
          <p>ទស្សនៈរបស់ RUPPCare គឺបង្កើតបទពិសោធន៍សុខភាពដ៏រលូនសម្រាប់អ្នកប្រើប្រាស់គ្រប់រូប។ យើងមានបំណងកាត់បន្ថយគម្លាតរវាងអ្នកជំងឺ និងអ្នកផ្តល់សេវាសុខភាព ដើម្បីធ្វើឲ្យការចូលប្រើសេវាសុខភាពកាន់តែមានភាពងាយស្រួល។</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>ហេតុអ្វី <span className='text-gray-700 font-semibold '>ជ្រើសយកពួកយើង?</span></p>
      </div>

      <div className='flex flex-col md:flex-row md-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>ប្រសិទ្ធភាព:</b>
          <p>ការកក់ពេលជួបឆាប់រហ័សដែលសមស្របនឹងជីវិតប្រចាំថ្ងៃរបស់អ្នក។</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>ភាពងាយស្រួល:</b>
          <p>ការចូលប្រើជាមួយបណ្ដាញអ្នកជំនាញសុខភាពដែលអ្នកអាចទុកចិត្តបាន។</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>ការផ្ដល់អនុសាសន៍ផ្ទាល់ខ្លួន:</b>
          <p>ការផ្ដល់អនុសាសន៍ និងការជូនដំណឹងដើម្បីជួយអ្នកក្នុងការគ្រប់គ្រងសុខភាពរបស់ខ្លួន។</p>
        </div>
      </div>
      
    </div>
  )
}

export default About
