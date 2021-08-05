### 一、本地配置说明

1. 在`project.config.json`中添加`"appid": "wx3a032e4b074057bd",`

   ![image-20210805102937200](C:\Users\THINK\AppData\Roaming\Typora\typora-user-images\image-20210805102937200.png)

2. 替换腾讯地图API的秘钥

   `IRMBZ-WSV63-4RH35-3RAE2-Y3YB5-OKBEI`

   ![image-20210805111209056](C:\Users\THINK\AppData\Roaming\Typora\typora-user-images\image-20210805111209056.png)

   ![image-20210805111152538](C:\Users\THINK\AppData\Roaming\Typora\typora-user-images\image-20210805111152538.png)

3. 去掉所有云数据库的初始化配置

![image-20210805111253408](C:\Users\THINK\AppData\Roaming\Typora\typora-user-images\image-20210805111253408.png)

4. 上传所有云函数

   记得每次修改后云函数，都要重新部署

   ![image-20210805112535889](C:\Users\THINK\AppData\Roaming\Typora\typora-user-images\image-20210805112535889.png)



#### 页面情况

1. 主页（搜索）：index
2. 发布：as 乘客 publishMsg
3. 我的：personal 







### 功能需求计划

1. 第一个界面：选择身份
2. 第二个界面：注册填写个人基本信息或登录
3. 第三个界面：即原本的搜索界面