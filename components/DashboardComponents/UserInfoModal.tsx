import React from 'react'

const InfoModal = () => {
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-white p-10">
                <h3 className="font-medium text-center text-[30px]">User Details</h3>
                <div>
                    <div className='flex justify-between items-center py-3 border-b border-gray-300'>
                        <h3 className='font-normal text-lg text-heading'>User Name:</h3>
                        <p className='text-paragraph text-lg font-normal'>Murad</p>
                    </div>
                    <div className='flex justify-between items-center py-3 border-b border-gray-300'>
                        <h3 className='font-normal text-lg text-heading'>User Role:</h3>
                        <p className='text-paragraph text-lg font-normal'>admin</p>
                    </div>
                    <div className='flex justify-between items-center py-3 border-b border-gray-300'>
                        <h3 className='font-normal text-lg text-heading'>Email:</h3>
                        <p className='text-paragraph text-lg font-normal'>info@gmail.com</p>
                    </div>
                    <div className='flex justify-between items-center py-3 border-b border-gray-300'>
                        <h3 className='font-normal text-lg text-heading'>Address:</h3>
                        <p className='text-paragraph text-lg font-normal'>UK</p>
                    </div>
                    <div className='flex justify-between items-center py-3'>
                        <h3 className='font-normal text-lg text-heading'>Date:</h3>
                        <p className='text-paragraph text-lg font-normal'>10-15-2025</p>
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog" className='flex justify-center items-center w-full'>
                        <button className="w-full bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3">Okay</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default InfoModal
