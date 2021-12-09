import { userRoleMapping } from "../common/data/userMapping"
import jwt from "jwt-decode"

export const isScheduler = () => {
  var userEmail = sessionStorage.getItem("userUPN")
  if (!userEmail || userEmail.length < 1) {
    const authToken = sessionStorage.getItem("apiAccessToken")
    try {
      const decodedToken = jwt(authToken)
      userEmail = decodedToken.upn
    } catch (error) {}
  }
  const userRole = userRoleMapping[userEmail]
  if (!userEmail || userEmail.length < 1 || !userRole || userRole.length < 1) return true
  return userRole === "scheduler"
}
