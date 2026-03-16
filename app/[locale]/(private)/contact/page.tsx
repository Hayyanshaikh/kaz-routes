"use client";

import Head from "next/head";
import CommonInput from "@/app/components/common/CommonInput";
import CommonTextarea from "@/app/components/common/CommonTextarea";
import Section from "@/app/components/Container/Section";
import Container from "@/app/components/Container";
import CommonButton from "@/app/components/common/CommonButton";
import CommonHeading from "@/app/components/common/CommonHeading";
import {
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import usePageContentStore from "@/app/store/usePageContent";
import { useControllerContactSubmit } from "@/app/hooks/api";
import { showError, showSuccess } from "@/app/components/common/CommonSonner";
import { Form } from "antd";
import { useTranslations } from "next-intl";

const Contact = () => {
  const { pageContent } = usePageContentStore();
  const [form] = Form.useForm();
  const t = useTranslations("pages.contact");

  const { mutate: createContact, isPending } = useControllerContactSubmit();

  // ✅ Safe JSON parse function
  const safeParse = (jsonString: string | undefined) => {
    try {
      return jsonString ? JSON.parse(jsonString) : {};
    } catch (e) {
      console.error("Invalid JSON:", e);
      return {};
    }
  };

  // Parse stringified JSON from store
  const parsedData = {
    header: safeParse(pageContent?.data?.contact?.header),
    form: safeParse(pageContent?.data?.contact?.form),
    info: safeParse(pageContent?.data?.contact?.info),
    socials: safeParse(pageContent?.data?.contact?.socials),
    map: safeParse(pageContent?.data?.contact?.map),
  };

  // ✅ Generate iframe HTML dynamically
  const getMapIframe = () => {
    if (!parsedData.map.enabled) return null;

    // 1️⃣ Already valid iframe HTML
    if (parsedData.map.iframe?.includes("<iframe")) {
      return parsedData.map.iframe;
    }

    // 2️⃣ If coordinates exist, generate embed URL
    if (parsedData.map.lat && parsedData.map.lng) {
      const lat = parsedData.map.lat;
      const lng = parsedData.map.lng;
      // Optional: You can use your Google Maps API key if needed
      const embedUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${lat},${lng}&zoom=14&maptype=roadmap`;

      return `<iframe src="${embedUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
    }

    // 3️⃣ If only short link exists → fallback message
    if (parsedData.map.iframe) {
      return `<div class="text-center text-gray-500 p-10">Map preview not available for this link. <a href="${parsedData.map.iframe}" target="_blank" class="text-blue-500 underline">Open in Google Maps</a></div>`;
    }

    return null;
  };

  const onSubmit = (values: any) => {
    createContact(values, {
      onSuccess: () => {
        showSuccess({
          message: t("messages.success"),
          description: t("messages.successDesc"),
        });
        form.resetFields();
      },
      onError: (err: any) => {
        console.error("❌ Contact creation failed:", err);
        showError({
          message: t("messages.error"),
          description: err?.response?.data?.message || t("messages.errorDesc"),
        });
      },
    });
  };

  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>

      {parsedData.form.enabled && (
        <Section>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <h2 className="text-4xl font-bold leading-snug mb-6 text-gray-900">
                {parsedData.header.title || t("headerTitle")}
              </h2>

              <Form
                form={form}
                layout="vertical"
                className="flex flex-col gap-2"
                onFinish={onSubmit}
              >
                <CommonInput
                  name="name"
                  label={t("form.name")}
                  placeholder={t("form.namePlaceholder")}
                />
                <CommonInput
                  name="email"
                  label={t("form.email")}
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                />
                <CommonInput
                  name="phone"
                  label={t("form.phone")}
                  type="tel"
                  placeholder={t("form.phonePlaceholder")}
                />
                <CommonTextarea
                  name="message"
                  label={t("form.message")}
                  placeholder={t("form.messagePlaceholder")}
                  className="h-32"
                />
                <CommonButton label={t("form.submit")} type="submit" />
              </Form>
            </div>
          </Container>
        </Section>
      )}

      <Section className="bg-gray-100">
        <Container>
          <CommonHeading
            title={t("detailsTitle")}
            subtitle={t("detailsSubtitle")}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Emails */}
            <div className="flex flex-col items-center gap-4">
              <MailOutlined className="text-primary! text-4xl" />
              <div className="text-center">
                {parsedData.info.emails?.map((email: string, i: number) => (
                  <p key={i}>
                    <a
                      href={`mailto:${email}`}
                      className="text-gray-600 hover:text-blue-500 transition duration-200"
                    >
                      {email}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            {/* Phones */}
            <div className="flex flex-col items-center gap-4">
              <PhoneOutlined className="text-primary! text-4xl" />
              <div className="text-center">
                {parsedData.info.phones?.map((phone: string, i: number) => (
                  <p key={i}>
                    <a
                      href={`tel:${phone}`}
                      className="text-gray-600 hover:text-blue-500 transition duration-200"
                    >
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center gap-4">
              <EnvironmentOutlined className="text-primary! text-4xl" />
              <div className="text-center text-gray-600">
                <p>{parsedData.info.address}</p>
                <p>{parsedData.info.hours}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {parsedData.map.enabled && getMapIframe() && (
        <Section>
          <Container>
            <div
              className="h-screen rounded-2xl overflow-hidden shadow-lg"
              dangerouslySetInnerHTML={{ __html: getMapIframe() }}
            />
          </Container>
        </Section>
      )}
    </>
  );
};

export default Contact;
