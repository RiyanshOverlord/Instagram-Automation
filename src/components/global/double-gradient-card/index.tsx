import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  label: string;
  subLabel: string;
  description: string;
};

const DoubleGradientCard = ({ label, subLabel, description }: Props) => {
  return (
    <div
      className="
        relative border border-border/50 p-6 rounded-xl
        flex flex-col justify-between
        min-h-[220px] h-full
        overflow-hidden
        bg-background transition-all duration-300
        hover:scale-[1.02] hover:border-transparent
      "
    >
      {/* Top Content */}
      <div className="flex flex-col z-40">
        <h2 className="text-2xl font-semibold text-white">{label}</h2>
        <p className="text-text-secondary text-sm mt-1">{subLabel}</p>
      </div>

      {/* Bottom Content */}
      <div className="flex justify-between items-center z-40 gap-x-10">
        <p className="text-text-secondary text-sm">{description}</p>

        <Button
          className="
            rounded-full w-10 h-10 p-0
            bg-gradient-to-br from-indigo-500 to-blue-600
            hover:opacity-90
          "
        >
          <ArrowRight className="text-white" />
        </Button>
      </div>

      {/* Brand radial gradients (your existing system) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 radial__double__gradient--cards--top" />
        <div className="absolute inset-0 radial__double__gradient--cards--bottom" />
      </div>
    </div>
  );
};

export default DoubleGradientCard;
