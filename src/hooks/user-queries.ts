import { getAllAutomations, getAutomationInfo } from "@/actions/automations"
import { useQuery } from "@tanstack/react-query"

// Query for automations
export const useQueryAutomations =() =>{
    return useQuery({
        queryKey: ['user-automations'],
        queryFn: getAllAutomations,
    })
}    

// Query for single automation
export const useQueryAutomation=(id:string)=>{
    return useQuery({
        queryKey:['automation-info'],
        queryFn:()=>getAutomationInfo(id)
    })
}
