import React from "react"
import { Crown } from "lucide-react"

type Props = {}

const ProBadge = (props:Props) => {
  return (
    <div
      className="
        p-[2px] rounded-2xl
        bg-gradient-to-r
        from-[#974476] via-[#2d3ac8] to-[#1771a6]
      "
    >
      <div className="bg-[#252525] rounded-2xl px-4 py-3 flex items-center gap-x-2">
        <Crown className="w-4 h-4 text-white" />
        <span
          className="
            text-sm font-bold
            bg-gradient-to-r
            from-[#974476] via-[#2d3ac8] to-[#1771a6]
            bg-clip-text
            text-transparent
          "
        >
          PRO Active
        </span>
      </div>
    </div>
  )
}

export default ProBadge