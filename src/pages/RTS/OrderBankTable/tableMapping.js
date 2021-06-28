const tableColumns = [
    "priority",
    "ship_to",
    "name",
    "cloud",
    "trip",
    "delivery_date",
    "product",
    "volume",
    "retain",
    "runout",
    "product_category",
    "dn_status",
    "split_id",
    "order_type",
    "accessibility",
    "remarks",
  ]
const tempData=[
  {priority:['hp','sr'],name:'test1',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Send'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test'},
  {priority:[],name:'test2',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Blocked'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test'},
  {priority:['sr'],name:'test3',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Unblock'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test'},
  {priority:['hp'],name:'test',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Clear'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test'},
  {priority:['hp'],name:'test',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Send'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test'},
  {priority:['hp','sr'],name:'test1',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Send'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test'},
  {priority:['sr','hp'],name:'test5',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Send'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test'},
]

const fixedTableTempData = {
  
}
  
  const tableMapping = {
    priority: {
      label: "priority",
      columnSize: "cell-text",
      type:'priority_type'
    },
    name: {
      label: "name",
      columnSize: "cell-text",
    },
    cloud: {
      label: "cloud",
      columnSize: "cell-text",
    },
    trip: {
      label: "trip",
      columnSize: "cell-text",
    },
    delivery_date: {
      label: "delivery date",
      columnSize: "cell-text",
    },
    product: {
      label: "product",
      columnSize: "cell-text",
    },
    volume: {
      label: "volume (i)",
      columnSize: "cell-text",
      type: "badge",
      getBadgeColor: value => {
        return value === "ACTIVE" ? "primary" : "secondary"
      },
    },
    retain: {
      label: "retain",
      columnSize: "cell-text",
    },
    runout: {
      label: "runout",
      columnSize: "cell-text",
    },
    product_category: {
      label: "product category",
      columnSize: "cell-text",
    },
    dn_status: {
      label: "dn status",
      columnSize: "cell-text",
      type:"dn_status"
    },
    split_id: {
      label: "split id",
      columnSize: "cell-text",
    },
    order_type: {
      label: "order type",
      columnSize: "cell-text",
    },
    ship_to: {
      label: "ship to",
      columnSize: "cell-text",
    },
    accessibility: {
      label: "Accessibility",
      columnSize: "cell-text",
    },
    remarks: {
      label: "Remarks",
      columnSize: "cell-text",
    },
  }
  
  export { tableMapping, tableColumns ,tempData}
  