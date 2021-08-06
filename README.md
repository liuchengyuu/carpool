1. 软工课设

   主题：拼车

   项目地址：https://github.com/ZhengQiushi/carpool

   ### **一、本地配置说明**

   项目地址里的已经配好了，设的是我自己的微信小程序....不知道其他人可以不可以使用。

   如果不行，可以自行创建微信小程序公众号并进行如下调整

   1. 在`project.config.json`中添加`"appid": "wx3a032e4b074057bd",`（修改appid）

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWQ5YjRjOWM2ZDFmNDYwOGM3ZDc1ZDQ1YmU2OGNjZTlfZWEyM3dSdGVBVGJReE1VV0tyNjdlM1ZYVFB4Y3ZYenRfVG9rZW46Ym94Y25wV051dm14WGZZcmpVMWN4Y2lZQUQ4XzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   

   1. 替换腾讯地图API的秘钥（需要为自己的appid申请腾讯地图API）

   ```
   IRMBZ-WSV63-4RH35-3RAE2-Y3YB5-OKBEI
   ```

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=OGRkNDA5MmJiMTBiMjFhOWI0YzNlNTM4YWU1MTQ0YzhfQm03RDJmQ1BJY2RaQ1hCYVQ5MEw2MXAzWlZYeUNvbm1fVG9rZW46Ym94Y25SUTI1VmVZbUd4WW1jTlFyZ29rU0RjXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NTNjMjU2MDUyMjc3NzMxMDdkZWRhNzZhNzkzOTE0NzBfZzR5WjU0NlVOak4wUHBMYXpXZ0Q0dWdrZ0dqNlFmZjVfVG9rZW46Ym94Y25Ed2x1Vm9QVjhjY25iVlhreVNEckpoXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   1. 去掉所有云数据库的初始化配置

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQ1M2IyMWEwZWY5NTAyNmE5MWEwMWMzMzU1MGZiNTlfYnk3ck11QVVZSVRhalFma1kycVBLeEl3Z2VFRU1DV1ZfVG9rZW46Ym94Y25RTm1vZDVvSWdzZHVmdkh5ak1JYzBkXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   1. 上传所有云函数

   记得每次修改后云函数，都要重新部署

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWUzNjMxNjE2ZGJjNTU5N2ZhMTRkMGEyNWVmNDlhZjZfb3JhRzFOODRsamIwUHZJRldJMHM2dlhMZDhialM0aUFfVG9rZW46Ym94Y25QUEthZ21ISTFSOGp4ZnhibEsyT1ZkXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   ### **二 、功能需求**

   1. #### 第一个界面：选择身份

   现有界面，点击user_type，选择后跳转到不同（司机和乘客）的登录页面

   **对应pages**: "pages/publish/publish"

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=YTFlYjkzODY2MjQ5YTU5OGZlMDBjZTFiNmU2NDlmMzRfYlJsYjFla3BiRlZKTWE0MGx6R1hWMjV6cjFLZzlCYmhfVG9rZW46Ym94Y25IVm9hOGRzWTBFSXFJVWNWc0F2SDRmXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   

   1. #### 第二个界面：注册或登录

   **app.js**中全局变量作为用户名，访问云数据库...

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=ODMzNDVkNzcwZDE4M2NmYjc1NDJmYjdhNDdhNjE0OWZfRDhPbktFYlFVcVRSRzNnVEh6bm1peFRGaDVEMGtyZ1RfVG9rZW46Ym94Y25ZVm5ob3dIZllCdFpxbVJnWVozbUJoXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   登录页面

   **对应pages**:  "pages/register/login/login",

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=MmZkZjNmMTcwMDM2OTJiNGNkNTFhOTZjM2ZiZDg2NmJfaENrQjdKNGU2b3BiYmhOTnpRaHpYZkZyVDBRWU1weWNfVG9rZW46Ym94Y25OQ3BoSVVlc0xsRkQ4dzdlTUozNU9oXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   1. 点击登录

   登录成功会跳转到第三个界面！

   **TODO:**

   - **用户名不存在的提示**
   - **密码错误的提示**
   - ...
   - **已完成：****车主的登录**

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=YzViZTdkZWYyNmYwYzM1NDZlYmU2ZjcxNTFlYjRkNDRfS0tCZ2Z5UFlBbWtVSU9DbXd3Rm9hMTRJQ0hZa3FCd29fVG9rZW46Ym94Y25MWmp4clUwc2l5V1ZrQW5FS1czWGRkXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   1. 点击注册

   进入注册页面

      **对应pages**:  "pages/register/register_customer/register_customer",

      "pages/register/register_driver/register_driver"

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NTFhZTU5ZDdmOWIzZjM3NWY5MDRmODBjMmNjMGRkMDBfMmtodmxqZ3BnR0lKRklhbGQ2bEI2NVR1eE5ZbU9rdXBfVG9rZW46Ym94Y25kMjRPaDI4MFN3dWQ1N2FqZ2huVm1oXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   点击注册，插入数据库（根据不同的user_type 决定待插入的数据表单）

   分别插入dirverInfo与passengerInfo

   **TODO:**

   - **添加用户名的重复检查**
   - **表单项目不为空的检查**
   - ...

   1. #### 第三个界面：即原本的搜索界面

   身份不同，进入的界面也会有所区别

   **对应pages**:  "pages/index/index",

   1. ##### 对于乘客

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTlkYTk5MGM0NTI1NzJhZWU1ZmIwZGI2NDUwOGM2ODdfbndxQWpPYncwa3BwemN1VVZLbWtBNnZmaWoyOWxlZUtfVG9rZW46Ym94Y24yODY4SU9mWDFwM0VsNU9wV3c0d25oXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   1. **查看周边所有订单**

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=YjI4MDY1OWFkZTljYWEzYzI3OTU1NjgzNzhkNTI5YWJfdFpyTFYySFlKSUFUODFrWk1NUEpXWVg3Mnd5U2ZidjlfVG9rZW46Ym94Y24xVzVBMTBSbEZOeXZzMW45eFNJUFlkXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   自己的订单会有所标志！

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=MGE2NzFjYmJkNjRiZDQ3MWIzZDdjOGIzZGRkOWVjNmRfOU1YS3BIdWE4RTBzemE1c2pmZGo3Y1ZkbnFabUtyM0RfVG9rZW46Ym94Y25DdHVZbGpqWGpGb3FvckVWaThlSzRlXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   

   1. **查看我参加的订单**

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=OTg4OGY1MGIyZmM3NzRjOTFhYTFlOGQ5NDdmYWVmY2NfeXNRaDdualBLSlVKT2c5V0p6YUpaS2xKcWNTYXhabTFfVG9rZW46Ym94Y25lMHFrVWhydWZvMHZwQ3kwc0hmdEpjXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   1. **发起新的拼车**

   点击拼车按钮，发起新的拼车

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=OGUyMDg2MjYzNTU0NDQ1YTk4ZDFiNTMzZmQxMWQ1NmJfVFhxRU9JTVp5aTc5RkFnY2lrWHA1NEc3a1JRbWtxQ0FfVG9rZW46Ym94Y25OUXVtMnlLRWJTTEFyVmsycEFNT2xkXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   **对应pages**: "pages/publishMsg/publishMsg",

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NDYxYzI2ZmFmZGZlOTllMjViYjEyNzg2ZmZiOTQzYThfNUM4VDMxQ1g5bE1pMW13V1c4Q000c1llbWZnWU1aV0JfVG9rZW46Ym94Y25vcWdVVjRsM1FjVng4SzYyTlIxcVpmXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   **TODO:**

   - 已完成：修复地点选择和人数选择的bug
   - **可以添加路线的地图？**
   - **自动根据距离计算价格**
   - ...

   1. **点击查看订单** 查看附近行程

   **对应pages**:  "pages/courseDetail/courseDetail",

   1. 查看路线

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NmZjNjVmNzQ5YTJjNmU2NjVlMjEwMTU2YTY2MjJiYTNfY0Y4Q2VGenBRdVhvbmRvZEhzcHQwaWxPSTJUbnYzZUFfVG9rZW46Ym94Y250SGVXd2ZnUzlMN3pGV3cwcXoyYmhlXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   **TODO:**

   - **小地图显示异常修复**
   - **加入行程  bindJoinCourse: function(options) 云函数留空**
   - **取消订单 bindCancelCourse: function(options) 云函数留空**
   - **已完成：显示当前的拼车人数（超过拼车人数不能加入）**

   1. 当未加入时，可以选择加入订单
   2. 当加入后，可以选择取消订单

   

   1. ##### 对于车主

      1. 查看附近行程

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=MjAwMmM1M2QyMDNlYjNmY2Y4MWJiZGEyNDcyNGRiZWJfZ3IxRVFxeEgyc2pPSWY4MWo5dFl5VWNDRDRiMm9SazVfVG9rZW46Ym94Y25HTHR2T3M1aW1WVGd5cDdXUGEzczR1XzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=YjczYzc0YTZmZGQxZWQ4YmU5MDlhMzRiOGI1YjhlOWRfTXd2dW1YMTc4b2pWVFdsbWxRUFVzanVKQ1BWNmxUNUFfVG9rZW46Ym94Y25zWThRS2hWNDRQdnNFNUlISERpVWtmXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   1. 选择接受行程

   只显示当前尚未被接单的拼车请求（acceptBy为空），点击查看订单进入详情

   **对应pages**:  "pages/courseDetail/courseDetail",

   

   1. 选择接收订单

   

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2UxY2RlOTdhZmZmYTNmNTkyYTljZjA0NDAxMDQ0MGNfY2pJV0RNaThVa1ZoNXQ4NmM0WHRpNGwzMjJLSVFNc0xfVG9rZW46Ym94Y241bm1FMjdVcHRnU2RmNHYzaFBlU2tnXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   接收订单后，相应passengerMsg的acceptBy被修改为当前司机id号，所以不再显示。

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=MWMyYjg5ZjY5OGJiN2JmMWJiYzQ0YjgyMzBhOGQ2NDBfemdOMWRrTEpJTjA3MHRYemF4dW9KMGc2V1JUYnlSNWZfVG9rZW46Ym94Y25MdlZYWHFTWVJhV2VlbEFseVhFYlJlXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=ODM0OWU1MjI2NTI0N2EwODc2YzllNzE3NzgyZTQ0OGZfQnc0alZnaWhpNmc1Q2ZOQkxacThUZ0pIUEgyUkpqc0tfVG9rZW46Ym94Y25heWJTR2thVzV1d0t1eXYxNUxNQU5oXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   1. 选择取消订单

   对于已经接收的订单可以选择取消

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=MDdmYTk2NDllMGU2NzI4NzIwZjIyMDc3NDMzYzlhNDBfZ0p5aHhQOWpqTWF1cnFYNG81YjNaRldpMjVaaUZ5Q2FfVG9rZW46Ym94Y24zeVJlREtGUXNBMDRFR2dXSFBWZFhkXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   **TODO:**

   - **尚未实现** **bindCancelCourse: function(options)**
   - ...

   

   

   1. 查看一天的预约时间线

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=YzQ4MjYyMjc3MjlmNWUwN2VjNWY2YjFiMTE2OTg0YWVfU0xHZGNmRFNrM3h4ZEZJdnlXZ1RtWEg0OGFOUHFaN09fVG9rZW46Ym94Y245TzE0M3VPY1N3QnlzbFN5ejNmdGVjXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   1. 查看当日已接收的订单

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NzMwZGQwODU5OTVmMTIzNDg5NTBmMTNmODVmNmQyNGVfbnlKeDVnT1R2WVgyblJuVVA3cFRxcm1TeHVZQmNQeGZfVG9rZW46Ym94Y245RnVxa2VKaWpkSXQ2bnpYeVNDM0xjXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   **TODO:**

   - **按照时间进行从早到晚进行排序优化**

   

   1. #### 第四个界面：我的，

   **对应pages**: "pages/personal/personal",

   **TODO:**

   - **查看历史记录等等....**

   

   

   

   ### **三、页面情况**

   ##### 3.1 数据库情况

   - courseTotal：总共路线数

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWY2ZTFhN2IyYmFmOGVjMjY1ZTQzYzBiMjZlZGNiNzhfOGZDVThCQ3ZpZ0Rhd0t6dW9qYnNRT3NUanNOZlVOVXhfVG9rZW46Ym94Y25tMXBUeG9TZmllZERPN3VUZE1iTUdlXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   - dirverInfo：车主个人信息

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=OTNmNGYwNWI0ZTM3ZDNkZjUxZDAyNjkxMTJjNDAwYWJfUUNuaHRuNmlaUHBJRGFvc2Rxc2EyZ290c1VTRW5TWElfVG9rZW46Ym94Y25VSUlkWVZRbThJRFlxT1VtUFlUaFZoXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   - driverMsg：某位车主接受的订单

   course_id 为外键，reference from passengerMsg(_id)

   user_id 外键, reference from dirverInfo(user_id)

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=Yjk0NDA5M2ZmMWIwNzgzNmJiM2VhMzgzMjZhNjE4NmFfdlloV1RKcmRXWU1YVFJKRGlPMWVLV0NZUGRBRGpsQlNfVG9rZW46Ym94Y25mU3hjUklQUUp4TXFOVkVwenROM0JkXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   - passengerInfo： 乘客个人信息

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=YjU0NGZlNmMyZTk2YzFkYzkyMWQwNWQ5NzAzODJhZTlfQjFOUUl4MENnTXhQNUlkTGpPRFFCbk94ZUVXM1J3WENfVG9rZW46Ym94Y25ENnFaWGdXYmlsaW80WkRlUGlMRnVTXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   - passengerMsg

   注意nickName、personNum进行了修改，变成了用户名的数组，便于显示拼车列表...

   acceptBy 外键, reference from dirverInfo(user_id)

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NTkxNjZhNGE5NzQ5YTg2MjU5YjA0YWVhYjU1YjkzMzRfRzlkbHdCcnRlQkNRNTAwbVBGSGhNaHROTVlqTTdHMDlfVG9rZW46Ym94Y255SnJwQk9SbXk5cTZjUWNFcVpYT1lnXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   - userCollection 用户收藏

   

   ##### 3.2 页面解释

   - Components：index页面单个tab

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=OTQ1NTQ4YzMyMDMwNzExYmUyZGNmNjE0MmFiYTczNWFfdVozUkMzclVNa2NOSFZCcnZsVnRYSk1tQ1BjSVBOc29fVG9rZW46Ym94Y256T0VYTjVUc0VuRTNTNFZjWlh1eE1nXzE2MjgyNDI5Njk6MTYyODI0NjU2OV9WNA)

   ### 四、分工

   UI： 1位（编写界面文档与使用说明）

   开发：3位 (2开发 + 1重构+编写详细设计)

   测试：2位（设计测试样例 编写测试文档）