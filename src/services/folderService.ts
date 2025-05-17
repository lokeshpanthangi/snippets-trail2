
import { supabase } from '@/integrations/supabase/client';
import { Folder } from '../types/Folder';

export async function getFolders(): Promise<Folder[]> {
  const { data, error } = await supabase
    .from('folders')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching folders:', error);
    return [];
  }

  // Get snippet counts for each folder
  const folderData: Folder[] = await Promise.all(
    data.map(async (folder) => {
      const { count, error: countError } = await supabase
        .from('folder_snippets')
        .select('*', { count: 'exact', head: true })
        .eq('folder_id', folder.id);

      return {
        ...folder,
        snippetCount: countError ? 0 : count || 0,
        subfolders: [],
      };
    })
  );

  // Organize into folder hierarchy
  const rootFolders: Folder[] = [];
  const folderMap: Record<string, Folder> = {};

  // First pass: Create a map of all folders
  folderData.forEach(folder => {
    folderMap[folder.id] = folder;
  });

  // Second pass: Organize into hierarchy
  folderData.forEach(folder => {
    if (folder.parent_folder_id === null) {
      rootFolders.push(folder);
    } else {
      const parent = folderMap[folder.parent_folder_id];
      if (parent) {
        if (!parent.subfolders) {
          parent.subfolders = [];
        }
        parent.subfolders.push(folder);
      }
    }
  });

  return rootFolders;
}

export async function createFolder(name: string, parentFolderId: string | null = null): Promise<Folder | null> {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  
  if (!userId) {
    console.error('User not authenticated');
    return null;
  }

  const { data, error } = await supabase
    .from('folders')
    .insert({
      name,
      parent_folder_id: parentFolderId,
      user_id: userId
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating folder:', error);
    return null;
  }

  return {
    ...data,
    snippetCount: 0,
    subfolders: [],
  };
}

export async function updateFolder(id: string, name: string): Promise<boolean> {
  const { error } = await supabase
    .from('folders')
    .update({ name })
    .eq('id', id);

  if (error) {
    console.error('Error updating folder:', error);
    return false;
  }

  return true;
}

export async function deleteFolder(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('folders')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting folder:', error);
    return false;
  }

  return true;
}

export async function addSnippetToFolder(folderId: string, snippetId: string): Promise<boolean> {
  const { error } = await supabase
    .from('folder_snippets')
    .insert({
      folder_id: folderId,
      snippet_id: snippetId
    });

  if (error) {
    console.error('Error adding snippet to folder:', error);
    return false;
  }

  return true;
}

export async function removeSnippetFromFolder(folderId: string, snippetId: string): Promise<boolean> {
  const { error } = await supabase
    .from('folder_snippets')
    .delete()
    .eq('folder_id', folderId)
    .eq('snippet_id', snippetId);

  if (error) {
    console.error('Error removing snippet from folder:', error);
    return false;
  }

  return true;
}
