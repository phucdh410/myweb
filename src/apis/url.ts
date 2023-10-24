export const FILES = {
  UPLOAD: '/files/upload',
};

export const PERMISSIONS = {
  GET_LIST: '/permissions',
};

export const AUTH = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFETCH_TOKEN: '/auth/refresh',
  DECODE: '/auth/decode',
  GET_PROFILE: '/auth/get-profile',
};

export const USERS = {
  CREATE: '/users/create',
  GET_LIST: '/users/getAll',
  GET_DETAIL: '/users/getById',
  UPDATE: '/users/update',
  DELETE: '/users/delete',
};

export const BANNERS = {
  CREATE: '/banners',
  GET_LIST: '/banners/all',
  GET_DETAIL: '/banners', // :id
  UPDATE: '/banners', // :id
  DELETE: '/banners', // :id
};

export const NOTIFICATIONS = {
  CREATE: '/notifications',
  GET_LIST: '/notifications/all',
  GET_DETAIL: '/notifications', // :id
  UPDATE: '/notifications', // :id
  DELETE: '/notifications', // :id
};

export const EVENTS = {
  CREATE: '/events',
  GET_LIST: '/events/all',
  GET_DETAIL: '/events', // :id
  UPDATE: '/events', // :id
  DELETE: '/events', // :id
};

export const LINKS = {
  CREATE: '/links',
  GET_DETAIL: '/links',
  UPDATE: '/links',
};

export const SECTION_GROUPS = {
  CREATE: '/section-groups',
  GET_LIST:
    '/categorys/getByIdCategoryAdmin?locale=vi&_id=650d4586b863d30bbda054a1',
  GET_DEPARTMENTS: '/categorys/getByIdCategoryAdmin',
};

export const DEPARTMENTS = {
  CREATE: '/departments',
  GET_LIST: '/departments/all',
  GET_DETAIL: '/department/getDepartmentAdmin',
  UPDATE: '/departments',
  DELETE: '/departments',

  GET_DETAIL_INTRODUCE: '/department/getByIdIntroduce',
  CREATE_INTRODUCE: '/department/createIntroduce',
  UPDATE_INTRODUCE: '/department/updateIntroduce',

  GET_DETAIL_LECTURER_QUALITY: '/department/getByIdLecturerQuality',
  CREATE_LECTURER_QUALITY: '/department/createLecturerQuality',
  UPDATE_LECTURER_QUALITY: '/department/updateLecturerQuality',

  GET_DETAIL_EDUCATION_QUALITY: '/department/getByIdEducationQuality',
  CREATE_EDUCATION_QUALITY: '/department/createEducationQuality',
  UPDATE_EDUCATION_QUALITY: '/department/updateEducationQuality',

  GET_DETAIL_TRAINING_GOALS: '/department/getByIdTrainingGoals',
  CREATE_TRAINING_GOALS: '/department/createTrainingGoals',
  UPDATE_TRAINING_GOALS: '/department/updateTrainingGoals',

  GET_DETAIL_CONTACT: '/department/getByIdContact',
  CREATE_CONTACT: '/department/createContact',
  UPDATE_CONTACT: '/department/updateContact',

  CREATE_TIMELINE: '/department/createTimeline',
  GET_BY_ID_TIMELINE: '/department/getByIdTimeline',
  UPDATE_TIMELINE: '/department/updateTimeline',
  DELETE_TIMELINE: '/department/deleteTimeline',

  CREATE_TRAINING_SECTOR: '/department/createTrainingSectors',
  GET_BY_ID_TRAINING_SECTOR: '/department/getByIdTrainingSectors',
  UPDATE_TRAINING_SECTOR: '/department/updateTrainingSectors',
  DELETE_TRAINING_SECTOR: '/department/deleteTrainingSectors',

  CREATE_ORGANIZATIONAL_STRUCTURE: '/department/createOrganizationalStructure',
  GET_BY_ID_ORGANIZATIONAL_STRUCTURE:
    '/department/getByIdOrganizationalStructure',
  UPDATE_ORGANIZATIONAL_STRUCTURE: '/department/updateOrganizationalStructure',
  DELETE_ORGANIZATIONAL_STRUCTURE: '/department/deleteOrganizationalStructure',

  CREATE_SUBJECT: '/department/createSubject',
  GET_BY_ID_SUBJECT: '/department/getByIdSubject',
  UPDATE_SUBJECT: '/department/updateSubject',
  DELETE_SUBJECT: '/department/deleteSubject',

  CREATE_ACTIVE: '/department/createActive',
  GET_BY_ID_ACTIVE: '/department/getByIdActive',
  UPDATE_ACTIVE: '/department/updateActive',
  DELETE_ACTIVE: '/department/deleteActive',

  CREATE_LEADERSHIP: '/department/createLeadershipThroughTheAges',
  GET_BY_ID_LEADERSHIP: '/department/getByIdLeadershipThroughTheAges',
  UPDATE_LEADERSHIP: '/department/updateLeadershipThroughTheAges',
  DELETE_LEADERSHIP: '/department/deleteLeadershipThroughTheAges',
};

