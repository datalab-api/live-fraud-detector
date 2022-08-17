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
    ADRESS_CRYPTED_FIND: 'crypted/get',

    DATASET_BASE: '/dataset',
    DATASET_CREATE: '/add',
    DATASET_FIND_ALL:'/list',
    DATA_FIND_BY_NAME : 'get',

    //non fraud 
    DATASET_BASE_NON_FRAUD :'/non-fraud',
    DATASET_NON_FRAUD_ADD: '/add',
    DATASET_NON_FRAUD_LIST: '/list',
    // fraud
    DATASET_BASE_FRAUD :'/fraud',
    DATASET_FRAUD_ADD: '/add',
    DATASET_FRAUD_LIST: '/list',

    // fraud2 
    DATASET_BASE_FRAUD2 :'/fraud2',
    DATASET_FRAUD2_ADD: '/add',
    DATASET_FRAUD2_LIST: '/list'

}