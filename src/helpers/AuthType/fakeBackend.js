import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import * as url from "../url_helper"
import accessToken from "../jwt-token-access/accessToken"
import {
  calenderDefaultCategories,
  cartData,
  chats,
  comments,
  contacts,
  cryptoOrders,
  customerData,
  events,
  groups,
  invoiceList,
  messages,
  orders,
  productsData,
  projects,
  recentProducts,
  shops,
  tasks,
  userProfile,
  users as members,
  wallet,
  retailCustomers,
  audits,
  auditsCom,
  address,
  customerPayload,
  filter,
  filterCom,
  filterRoadTanker,
  filterTerminal,
  commercialCustomers,
  productList,
  auditsRoadTanker,
  roadTanker,
  terminal,
  auditsTerminal,
} from "../../common/data"

import { axiosApi } from "../api_helper"

let users = [
  {
    uid: 1,
    username: "sunny",
    role: "admin",
    password: "123456",
    email: "admin@petronas.com",
  },
]

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosApi)

  mock.onPost("/post-fake-register").reply(config => {
    const user = JSON.parse(config["data"])
    users.push(user)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user])
      })
    })
  })

  mock.onPost("/post-fake-login").reply(config => {
    const user = JSON.parse(config["data"])
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    )

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          resolve([200, validUser[0]])
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ])
        }
      })
    })
  })

  mock.onPost("/fake-forget-pwd").reply(config => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."])
      })
    })
  })

  mock.onPost("/post-jwt-register").reply(config => {
    const user = JSON.parse(config["data"])
    users.push(user)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user])
      })
    })
  })

  mock.onPost("/post-jwt-login").reply(config => {
    const user = JSON.parse(config["data"])
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    )

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken

          // JWT AccessToken
          const tokenObj = { accessToken: token } // Token Obj
          const validUserObj = { ...validUser[0], ...tokenObj } // validUser Obj

          resolve([200, validUserObj])
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ])
        }
      })
    })
  })

  mock.onPost("/post-jwt-profile").reply(config => {
    const user = JSON.parse(config["data"])

    const one = config.headers

    let finalToken = one.Authorization

    const validUser = users.filter(usr => usr.uid === user.idx)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex

            //Find index of specific object using findIndex method.
            objIndex = users.findIndex(obj => obj.uid === user.idx)

            //Update object's name property.
            users[objIndex].username = user.username

            // Assign a value to locastorage
            localStorage.removeItem("authUser")
            localStorage.setItem("authUser", JSON.stringify(users[objIndex]))

            resolve([200, "Profile Editted successfully"])
          } else {
            reject([400, "Something wrong for edit profile"])
          }
        } else {
          reject([400, "Invalid Token !!"])
        }
      })
    })
  })

  mock.onPost("/post-fake-profile").reply(config => {
    const user = JSON.parse(config["data"])

    const validUser = users.filter(usr => usr.uid === user.idx)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          let objIndex

          //Find index of specific object using findIndex method.
          objIndex = users.findIndex(obj => obj.uid === user.idx)

          //Update object's name property.
          users[objIndex].username = user.username

          // Assign a value to locastorage
          localStorage.removeItem("authUser")
          localStorage.setItem("authUser", JSON.stringify(users[objIndex]))

          resolve([200, "Profile Editted successfully"])
        } else {
          reject([400, "Something wrong for edit profile"])
        }
      })
    })
  })

  mock.onPost("/jwt-forget-pwd").reply(config => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."])
      })
    })
  })

  mock.onPost("/social-login").reply(config => {
    const user = JSON.parse(config["data"])

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.token) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken

          // JWT AccessToken
          const tokenObj = { accessToken: token } // Token Obj
          const validUserObj = { ...user[0], ...tokenObj } // validUser Obj

          resolve([200, validUserObj])
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ])
        }
      })
    })
  })

  // mock.onGet(url.GET_PRODUCTS).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (productsData) {
  //         // Passing fake JSON data as response
  //         resolve([200, productsData])
  //       } else {
  //         reject([400, "Cannot get products"])
  //       }
  //     })
  //   })
  // })

  // mock.onGet(new RegExp(`${url.GET_PRODUCTS_DETAIL}/*`)).reply(config => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (productsData) {
  //         // Passing fake JSON data as response
  //         const { params } = config
  //         const product = productsData.find(
  //           product => product.id.toString() === params.id
  //         )
  //         resolve([200, { ...product, recentProducts, comments }])
  //       } else {
  //         reject([400, "Cannot get product detail"])
  //       }
  //     })
  //   })
  // })

  mock.onGet(url.GET_EVENTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (events) {
          // Passing fake JSON data as response
          resolve([200, events])
        } else {
          reject([400, "Cannot get events"])
        }
      })
    })
  })

  mock.onPost(url.ADD_NEW_EVENT).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data])
        } else {
          reject([400, "Cannot add event"])
        }
      })
    })
  })

  mock.onPut(url.UPDATE_EVENT).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data])
        } else {
          reject([400, "Cannot update event"])
        }
      })
    })
  })

  mock.onDelete(url.DELETE_EVENT).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event])
        } else {
          reject([400, "Cannot delete event"])
        }
      })
    })
  })

  mock.onGet(url.GET_CATEGORIES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (calenderDefaultCategories) {
          // Passing fake JSON data as response
          resolve([200, calenderDefaultCategories])
        } else {
          reject([400, "Cannot get categories"])
        }
      })
    })
  })

  mock.onGet(url.GET_CHATS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (chats) {
          // Passing fake JSON data as response
          resolve([200, chats])
        } else {
          reject([400, "Cannot get chats"])
        }
      })
    })
  })

  mock.onGet(url.GET_GROUPS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (groups) {
          // Passing fake JSON data as response
          resolve([200, groups])
        } else {
          reject([400, "Cannot get groups"])
        }
      })
    })
  })

  mock.onGet(url.GET_CONTACTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (contacts) {
          // Passing fake JSON data as response
          resolve([200, contacts])
        } else {
          reject([400, "Cannot get contacts"])
        }
      })
    })
  })

  mock.onGet(new RegExp(`${url.GET_MESSAGES}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (messages) {
          // Passing fake JSON data as response
          const { params } = config
          const filteredMessages = messages.filter(
            msg => msg.roomId === params.roomId
          )
          resolve([200, filteredMessages])
        } else {
          reject([400, "Cannot get messages"])
        }
      })
    })
  })

  mock.onPost(url.ADD_MESSAGE).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config.data) {
          // Passing fake JSON data as response
          resolve([200, config.data])
        } else {
          reject([400, "Cannot add message"])
        }
      })
    })
  })

  mock.onGet(url.GET_ORDERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (orders) {
          // Passing fake JSON data as response
          resolve([200, orders])
        } else {
          reject([400, "Cannot get orders"])
        }
      })
    })
  })

  mock.onGet(url.GET_CART_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cartData) {
          // Passing fake JSON data as response
          resolve([200, cartData])
        } else {
          reject([400, "Cannot get cart data"])
        }
      })
    })
  })

  mock.onGet(url.GET_CUSTOMERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (customerData) {
          // Passing fake JSON data as response
          resolve([200, customerData])
        } else {
          reject([400, "Cannot get customers data"])
        }
      })
    })
  })

  mock.onGet(url.GET_SHOPS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shops) {
          // Passing fake JSON data as response
          resolve([200, shops])
        } else {
          reject([400, "Cannot get shops data"])
        }
      })
    })
  })

  mock.onGet(url.GET_WALLET).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (wallet) {
          // Passing fake JSON data as response
          resolve([200, wallet])
        } else {
          reject([400, "Cannot get wallet data"])
        }
      })
    })
  })

  mock.onGet(url.GET_CRYPTO_ORDERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cryptoOrders) {
          // Passing fake JSON data as response
          resolve([200, cryptoOrders])
        } else {
          reject([400, "Cannot get orders"])
        }
      })
    })
  })

  mock.onGet(url.GET_INVOICES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (invoiceList) {
          // Passing fake JSON data as response
          resolve([200, invoiceList])
        } else {
          reject([400, "Cannot get invoices"])
        }
      })
    })
  })

  mock.onGet(new RegExp(`${url.GET_INVOICE_DETAIL}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (invoiceList) {
          // Passing fake JSON data as response
          const { params } = config
          const invoice = invoiceList.find(
            invoice => invoice.id.toString() === params.id.toString()
          )
          resolve([200, invoice])
        } else {
          reject([400, "Cannot get invoice"])
        }
      })
    })
  })

  mock.onGet(url.GET_PROJECTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (projects) {
          // Passing fake JSON data as response
          resolve([200, projects])
        } else {
          reject([400, "Cannot get projects"])
        }
      })
    })
  })

  mock.onGet(new RegExp(`${url.GET_PROJECT_DETAIL}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (projects) {
          // Passing fake JSON data as response
          const { params } = config
          const project = projects.find(
            project => project.id.toString() === params.id.toString()
          )
          resolve([200, project])
        } else {
          reject([400, "Cannot get project detail"])
        }
      })
    })
  })

  mock.onGet(url.GET_TASKS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (tasks) {
          // Passing fake JSON data as response
          resolve([200, tasks])
        } else {
          reject([400, "Cannot get tasks"])
        }
      })
    })
  })

  mock.onGet(url.GET_USERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (members) {
          // Passing fake JSON data as response
          resolve([200, members])
        } else {
          reject([400, "Cannot get users"])
        }
      })
    })
  })

  mock.onGet(url.GET_USER_PROFILE).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userProfile) {
          // Passing fake JSON data as response
          resolve([200, userProfile])
        } else {
          reject([400, "Cannot get user profile"])
        }
      })
    })
  })

  mock.onGet(url.GET_RETAIL_CUSTOMER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (retailCustomers) {
          // Passing fake JSON data as response
          resolve([200, retailCustomers])
        } else {
          reject([400, "Cannot get user profile"])
        }
      })
    })
  })

  mock.onGet(url.GET_COMMERCIAL_CUSTOMER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (commercialCustomers) {
          // Passing fake JSON data as response
          resolve([200, commercialCustomers])
        } else {
          reject([400, "Cannot get user profile"])
        }
      })
    })
  })
  mock.onGet(url.GET_PRODUCTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (productList) {
          // Passing fake JSON data as response
          resolve([200, productList])
        } else {
          reject([400, "Cannot get products"])
        }
      })
    })
  })
  mock.onGet(url.GET_ROADTANKER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (roadTanker) {
          // Passing fake JSON data as response
          resolve([200, roadTanker])
        } else {
          reject([400, "Cannot get user profile"])
        }
      })
    })
  })

  mock.onGet(url.GET_TERMINAL).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (terminal) {
          // Passing fake JSON data as response
          resolve([200, terminal])
        } else {
          reject([400, "Cannot get user profile"])
        }
      })
    })
  })

  mock.onGet(url.GET_ROADTANKER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (roadTanker) {
          // Passing fake JSON data as response
          resolve([200, roadTanker])
        } else {
          reject([400, "Cannot get user profile"])
        }
      })
    })
  })

  mock.onGet(url.GET_RETAIL_AUDITLOG).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (audits) {
          // Passing fake JSON data as response
          resolve([200, audits])
        } else {
          reject([400, "Cannot get audit data"])
        }
      })
    })
  })

  mock.onGet(url.GET_PRODUCT_AUDITLOG).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (audits) {
          // Passing fake JSON data as response
          resolve([200, audits])
        } else {
          reject([400, "Cannot get audit data"])
        }
      })
    })
  })

  mock.onGet(url.GET_COMMERCIAL_AUDITLOG).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (auditsCom) {
          // Passing fake JSON data as response
          resolve([200, auditsCom])
        } else {
          reject([400, "Cannot get audit data"])
        }
      })
    })
  })
  mock.onGet(new RegExp(`${url.GET_RETAIL_CUSTOMER_DETAIL}/*`)).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (retailCustomers) {
          // Passing fake JSON data as response
          resolve([200, retailCustomers.list[0]])
        } else {
          reject([400, "Cannot get retail customer details"])
        }
      }, 500)
    })
  })

  mock.onPut(url.UPDATE_TABLE_INFORMATION).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data])
        } else {
          reject([400, "Cannot update table information"])
        }
      })
    })
  })

  mock.onGet(url.GET_RETAIL_FILTER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (filter) {
          // Passing fake JSON data as response
          resolve([200, filter])
        } else {
          reject([400, "Cannot get filter data"])
        }
      })
    })
  })

  mock.onGet(url.GET_PRODUCT_FILTER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (filter) {
          // Passing fake JSON data as response
          resolve([200, filter])
        } else {
          reject([400, "Cannot get filter data"])
        }
      })
    })
  })

  mock.onGet(url.GET_COMMERCIAL_FILTER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (filterCom) {
          // Passing fake JSON data as response
          resolve([200, filterCom])
        } else {
          reject([400, "Cannot get filter commercial data"])
        }
      })
    })
  })

  mock.onGet(url.GET_ROADTANKER_FILTER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (filterRoadTanker) {
          // Passing fake JSON data as response
          resolve([200, filterRoadTanker])
        } else {
          reject([400, "Cannot get filter road tanker data"])
        }
      })
    })
  })
  mock.onGet(url.GET_TERMINAL_FILTER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (filterTerminal) {
          // Passing fake JSON data as response
          resolve([200, filterTerminal])
        } else {
          reject([400, "Cannot get filter terminal data"])
        }
      })
    })
  })
  mock.onGet(new RegExp(`${url.GET_PRODUCT_DETAILS}/*`)).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (productList) {
          // Passing fake JSON data as response
          resolve([200, productList.list[0]])
        } else {
          reject([400, "Failed to get Product Details"])
        }
      })
    })
  })

  mock
    .onGet(new RegExp(`${url.GET_COMMERCIAL_CUSTOMER_DETAIL}/*`))
    .reply(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (commercialCustomers) {
            // Passing fake JSON data as response
            resolve([200, commercialCustomers.list[0]])
          } else {
            reject([400, "Failed to get Product Details"])
          }
        }, 500)
      })
    })

  mock.onGet(url.GET_ROADTANKER_AUDITLOG).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (auditsRoadTanker) {
          // Passing fake JSON data as response
          resolve([200, auditsRoadTanker])
        } else {
          reject([400, "Cannot get audit data"])
        }
      })
    })
  })

  mock.onGet(url.GET_TERMINAL_AUDITLOG).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (auditsTerminal) {
          // Passing fake JSON data as response
          resolve([200, auditsTerminal])
        } else {
          reject([400, "Cannot get audit data"])
        }
      })
    })
  })

  mock
    .onPut(new RegExp(`${url.GET_COMMERCIAL_CUSTOMER_DETAIL}/*`))
    .reply(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (commercialCustomers) {
            // Passing fake JSON data as response
            resolve([200, commercialCustomers.list[0]])
          } else {
            reject([400, "Failed to get Product Details"])
          }
        }, 500)
      })
    })
}

export default fakeBackend
