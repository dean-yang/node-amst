const Admin = require('../col/admin')
const sql = require('../index')
const uuid = require('node-uuid')

sql.insert(Admin,{
    admin_id:uuid.v1(),
    admin_username:'admin',
    admin_password:'admin123'
}).then(()=>{
    console.log('成功插入')
})