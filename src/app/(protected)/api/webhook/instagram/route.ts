import { findAutomation } from "@/actions/automations/queries";
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  getKeywordPost,
  matchKeyword,
  trackResponse,
} from "@/actions/webhooks/queries";
import { sendDM, sendPrivateMessage } from "@/lib/fetch";
import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(hub);
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json();
  let matcher;
  try {
    // for messenges
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text,
      );
    }

    // for comments
    if (webhook_payload.entry[0].changes) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].value.text,
      );
    }

    if (matcher && matcher.automationId) {
      // We have a match
      if (webhook_payload.entry[0].messaging) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          true,
        );
        if (automation && automation.trigger) {
          if (
            automation.listener &&
            automation.listener.listener === "MESSAGE"
          ) {
            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation.listener?.prompt,
              automation.User?.integrations[0].token!,
            );

            if (direct_message.status === 200) {
              const tracked = await trackResponse(automation.id, "DM");
              if (tracked) {
                return NextResponse.json(
                  {
                    message: "EVENT_RECEIVED",
                  },
                  { status: 200 },
                );
              }
            }
          }

          if (
            automation.listener &&
            automation.listener.listener === "SMARTAI" &&
            automation.User?.subscription?.plan === "PRO"
          ) {
            const smart_ai_message = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                },
              ],
            });

            if (smart_ai_message.choices[0].message.content) {
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].message.text,
              );

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
              );

              await client.$transaction([reciever, sender]);

              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
                automation.User?.integrations[0].token!,
              );

              if (direct_message.status === 200) {
                const tracked = await trackResponse(automation.id, "DM");
                if (tracked) {
                  return NextResponse.json(
                    { message: "MESSAGE_SENT from SMARTAI" },
                    { status: 200 },
                  )
                }
              }
            }
          }
        }
      }

      if(webhook_payload.entry[0].changes && webhook_payload.entry[0].field === 'comments'){
        const automation = await getKeywordAutomation(
            matcher.automationId,
            false,
        )

        const automations_post = await getKeywordPost(
            webhook_payload.entry[0].changes[0].value.media.id,
            automation?.id!
        )

        if(automation && automations_post && automation.trigger){
            if(automation.listener){
                if(automation.listener.listener==="MESSAGE"){
                    const direct_message = await sendPrivateMessage(
                       webhook_payload.entry[0].id,
                       webhook_payload.entry[0].changes[0].value.id,
                       automation.listener?.prompt,
                       automation.User?.integrations[0].token!, 
                    )
                    if(direct_message.status===200){
                        const tracked = await trackResponse(automation.id , "COMMENT")
                        if(tracked){
                            return NextResponse.json(
                                {
                                 message:"Message Sent from Comment"
                                },
                                {
                                 status:200
                                }
                            )
                        }
                    }
                }
                if(
                    automation.listener.listener === "SMARTAI" && 
                    automation.User?.subscription?.plan === "PRO"
                ){
                    const smart_ai_message = await openai.chat.completions.create({
                        model: "gpt-4o",
                        messages: [
                            {
                                role: "assistant",
                                content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                            },
                        ],
                    })
                    if(smart_ai_message.choices[0].message.content){
                        const reciever = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].changes[0].value.from.id,
                            webhook_payload.entry[0].changes[0].value.text,
                        )

                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].changes[0].value.from.id,
                            smart_ai_message.choices[0].message.content,
                        )

                        await client.$transaction([reciever, sender])

                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].changes[0].value.from.id,
                            smart_ai_message.choices[0].message.content,
                            automation.User?.integrations[0].token!,
                        )

                        if(direct_message.status === 200){
                            const tracked = await trackResponse(automation.id , "COMMENT")
                            if(tracked){
                                return NextResponse.json(
                                    {
                                     message:"Message Sent from Comment"
                                    },
                                    {
                                     status:200
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }
      }
    }
    if(!matcher){
        // No keyword match
        const customer_history = await getChatHistory(
            webhook_payload.entry[0].messaging[0].recipient.id,
            webhook_payload.entry[0].messaging[0].sender.id,
        )

        if(customer_history.history.length > 0){
            const automation = await findAutomation(customer_history.automationId!)

            if(
                automation?.User?.subscription?.plan === "PRO" && 
                automation.listener?.listener === "SMARTAI"
            ){
                const smart_ai_message = await openai.chat.completions.create({
                    model:'gpt-4o',
                    messages:[
                        {
                            role:'assistant',
                            content:`${automation.listener?.prompt}: Keep responses under 2 sentences`
                        },
                        ...customer_history.history,
                        {
                            role:'user',
                            content:webhook_payload.entry[0].messaging[0].message.text
                        }
                    ]
                })

                if(smart_ai_message.choices[0].message.content){
                    const reciever = createChatHistory(
                        automation.id,
                        webhook_payload.entry[0].id,
                        webhook_payload.entry[0].messaging[0].sender.id,
                        webhook_payload.entry[0].messaging[0].message.text,
                    )

                    const sender = createChatHistory(
                        automation.id,
                        webhook_payload.entry[0].id,
                        webhook_payload.entry[0].messaging[0].sender.id,
                        smart_ai_message.choices[0].message.content,
                    )
                    await client.$transaction([reciever, sender])
                    const direct_message = await sendDM(
                        webhook_payload.entry[0].id,
                        webhook_payload.entry[0].messaging[0].sender.id,
                        smart_ai_message.choices[0].message.content,
                        automation.User?.integrations[0].token!,
                    )

                    if(direct_message.status === 200){
                        // if successfully send we return
                        return NextResponse.json(
                            {
                                message:"Message Sent from Comment"
                            },
                            {
                                status:200
                            }
                        )
                    }
                }
            }
        }
        return NextResponse.json(
            {
                messages:"No automation set"
            },
            {
                status:200
            }
        )
    }
    return NextResponse.json({message:"No automation set"} , {status:200})
  } catch (error) {
    return NextResponse.json({message:"Internal Server Error , No automation set "} , {status:200})
  }
}
