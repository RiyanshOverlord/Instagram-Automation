import AutomationList from '@/components/global/automation-list'
import CreateAutomation from '@/components/global/create-automation'
import { Check } from 'lucide-react'
import React from 'react'
import {getLiveAutomationListeners} from '@/actions/automations'
type Props = {}

const Page = async (props: Props) => {
    // TODO: Implement automations page
    const liveAutomations = await getLiveAutomationListeners();
    const automations = liveAutomations?.status === 200 ? liveAutomations.data : [];
  return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      <div className="lg:col-span-4">
        <AutomationList />
      </div>

      <div className="lg:col-span-2 " >
        <div className="flex flex-col rounded-xl bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active 
    max-h-[calc(100vh-360px)]
    overflow-y-auto
    pr-2
    scrollbar-thin
    scrollbar-thumb-white/20
    scrollbar-track-transparent
        ">
          <div className=''>
            <h2 className="text-xl">Live Automation</h2>
            <p className="text-text-secondary">
              Your live automation will be displayed here
            </p>
          </div>

          <div className="flex flex-col gap-y-3">
            {automations?.length ? (
              automations.map((automation) => (
                <div
                  key={automation.id}
                  className="flex items-start justify-between"
                >
                  <div className="flex flex-col">
                    <h3 className="font-medium">
                      {automation.name || "Untitled Automation"}
                    </h3>

                    <p className="text-text-secondary text-sm">
                      {new Date(
                        automation.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <Check className="text-green-500" />
                </div>
              ))
            ) : (
              <p className="text-sm text-text-secondary">
                No live automations yet
              </p>
            )}
          </div>

          <CreateAutomation />
        </div>
      </div>
    </div>
  )
}

export default Page