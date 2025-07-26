import { atom } from "jotai";

export const globalLoadingAtom = atom(false);
export const globalErrorAtom = atom(null);
export const isAddTodoModalOpenAtom = atom(false);
export const isEditModalOpenAtom = atom(false);
export const editingTodoAtom = atom(null);
