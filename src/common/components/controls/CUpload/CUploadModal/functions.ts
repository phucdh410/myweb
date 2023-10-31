export const readDirectoryAsync = async (
  directoryEntry: FileSystemDirectoryEntry,
): Promise<File[]> => {
  return new Promise((resolve) => {
    const reader = directoryEntry.createReader();
    const _files: File[] = [];

    const readEntriesRecursively = async (entries: FileSystemEntry[]) => {
      for (const entry of entries) {
        if (entry.isFile) {
          const file = await readFileAsync(entry as FileSystemFileEntry);
          _files.push(file);
        } else if (entry.isDirectory) {
          const subDirectoryEntries = await readDirectoryAsync(
            entry as FileSystemDirectoryEntry,
          );
          _files.push(...subDirectoryEntries);
        }
      }

      resolve(_files);
    };

    reader.readEntries(async (entries: any) => {
      await readEntriesRecursively(entries);
    });
  });
};

export const readFileAsync = (
  fileEntry: FileSystemFileEntry,
): Promise<File> => {
  return new Promise((resolve) => {
    fileEntry.file((file) => {
      resolve(file);
    });
  });
};
