export const getChildPath = (
  arr: any,
  selectedId: string,
  path: any = [],
): any => {
  for (let node of arr) {
    path.push(node);
    if (node.id === selectedId) {
      return path;
    }
    if (node.children) {
      path = getChildPath(node.children, selectedId, path);
      if (path[path.length - 1].id === selectedId) {
        return path;
      }
    }
    path.pop();
  }
  return path;
};
