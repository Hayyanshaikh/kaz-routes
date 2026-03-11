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
    header: safeParse(pageContent?.contact?.header),
    form: safeParse(pageContent?.contact?.form),
    info: safeParse(pageContent?.contact?.info),
    socials: safeParse(pageContent?.contact?.socials),
    map: safeParse(pageContent?.contact?.map),
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
          description:
            err?.response?.data?.message || t("messages.errorDesc"),
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

              <Form form={form} layout="vertical" onFinish={onSubmit}>
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

      {parsedData.map.enabled && (
        <Section>
          <Container>
            {/* Map */}
            <div
              className="h-screen rounded-2xl overflow-hidden shadow-lg"
              dangerouslySetInnerHTML={{ __html: parsedData.map.iframe }}
            />
          </Container>
        </Section>
      )}
    </>
  );
};

export default Contact;
