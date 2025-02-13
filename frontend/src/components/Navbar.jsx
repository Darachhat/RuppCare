import { useContext, useState } from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const naviagte = useNavigate();

  const { token, setToken, userData } = useContext(AppContext)

  const [ showMenu, setShowMenu ] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img 
      onClick={()=>naviagte('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>ទំព័រដើម</li>
          <hr className='border-none outline-non h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>វេជ្ជបណ្ឌិត</li>
          <hr className='border-none outline-non h-0.5 bg-primary w-3/5 m-auto hidden ' />
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>អំពីពួកយើង</li>
          <hr className='border-none outline-non h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>ទំនាក់ទំនង</li>
          <hr className='border-none outline-non h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token && userData
          ? <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt="" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
            <div className=' absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block '>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={()=>naviagte('my-profile')} className='hover:text-black cursor-pointer' >ប្រវត្តិរូបរបស់អ្នក</p>
                <p onClick={()=>naviagte('my-appointments')} className='hover:text-black cursor-pointer'>ការណាត់របស់អ្នក</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>ចាកចេញ</p>

              </div>
            </div>

          </div>
          :<button onClick={()=>naviagte('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>បង្កើតគណនី</button>
        }
        <img 
        onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* ----- Mobile View ----- */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img 
            className='w-7 hover:scale-110' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium font-family'>
            <NavLink onClick={()=>setShowMenu(false)} to='/'><p className='hover:text-primary'>ទំព័រដើម</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p className='hover:text-primary'>វេជ្ជបណ្ឌិត</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='hover:text-primary'>អំពីពួកយើង</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='hover:text-primary'>ទំនាក់ទំនង</p></NavLink>
          </ul>
        </div>
        
      </div>
    </div>

  )
}

export default Navbar
