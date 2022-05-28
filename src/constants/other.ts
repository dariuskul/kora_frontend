export const ADMIN_ROLES = ['admin'];
export const MODERATOR_ROLES = [...ADMIN_ROLES, 'moderator'];

export const NOTIFY_TIMES = [{ name: "Auto", value: -1000 }, { name: "10 s", value: 10000 }, { name: "20 s", value: 20000 }, { name: "1 min", value: 60000 }, { name: "1 hour", value: 3600000 }];