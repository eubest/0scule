import { AdyenDropIn } from "@/checkout/sections/PaymentSection/AdyenDropIn/AdyenDropIn";
import { PaymentSectionSkeleton } from "@/checkout/sections/PaymentSection/PaymentSectionSkeleton";
import { DummyCreditCardSection } from "./DummyCreditCardSection"; // Import this component
import { usePayments } from "@/checkout/sections/PaymentSection/usePayments";
import { useCheckoutUpdateState } from "@/checkout/state/updateStateStore";

export const PaymentMethods = () => {
  const { availablePaymentGateways, fetching } = usePayments();
  const {
    changingBillingCountry,
    updateState: { checkoutDeliveryMethodUpdate },
  } = useCheckoutUpdateState();

  const { adyen, dummyCreditCard } = availablePaymentGateways; // Add dummyCreditCard from availablePaymentGateways if it's being returned from your API.

  if (changingBillingCountry || fetching || checkoutDeliveryMethodUpdate === "loading") {
    return <PaymentSectionSkeleton />;
  }

  return (
    <div className="mb-8">
      {adyen && <AdyenDropIn config={adyen} />}
      {dummyCreditCard && <DummyCreditCardSection checkout={/* Provide the necessary checkout data here */} />}
    </div>
  );
};
