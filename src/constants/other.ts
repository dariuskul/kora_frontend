export const ADMIN_ROLES = ['admin'];
export const MODERATOR_ROLES = [...ADMIN_ROLES, 'moderator'];

export const NOTIFY_TIMES = [{ name: "Auto", value: -1000 }, { name: "10 s", value: 10000 }, { name: "4 min", value: 240000 }, { name: "1 h", value: 3600000 }, { name: "8 h", value: 28800000 }];