import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
// import ecommerceSaga from "./e-commerce/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import cryptoSaga from "./crypto/saga"
import invoiceSaga from "./invoices/saga"
import projectsSaga from "./projects/saga"
import tasksSaga from "./tasks/saga"
import contactsSaga from "./contacts/saga"
import retailCustomerSaga from "./retailCustomer/saga"
import commercialCustomerSaga from "./commercialCustomer/saga"
import productSaga from "./product/saga"
import msGraphSaga from "./ms-graph/saga"
import roadTankerSaga from "./roadTanker/saga"
import terminalSaga from "./terminal/saga"
import saleAndInventorySaga from "./salesAndInventory/saga"
import slaSaga from "./sla/saga"
import orderBankSaga from "./orderBank/saga"
import dqmCommonSaga from "./dqm/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    // fork(ecommerceSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    fork(retailCustomerSaga),
    fork(commercialCustomerSaga),
    fork(productSaga),
    fork(roadTankerSaga),
    fork(terminalSaga),
    fork(msGraphSaga),
    fork(saleAndInventorySaga),
    fork(slaSaga),
    fork(orderBankSaga),
    fork(dqmCommonSaga),
  ])
}