export const DEPARTMENT_FUNCTIONS = {
  CREATE: '/categorys',
  GET_LIST: '/categorys/getByIdCategoryAdmin',
  GET_DETAIL: '/categorys',
  UPDATE: '/categorys',
  DELETE: '/categorys',
  GET_INFO: '/department_function/getDepartmentFunctionAdmin',

  GET_DETAIL_MISSION: '/department_function/getByIdFunctionMission',
  CREATE_MISSION: '/department_function/createFunctionMission',
  UPDATE_MISSION: '/department_function/updateFunctionMission',

  GET_DETAIL_CONTACT: '/department_function/getByIdContact',
  CREATE_CONTACT: '/department_function/createContact',
  UPDATE_CONTACT: '/department_function/updateContact',

  CREATE_TIMELINE: '/department_function/createTimeline',
  GET_BY_ID_TIMELINE: '/department_function/getByIdTimeline',
  UPDATE_TIMELINE: '/department_function/updateTimeline',
  DELETE_TIMELINE: '/department_function/deleteTimeline',

  CREATE_ORGANIZATIONAL_STRUCTURE:
    '/department_function/createOrganizationalStructure',
  GET_BY_ID_ORGANIZATIONAL_STRUCTURE:
    '/department_function/getByIdOrganizationalStructure',
  UPDATE_ORGANIZATIONAL_STRUCTURE:
    '/department_function/updateOrganizationalStructure',
  DELETE_ORGANIZATIONAL_STRUCTURE:
    '/department_function/deleteOrganizationalStructure',

  CREATE_ACTIVE: '/department_function/createActive',
  GET_BY_ID_ACTIVE: '/department_function/getByIdActive',
  UPDATE_ACTIVE: '/department_function/updateActive',
  DELETE_ACTIVE: '/department_function/deleteActive',

  CREATE_LEADERSHIP: '/department_function/createLeadershipThroughTheAges',
  GET_BY_ID_LEADERSHIP: '/department_function/getByIdLeadershipThroughTheAges',
  UPDATE_LEADERSHIP: '/department_function/updateLeadershipThroughTheAges',
  DELETE_LEADERSHIP: '/department_function/deleteLeadershipThroughTheAges',

  CREATE_INTRODUCE: '/department_function/createIntroduce',
  UPDATE_INTRODUCE: '/department_function/updateIntroduce',
};

export const INSTITUTES = {
  CREATE: '/categorys',
  GET_LIST: '/categorys/getByIdCategoryAdmin',
  GET_DETAIL: '/categorys',
  UPDATE: '/categorys',
  DELETE: '/categorys',
  GET_INFO: '/centers_institutes/getCentersInstitutesAdmin',

  GET_DETAIL_MISSION: '/centers_institutes/getByIdFunctionMission',
  CREATE_MISSION: '/centers_institutes/createFunctionMission',
  UPDATE_MISSION: '/centers_institutes/updateFunctionMission',

  GET_DETAIL_CONTACT: '/centers_institutes/getByIdContact',
  CREATE_CONTACT: '/centers_institutes/createContact',
  UPDATE_CONTACT: '/centers_institutes/updateContact',

  CREATE_TIMELINE: '/centers_institutes/createTimeline',
  GET_BY_ID_TIMELINE: '/centers_institutes/getByIdTimeline',
  UPDATE_TIMELINE: '/centers_institutes/updateTimeline',
  DELETE_TIMELINE: '/centers_institutes/deleteTimeline',

  CREATE_ORGANIZATIONAL_STRUCTURE:
    '/centers_institutes/createOrganizationalStructure',
  GET_BY_ID_ORGANIZATIONAL_STRUCTURE:
    '/centers_institutes/getByIdOrganizationalStructure',
  UPDATE_ORGANIZATIONAL_STRUCTURE:
    '/centers_institutes/updateOrganizationalStructure',
  DELETE_ORGANIZATIONAL_STRUCTURE:
    '/centers_institutes/deleteOrganizationalStructure',

  CREATE_ACTIVE: '/centers_institutes/createActive',
  GET_BY_ID_ACTIVE: '/centers_institutes/getByIdActive',
  UPDATE_ACTIVE: '/centers_institutes/updateActive',
  DELETE_ACTIVE: '/centers_institutes/deleteActive',

  CREATE_LEADERSHIP: '/centers_institutes/createLeadershipThroughTheAges',
  GET_BY_ID_LEADERSHIP: '/centers_institutes/getByIdLeadershipThroughTheAges',
  UPDATE_LEADERSHIP: '/centers_institutes/updateLeadershipThroughTheAges',
  DELETE_LEADERSHIP: '/centers_institutes/deleteLeadershipThroughTheAges',

  CREATE_INTRODUCE: '/centers_institutes/createIntroduce',
  UPDATE_INTRODUCE: '/centers_institutes/updateIntroduce',
};

