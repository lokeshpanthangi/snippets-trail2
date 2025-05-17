
export interface Folder {
  id: string;
  name: string;
  snippetCount?: number;
  subfolders?: Folder[];
  user_id?: string;
  parent_folder_id?: string | null;
}
