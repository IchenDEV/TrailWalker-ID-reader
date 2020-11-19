module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "appId": "com.zjutjh.idcard",
        "productName": "身份证",//项目名，也是生成的安装文件名，即aDemo.exe
        "copyright": "zjutjh © 2020",//版权信息
        
      }
    }

  }
}