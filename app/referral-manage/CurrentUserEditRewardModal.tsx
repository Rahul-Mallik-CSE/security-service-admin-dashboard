"use client";
import { useForm } from "react-hook-form";

type TEditRewardData = {
    userRole: "operative" | "user";
    targetReferrals: string;
    rewardType: "discount" | "free" | "cash";
    rewardDuration: "10" | "20" | "30" | "40";
}


const CurrentUserEditRewardModal = () => {
    const {
        register,
        watch,
    } = useForm<TEditRewardData>();

    const targetReferrals = watch("targetReferrals");
    const userRole = watch("userRole");
    const rewardType = watch("rewardType");
    const rewardDuration = watch("rewardDuration");

    const handleEditReward = () => {
        const data: TEditRewardData = {
            userRole,
            targetReferrals,
            rewardType,
            rewardDuration  
        }
        console.log(data);
    }
    return (
        <dialog id="my_modal_7" className="modal w-full">
            <div className="modal-box bg-white p-10 rounded-xl">
                <h3 className="font-medium text-[30px] text-center">Edit Reward</h3>
                <form className="space-y-3">
                    <div className="">
                        <label className="font-medium text-[16px] text-heading block mb-2">User Role</label>
                        <select className="select h-[52px] text-heading appearance-none bg-white outline-none border border-gray-400 rounded-lg w-full" {...register("userRole")}>
                            <option value="operative">Operative</option> 
                            <option value="company">Company</option> 
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-[16px] text-heading block mb-2">Target Referrals</label>
                        <input className="appearance-none py-3 px-4 outline-none border border-gray-400 rounded-lg w-full" {...register("targetReferrals")} />
                    </div>
                    <div className="">
                        <label className="font-medium text-[16px] text-heading block mb-2">Reward Type</label>
                        <select className="select h-[52px] text-heading appearance-none bg-white outline-none border border-gray-400 rounded-lg w-full" {...register("rewardType")}>
                            <option value="discount">Discount</option> 
                            <option value="free">Free</option> 
                            <option value="cash">Cash</option> 
                        </select>
                    </div>
                    <div className="relative">
                        <label className="font-medium text-[16px] text-heading block mb-2">Reward Duration</label>
                        <select className="select h-[53px] text-heading appearance-none bg-white outline-none border border-gray-400 rounded-lg w-full" {...register("rewardDuration")}>
                            <option value="10">10%</option>
                            <option value="20">20%</option>
                            <option value="30">30%</option>
                            <option value="40">40%</option>
                        </select>
                        <p className="font-normal text-[16px] bg-orange-200 absolute px-7 py-3.5 rounded-lg right-px text-gray-600 top-[31px]">%</p>
                    </div>
                </form>
                <div className="modal-action">
                    <form method="dialog" className='flex justify-center items-center w-full'>
                        <button className="w-full text-bg-primary border border-bg-primary font-medium text-[15px] rounded-xl py-3 cursor-pointer">Cancel</button>
                    </form>
                    <button onClick={handleEditReward} className="w-full bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3 cursor-pointer">Submit</button>
                </div>
            </div>
        </dialog>
    )
}

export default CurrentUserEditRewardModal
