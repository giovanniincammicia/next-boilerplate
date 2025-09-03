// https://www.better-auth.com/docs/plugins/admin#custom-permissions
import { createAccessControl } from "better-auth/plugins/access";

const defaultPermissions = {
	project: [],
};
const statement = {
	...defaultPermissions,
} as const;

export const ac = createAccessControl(statement);
export const admin = ac.newRole(defaultPermissions);
export const user = ac.newRole(defaultPermissions);
