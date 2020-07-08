const compose = (...funcs) => (comp) => {
    return funcs.reduceRight( (previousValue, f) => {
        return f(previousValue)
    }, comp )
};

export default compose;