export const PARTIES = {
  CREATE: '/categorys/createCategory',
  GET_LIST:
    '/categorys/getByIdCategoryAdmin?locale=vi&_id=650d45f3b863d30bbda054ad',
  GET_DETAIL: '/categorys/getByIdCategoryAdmin',
  UPDATE: '/categorys/updateCategory',
  DELETE: '/categorys/deleteCategory',
};

export const COMMITTEES = {
  CREATE: '/categorys/createCategory',
  GET_LIST:
    '/categorys/getByIdCategoryAdmin?locale=vi&_id=6524c3fe23fad6cdc81ab845',
  GET_DETAIL: '/categorys/getByIdCategoryAdmin',
  UPDATE: '/categorys/updateCategory',
  DELETE: '/categorys/deleteCategory',
};

export const CATEGORIES = {
  CREATE: '/categorys/createCategory',
  GET_LIST: '/categorys/getAllCategory',
  GET_DETAIL: '/categorys/getByIdCategoryAdmin',
  UPDATE: '/categorys/updateCategory',
  DELETE: '/categorys/deleteCategory',
  GET_TREE: '/categorys/getAllCategoryByCreateBlogs',
};

export const MENUS = {
  CREATE: '/categorys/createMenu',
  GET_LIST: '/categorys/getAllMenu',
  GET_DETAIL: '/categorys/getByIdMenuForAdmin',
  UPDATE: '/categorys/updateMenu',
  DELETE: '/categorys/deleteMenu',
};

export const POSTS = {
  CREATE_BLOG: '/posts/blog',
  CREATE_ORG: '/posts/org',
  CREATE_REF: '/posts/ref',
  GET_LIST: '/posts/all',
  GET_DETAIL_BLOG: '/posts/blog', // :id
  GET_DETAIL_ORG: '/posts/org', // :id
  GET_DETAIL_REF: '/posts/ref', // :id
  UPDATE_BLOG: '/posts/blog', // :id
  UPDATE_ORG: '/posts/org', // :id
  UPDATE_REF: '/posts/ref', // :id
  DELETE_BLOG: '/posts/blog', // :id
  DELETE_ORG: '/posts/org', // :id
  DELETE_REF: '/posts/ref', // :id
};

export const SCHEDULES = {
  GET_LIST: '/working_schedule/getAll',
  CREATE: '/working_schedule/create',
  GET_DETAIL: '/working_schedule/getByIdAdmin',
  UPDATE: '/working_schedule/update',
  DELETE: '/working_schedule/delete',
};

export const APPROVE = {
  GET_LIST: '/approve/all',
};

export const EMPLOYEES = {
  GET_LIST: '/personnels/getAll',
  GET_DEGREE: '/personnels/getAllDegree',
  CREATE: '/personnels/create',
  GET_DETAIL: '/personnels/getById',
  UPDATE: '/personnels/update',
  DELETE: '/personnels/delete',
};

export const POSITIONS = {
  GET_POSITIONS: '/position/getAll',
  CREATE: '/position/create',
  GET_BY_ID: '/position/getById',
  UPDATE: '/position/update',
  DELETE: '/position/delete',
};

export const FOOTER = {
  GET_FOOTER_LEFT: '/footer_feft/getFooterLeftAdmin',
  GET_FOOTER_RIGHT: '/footer_right/getFooterRightAdmin',
  GET_FOOTER_RIGHT_SUB: '/footer_right_sub/getFooterRightSubAdmin',
  GET_FOOTER: '/footer',
  CREATE: '/footer',
  CREATE_FOOTER_RIGHT: '/footer_right/create',
  CREATE_FOOTER_RIGHT_SUB: '/footer_right_sub/create',
  UPDATE: '/footer',
  UPDATE_FOOTER_LEFT: '/footer_feft/update',
  UPDATE_FOOTER_RIGHT: '/footer_right/update',
  UPDATE_FOOTER_RIGHT_SUB: '/footer_right_sub/update',
  DELETE_FOOTER_RIGHT: '/footer_right/delete',
  DELETE_FOOTER_RIGHT_SUB: '/footer_right_sub/delete',
};

export const LANGUAGES = {
  CREATE: '/languages',
  GET_LIST: '/languages/all',
  UPDATE: '/languages', // :id
  DELETE: '/languages', // :id
  GET_ALL: '/languages',
};

export const BLOGS = {
  CREATE: '/blogs/create',
  GET_LIST: '/blogs/getAll',
  GET_BY_ID: '/blogs/getByIdAdmin',
  UPDATE: '/blogs/update',
  DELETE: '/blogs/delete',
};
