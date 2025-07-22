"use client";

import Head from "next/head";
import CommonInput from "@/app/components/common/CommonInput";
import CommonTextarea from "@/app/components/common/CommonTextarea";
import useForm from "@/app/hooks/useForm";
import Section from "@/app/components/Container/Section";
import Container from "@/app/components/Container";
import CommonButton from "@/app/components/common/CommonButton";
import CommonHeading from "@/app/components/common/CommonHeading";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const { formData, errors, handleChange, handleSubmit, resetForm } = useForm([
    "name",
    "email",
    "phone",
    "message",
  ]);

  const onSubmit = () => {};

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="">
        <Section>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <h2 className="text-4xl font-bold leading-snug mb-6 text-gray-900">
                We're Here to Help — Contact KazRoutes for Travel Bookings,
                Partnerships, and Media Inquiries.
              </h2>
              <form
                onSubmit={() => handleSubmit(onSubmit)}
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
                  label="Send Message"
                  type="submit"
                  className="w-full"
                />
              </form>
            </div>
          </Container>
        </Section>
        <Section className="bg-gray-100">
          <Container>
            <div className="container mx-auto px-4">
              <CommonHeading
                title="Our Contact Details"
                subtitle="Get in touch with us for any inquiries or support."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* 📧 Email Section */}
                <div className="flex flex-col items-center gap-4 ">
                  <Mail size={40} className="text-primary" />
                  <div className="text-center">
                    <p className="mb-2">
                      <a
                        href="mailto:info@example.com"
                        className="text-gray-600 hover:text-blue-500 transition duration-200"
                      >
                        info@example.com
                      </a>
                    </p>
                    <p>
                      <a
                        href="mailto:support@example.com"
                        className="text-gray-600 hover:text-blue-500 transition duration-200"
                      >
                        support@example.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* 📞 Phone Section */}
                <div className="flex flex-col items-center gap-4">
                  <Phone size={40} className="text-primary" />
                  <div className="text-center">
                    <p className="mb-2">
                      <a
                        href="tel:+1234567890"
                        className="text-gray-600 hover:text-blue-500 transition duration-200"
                      >
                        +1 (234) 567-890
                      </a>
                    </p>
                    <p>
                      <a
                        href="tel:+0987654321"
                        className="text-gray-600 hover:text-blue-500 transition duration-200"
                      >
                        +0 (987) 654-321
                      </a>
                    </p>
                  </div>
                </div>

                {/* 📍 Location Section */}
                <div className="flex flex-col items-center gap-4">
                  <MapPin size={40} className="text-primary" />
                  <div className="text-center text-gray-600">
                    <p>123 Business Street, Suite 456</p>
                    <p>London, UK, 78910</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
        <Section>
          <Container>
            {/* Map */}
            <div className="h-screen rounded-2xl overflow-hidden shadow-lg">
              <div
                style={{
                  position: "relative",
                  textAlign: "right",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    background: "none",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <iframe
                    className="gmap_iframe"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://maps.google.com/maps?width=600&height=400&hl=en&q=123%20Business%20Street,%20London,%20UK&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                  ></iframe>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
