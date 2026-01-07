"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const BackButton = () => {
    const router = useRouter()
  return (
    <button className="text-heading cursor-pointer hover:bg-gray-200 rounded-full p-2" onClick={() => router.back()}>
      <FaArrowLeftLong size={25} />
    </button>
  )
}

export default BackButton
