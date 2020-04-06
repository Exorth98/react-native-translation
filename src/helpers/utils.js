
// Search subObject from path
const getSubObject = (obj, path) => {
    var paths = path.split('.');
    let current = obj;
    for (i = 0; i < paths.length; i++)
      if (current[paths[i]] != undefined)current = current[paths[i]];
      else return undefined;
    return current;
};

export { getSubObject }