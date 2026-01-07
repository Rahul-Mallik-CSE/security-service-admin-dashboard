/** @format */

import Image from "next/image";
import logo from "../../public/logo.svg";
import { getFullImageFullUrl } from "@/lib/utils";

interface OperativeManageInfoModalProps {
  user: any;
}

const OperativeManageInfoModal = ({ user }: OperativeManageInfoModalProps) => {
  if (!user) return null;

  const candidate = user.candidate;
  const hasImage = !!candidate.image;
  const imageSrc = hasImage ? getFullImageFullUrl(candidate.image) : logo;

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

  // Find latest subscription info if available
  const subscriptionStatus = candidate.is_subscribe ? "Active" : "Inactive";

  return (
    <dialog id="my_modal_4" className="modal w-full">
      <div className="modal-box bg-white p-10 rounded-xl max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={() =>
            (
              document.getElementById("my_modal_4") as HTMLDialogElement
            )?.close()
          }
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
              {candidate.email.split("@")[0]}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">User Role:</h3>
            <p className="text-paragraph text-lg font-normal">
              {candidate.user_type}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Gender:</h3>
            <p className="text-paragraph text-lg font-normal">
              {candidate.gender || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Email:</h3>
            <p className="text-paragraph text-lg font-normal">
              {candidate.email}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Mobile Number:</h3>
            <p className="text-paragraph text-lg font-normal">
              {candidate.phone || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">
              Experience (Years):
            </h3>
            <p className="text-paragraph text-lg font-normal">
              {candidate.exprience_in_years}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Rating:</h3>
            <p className="text-paragraph text-lg font-normal">
              {parseFloat(user.avg_rating_main).toFixed(2)} / 5.00
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">
              Account Holder Name:
            </h3>
            <p className="text-paragraph text-lg font-normal">
              {candidate.account_holder_name || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Bank Name:</h3>
            <p className="text-paragraph text-lg font-normal">
              {candidate.bank_name || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Bank Branch:</h3>
            <p className="text-paragraph text-lg font-normal">
              {candidate.bank_branch || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Account No:</h3>
            <p className="text-paragraph text-lg font-normal">
              {candidate.account_no || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Subscription:</h3>
            <p className="text-paragraph text-lg font-normal">
              {subscriptionStatus}
            </p>
          </div>

          <h2 className="font-medium text-2xl text-heading mt-4">
            All Documents
          </h2>

          {candidate.licences.length > 0 && (
            <>
              <h3 className="font-medium text-lg text-heading mt-3 mb-2">
                Licences ({candidate.licences.length})
              </h3>
              {candidate.licences.map((licence: any, index: number) => (
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

          {candidate.accreditations.length > 0 && (
            <>
              <h3 className="font-medium text-lg text-heading mt-3 mb-2">
                Accreditations ({candidate.accreditations.length})
              </h3>
              {candidate.accreditations.map(
                (accreditation: any, index: number) => {
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
                }
              )}
            </>
          )}

          {candidate.licences.length === 0 &&
            candidate.accreditations.length === 0 && (
              <p className="text-gray-500 text-sm py-2">
                No documents uploaded
              </p>
            )}
        </div>
        <div className="modal-action">
          <form
            method="dialog"
            className="flex justify-center items-center w-full"
          >
            <button className="w-full bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3">
              Okay
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default OperativeManageInfoModal;
