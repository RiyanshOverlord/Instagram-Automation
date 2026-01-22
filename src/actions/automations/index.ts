"use server";

import { onCurrentUser } from "../user";
import { findUser } from "../user/queries";
import {
  addKeyword,
  addListener,
  addPost,
  addTrigger,
  createAutomation,
  deleteKeyWordQuery,
  findAutomation,
  getAutomations,
  updateAutomation,
} from "./queries";

export const createAutomations = async (id?: string) => {
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
  const user = await onCurrentUser();
  try {
    const automations = await getAutomations(user.id);
    if (automations) return { status: 200, data: automations.automations };
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 500, error: [] };
  }
};

// Get Single Automation
export const getAutomationInfo = async (id: string) => {
  await onCurrentUser();
  try {
    const automation = await findAutomation(id);
    if (automation) return { status: 200, data: automation };
    return { status: 404, data: null };
  } catch (error) {
    return { status: 500, error: null };
  }
};

// Update Automation
export const updateAutomationName = async (
  automationId: string,
  data: {
    name?: string;
    active?: boolean;
    automation?: string;
  }
) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(automationId, data);
    if (update) return { status: 200, data: "Automation Updated" };
    return { status: 404, data: "Could not update automation" };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

export const saveListener = async (
  automationId: string,
  listener: "MESSAGE" | "SMARTAI",
  prompt: string,
  reply?: string
) => {
  await onCurrentUser();
  try {
    const create = await addListener(automationId, listener, prompt, reply);
    if (create) return { status: 200, data: "Listener Created" };
    return { status: 404, data: "Could not create listener" };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

export const saveTrigger = async (automationId: string, trigger: string[]) => {
  await onCurrentUser();
  try {
    const create = await addTrigger(automationId, trigger);
    if (create) return { status: 200, data: "Trigger Saved" };
    return { status: 404, data: "Could not create trigger" };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

export const saveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser();
  try {
    const create = await addKeyword(automationId, keyword);
    if (create) return { status: 200, data: "Keywords Saved successfully" };
    return { status: 404, data: "Could not save keywords" };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteKeyword = async (id: string) => {
  await onCurrentUser();
  try {
    const deleted = await deleteKeyWordQuery(id);
    if (deleted) return { status: 200, data: "Keyword Deleted successfully" };
    return { status: 404, data: "Could not delete keyword" };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getProfilePosts = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user.id);
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
    );

    const parsed = await posts.json();
    if (parsed) return { status: 200, data: parsed };
    console.log("No posts found");
    return { status: 404 };
  } catch (error) {
    console.log("Error fetching posts:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

// Save Posts
export const savePosts = async (
  automationId: string,
  posts: {
    postid: string;
    caption?: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM"; //corrected typo from 'CAROSEL_ALBUM' to 'CAROUSEL_ALBUM'
  }[]
) => {
  await onCurrentUser();
  try {
    const create = await addPost(automationId, posts);
    if (create) return { status: 200, data: "Posts attached successfully" };
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

export const activateAutomation = async (id: string, state: boolean) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(id, { active: state });
    if (update)
      return {
        status: 200,
        data: `Automation ${state ? "activated" : "disabled"}`,
      };
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};
