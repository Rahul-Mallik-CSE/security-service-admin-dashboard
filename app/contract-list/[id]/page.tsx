/** @format */

import BackButton from "@/components/SharedComponents/BackButton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ContactListInfo = () => {
  return (
    <div>
      <div className="flex gap-3">
        <BackButton></BackButton>
        <h3 className="text-2xl font-medium text-heading">
          Company Management
        </h3>
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

              <div className="mb-5">
                <h3 className="mb-2 text-lg font-semibold text-bg-primary">
                  Party A — Employer
                </h3>
                <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <DetailRow
                    label="Legal Name :"
                    value="Apex Security Solutions Pty Ltd"
                  />
                  <DetailRow label="ABN :" value="12 345 678 910" />
                  <DetailRow label="Company License No. :" value="SA-482937" />
                  <DetailRow
                    label="State License Held :"
                    value="New South Wales"
                  />
                  <DetailRow label="Contact Email :" value="name@gmail.com" />
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-bg-primary">
                  Party A — Employer
                </h3>
                <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <DetailRow label="Full Name :" value="Michael Ross" />
                  <DetailRow
                    label="Security Licence No. :"
                    value="QLD-SEC-239817"
                  />
                  <DetailRow label="Contact Phone :" value="+61 400 123 456" />
                  <DetailRow label="Contact Email :" value="23 Sep, 2025" />
                  <DetailRow label="Bank Name :" value="Trust Bank" />
                  <DetailRow label="Account Name :" value="232651264" />
                  <DetailRow
                    label="Bank-State-Branch (BSB) :"
                    value="062-987"
                  />
                  <DetailRow label="Account Number :" value="98765432" />
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
                  <DetailRow label="Engagement Type :" value="Casual" />
                  <DetailRow label="Role Type :" value="Crowd Controlle" />
                  <DetailRow
                    label="Site Name :"
                    value="Event Centre Downtown"
                  />
                  <DetailRow
                    label="Location Address :"
                    value="35 Park Ave, Sydney NSW 2000"
                  />
                  <DetailRow
                    label="Client Name :"
                    value="EventCo Group Pty Ltd"
                  />
                  <DetailRow label="Start Time :" value="18:00" />
                  <DetailRow label="End Time :" value="23:00" />
                  <DetailRow label="Duration (hours) :" value="8 hours" />
                </div>
              </div>
              <div className="mb-12 pb-8 mt-5 w-full">
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  Remuneration
                </h2>
                <div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <DetailRow
                      label="Base Hourly Rate (AUD) :"
                      value="Negotiate"
                    />
                    <DetailRow
                      label="Superannuation (% of Hourly Rate) :"
                      value="11%"
                    />
                    <DetailRow
                      label="Gross Hourly Total (AUD) :"
                      value="$200"
                    />
                    <DetailRow label="Currency :" value="AUD" />
                  </div>
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
                  <DetailRow label="Full Name :" value="Michael Ross" />
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-sm text-muted-foreground">
                      Signature Status :
                    </span>
                    <span className="font-semibold text-yellow-600">
                      Pending
                    </span>
                  </div>
                  <DetailRow
                    label="Signature Timestamp :"
                    value="14 Oct 2025, 18.03"
                  />
                </div>
                <div className="flex justify-center">
                  <div className="w-[290px] h-[57px] border border-dotted border-gray-300 rounded-lg"></div>
                </div>
              </div>

              {/* Party B */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Party B — worker
                </h3>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <DetailRow label="Full Name :" value="Michael Ross" />
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-sm text-muted-foreground">
                      Signature Status :
                    </span>
                    <span className="font-semibold text-green-600">Signed</span>
                  </div>
                  <DetailRow
                    label="Signature Timestamp :"
                    value="14 Oct 2025, 18.03"
                  />
                </div>
                <div className="flex justify-center">
                  <div className="w-[290px] h-[57px] border border-dotted border-gray-300 rounded-lg"></div>
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
