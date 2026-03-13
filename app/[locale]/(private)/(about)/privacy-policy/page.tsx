"use client";
import AboutContent from "@/app/components/About/AboutContent";
import CommonHeading from "@/app/components/common/CommonHeading";
import usePageContentStore from "@/app/store/usePageContent";
import Head from "next/head";
import { useTranslations } from "next-intl";

const PrivacyPolicy = () => {
  const { pageContent } = usePageContentStore();
  const t = useTranslations("pages.privacy");
  return (
    <div className="">
      <Head>
        <title>{t("title")} - Kaz Routes</title>
        <meta name="description" content={t("metaDescription")} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
      </Head>

      <section className="p-0">
        <div className="max-w-4xl mx-auto md:px-4">
          <CommonHeading
            title={pageContent?.policy?.heading || t("title")}
            className="text-left mb-6"
          />
          <div className="text-gray-700 space-y-4">
            <AboutContent text={pageContent?.data?.policy?.content || ""} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
