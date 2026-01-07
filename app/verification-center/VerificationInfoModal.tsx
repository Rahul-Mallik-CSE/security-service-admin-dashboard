/** @format */

import Image from "next/image";
import logo from "../../public/logo.svg";
import { IVerificationCenter } from "@/types/AllTypes";
import {
  useApproveUserMutation,
  useRejectUserMutation,
} from "@/redux/freatures/verificationCenterAPI";
import { toast } from "react-toastify";
import { getFullImageFullUrl } from "@/lib/utils";

interface VerificationInfoModalProps {
  user: IVerificationCenter | null;
  isOpen: boolean;
  onClose: () => void;
}

const VerificationInfoModal = ({
  user,
  isOpen,
  onClose,
}: VerificationInfoModalProps) => {
  const [approveUser, { isLoading: isApproving }] = useApproveUserMutation();
  const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation();

  if (!user) return null;

  const isButtonsDisabled = user.is_admin_aproved || user.is_admin_rejected;

  const handleDownload = (url: string, fileName: string) => {
    const fullUrl = getFullImageFullUrl(url);
    const link = document.createElement("a");
    link.href = fullUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApprove = async () => {
    try {
      await approveUser(user.id).unwrap();
      toast.success("User approved successfully!");
      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to approve user. Please try again."
      );
    }
  };

  const handleReject = async () => {
    try {
      await rejectUser(user.id).unwrap();
      toast.success("User rejected successfully!");
      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to reject user. Please try again."
      );
    }
  };

  const hasImage = !!user.image;
  const imageSrc = hasImage ? getFullImageFullUrl(user.image) : logo;
  return (
    <dialog
      id="my_modal_3"
      className="modal w-full"
      open={isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box bg-white p-10 rounded-xl">
        <button
          onClick={onClose}
          className="bg-red-500 absolute top-0 right-0 py-2 px-3 rounded-bl-xl text-white cursor-pointer"
        >
          ✕
        </button>
        <div className="flex justify-center items-center flex-col w-full gap-5 mb-5">
          <h3 className="font-medium text-[30px]">Details</h3>
          <Image
            src={imageSrc}
            alt="user logo"
            width={80}
            height={80}
            className="rounded-full object-cover w-20 h-20"
            unoptimized={hasImage}
          />
        </div>
        <div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">User Name:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.email.split("@")[0]}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">User Role:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.user_type}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Gender:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.gender || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Email:</h3>
            <p className="text-paragraph text-lg font-normal">{user.email}</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Mobile Number:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.phone || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">
              Experience (Years):
            </h3>
            <p className="text-paragraph text-lg font-normal">
              {user.exprience_in_years}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">
              Account Holder Name:
            </h3>
            <p className="text-paragraph text-lg font-normal">
              {user.account_holder_name || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Bank Name:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.bank_name || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Bank Branch:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.bank_branch || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Account No:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.account_no || "N/A"}
            </p>
          </div>
          <h2 className="font-medium text-2xl text-heading mt-4">
            All Documents
          </h2>
          {user.licences.length > 0 && (
            <>
              <h3 className="font-medium text-lg text-heading mt-3 mb-2">
                Licences ({user.licences.length})
              </h3>
              {user.licences.map((licence: any, index: number) => (
                <div key={index} className="mb-3 border-b pb-2">
                  <p className="font-medium text-sm text-heading mb-1">
                    {licence.licence_type?.title || `Licence ${index + 1}`}
                  </p>
                  {licence.licence_no && (
                    <p className="text-xs text-gray-600 ml-4">
                      Licence No: {licence.licence_no}
                    </p>
                  )}
                  {licence.state_or_territory && (
                    <p className="text-xs text-gray-600 ml-4">
                      State: {licence.state_or_territory}
                    </p>
                  )}
                  {licence.expire_date && (
                    <p className="text-xs text-gray-600 ml-4">
                      Expires:{" "}
                      {new Date(licence.expire_date).toLocaleDateString()}
                    </p>
                  )}
                  {licence.licence_images &&
                    licence.licence_images.length > 0 && (
                      <div className="flex flex-col gap-1 mt-2">
                        {licence.licence_images.map(
                          (image: any, imgIndex: number) => {
                            const fileName =
                              image.file?.split("/").pop() ||
                              `licence_${licence.licence_no || index + 1}_${
                                imgIndex + 1
                              }`;
                            return (
                              <button
                                key={imgIndex}
                                onClick={() =>
                                  handleDownload(image.file, fileName)
                                }
                                className="text-blue-500 hover:underline text-left text-sm flex items-center gap-2 ml-4"
                              >
                                <span>📄</span>
                                {fileName}
                              </button>
                            );
                          }
                        )}
                      </div>
                    )}
                </div>
              ))}
            </>
          )}
          {user.accreditations.length > 0 && (
            <>
              <h3 className="font-medium text-lg text-heading mt-3 mb-2">
                Accreditations ({user.accreditations.length})
              </h3>
              {user.accreditations.map((accreditation: any, index: number) => {
                const fileName =
                  accreditation.accreditation?.split("/").pop() ||
                  `accreditation_${index + 1}`;
                const fileExtension = fileName.split(".").pop() || "file";
                return (
                  <div key={index} className="mb-2">
                    <button
                      onClick={() =>
                        handleDownload(accreditation.accreditation, fileName)
                      }
                      className="text-blue-500 hover:underline text-left text-sm flex items-center gap-2"
                    >
                      <span>{fileExtension === "pdf" ? "📕" : "📄"}</span>
                      {fileName}
                    </button>
                    {accreditation.expire_date && (
                      <p className="text-xs text-gray-600 ml-6">
                        Expires:{" "}
                        {new Date(
                          accreditation.expire_date
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </>
          )}
          {user.licences.length === 0 && user.accreditations.length === 0 && (
            <p className="text-gray-500 text-sm py-2">No documents uploaded</p>
          )}
        </div>
        <div className="modal-action">
          <button
            onClick={handleReject}
            disabled={isButtonsDisabled || isRejecting}
            className="w-full bg-red-500 text-white font-medium text-[15px] rounded-xl py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </button>
          <button
            onClick={handleApprove}
            disabled={isButtonsDisabled || isApproving}
            className="w-full bg-green-500 text-white font-medium text-[15px] rounded-xl py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApproving ? "Approving..." : "Approved"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default VerificationInfoModal;
