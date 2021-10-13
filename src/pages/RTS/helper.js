
import RedAlertIcon from "./../../assets/images/AWSM-Red-Alert.svg"
import YellowAlertIcon from "./../../assets/images/AWSM-Soft-Overrule.svg"

const GanttChartBottom = [
  {
    title: "RT Availability",
    color: "light-sky",
  },
  {
    title: "Scheduled",
    color: "dark-sky",
  },
  {
    title: "Pending Shipment",
    color: "lavendar",
  },
  {
    title: "Shipment Created",
    color: "blue",
  },
  {
    title: "Cancellation",
    color: "grey",
  },
  {
    title: "Blocked DN",
    color: "light-red",
  },
  {
    title: "Soft Overrule",
    color: "",
    icon: YellowAlertIcon,
  },
  {
    title: "SAP Alert",
    color: "sap-stripes",
    icon: RedAlertIcon,
  },
]

export default GanttChartBottom