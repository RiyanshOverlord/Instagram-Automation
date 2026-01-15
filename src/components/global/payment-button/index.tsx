

import { Button } from "@/components/ui/button";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { CreditCard, Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const PaymentButton = (props: Props) => {
  // Wip : get there subscription details
  //   wip : Loading state

  const {onSubscribe , isProcessing} = useSubscriptions()

  return (
    <Button disabled={isProcessing} onClick={onSubscribe} className="bg-gradient-to-br text-white rounded-full from-[#9685DB] via-[#9434E6] to-[#CC3BD4] font-bold">
     {isProcessing ? <Loader2 className="animate-spin"/> : <CreditCard/>}
      Upgrade
    </Button>
  );
};

export default PaymentButton;
