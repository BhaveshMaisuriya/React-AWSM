import RedAlertIcon from "assets/images/AWSM-Red-Alert.svg"
import YellowAlertIcon from "assets/images/AWSM-Soft-Overrule.svg"
import customiseTableBankIcon from "assets/images/AWSM-Customise-Table-Bank.svg"
import customiseAddIcon from "assets/images/AWSM-Add-Order.svg"
import customiseCrossTerminalIcon from "assets/images/AWSM-Cross-Terminal.svg"
import customiseMultipleDNIcon from "assets/images/AWSM-Multiple-DN.svg"
import customiseUploadIcon from "assets/images/AWSM-Upload-RTS.svg"
import customiseMultipleDeleteOrderIcon from "assets/images/AWSM-Trash-Icon-RTS.svg"

export const GanttChartBottom = [
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

export const GanttChartBottomHover = [
  {
    title: "Terminal",
    color: "blue",
  },
  {
    title: "Station retail",
    color: "light-sky",
  },
  {
    title: "station commercial",
    color: "green",
  },
]

export const GanttChartFilterButtons = [
  {
    label: "Backlog",
    value: "backlog",
  },
  {
    label: "Future",
    value: "future",
  },
  {
    label: "Special Request",
    value: "request",
  },
  {
    label: "High Priority",
    value: "high",
  },
]

export const orderBankSettings = [
  {
    disabled: false,
    value: "newOrder",
    label: "Add New Order",
    icon: customiseAddIcon,
  },
  {
    disabled: false,
    value: "customizeCol",
    label: "Customize Column",
    icon: customiseTableBankIcon,
  },
  {
    disabled: false,
    value: "uploadDmr",
    label: "Upload DMR",
    icon: customiseUploadIcon,
  },

  // {disabled: false, 'value': 'RefreshDN', 'label': 'Refresh Blocked DN', 'icon' : customiseTableIcon },
  {
    disabled: true,
    value: "CrossTerminal",
    label: "Cross Terminal",
    icon: customiseCrossTerminalIcon,
  },
  {
    disabled: true,
    value: "SendDN",
    label: "Send Multiple for DN",
    icon: customiseMultipleDNIcon,
  },
  {
    disabled: true,
    value: "DeleteMultiple",
    label: "Delete Multiple Order",
    icon: customiseMultipleDeleteOrderIcon,
  },
]
export const orderBankStatus = [
  {
    value: "unscheduled",
    label: "Unscheduled",
  },
  {
    value: "scheduled",
    label: "Scheduled",
  },
  {
    value: "all",
    label: "All",
  },
]
export const deleteCheckOption = [
  {
    id: 0,
    title: "Manual Scheduling",
    checked: true,
  },
  {
    id: 1,
    title: "Auto Scheduling",
    checked: false,
  },
]