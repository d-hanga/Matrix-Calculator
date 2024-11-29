function mapmap(mapobj, f) {
    let keys = Array.from(mapobj.keys());
    let l = new Array(mapobj.size);
    for (let i = 0; i < l.length; i++) {
        l[i] = f(keys[i], mapobj.get(keys[i]));
    }
    return l;
}

export default mapmap;