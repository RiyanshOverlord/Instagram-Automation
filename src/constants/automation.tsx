import { SendHorizonal } from "lucide-react"
import { FaInstagram, FaInstagramSquare, FaRobot } from "react-icons/fa"
import { v4 } from "uuid"

export type AutomationListenerProps = {
    id:string
    label:string
    icon:JSX.Element
    description:string
    type:'MESSAGE' | 'SMARTAI'
}

export type AutomationsTriggerProps = {
    id:string
    label:string
    icon:JSX.Element
    description:string
    type:'COMMENT' | 'DM'
}

export const AUTOMATION_LISTENERS: AutomationListenerProps[]=[
    {
        id: v4(),
        label:'Send the user a message',
        icon:<SendHorizonal/>,
        description:'Enter the message you want to send to the user',
        type:'MESSAGE',
    },
    {
        id: v4(),
        label:'Let SmartAI handle the conversation',
        icon:<FaRobot/>,
        description:'Tell SmartAI to handle the conversation(Upgrade to Pro)',
        type:'SMARTAI', 
    }
]


export const AUTOMATION_TRIGGERS: AutomationsTriggerProps[]=[
    {
        id: v4(),
        label:"User comments on my post",
        icon:<FaInstagram/>,
        description:"Select if you want to automate comments on your post",
        type:"COMMENT",
    },
    {
        id: v4(),
        label:"User sends me a dm with a keyword",
        icon:<FaInstagram/>,
        description:"Select if you want to automate DMs on your profile",
        type:"DM",
    }
]