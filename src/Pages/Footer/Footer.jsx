import React from 'react'
import fb from '../../assets/fb.svg'
import twitter from '../../assets/twitter.svg'
import gmail from '../../assets/gmail.svg'
import linkedIn from '../../assets/linkedIn.svg'
import whats from '../../assets/whats.svg'

const Footer = () => {
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-[40vh] content-start items-start gap-10 p-5 bg-teal-800 text-white'>



            <div className='hidden md:block'>
                <h2 className='text-2xl text-black font-semibold hover:text-teal-500 cursor-pointer'>Hirehub</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fugit modi pariatur nobis quidem veritatis est ab itaque labore voluptatibus?</p>
                <p>@2024</p>
            </div>

            <div className='hidden md:block'>
                <h2 className='text-2xl text-black font-semibold hover:text-teal-500 cursor-pointer'>Customers</h2>
                <p>Buyer</p>
                <p>Supplier</p>
                <p>Features</p>
                <p>Website Editors</p>
                <p>Online</p>
            </div>

            <div>
                <h2 className='text-2xl text-black font-semibold hover:text-teal-500 cursor-pointer'>Company</h2>
                <p>About Us</p>
                <p>Carrers</p>
                <p>Contact Us</p>
                <p>News</p>
                <p>Testimonials</p>
            </div>

            <div className='flex flex-col justify-center items-start gap-2'>
                <h2 className='text-2xl text-black font-semibold hover:text-teal-500 cursor-pointer'>Follow Us</h2>

                <div className='flex items-center justify-evenly gap-1'>
                    <img loading='lazy' className='w-[30px] bg-black p-1 rounded-lg' src={fb} alt="" />
                    <img loading='lazy' className='w-[30px] bg-black p-1 rounded-lg' src={gmail} alt="" />
                    <img loading='lazy' className='w-[30px] bg-black p-1 rounded-lg' src={linkedIn} alt="" />
                    <img loading='lazy' className='w-[30px] bg-black p-1 rounded-lg' src={whats} alt="" />
                    <img loading='lazy' className='w-[30px] bg-black p-1 rounded-lg' src={twitter} alt="" />
                </div>

            </div>



        </div>
    )
}

export default Footer
