var fs = require('fs/promises');
var CryptoJS = require('crypto-js');

class LocalStorage{
    constructor(file_path,password){
        this.file_path = file_path;
        this.password = password;
    }
    async setItem(key,item){
        let data = await this.load();
        data[key]=item
        await this.save(data);
    }
    async getItem(key){
        let data = await this.load();
        return data[key]
    }
    async load(){// 加载对象
        try {
            await fs.stat(this.file_path) // 如果文件不存在
        } catch (error) {
            await fs.writeFile(this.file_path,"");// 创建文件
        }
        let bufferData = await fs.readFile(this.file_path);// 加载数据
        let decoded_msg  = CryptoJS.AES.decrypt(bufferData.toString(),this.password).toString(CryptoJS.enc.Utf8)// 解密
        let obj = JSON.parse(decoded_msg||"{ }");// 对象化
        return obj
    }
    async save(obj){// 保存对象
        let obj_msg = JSON.stringify(obj);// 对象字符串化
        let encoded_msg = CryptoJS.AES.encrypt(obj_msg,this.password).toString() // 加密
        return await fs.writeFile(this.file_path,encoded_msg)// 写入文件
    }
}

module.exports = LocalStorage