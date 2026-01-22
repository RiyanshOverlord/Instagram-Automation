'use server'

import { client } from "@/lib/prisma"

// Fetch Integration by ID and update its token and expiration date
export const updateIntegration = async (
    token: string, 
    expire: Date, 
    id: string
) => {
    return await client.integration.update({
        where:{
            id
        },
        data:{
            token,
            expiresAt:expire
        }
    })
}

// Fetch Integration by ID
export const getIntegration = async (clerkId:string) => {
    return await client.user.findUnique({
        where:{
            clerkId
        },
        select:{
            integrations:{
                where:{
                    name:"INSTAGRAM"
                }
            }
        }
    })
}


// Create a new integration for a user
export const createIntegration = async (clerkId:string, token:string, expire:Date, igId?:string) => {
    return await client.user.update({
        where:{
            clerkId
        },
        data:{
            integrations:{
                create:{
                    token,
                    expiresAt:expire,
                    instagramId:igId
                }
            }
        },
        select:{
            firstName:true,
            lastName:true
        }
    })
}
