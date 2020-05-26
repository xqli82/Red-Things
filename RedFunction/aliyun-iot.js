const userSettings=require('../user_settings')
const iot = require('alibabacloud-iot-device-sdk')

const device = iot.device({
    productKey: userSettings.productKey,
    deviceName: userSettings.deviceName,
    deviceSecret: userSettings.deviceSecret,
})

device.on('connect',()=>{
    console.log('aliyun cloud connect success!-----------------')
})

module.exports=device
