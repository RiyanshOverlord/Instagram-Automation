'use client'

import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'
import Loader from '../loader'
import { Activity } from 'lucide-react'
import { useCreateAutomation } from '@/hooks/use-automations'
import { v4 } from 'uuid'

type Props = {}

const CreateAutomation = (props: Props) => {
  const mutationId = useMemo(()=>v4(),[])
    // Wip : Create Automation Component in dataabase using mutate
console.log("Mutation ID" , mutationId);
 const {isPending , mutate} = useCreateAutomation(mutationId)
    

  return (
   <Button className='lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to -[#1C2D70]' onClick={()=>mutate({
    name:'Untitled',
    id:mutationId, 
    createdAt: new Date(),
    keywords:[]
    })}>
    <Loader state={isPending} >
        <Activity color='#ffffff'/>
        <p className='lg:inline hidden'>Create Automation</p>
    </Loader>
   </Button>
  )
}

export default CreateAutomation