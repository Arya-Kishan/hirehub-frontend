import React from 'react'

const PaymentSuccess = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const reference = urlParams.get('reference');

    return (
        <div className='w-full h-dvh flex justify-center items-center gap-5'>

            {reference ? <div className='w-[200px] md:w-[50%] flex flex-col justify-center items-center gap-10 p-5 bg-teal-500'>
                <h1 className='text-xl md:text-4xl text-green-600 font-bold'>PAYMENT SUCCESS</h1>
                <p>Reference Number : {reference}</p>
            </div> : <div className='w-[200px] md:w-[50%] flex flex-col justify-center items-center gap-10 p-5 bg-teal-500'>
                <h1 className='text-xl md:text-4xl text-green-600 font-bold'>PAYMENT FAILED</h1>
            </div>}

        </div>
    )
}

export default PaymentSuccess
