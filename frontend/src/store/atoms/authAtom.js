import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const accessTokenAtom = atomWithStorage("accessToken", null);
export const userAtom = atomWithStorage("user", null);

export const isAuthenticatedAtom = atom(
  (get) => get(accessTokenAtom) !== null && get(userAtom) !== null,
);

export const authLoadingAtom = atom(false);
export const authErrorAtom = atom(null);
