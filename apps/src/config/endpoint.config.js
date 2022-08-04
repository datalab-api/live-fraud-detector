module.exports = {
    endpoint: '/api/REST/services',
    version: '/v1',
    // endpoint auth
    AUTH_BASE: '/oauth/token',
    AUTH_SIGNUP: '/signup',
    AUTH_SIGNIN: '/login',

    //endpoint user 
    USER_BASE: '/user',
    USER_FIND_ALL: '/list',
    USER_CREATE: '/add',
    USER_FIND: '/get/:id',
    USER_UPDATE: '/edit/:id',
    USER_DELETE: '/delete/:id',

    ADRESS_BASE : '/adresse',
    ADRESS_CREATE : '/add',
    ADRESS_FIND_BY_CODE : 'get',
    ADRESS_FIND_ALL: '/list',
    ADRESS_CRYPTED_CREATE: 'crypted/add',
    ADRESS_CRYPTED_FIND: 'crypted/get'
}