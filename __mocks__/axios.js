const get = url => {
    return Promise.resolve({ data: {title: ''} }); //retorno um objeto "data", com outro objeto dentro
};

exports.get = get;