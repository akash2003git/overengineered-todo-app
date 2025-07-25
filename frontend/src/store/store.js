import { createStore } from "jotai";

export const jotaiStore = createStore();

export * from "./atoms/authAtom";
export * from "./atoms/todoAtom";
export * from "./atoms/uiAtom";
