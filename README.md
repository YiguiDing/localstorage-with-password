## localstorage-with-password 

### 用处-`useage`

可以用来当做数据库使用，用做持久化存储，存一些不想公开给用户的敏感信息，数据以文件的形式保存在本地，但是数据的内容是通过AES加密的，用户无法通过修改文件读写敏感信息

It can be used as a database and persistent storage. It stores some sensitive information that you do not want to disclose to users. The data is stored locally in the form of files, but the content of the data is encrypted through AES. Users cannot read or write sensitive information by modifying files

### 用法-`how to use`

用法和localStorage类似，需指定保存位置和密码

The usage is similar to that of localStorage. You need to specify the storage location and password

```js
var LocalStorage = require("localstorage-with-password");
const path = require("path");
// var {machineIdSync} = require('node-machine-id');

// 使用
(async function(){

    let password = "1234567"
    //or let password = machineIdSync()
    let db = new LocalStorage(
        path.resolve(__dirname,"./database.json"),
        password
    );

    await db.setItem("username","dingyigui");
    await db.setItem("passwd","123456789");

    let username = await db.getItem("username")
    let passwd = await db.getItem("passwd")
    
    console.log(username);
    console.log(passwd);

    // ./database.json 中保存的内容：
    // the content in the file `./database.json` ：
    // U2FsdGVkX1/W3PCri+97YKWYENBXIxnBf+tTj3pHUBwabDzbI3vJ3V6O3+IyuIrG6t1VbxKpbQ1tP5E3QIMKoQ==
})();
```