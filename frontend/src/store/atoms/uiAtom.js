import { atom } from "jotai";

export const globalLoadingAtom = atom(false);
export const globalErrorAtom = atom(null);
export const isEditModalOpenAtom = atom(false);
export const editingTodoAtom = atom(null);
