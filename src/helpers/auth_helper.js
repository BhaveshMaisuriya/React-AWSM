import { userRoleMapping } from "../common/data/userMapping"

export const isScheduler = () => {
    const userEmail = sessionStorage.getItem('userUPN')
    const userRole = userRoleMapping[userEmail]
    if (!userEmail || userEmail.length < 1 || !userRole || userRole.length < 1) return false
    return userRole === "scheduler"
}