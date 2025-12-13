import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import {  Radio } from 'lucide-react'

type Props = {}

const ActivateAutomationButton = (props: Props) => {

    // TODO: Implement activate automation button
  return (
  <Button className='lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] ml-4'>
    {/* TODO: Implement activate automation button */}
    <Loader state={false} >
        <Radio/>
        <p className='lg:hidden hidden'>Activate</p>
    </Loader>
  </Button>
  )
}

export default ActivateAutomationButton