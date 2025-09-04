"use client";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import DestinationSidebar from "@/app/components/Planning/DestinationPlan/DestinationSidebar";
import useDestinationStore from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { FILE_BASE_URL } from "@/lib/constant";
import { useParams, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const layout = () => {
  const router = useRouter();
  const { plan } = usePlanStore();
  const { destinations } = useDestinationStore();
  const { destination } = useParams();

  const destinationData = destinations?.find(
    (des) => String(des.id) === String(destination)
  );

  console.log({ destinationData });

  useEffect(() => {
    if (plan && !destinationData) {
      router.push(`/plan/${plan.id}`);
    }
  }, [plan, router]);
  return (
    <Section>
      <Container>
        <div
          className="bg-cover mb-6 rounded-lg overflow-hidden px-6 py-10 bg-center"
          style={{
            backgroundImage: `url(${FILE_BASE_URL}/${destinationData?.image})`,
            backgroundColor: "#0003",
            backgroundBlendMode: "multiply",
          }}
        >
          <h1 className="text-2xl text-white font-semibold">
            {destinationData?.name}
          </h1>
        </div>
        <DestinationSidebar destinationData={destinationData} />
      </Container>
    </Section>
  );
};

export default layout;
