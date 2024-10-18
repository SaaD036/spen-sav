const getNameFilterObject = (name, concatArray) => {
    return {
        $regexMatch: {
            input: {
                $concat: concatArray,
            },
            regex: `.*${name.trim()}.*`,
            options: 'i',
        }
    };
};

module.exports = {
    getNameFilterObject,
}