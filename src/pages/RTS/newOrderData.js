const orderDetails = [
    {
        shipNo: '11111',
        region: 'Central',
        terminal: 'KVDT',
        volume: '1234',
        product_name: 'Test 1',
        product_code: 'abc123',
        load_time: '00',
        eta: '00',
        remark_order: 'test',
        request_remark_order: 'test',
        retain: 'test',
        runout: 'test',
        remark: 'test'
    },
    {
        shipNo: '22222',
        region: 'Central',
        terminal: 'KVDT',
        volume: '1234',
        product_name: 'Test 2',
        product_code: 'abc2123',
        load_time: '00',
        eta: '00',
        remark_order: 'test',
        request_remark_order: 'test',
        retain: 'test',
        runout: 'test',
        remark: 'test'
    },
    {
        shipNo: '33333',
        region: 'Central',
        terminal: 'KVDT',
        volume: '1234',
        product_name: 'Test 3',
        product_code: 'abc3123',
        load_time: '00',
        eta: '00',
        remark_order: 'test',
        request_remark_order: 'test',
        retain: 'test',
        runout: 'test',
        remark: 'test'
    },
];

const viewOrderDetails =  {
    shiftDate: '29th june, 2020',
    region: 'Central',
    terminal: 'KVDT',
    order: {
        shipTo: '1234556',
        name: 'abcd',
        volume: 'ABCDXX'
    },
    delivery:{
        rt: '1234556',
        accessibility: 'abcd',
        duration: '02'
    },
    site:{
        name: 'abc',
        id: 'a123bcd',
        remark: 'abcd'
    },
    indication:{
        open: 'moday, tuesday',
        close: 'sunday',
        current: 'friday'
    },
    address:{
        address: 'c-12, abc',
        city: 'XYZ',
        pincode: '238564'
    },
}


export {orderDetails, viewOrderDetails};