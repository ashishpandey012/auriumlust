import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111111] text-white">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-16">
          {/* Centered Heading with Cyan Accent Underline */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-[28px] font-semibold text-white tracking-normal">
              About aureumlust
            </h1>
            {/* Short cyan accent underline */}
            <div className="mx-auto mt-2.5 h-[3px] w-16 rounded-full bg-[#00c0f0]" />
          </div>

          {/* About Content Sections */}
          <div className="mt-10 sm:mt-12 space-y-8 text-sm sm:text-base leading-relaxed text-[#d1d5db]">
            {/* Intro paragraph */}
            <p>
              Welcome to aureumlust, your premier destination for high-quality
              adult entertainment. We are dedicated to providing a diverse and
              extensive library of content to satisfy every desire. Our platform
              is designed with the user in mind, featuring a sleek interface,
              easy navigation, and a commitment to constantly updating our
              collection with the latest and greatest scenes.
            </p>

            {/* Our Mission */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                Our Mission
              </h2>
              <p>
                To curate an unparalleled collection of adult content that is
                both accessible and enjoyable for all our users. We believe in
                celebrating sexuality and providing a safe, discreet, and
                high-quality environment for exploration.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                Contact Us
              </h2>
              <p>
                Have a question, comment, or suggestion? We&apos;d love to hear
                from you. Please reach out to our support team at{" "}
                <a
                  href="mailto:support@aureumlust.example"
                  className="text-white hover:text-[#00c0f0] underline transition-colors"
                >
                  support@aureumlust.example
                </a>
                .
              </p>
            </div>

            {/* Legal */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                Legal
              </h2>
              <p className="mb-4">
                All models, actors, actresses and other persons that appear in
                any visual depiction of actual sexually explicit conduct
                appearing or otherwise contained in this Website were over the
                age of eighteen years at the time of the creation of such
                depictions.
              </p>
              <p>
                <strong className="font-bold text-white">
                  18 U.S.C. 2257 Record-Keeping Requirements Compliance
                  Statement:
                </strong>{" "}
                All records required to be maintained by 18 U.S.C. 2257 are
                located at the registered office of the custodian of records.
                Please contact us for the address.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
