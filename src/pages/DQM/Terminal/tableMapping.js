const tableColumns = ["code", "name", "remarks"]

const tableMapping = {
  code: {
    label: "TERMINAL CODE",
    apiKey: "code",
    columnSize: 1,
  },
  name: {
    label: "TERMINAL NAME",
    apiKey: "name",
    columnSize: 2,
  },
  remarks: {
    label: "REMARKS",
    apiKey: "remarks",
    columnSize: 2,
  },
  address: {
    label: "ADDRESS",
    apiKey: "address",
    columnSize: 2,
  },
  address: {
    label: "ADDRESS",
    apiKey: "address",
    columnSize: 2,
  },
}

export { tableMapping, tableColumns }
