export type Node = {
  id: string;
  name: string;
  type: "DIRECTORY" | "FILE";
  filePath: string | null;
  parent: {
    id: string;
  };
};
