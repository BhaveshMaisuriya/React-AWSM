import { isUndefined, get } from "lodash"
import { format, parse } from "date-fns"

export function orderBankFactory(data) {
  return data.map((item) => ({
    ...item,
    format_ship_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.ship_to_company"] : item["commercial_storage_relation.commercial_customer_relation.ship_to_company"],
    format_name: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.territory_manager_relation.name"] : item["commercial_storage_relation.commercial_customer_relation.territory_manager_relation.name"],
    format_cloud: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.cloud"] : item["commercial_storage_relation.commercial_customer_relation.cloud"],
    format_product: item?.customer_type === "RETAIL" ? item["retail_storage_relation.product_relation.name"] : item["commercial_storage_relation.commercial_customer_relation.name"],
    format_product_category: item?.customer_type === "RETAIL" ? item["retail_storage_relation.sales_category"] : item["commercial_storage_relation.sales_category"],
    format_accessibility: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.road_tanker_accessibility"] : item["commercial_storage_relation.commercial_customer_relation.road_tanker_accessibility"],
    format_site_id: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.site_id"] : item["commercial_storage_relation.commercial_customer_relation.site_id"],
    format_site_name: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.site_name"] : item["commercial_storage_relation.commercial_customer_relation.site_name"],
    format_product_code: item?.customer_type === "RETAIL" ? item["retail_storage_relation.product"] : item["commercial_storage_relation.product"],
    format_monthly_fixed_quota: item?.customer_type === "RETAIL" ? item["retail_storage_relation.monthly_fixed_quota"] : item["commercial_storage_relation.monthly_fixed_quota"],
    format_rt_req: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.road_tanker_requirement"] : item["commercial_storage_relation.commercial_customer_relation.road_tanker_requirement"],
    format_duration: item?.customer_type === "RETAIL" ? item["retail_storage_relation.duration"] : item["commercial_storage_relation.duration"],
    format_distance: item?.customer_type === "RETAIL" ? item["retail_storage_relation.distance"] : item["commercial_storage_relation.distance"],
    format_delivery_address: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.address_relation.address_1"] : item["commercial_storage_relation.commercial_customer_relation.address_relation.address_1"],
    format_city: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.address_relation.city"] : item["commercial_storage_relation.commercial_customer_relation.address_relation.city"] ,
    format_postcode: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.address_relation.postcode"] : item["commercial_storage_relation.commercial_customer_relation.address_relation.postcode"],
    format_state: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.address_relation.state"] : item["commercial_storage_relation.commercial_customer_relation.address_relation.state"],
    format_latitude: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.address_relation.latitude"] : item["commercial_storage_relation.commercial_customer_relation.address_relation.latitude"],
    format_longitude : item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.address_relation.longitude"]: item["commercial_storage_relation.commercial_customer_relation.address_relation.longitude"],
    format_country: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.address_relation.country"] : item["commercial_storage_relation.commercial_customer_relation.address_relation.country"],
    format_cluster: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.cluster"] : item["commercial_storage_relation.commercial_customer_relation.cluster"],
    format_alt_cluster: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.alternative_cluster"] : item["commercial_storage_relation.commercial_customer_relation.alternative_cluster"] ,
    format_border_station: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.border_station"] : item["commercial_storage_relation.commercial_customer_relation.border_station"],
    format_contact_name_1: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.contact1_relation.name"] : item["commercial_storage_relation.commercial_customer_relation.contact1_relation.name"],
    format_contact_number_1: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.contact1_relation.number"] : item["commercial_storage_relation.commercial_customer_relation.contact1_relation.number"],
    format_contact_name_2: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.contact2_relation.name"]: item["commercial_storage_relation.commercial_customer_relation.contact2_relation.name"],
    format_contact_number_2: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.contact2_relation.number"]: item["commercial_storage_relation.commercial_customer_relation.contact2_relation.number"],
    format_contact_name_3: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.contact3_relation.name"] : item["commercial_storage_relation.commercial_customer_relation.contact3_relation.name"],
    format_contact_number_3: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.contact3_relation.number"] : item["commercial_storage_relation.commercial_customer_relation.contact3_relation.number"],
    format_tm_name: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.territory_manager_relation.name"] : item["commercial_storage_relation.commercial_customer_relation.territory_manager_relation.name"],
    format_tm_number: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.territory_manager_relation.number"] : item["commercial_storage_relation.commercial_customer_relation.territory_manager_relation.number"],
    format_rs_name: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.retail_sales_manager_relation.name"] : item["commercial_storage_relation.commercial_customer_relation.retail_sales_manager_relation.name"],
    format_rs_number: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.retail_sales_manager_relation.number"] : item["commercial_storage_relation.commercial_customer_relation.retail_sales_manager_relation.number"],
    format_delivery_open_time_from: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.delivery_open_time.time_from"]: item["commercial_storage_relation.commercial_customer_relation.delivery_open_time.time_from"],
    format_delivery_open_time_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.delivery_open_time.time_to"] : item["commercial_storage_relation.commercial_customer_relation.delivery_open_time.time_to"],
    format_open_time_1_day: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.actual_open_time_1.days"] : item["commercial_storage_relation.commercial_customer_relation.actual_open_time_1.days"],
    format_open_time_1_from: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.actual_open_time_1.time_from"] : item["commercial_storage_relation.commercial_customer_relation.actual_open_time_1.time_from"],
    format_open_time_1_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.actual_open_time_1.time_to"] : item["commercial_storage_relation.commercial_customer_relation.actual_open_time_1.time_to"],
    format_open_time_2_day: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.actual_open_time_2.days"] : item["commercial_storage_relation.commercial_customer_relation.actual_open_time_2.days"],
    format_open_time_2_from: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.actual_open_time_2.time_from"] : item["commercial_storage_relation.commercial_customer_relation.actual_open_time_2.time_from"],
    format_open_time_2_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.actual_open_time_2.time_to"] : item["commercial_storage_relation.commercial_customer_relation.actual_open_time_2.time_to"],
    format_open_time_3_day: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.actual_open_time_3.days"] : item["commercial_storage_relation.commercial_customer_relation.actual_open_time_3.days"],
    format_open_time_3_from: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.actual_open_time_3.time_from"] : item["commercial_storage_relation.commercial_customer_relation.actual_open_time_3.time_from"],
    format_open_time_3_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.actual_open_time_3.time_to"] : item["commercial_storage_relation.commercial_customer_relation.actual_open_time_3.time_to"],
    format_no_del_interval_1: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_1.days"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_1.days"],
    format_no_del_interval_1_from: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_1.time_from"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_1.time_from"],
    format_no_del_interval_1_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_1.time_to"]: item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_1.time_to"],
    format_no_del_interval_2: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_2.days"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_2.days"],
    format_no_del_interval_2_from: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_2.time_from"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_2.time_from"],
    format_no_del_interval_2_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_2.time_to"]: item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_2.time_to"],
    format_no_del_interval_3: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_3.days"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_3.days"],
    format_no_del_interval_3_from: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_3.time_from"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_3.time_from"],
    format_no_del_interval_3_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_3.time_to"]: item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_3.time_to"],
    format_no_del_interval_4: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_4.days"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_4.days"],
    format_no_del_interval_4_from: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_4.time_from"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_4.time_from"],
    format_no_del_interval_4_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_4.time_to"]: item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_4.time_to"],
    format_no_del_interval_5: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_5.days"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_5.days"],
    format_no_del_interval_5_from: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_5.time_from"] : item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_5.time_from"],
    format_no_del_interval_5_to: item?.customer_type === "RETAIL" ? item["retail_storage_relation.retail_customer_relation.no_delivery_interval_5.time_to"]: item["commercial_storage_relation.commercial_customer_relation.no_delivery_interval_5.time_to"],
  }))
}

