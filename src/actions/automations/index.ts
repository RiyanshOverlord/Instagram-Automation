"use server";

import { onCurrentUser } from "../user";
import { createAutomation, findAutomation, getAutomations, updateAutomation } from "./queries";

export const createAutomations = async (id?:string) => {
  const user = await onCurrentUser();
  try {
    const create = await createAutomation(user.id, id);
    if (create) return { status: 200, data: "Automation Created" };
    return { status: 404, data: " Could not create automation" };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

// Get All Automations
export const getAllAutomations = async () => {
  const user = await onCurrentUser()
  try {
    const automations = await getAutomations(user.id)
    if (automations) return { status: 200, data: automations.automations }
    return { status: 404, data: [] }
  } catch (error) {
    return { status: 500, error: [] }
  }
}

// Get Single Automation
export const getAutomationInfo = async (id:string) => {
  await onCurrentUser()
  try {
    const automation = await findAutomation(id)
    if(automation) return {status:200 , data: automation}
    return {status:404 , data: null}
  } catch (error) {
    return {status:500 , error: null}
  }
}

// Update Automation
export const updateAutomationName = async (automationId:string , data:{
  name?:string,
  active?:boolean,
  automation?:string
}) => {
  await onCurrentUser()
  try {
    const update = await updateAutomation(automationId, data)
    if(update) return {status:200 , data: 'Automation Updated'}
    return {status:404 , data: 'Could not update automation'}
  } catch (error) {
    return {status:500 , error: 'Internal Server Error'} 
  }
}