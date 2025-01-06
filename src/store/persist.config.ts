import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PetsState } from "./features/petSlice";

export const petPersistConfig: PersistConfig<PetsState> = {
  key: "pets",
  storage,
};
