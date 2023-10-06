import React from "react";
import { AdyenDropIn } from "@/checkout/sections/PaymentSection/AdyenDropIn/AdyenDropIn";
import { PaymentSectionSkeleton } from "@/checkout/sections/PaymentSection/PaymentSectionSkeleton";
import { DummyCreditCardSection } from "./DummyCreditCardSection";
import { usePayments } from "@/checkout/sections/PaymentSection/usePayments";
import { useCheckoutUpdateState } from "@/checkout/state/updateStateStore";

export const PaymentMethods: React.FC = () => {
  const { availablePaymentGateways, fetching } = usePayments();
  const {
    changingBillingCountry,
    updateState: { checkoutDeliveryMethodUpdate },
  } = useCheckoutUpdateState();

  const { adyen, dummyCreditCard } = availablePaymentGateways;

  if (changingBillingCountry || fetching || checkoutDeliveryMethodUpdate === "loading") {
    return <PaymentSectionSkeleton />;
  }

  return (
    <div className="mb-8">
      {adyen && <AdyenDropIn config={adyen} />}
      {dummyCreditCard && <DummyCreditCardSection checkout={/* Provide necessary data */} />}
    </div>
  );
};
