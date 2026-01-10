/** @format */

"use client";
import BackButton from "@/components/SharedComponents/BackButton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetContractDetailsQuery } from "@/redux/freatures/contactListAPI";
import { getFullImageFullUrl } from "@/lib/utils";
import { jsPDF } from "jspdf";

const ContactListInfo = () => {
  const params = useParams();
  const contractId = Number(params.id);

  const { data, isLoading, error } = useGetContractDetailsQuery(contractId);

  const handleDownloadPDF = () => {
    if (!data?.engagements) return;

    const engagement = data.engagements;
    const jobDetails = engagement.job_details;
    const company = jobDetails.job_provider;
    const operative = engagement.application.candidate;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 10;
    let yPosition = 20;

    // Helper function to add rows
    const addRow = (label: string, value: string) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(label, margin, yPosition);
      doc.setFont("helvetica", "normal");
      const splitValue = doc.splitTextToSize(value, pageWidth - margin - 70);
      doc.text(splitValue, margin + 60, yPosition);
      yPosition += lineHeight * splitValue.length;
    };

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Employment / Engagement Contract", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 15;
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Disclaimer
    doc.setFont("helvetica", "bold");
    doc.text("Disclaimer", margin, yPosition);
    yPosition += 7;
    doc.setFont("helvetica", "normal");
    const disclaimerText = doc.splitTextToSize(
      "Securiverse is a technology platform. It is not the employer of or agent of or act on behalf of the employer or any other party; it does not direct work and is not a party to this contract. Securiverse does not advertise or provide security services and does not employ security officers, crowd controllers, investigators, consultants, installers or any other parties within this agreement.",
      pageWidth - 2 * margin
    );
    disclaimerText.forEach((line: string) => {
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Party A - Employer
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Party A — Employer", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);

    addRow("Legal Name:", company.company_name);
    addRow("ABN:", company.abn_number?.toString() || "N/A");
    addRow(
      "Company License No.:",
      company.company.licences[0]?.licence_no || "N/A"
    );
    addRow(
      "State License Held:",
      company.company.licences[0]?.state_or_territory || "N/A"
    );
    addRow("Contact Email:", company.company.email);
    yPosition += 5;

    // Party B - Worker
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Party B — Worker", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);

    addRow("Full Name:", operative.first_name);
    addRow("Security Licence No.:", operative.licences[0]?.licence_no || "N/A");
    addRow("Contact Phone:", operative.phone || "N/A");
    addRow("Contact Email:", operative.email);
    addRow("Bank Name:", operative.bank_name || "N/A");
    addRow("Account Name:", operative.account_holder_name || "N/A");
    addRow("Bank-State-Branch (BSB):", operative.bank_branch || "N/A");
    addRow("Account Number:", operative.account_no || "N/A");
    yPosition += 5;

    // Engagement Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Engagement Details", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);

    addRow("Engagement Type:", jobDetails.engagement_type);
    addRow("Role Type:", jobDetails.job_title);
    addRow("Site Name:", jobDetails.job_title);
    addRow("Location Address:", jobDetails.address);
    addRow("Client Name:", company.company_name);
    addRow(
      "Job Date:",
      new Date(jobDetails.job_date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
    addRow("Start Time:", jobDetails.start_time);
    addRow("End Time:", jobDetails.end_time);
    addRow("Duration (hours):", `${jobDetails.job_duration} hours`);
    yPosition += 5;

    // Remuneration
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Remuneration", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);

    addRow("Pay Type:", jobDetails.pay_type);
    addRow(
      "Pay Rate:",
      `$${jobDetails.pay_rate} ${engagement.application.currency.toUpperCase()}`
    );
    addRow(
      "Total Amount:",
      `$${
        engagement.total_amount
      } ${engagement.application.currency.toUpperCase()}`
    );
    yPosition += 5;

    // Compliance Confirmation
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Compliance Confirmation", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const complianceText = doc.splitTextToSize(
      "If disputes arise, they extend no further than the parties mentioned within this Agreement & should be addressed as such. Securiverse retains the right to support discussions with disputing parties and the right to disengage at any point. Parties may seek advice and engage, private, State and/or Federal bodies to support resolution.",
      pageWidth - 2 * margin
    );
    complianceText.forEach((line: string) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        margin,
        doc.internal.pageSize.getHeight() - 10
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - margin - 20,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    doc.save(
      `Contract_${contractId}_${new Date().toISOString().split("T")[0]}.pdf`
    );
  };

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
                    value={company.company.licences[0]?.licence_no || "N/A"}
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
                  <DetailRow label="Site Name :" value={jobDetails.job_title} />
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
                  <DetailRow label="Pay Type :" value={jobDetails.pay_type} />
                  <DetailRow
                    label="Pay Rate :"
                    value={`$${
                      jobDetails.pay_rate
                    } ${engagement.application.currency.toUpperCase()}`}
                  />
                  <DetailRow
                    label="Total Amount :"
                    value={`$${
                      engagement.total_amount
                    } ${engagement.application.currency.toUpperCase()}`}
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
                  <DetailRow label="Full Name :" value={company.company_name} />
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
                      <img
                        src={getFullImageFullUrl(engagement.signature_party_a)}
                        alt="Party A Signature"
                        className="w-full h-full object-contain p-2"
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
                  <DetailRow label="Full Name :" value={operative.first_name} />
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
                      <img
                        src={getFullImageFullUrl(engagement.signature_party_b)}
                        alt="Party B Signature"
                        className="w-full h-full object-contain p-2"
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
            <Button
              onClick={handleDownloadPDF}
              className="bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
            >
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
