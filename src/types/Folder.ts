
export interface Folder {
  id: string;
  name: string;
  snippetCount: number;
  subfolders?: Folder[];
}
