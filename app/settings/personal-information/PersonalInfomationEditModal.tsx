"use clientz"
import Image from 'next/image'
import logo from "../../../public/logo.svg"
import { CiEdit } from "react-icons/ci";

const PersonalInfomationEditModal = () => {
    const handlePersonalInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const fullName = form.get('fullName') as string;
        const image = form.get('image') as File;
        const updatedInfo = {
            fullName,
            image
        }
        console.log(updatedInfo);
    }
    return (
        <dialog id="my_modal_8" className="modal w-full">
            <div className="modal-box bg-white p-10 rounded-xl">
                <div className='flex flex-col items-center gap-5'>
                    <h3 className="font-medium text-[30px]">Update Profile</h3>
                    <p className='text-sm text-paragraph font-normal text-center'>Make changes to your profile here. Click save <br /> when you're done.</p>

                </div>
                <form onSubmit={handlePersonalInfo} className='flex justify-center flex-col w-full items-center mt-5'>
                    <div className='relative'>
                        <Image src={logo} alt='admin image' width={140} height={140} className='rounded-full opacity-90'></Image>
                        <label htmlFor="image" className='text-[28px] cursor-pointer text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            <CiEdit ></CiEdit>
                        </label>
                        <input type="file" name='image' id='image' className='hidden'/>
                    </div>
                    <div className='my-5 w-full'>
                        <label className='text-[18px] font-medium block text-heading mb-2'>Full Name</label>
                        <input name='fullName' className='appearance-none w-full outline-none border border-gray-300 p-4 rounded-xl' type="text" defaultValue={"Md Murad"} />
                    </div>
                    <button type='submit' className="w-full bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3 cursor-pointer">Submit</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default PersonalInfomationEditModal
