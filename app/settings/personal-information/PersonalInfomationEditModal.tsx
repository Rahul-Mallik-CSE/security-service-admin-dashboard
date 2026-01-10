/** @format */

"use client";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useUpdateUserProfileMutation } from "@/redux/freatures/settingAPI";
import { getFullImageFullUrl } from "@/lib/utils";
import { IUserProfile } from "@/types/AllTypes";
import { toast } from "react-toastify";

interface PersonalInfomationEditModalProps {
  userProfile?: IUserProfile;
}

const PersonalInfomationEditModal = ({
  userProfile,
}: PersonalInfomationEditModalProps) => {
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (userProfile?.image) {
      setImagePreview(getFullImageFullUrl(userProfile.image));
    }
  }, [userProfile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePersonalInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fullName = form.get("fullName") as string;

    const formData = new FormData();
    formData.append("first_name", fullName);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await updateProfile(formData).unwrap();
      if (response.success) {
        toast.success(response.message || "Profile updated successfully!");
        // Close modal
        (document.getElementById("my_modal_8") as HTMLDialogElement)?.close();
      }
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(
        error?.data?.message || "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <dialog id="my_modal_8" className="modal w-full">
      <div className="modal-box bg-white p-10 rounded-xl">
        <div className="flex flex-col items-center gap-5">
          <h3 className="font-medium text-[30px]">Update Profile</h3>
          <p className="text-sm text-paragraph font-normal text-center">
            Make changes to your profile here. Click save <br /> when you're
            done.
          </p>
        </div>
        <form
          onSubmit={handlePersonalInfo}
          className="flex justify-center flex-col w-full items-center mt-5"
        >
          <div className="relative">
            <Image
              src={imagePreview || "/assets/user.png"}
              alt="admin image"
              width={140}
              height={140}
              className="rounded-full opacity-90 object-cover bg-gray-200"
              unoptimized
            />
            <label
              htmlFor="image"
              className="text-[28px] cursor-pointer text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <CiEdit />
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="my-5 w-full">
            <label className="text-[18px] font-medium block text-heading mb-2">
              Full Name
            </label>
            <input
              name="fullName"
              className="appearance-none w-full outline-none border border-gray-300 p-4 rounded-xl"
              type="text"
              defaultValue={userProfile?.first_name || ""}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Submit"}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default PersonalInfomationEditModal;
