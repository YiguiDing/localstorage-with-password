var LocalStorage = require("./localStorage");
var {machineIdSync} = require('node-machine-id');
const path = require("path");

// 使用
(async function(){

    let password = "1234567" // or let password = machineIdSync()
    let db = new LocalStorage(path.resolve(__dirname,"./database.json"),password);

    await db.setItem("username","dingyigui");
    await db.setItem("passwd","123456789");

    let username = await db.getItem("username")
    let passwd = await db.getItem("passwd")
    
    console.log(username);
    console.log(passwd);

    // ./database.json 中保存的内容：
    // U2FsdGVkX1/W3PCri+97YKWYENBXIxnBf+tTj3pHUBwabDzbI3vJ3V6O3+IyuIrG6t1VbxKpbQ1tP5E3QIMKoQ==
})();