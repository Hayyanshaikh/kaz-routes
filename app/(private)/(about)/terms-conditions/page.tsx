"use client";
import AboutContent from "@/app/components/About/AboutContent";
import CommonHeading from "@/app/components/common/CommonHeading";
import usePageContentStore from "@/app/store/usePageContent";
import Head from "next/head";

const TermsAndConditions = () => {
  const { pageContent } = usePageContentStore();
  return (
    <div className="">
      <Head>
        <title>Terms and Conditions - Your Company</title>
        <meta
          name="description"
          content="Learn more about our company and our mission to innovate and inspire."
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
      </Head>

      {/* About Us Section */}
      <section className="p-0">
        <div className="max-w-4xl mx-auto md:px-4">
          <CommonHeading
            title={pageContent?.terms?.heading}
            className="text-left mb-6"
          />
          <div className="text-gray-700 space-y-4">
            <AboutContent text={pageContent?.terms?.content} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
