1. 软工课设

   主题：拼车

   项目地址：https://github.com/ZhengQiushi/carpool

   ### **一、本地配置说明**

   项目地址里的已经配好了，设的是我自己的微信小程序....不知道其他人可以不可以使用。

   如果不行，可以自行创建微信小程序公众号并进行如下调整

   1. 在`project.config.json`中添加`"appid": "wx3a032e4b074057bd",`（修改appid）

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NjMzOTllNDYzZjEwMTM4ZjNhOWRmZDA2MzlhNmFkNTdfY2xRREk3eGkwWjBOSHFBTTFYdFJNd3VzNkdsSHp0SzJfVG9rZW46Ym94Y25wV051dm14WGZZcmpVMWN4Y2lZQUQ4XzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   

   1. 替换腾讯地图API的秘钥（需要为自己的appid申请腾讯地图API）

   ```
   IRMBZ-WSV63-4RH35-3RAE2-Y3YB5-OKBEI
   ```

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NGE4YjhhZmNjZjJhNWJhZjIwMWIwNTIwYTQxZTI2MWJfRXE1Um13QTlRaWRxV3l4QnlPUG5MNW9TQlhUcXVqNnlfVG9rZW46Ym94Y25SUTI1VmVZbUd4WW1jTlFyZ29rU0RjXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDJmYWUyMWNjODI2NjhlZmY3YmU1MTk0MjBkOGYyYzhfWGJPMVJLR2NuMTdodFd5bEk2SGFCU1g0ZnpzOVlxbDBfVG9rZW46Ym94Y25Ed2x1Vm9QVjhjY25iVlhreVNEckpoXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   1. 去掉所有云数据库的初始化配置

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NmE1ZDdkNWZmMWY2NzNkNWViMDNmYzFjZTE3M2RmNmVfUEl3b0pNOGtvc1NXVWQ3aUhCNms2TXo2OFUza1cyaDRfVG9rZW46Ym94Y25RTm1vZDVvSWdzZHVmdkh5ak1JYzBkXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   1. 上传所有云函数

   记得每次修改后云函数，都要重新部署

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=YzM2ZmI1MzA2Mzc3OTgzOWQ5MTllY2NhOWQ5ODNiNWVfRXFCS21jd1A5VU9yQXhuMENta2JORlFYczdUQlc5T3dfVG9rZW46Ym94Y25QUEthZ21ISTFSOGp4ZnhibEsyT1ZkXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   ### **二 、功能需求**

   1. 第一个界面：选择身份

   现有界面，点击user_type

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=OTljNWEzY2EzNDY1NzkxMWM4MWJkMjZmNmU0MmZmMjlfZW5EcDFOZG5jTVEwRWhtM25rVmlVdWgwVjd1UFhhTWRfVG9rZW46Ym94Y25HT3F2clBxbFBuMWZyRURGcVM5RWJmXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   

   1. 第二个界面：注册填写个人基本信息或登录

   **app.js**中全局变量作为用户名，访问云数据库...

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2FjMWZjOGNmMWQ2YmU4MzFjMTA1MzRlOGE2YWRkNjBfOG16WktnSldOTHlrVkZlTlB1Tm5pU01VamdmVXJGYVdfVG9rZW46Ym94Y25ZVm5ob3dIZllCdFpxbVJnWVozbUJoXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   1. 登录页面

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDE4NTg2MmZmN2RlMDI2YzFmOWI0MjQyOGNkMDBhOTRfQU5rT09VUUJrYzVuMDBFYkp3ZFVPcXpuNnVqdXd0WjBfVG9rZW46Ym94Y25OQ3BoSVVlc0xsRkQ4dzdlTUozNU9oXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   **TODO:**

   - **用户名不存在的提示**
   - **密码错误的提示**
   - **车主的登录**

   1. 注册页面

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=OWE5ODU5ZjA4N2NmNzQxNGQzOTYzZmNmNmY4MzI1MjFfdDJQTlBmd0VNVFY0SWx1SkFkZDZLQnhveEk5NXpucXBfVG9rZW46Ym94Y255blEwTWRnWnJrNG9PZTh4bGZ0Q2xjXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   插入数据库（根据不同的user_type 决定待插入的数据表单）

   **TODO:**

   - **添加用户名的重复检查**
   - **表单项目不为空的检查**

   

   

   1. 第三个界面：即原本的搜索界面
      1. 对于乘客

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=OWU0N2E2MjdlOTBjMmVlZGM1NzE5ZDJiMzU0MzlmYWRfWENlOVA1cHV1UE9Qd1BFcFNScGI0NG9KYkdvWHFpUm9fVG9rZW46Ym94Y24yR01mTDdEanphenFVak82QnRtdTdmXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   1. 查看附近行程
      1. 查看路线

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjc3NzVlZDM1YzUzMTc0MTQ3ZjI5MDYzM2UxNzhlZDZfYm9ZMjdCcFBTNzZPODdyYXhaUEFRdHhJSWdPSjJ2U3JfVG9rZW46Ym94Y25IbW1tdEZ6V3Z5d0g5TTNsZkJzbHhkXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   

   TODO:

   - 小地图显示异常修复
   - 加入行程
   - 显示当前的拼车人数（超过拼车人数不能加入）

   1. 查看起始点
   2. 点击发起新的拼车

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=YWNhMDM3YjhlYmZiZGIyOGFjYzk5YTAwNGNmZjE5YmNfQ2tUWk9tRXlScXY5blVObG9RUFFoazQwcVNQVmp5amVfVG9rZW46Ym94Y25vcWdVVjRsM1FjVng4SzYyTlIxcVpmXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   **TODO:**

   - 可以添加路线的地图？
   - 自动根据距离计算价格...

   1. 取消行程

   

   1. 对于车主
      1. 查看附近行程
         1. 选择接受行程
         2. 取消行程
      2. 查看一天的预约时间线
         1. 类似于同济研习室的预约条

   

   1. 第四个界面：我的，查看历史记录等等....

   

   ### **三、页面情况**

   ##### 3.1 数据库情况

   - courseTotal

   - dirverInfo：车主个人信息

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=ODNjZjViNzZhOWEwMGUzZTEzYzZlNTYxY2UxZDQ0MjNfN3RMMEZDa3FUOWFUOEI3ZExlTXF1QWRqZGlGTkVGYWdfVG9rZW46Ym94Y25VSUlkWVZRbThJRFlxT1VtUFlUaFZoXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   - driverMsg

   - passengerInfo： 乘客个人信息

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NjgwM2Y1OTk4NDViYzFhOThjZTg5NGQ2ZDJjMzc1ZjdfNnJ4QlBRSVdMM1RKQU9ieVFPcHdvTkJpWEZtVm5GemtfVG9rZW46Ym94Y25ENnFaWGdXYmlsaW80WkRlUGlMRnVTXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   - passengerMsg

   注意nickName进行了修改，变成了用户名的数组，便于显示拼车列表...

   ![img](https://tj-superpower.feishu.cn/space/api/box/stream/download/asynccode/?code=NzY3Mjg5ZDE0NDc2MzU4ZjVkNmYyMjQ3ZDkxOTEwN2RfRkt3M3d1Rm1ROHRYVmpSVjNiR1lyb1ZCTTZYSDhDWXhfVG9rZW46Ym94Y25rN2dHanB3emNVUjRrOHNRczh3VmJnXzE2MjgxNzI1MTE6MTYyODE3NjExMV9WNA)

   

   - userCollection

   ### 四、分工

   UI： 1位（编写界面文档与使用说明）

   开发：3位 (2开发    +    1重构+编写详细设计)

   测试：2位（设计测试样例 编写测试文档）