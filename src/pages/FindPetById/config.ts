import { IPet, Status } from "../../types/types";

export const initialData: IPet[] = [
  {
    id: 0,
    category: {
      id: 0,
      name: "string",
    },
    name: "doggie",
    photoUrls: ["string"],
    tags: [
      {
        id: 0,
        name: "string",
      },
    ],
    status: Status.AVAILABLE,
  },
];
