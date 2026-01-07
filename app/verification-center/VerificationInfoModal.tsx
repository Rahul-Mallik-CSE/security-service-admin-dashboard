import Image from 'next/image'
import logo from "../../public/logo.svg"

const VerificationInfoModal = () => {
    return (
        <dialog id="my_modal_3" className="modal w-full">
            <div className="modal-box bg-white p-10 rounded-xl">
                <form method="dialog">
                    <button className="bg-red-500 absolute top-0 right-0 py-2 px-3 rounded-bl-xl text-white cursor-pointer">✕</button>
                </form>
                <div className='flex justify-center items-center flex-col w-full gap-5 mb-5'>
                    <h3 className="font-medium text-[30px]">Details</h3>
                    <Image src={logo} alt='user logo' width={80} height={80} className='rounded-full'></Image>
                </div>
                <div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>User Name :</h3>
                        <p className='text-paragraph text-lg font-normal'>Murad</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>User Role :</h3>
                        <p className='text-paragraph text-lg font-normal'>company</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>State :</h3>
                        <p className='text-paragraph text-lg font-normal'>sandey</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Email :</h3>
                        <p className='text-paragraph text-lg font-normal'>@gmail.com</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Mobile Number :</h3>
                        <p className='text-paragraph text-lg font-normal'>237829372</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Address :</h3>
                        <p className='text-paragraph text-lg font-normal'>Dhaka</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Account Holder Name :</h3>
                        <p className='text-paragraph text-lg font-normal'>murad</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Bank Name :</h3>
                        <p className='text-paragraph text-lg font-normal'>City Bank</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>BSB/Account No :</h3>
                        <p className='text-paragraph text-lg font-normal'>343433</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Account No :</h3>
                        <p className='text-paragraph text-lg font-normal'>3434343</p>
                    </div>
                    <h2 className='font-medium text-2xl text-heading'>All Documents</h2>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>ASIC Clearance</h3>
                        <p className='text-paragraph text-lg font-normal'>zipe file</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Security License (NSW)</h3>
                        <p className='text-paragraph text-lg font-normal'>zip file</p>
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog" className='flex justify-center items-center w-full'>
                        <button className="w-full bg-red-500 text-white font-medium text-[15px] rounded-xl py-3 cursor-pointer">Reject</button>
                    </form>
                    <button className="w-full bg-green-500 text-white font-medium text-[15px] rounded-xl py-3 cursor-pointer">Approved</button>
                </div>
            </div>
        </dialog>
    )
}

export default VerificationInfoModal
