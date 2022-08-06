import { selector } from "recoil";
import { nameState } from "../atoms/name";

export const lengthState = selector({
  key: "lengthState",
  get: ({ get }) => {
    const name = get(nameState);
    const LengthOfName = name.length;
    return LengthOfName;
  },
});
