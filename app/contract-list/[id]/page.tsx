/** @format */

"use client";
import BackButton from "@/components/SharedComponents/BackButton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetContractDetailsQuery } from "@/redux/freatures/contactListAPI";
import Image from "next/image";

const ContactListInfo = () => {
  const params = useParams();
  const contractId = Number(params.id);

  const { data, isLoading, error } = useGetContractDetailsQuery(contractId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading contract details...</div>
      </div>
    );
  }

  if (error || !data?.engagements) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-red-500">
          Error loading contract details. Please try again.
        </div>
      </div>
    );
  }

  const engagement = data.engagements;
  const jobDetails = engagement.job_details;
  const company = jobDetails.job_provider;
  const operative = engagement.application.candidate;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex gap-3">
        <BackButton />
        <h3 className="text-2xl font-medium text-heading">Contract Details</h3>
      </div>
      <main className="min-h-screen bg-background p-2.5">
        <div className="w-full rounded-xl border border-border bg-card p-4 space-y-3">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-medium text-heading">
              Employment / Engagement Contract
            </h1>
            <p className="mt-2 text-[16px] text-paragraph">
              Auto-generated via the Securiverse Platform
            </p>
          </div>

          {/* Disclaimer Section */}
          <section className="p-3 border border-gray-200 rounded-xl">
            <h2 className="mb-1 text-xl font-bold text-gray-700">Disclaimer</h2>
            <p className="text-base leading-relaxed text-paragraph">
              Securiverse is a technology platform. It is not the employer of or
              agent of or act on behalf of the employer or any other party; it
              does not direct work and is not a party to this contract.
              Securiverse does not advertise or provide security services and
              does not employ security officers, crowd controllers,
              investigators, consultants, installers or any other parties within
              this agreement.
            </p>
          </section>

          {/* Parties and Engagement Details Section */}
          <div className="mb-5 grid gap-8 md:grid-cols-2">
            {/* Parties */}
            <section>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Parties
              </h2>

              {/* Party A - Employer */}
              <div className="mb-5">
                <h3 className="mb-2 text-lg font-semibold text-bg-primary">
                  Party A — Employer
                </h3>
                <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <DetailRow
                    label="Legal Name :"
                    value={company.company_name}
                  />
                  <DetailRow
                    label="ABN :"
                    value={company.abn_number?.toString() || "N/A"}
                  />
                  <DetailRow
                    label="Company License No. :"
                    value={
                      company.company.licences[0]?.licence_no || "N/A"
                    }
                  />
                  <DetailRow
                    label="State License Held :"
                    value={
                      company.company.licences[0]?.state_or_territory || "N/A"
                    }
                  />
                  <DetailRow
                    label="Contact Email :"
                    value={company.company.email}
                  />
                </div>
              </div>

              {/* Party B - Worker */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-bg-primary">
                  Party B — Worker
                </h3>
                <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <DetailRow label="Full Name :" value={operative.first_name} />
                  <DetailRow
                    label="Security Licence No. :"
                    value={operative.licences[0]?.licence_no || "N/A"}
                  />
                  <DetailRow
                    label="Contact Phone :"
                    value={operative.phone || "N/A"}
                  />
                  <DetailRow label="Contact Email :" value={operative.email} />
                  <DetailRow
                    label="Bank Name :"
                    value={operative.bank_name || "N/A"}
                  />
                  <DetailRow
                    label="Account Name :"
                    value={operative.account_holder_name || "N/A"}
                  />
                  <DetailRow
                    label="Bank-State-Branch (BSB) :"
                    value={operative.bank_branch || "N/A"}
                  />
                  <DetailRow
                    label="Account Number :"
                    value={operative.account_no || "N/A"}
                  />
                </div>
              </div>
            </section>

            {/* Engagement Details */}
            <section>
              <div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  Engagement Details
                </h2>
                <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <DetailRow
                    label="Engagement Type :"
                    value={jobDetails.engagement_type}
                  />
                  <DetailRow label="Role Type :" value={jobDetails.job_title} />
                  <DetailRow
                    label="Site Name :"
                    value={jobDetails.job_title}
                  />
                  <DetailRow
                    label="Location Address :"
                    value={jobDetails.address}
                  />
                  <DetailRow
                    label="Client Name :"
                    value={company.company_name}
                  />
                  <DetailRow
                    label="Job Date :"
                    value={formatDate(jobDetails.job_date)}
                  />
                  <DetailRow
                    label="Start Time :"
                    value={jobDetails.start_time}
                  />
                  <DetailRow label="End Time :" value={jobDetails.end_time} />
                  <DetailRow
                    label="Duration (hours) :"
                    value={`${jobDetails.job_duration} hours`}
                  />
                </div>
              </div>
              
              {/* Remuneration */}
              <div className="mb-12 pb-8 mt-5 w-full">
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  Remuneration
                </h2>
                <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <DetailRow
                    label="Pay Type :"
                    value={jobDetails.pay_type}
                  />
                  <DetailRow
                    label="Pay Rate :"
                    value={`$${jobDetails.pay_rate} ${engagement.application.currency.toUpperCase()}`}
                  />
                  <DetailRow
                    label="Total Amount :"
                    value={`$${engagement.total_amount} ${engagement.application.currency.toUpperCase()}`}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Compliance Confirmation Section */}
          <section className="mb-5">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Compliance Confirmation
            </h2>
            <p className="text-base leading-relaxed text-foreground">
              If disputes arise, they extend no further than the parties
              mentioned within this Agreement & should be addressed as such.
              Securiverse retains the right to support discussions with
              disputing parties and the right to disengage at any point. Parties
              may seek advice and engage, private, State and/or Federal bodies
              to support resolution.
            </p>
          </section>

          {/* Privacy & Data Section */}
          <section className="mb-5">
            <h2 className="mb-3 text-2xl font-bold text-bg-primary">
              Privacy & Data
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Consents
                </h3>
                <p className="text-base leading-relaxed text-foreground">
                  Each party consents to the information contained within this
                  Agreement being shared with the other party and stored by
                  Securiverse.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-bg-primary">
                  Data Use
                </h3>
                <p className="text-base leading-relaxed text-foreground">
                  Data collected includes party details, timestamps, and
                  metadata such as location data stored by Securiverse.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptance & Signatures Section */}
          <section className="mb-5">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground">
              Acceptance & Signatures
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Party A */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Party A — Employer
                </h3>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <DetailRow
                    label="Full Name :"
                    value={company.company_name}
                  />
                  <DetailRow
                    label="Signature Timestamp :"
                    value={
                      engagement.signature_party_a
                        ? formatDateTime(engagement.created_at)
                        : "Not signed"
                    }
                  />
                </div>
                <div className="flex justify-center">
                  {engagement.signature_party_a ? (
                    <div className="relative w-48 h-24 border border-gray-300 rounded">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${engagement.signature_party_a}`}
                        alt="Party A Signature"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-24 border border-gray-300 rounded flex items-center justify-center text-gray-400">
                      No Signature
                    </div>
                  )}
                </div>
              </div>

              {/* Party B */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Party B — Worker
                </h3>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <DetailRow
                    label="Full Name :"
                    value={operative.first_name}
                  />
                  <DetailRow
                    label="Signature Timestamp :"
                    value={
                      engagement.signature_party_b
                        ? formatDateTime(engagement.created_at)
                        : "Not signed"
                    }
                  />
                </div>
                <div className="flex justify-center">
                  {engagement.signature_party_b ? (
                    <div className="relative w-48 h-24 border border-gray-300 rounded">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${engagement.signature_party_b}`}
                        alt="Party B Signature"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-24 border border-gray-300 rounded flex items-center justify-center text-gray-400">
                      No Signature
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Download Button */}
          <div className="flex justify-center">
            <Button className="bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90">
              <Download className="mr-2 h-5 w-5" />
              Download
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactListInfo;

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-sm text-muted-foreground">{value}</span>
    </div>
  );
}
