import React from "react";
import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import { useCheckoutUpdateState } from "@/checkout/state/updateStateStore";
import { AdyenDropIn } from "@/checkout/sections/PaymentSection/AdyenDropIn/AdyenDropIn";
import { PaymentSectionSkeleton } from "@/checkout/sections/PaymentSection/PaymentSectionSkeleton";
import { DummyCreditCardSection } from "./DummyCreditCardSection"; 
import { usePayments } from "@/checkout/sections/PaymentSection/usePayments";

export const PaymentMethods = () => {
  const { availablePaymentGateways, fetching } = usePayments();
  const { changingBillingCountry, updateState: { checkoutDeliveryMethodUpdate } } = useCheckoutUpdateState();

  const ADYEN_GATEWAY = 'adyen'; // This is a placeholder. Replace with the actual gateway ID for Adyen.
  const existingGateways = [ADYEN_GATEWAY, DUMMY_CREDIT_CARD_GATEWAY];
  const availableGateways = availablePaymentGateways.filter((g) => existingGateways.includes(g.id));
  
  const [chosenGateway, setChosenGateway] = useState("");

  if (changingBillingCountry || fetching || checkoutDeliveryMethodUpdate === "loading") {
    return <PaymentSectionSkeleton />;
  }

  return (
    <div className="mb-8">
      <RadioGroup value={chosenGateway} onChange={setChosenGateway}>
        {availableGateways.map((gateway) => (
          <RadioGroup.Option key={gateway.id} value={gateway.id}>
            <label className="inline-flex items-center" htmlFor={gateway.id}>
              <input type="radio" className="form-radio" name="paymentGateway" value={gateway.id} id={gateway.id} />
              <span className="ml-2 text-base">{gateway.name}</span>
            </label>
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      {chosenGateway === ADYEN_GATEWAY && <AdyenDropIn config={/* Provide the necessary config here */} />}
      {chosenGateway === DUMMY_CREDIT_CARD_GATEWAY && <DummyCreditCardSection checkout={/* Provide the necessary checkout data here */} />}
    </div>
  );
};