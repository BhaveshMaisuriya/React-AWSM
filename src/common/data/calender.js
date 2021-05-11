const events = [
  {
    id: 1,
    title: "System Maintenance",
    start: new Date().setDate(new Date().getDate() + 1),
    className: "bg-warning text-white",
  },
  {
    id: 2,
    title: "Public Holiday",
    start: new Date(),
    end: new Date(),
    className: "bg-success text-white",
  },
  {
    id: 3,
    title: "New Orders",
    start: new Date().setDate(new Date().getDate() + 8),
    className: "bg-success text-white",
  },
  {
    id: 4,
    title: "Scheduled Deployment",
    start: new Date().setDate(new Date().getDate() + 7),
    className: "bg-primary text-white",
  },
  {
    id: 6,
    title: "Tank Top Start",
    start: new Date('2021-02-03'),
    className: "bg-info text-white",
  },
  {
    id: 7,
    title: "Change ASR to SMP - 91312000",
    start: new Date('2021-02-10'),
    className: "bg-info text-white",
  },
  {
    id: 8,
    title: "MCO Forecast Method Change - Sarawak",
    start: new Date('2021-02-15'),
    className: "bg-info text-white",
  },
  {
    id: 9,
    title: "Tank Top End",
    start: new Date('2021-02-21'),
    className: "bg-info text-white",
  },
  {
    id: 10,
    title: "No Changes to Order Plan - Borneo",
    start: new Date('2021-03-01'),
    className: "bg-danger text-white",
  },
]

const calenderDefaultCategories = [
  {
    id: 1,
    title: "Festivals",
    type: "bg-success",
  },
  {
    id: 2,
    title: "Special Events",
    type: "bg-info",
  },
  {
    id: 3,
    title: "Downtime",
    type: "bg-warning",
  },
  {
    id: 4,
    title: "Planned Maintenance",
    type: "bg-danger",
  },
]

export { calenderDefaultCategories, events }