const TIME_FORMAT = "HH:mm:ss"
const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm"
const EVENT_COLOR = {
  Scheduled: "#84B0E9",
  PendingShipment: "#9F79B7",
  ShipmentCreated: "#615E9B",
  Cancellation: "#BDBDBD",
  BlockedDN: "#E45E5E",
}

export function eventGanttChartFactory(roadTankerList) {
  let eventGanttChartList = []
  if (roadTankerList.length > 0) {
    roadTankerList.forEach(vehicle => {
      vehicle?.order_banks?.forEach(orderBank => {
        const { planned_load_time, planned_end_time, shift_date, dn_status } = orderBank;
        const event = {
          id: orderBank?.id,
          resourceId: vehicle?.vehicle,
          startDate: planned_load_time ? format(parse(planned_load_time, TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT) :  format(parse("00:00:00", TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT),
          endDate: planned_end_time ? format(parse(planned_end_time, TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT) : format(parse("23:59:59", TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT),
          eventType: orderBank?.dn_status,
          eventColor: EVENT_COLOR[dn_status],
          draggable: true,
        }
        eventGanttChartList.push(event)
      })
    })
  }
  return eventGanttChartList
}

export function shipmentFactory(shipments) {
  let shipmentList = []
  if (shipments.length > 0) {
    shipments.forEach(shipment => {
      let orders = []
      shipment?.order_banks?.forEach(order => {
        const event = {
          id: order?.id,
          volume: order?.volume,
          delivery_date: order?.requested_delivery_date,
          cloud: get(order, "retail_storage_relation.retail_customer_relation.cloud", ""),
          name: get(order, "retail_storage_relation.retail_customer_relation.ship_to_company", ""),
          ship_to: get(order, "retail_storage_relation.retail", ""),
          product: get(order, "retail_storage_relation.product", ""),
          isChecked: false,
          isOnRemove: false,
        }
        orders.push(event)
      })
      const shipmentItem = {
        id: shipment?.shipment,
        orders,
      }
      shipmentList.push(shipmentItem)
    })
  }
  return shipmentList
}