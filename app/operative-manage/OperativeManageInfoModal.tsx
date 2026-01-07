import Image from 'next/image'
import logo from "../../public/logo.svg"

const OperativeManageInfoModal = () => {
    return (
        <dialog id="my_modal_4" className="modal w-full">
            <div className="modal-box bg-white p-10 rounded-xl">
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
                        <h3 className='font-normal text-lg text-heading'>Email :</h3>
                        <p className='text-paragraph text-lg font-normal'>@gmail.com</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Mobile Number :</h3>
                        <p className='text-paragraph text-lg font-normal'>237829372</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>License & Clearance Docs :</h3>
                        <p className='text-paragraph text-lg font-normal'>zipe file</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>License Expiry Date :</h3>
                        <p className='text-paragraph text-lg font-normal'>10-15-2025</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Subscription :</h3>
                        <p className='text-paragraph text-lg font-normal'>Basic</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Purchase Date :</h3>
                        <p className='text-paragraph text-lg font-normal'>10-15-2025</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                        <h3 className='font-normal text-lg text-heading'>Next billing date :</h3>
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

export default OperativeManageInfoModal
