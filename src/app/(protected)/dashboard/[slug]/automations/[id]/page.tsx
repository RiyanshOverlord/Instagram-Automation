import Trigger from '@/components/global/automations/trigger'
import AutomationBreadCrumb from '@/components/global/bread-crumbs/automations'
import { FileWarningIcon } from 'lucide-react'
import React from 'react'
import { FaExclamation } from 'react-icons/fa'

type Props = {
    params:{id:string}
}

// Wip : Set some metadata
const Page = ({params}: Props) => {

    // TODO: Implement automation detail page

  return (
    <div className='flex flex-col items-center gap-y-20'>
        <AutomationBreadCrumb id={params.id}/>
        <div className='w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3'>
        <div className='flex gap-x-2'>
            <FaExclamation color='#FFC107'/>
            When...
        </div>
        <Trigger id={params.id} />
        </div>
    </div>
  )
}

export default Page