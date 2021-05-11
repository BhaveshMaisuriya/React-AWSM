import React, { useState } from "react"
import {
  Button,
  UncontrolledPopover,
  PopoverBody,
  Form,
  FormGroup,
  CustomInput,
  Input,
  Label,
  Row,
} from "reactstrap"
import SimpleBar from "simplebar-react"

const Example = props => {
  const { id, data } = props
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [filteredRows, inputFilters] = useState(data)

  const toggle = () => setPopoverOpen(!popoverOpen)

  const handleCheckbox = data => event => console.log(data)

  const requestSearch = (unfilteredData, searchedVal) => {
    // const columns = data[0] && Object.keys(data[0])
    const filteredRows = unfilteredData.filter(row =>
      row.toString().toLowerCase().includes(searchedVal.toLowerCase())
    )
    inputFilters(filteredRows)
  }

  return (
    <div>
      <Button id={"Popover-" + id}>
        <i className="mdi mdi-chevron-down" />
      </Button>
      <UncontrolledPopover
        placement="bottom"
        isOpen={popoverOpen}
        target={"Popover-" + id}
        toggle={toggle}
        trigger="legacy"
      >
        {/* <PopoverHeader>Popover Title</PopoverHeader> */}
        <PopoverBody>
          <Input
            // className={classes.searchBar}
            placeholder="Search"
            onChange={newValue => requestSearch(data, newValue.target.value)}
          />
          <Form>
            <SimpleBar
              autoHide={false}
              style={{ height: "150px", width: "100%" }}
            >
              <FormGroup check>
                {filteredRows.map((d, index) => (
                  // <div>
                  <CustomInput
                    type="checkbox"
                    key={index}
                    id={d}
                    label={d}
                    // checked={d}
                    onChange={handleCheckbox(d)}
                  />
                ))}
              </FormGroup>
            </SimpleBar>
          </Form>
          <Button class="btn btn-primary" type="button">
            Apply
          </Button>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  )
}

export default Example
