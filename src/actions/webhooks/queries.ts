import { client } from "@/lib/prisma"
import { ChatCompletionMessageParam } from "openai/resources/chat";

// Function to match a keyword in the database (accepts full text and matches whole words case-insensitively)
export const matchKeyword = async (text: string) => {
    if (!text || typeof text !== 'string') return null;

    // normalize text: lower-case, replace non-alphanumeric characters with space, split into words
    const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const words = Array.from(new Set(normalized.split(/\s+/).filter(Boolean)));

    if (words.length === 0) return null;

    // Build OR conditions to match any whole word (case-insensitive)
    const conditions = words.map((w) => ({ word: { equals: w, mode: 'insensitive' as const } }));

    console.log("🔎 matchKeyword words:", words);
    const matched = await client.keyword.findFirst({
        where: {
            OR: conditions,
        },
    });

    console.log("✅ matchKeyword matched:", matched);
    return matched;
} 

// Function to get automation details based on automation ID and type (DM or COMMENT)
export const getKeywordAutomation = async (automationId: string, dm:boolean) => {
    return await client.automation.findUnique({
        where:{
            id: automationId
        },

        include:{
            dms:dm,
            trigger:{
                where:{
                    type: dm ? 'DM' : 'COMMENT',
                },
            },
            listener:true,
            User:{
                select:{
                  subscription:{
                    select:{
                        plan:true,
                    },
                  },
                  integrations:{
                    select:{
                        token:true,
                    }
                  }
                }
            }
        },
    })
}

// All the code below is for the chatbot

// Function to track the response sent so that the user cant spam responses
export const trackResponse = async (
    automationId: string,
    type: "DM" | "COMMENT",
) => {
    if(type === "COMMENT"){
        return await client.listener.update({
            where:{
                automationId
            },
            data:{
                commentCount:{
                    increment: 1
                }
            }
        })
    }
    if(type === "DM"){
        return await client.listener.update({
            where:{
                automationId
            },
            data:{
                dmContent:{         //have to fix this field name from dmContent to dmCount in prisma schema
                    increment: 1
                }
            }
        })
    }
}

// Function to create chat history for the user for the chatbot
export const createChatHistory = (
    automationId:string,
    sender:string,
    reciever:string,
    message:string
)=>{
    return client.automation.update({
        where:{
            id: automationId
        },
        data:{
            dms:{
                create:{
                    reciever,
                    senderId:sender,
                    message
                }
            }
        }
    })
}

// Function to get keyword posts
export const getKeywordPost = async (postId:string, automationId:string) => {
    return await client.post.findFirst({
        where:{
            AND:[{postid:postId},{automationId}],
        },
        select:{
            automationId:true
        }
    })
}

// Find an automation for a given Instagram integration id that listens for DMs
export const getAutomationForDm = async (instagramId: string) => {
    const integration = await client.integration.findFirst({
        where: { instagramId },
        select: { userId: true },
    });

    if (!integration?.userId) return null;

    return await client.automation.findFirst({
        where: {
            userId: integration.userId,
            active: true,
            trigger: { some: { type: 'DM' } },
        },
        include: {
            listener: true,
            User: {
                select: {
                    subscription: true,
                    integrations: true,
                },
            },
        },
    });
};

// Function to get chat history for the user
export const getChatHistory = async (sender: string, reciever: string) => {
  const dms = await client.dms.findMany({
    where: {
      OR: [
        { senderId: sender, reciever },
        { senderId: reciever, reciever: sender },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!dms.length) {
    return {
      history: [] as ChatCompletionMessageParam[],
      automationId: null,
    };
  }

  const history: ChatCompletionMessageParam[] = dms.map((dm) => ({
    role: (dm.senderId === sender ? "assistant" : "user") as
      | "assistant"
      | "user",
    content: dm.message || "",
  }));

  return {
    history,
    automationId: dms[0].automationId,
  };
};