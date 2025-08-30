"use client";

import Head from "next/head";
import CommonInput from "@/app/components/common/CommonInput";
import CommonTextarea from "@/app/components/common/CommonTextarea";
import useForm from "@/app/hooks/useForm";
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

const Contact = () => {
  const { formData, errors, handleChange, handleSubmit, resetForm } = useForm([
    { name: "name", required: true },
    { name: "email", required: true },
    { name: "phone", required: true },
    { name: "message", required: true },
  ]);

  const { pageContent } = usePageContentStore();

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

  const onSubmit = () => {
    createContact(formData, {
      onSuccess: () => {
        console.log("✅ Contact created successfully!");
        showSuccess({
          message: "Contact created successfully!",
          description: "We will get back to you shortly.",
        });
        resetForm();
      },
      onError: (err) => {
        console.error("❌ Contact creation failed:", err);
        showError({
          message: "Contact creation failed.",
          description:
            err?.response?.data?.message ||
            "An error occurred. Please try again later.",
        });
      },
    });
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      {parsedData.form.enabled && (
        <Section>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <h2 className="text-4xl font-bold leading-snug mb-6 text-gray-900">
                {parsedData.header.title || "We're Here to Help — Contact Us"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit);
                }}
                className="space-y-6"
              >
                <CommonInput
                  className="bg-white"
                  label="Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your Name"
                  error={errors.name}
                />
                <CommonInput
                  className="bg-white"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Your Email"
                  error={errors.email}
                />
                <CommonInput
                  className="bg-white"
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Your Phone"
                  error={errors.phone}
                />
                <CommonTextarea
                  className="h-32 bg-white"
                  label="Message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Your Message"
                  error={errors.message}
                />
                <CommonButton
                  label={isPending ? "Sending..." : "Send Message"}
                  type="submit"
                  className="w-full"
                  disabled={isPending}
                />
              </form>
            </div>
          </Container>
        </Section>
      )}

      <Section className="bg-gray-100">
        <Container>
          <CommonHeading
            title="Our Contact Details"
            subtitle="Get in touch with us for any inquiries or support."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Emails */}
            <div className="flex flex-col items-center gap-4">
              <MailOutlined className="text-primary text-4xl" />
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
              <PhoneOutlined className="text-primary text-4xl" />
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
              <EnvironmentOutlined className="text-primary text-4xl" />
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
