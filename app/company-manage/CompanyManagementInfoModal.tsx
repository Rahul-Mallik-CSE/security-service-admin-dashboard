/** @format */

import Image from "next/image";
import logo from "../../public/logo.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ICompanyData } from "@/redux/freatures/companyManageAPI";
import { format } from "date-fns";
import { Download } from "lucide-react";

interface CompanyManagementInfoModalProps {
  company: ICompanyData | null;
  isOpen: boolean;
  onClose: () => void;
}

const getFullImageFullUrl = (url: string | null): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
};

const CompanyManagementInfoModal = ({
  company,
  isOpen,
  onClose,
}: CompanyManagementInfoModalProps) => {
  if (!company) return null;

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

  const hasImage = !!company.company.image;
  const imageSrc = hasImage ? getFullImageFullUrl(company.company.image) : logo;

  // Get latest invoice for subscription details
  const latestInvoice =
    company.invoices.length > 0 ? company.invoices[0] : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-medium text-center text-[30px]">
            Company Details
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center flex-col w-full gap-5 mb-5">
          <Image
            src={imageSrc}
            alt="company logo"
            width={80}
            height={80}
            className="rounded-full object-cover w-20 h-20"
            unoptimized={hasImage}
          />
        </div>
        <div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Company Name:</h3>
            <p className="text-paragraph text-lg font-normal">
              {company.company_name ||
                company.company.email.split("@")[0] ||
                "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">User Role:</h3>
            <p className="text-paragraph text-lg font-normal">
              {company.company.user_type}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Gender:</h3>
            <p className="text-paragraph text-lg font-normal">
              {company.company.gender || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Email:</h3>
            <p className="text-paragraph text-lg font-normal">
              {company.company.email}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">Mobile Number:</h3>
            <p className="text-paragraph text-lg font-normal">
              {company.company.phone || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <h3 className="font-normal text-lg text-heading">
              Average Rating:
            </h3>
            <p className="text-paragraph text-lg font-normal">
              {parseFloat(company.average_rating_main).toFixed(2)} / 5.00
            </p>
          </div>

          {latestInvoice && (
            <>
              <div className="flex justify-between items-center py-2">
                <h3 className="font-normal text-lg text-heading">
                  Subscription:
                </h3>
                <p className="text-paragraph text-lg font-normal">
                  Plan {latestInvoice.plan} - ${latestInvoice.price}
                </p>
              </div>
              <div className="flex justify-between items-center py-2">
                <h3 className="font-normal text-lg text-heading">
                  Purchase Date:
                </h3>
                <p className="text-paragraph text-lg font-normal">
                  {format(new Date(latestInvoice.invoice_date), "MM-dd-yyyy")}
                </p>
              </div>
              <div className="flex justify-between items-center py-2">
                <h3 className="font-normal text-lg text-heading">
                  Next Billing Date:
                </h3>
                <p className="text-paragraph text-lg font-normal">
                  {format(new Date(latestInvoice.end_date), "MM-dd-yyyy")}
                </p>
              </div>
            </>
          )}

          <h2 className="font-medium text-2xl text-heading mt-4">
            All Documents
          </h2>
          {company.company.licences.length > 0 && (
            <>
              <h3 className="font-medium text-lg text-heading mt-3 mb-2">
                Licenses ({company.company.licences.length})
              </h3>
              {company.company.licences.map((licence, index) => (
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
                      {format(new Date(licence.expire_date), "MM-dd-yyyy")}
                    </p>
                  )}
                  {licence.licence_images &&
                    licence.licence_images.length > 0 && (
                      <div className="flex flex-col gap-1 mt-2">
                        {licence.licence_images.map((image, imgIndex) => {
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
                              <Download size={14} />
                              {fileName}
                            </button>
                          );
                        })}
                      </div>
                    )}
                </div>
              ))}
            </>
          )}
          {company.company.accreditations.length > 0 && (
            <>
              <h3 className="font-medium text-lg text-heading mt-3 mb-2">
                Accreditations ({company.company.accreditations.length})
              </h3>
              {company.company.accreditations.map((accreditation, index) => {
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
                      <Download size={14} />
                      {fileName}
                    </button>
                    {accreditation.expire_date && (
                      <p className="text-xs text-gray-600 ml-6">
                        Expires:{" "}
                        {format(
                          new Date(accreditation.expire_date),
                          "MM-dd-yyyy"
                        )}
                      </p>
                    )}
                  </div>
                );
              })}
            </>
          )}
          {company.company.licences.length === 0 &&
            company.company.accreditations.length === 0 && (
              <p className="text-gray-500 text-sm py-2">
                No documents uploaded
              </p>
            )}
        </div>
        <div className="flex justify-center items-center w-full pt-4">
          <Button
            onClick={onClose}
            className="w-full bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3"
          >
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyManagementInfoModal;
