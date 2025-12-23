"use server"

import { client } from "@/lib/prisma"
import { v4 } from "uuid"

// Create a new automation for a user
export const createAutomation = async (clerkId: string, id?:string) => {
    return await client.user.update({
        where:{
            clerkId
        },
        data:{
            automations:{
                create:{
                    ...(id && { id }),
                }
            }
        }
    })
}

// Get all automations for a user
export const getAutomations = async (clerkId: string) => {
    return await client.user.findUnique({
        where:{
            clerkId
        },
        select:{
            automations:{
                orderBy:{
                    createdAt: 'desc'
                },
                include:{
                    keywords: true,
                    listener: true
                }
            }
        }
    })
}

// Find a specific automation by its ID
export const findAutomation = async (id:string) => {
    return await client.automation.findUnique({
        where:{
            id
        },
        include:{
            keywords: true,
            trigger: true,
            posts: true,
            listener: true,
            User:{
                select:{
                    subscription: true,
                    integrations: true,
                }
            }
        }
    })
}

// Update 
export const updateAutomation = async (id:string , update:{
    name?:string,
    active?:boolean,
}) => {
    return await client.automation.update({
        where:{id},
        data:{
            name:update.name,
            active:update.active,
        }
    })
}