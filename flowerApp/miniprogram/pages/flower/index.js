// pages/flower/index.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    doUpload(event){
        console.log(event.currentTarget.dataset)
        const { index } = event.currentTarget.dataset;
        const sourceType = index ? ['album'] : ['camera'];
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: sourceType,
          success: (res)=>{
                console.log(res);   // res对象中返回的tempFilePaths地址，是临时的，有限期是两个小时，所以我们需要将图片存入到云存储控件
                const filePath = res.tempFilePaths[0]; 
                // 将图片上传至云存储空间
                wx.cloud.uploadFile({
                    // 指定上传到的云路径， 云存储不允许有相同的名称[会覆盖数据]
                    cloudPath: `flower/img${new Date().getTime()}.png`,
                    // 指定要上传的文件的小程序临时文件路径
                    filePath,
                    // 成功回调
                    success: res => {
                       console.log('上传成功', res);
                       // 路由跳转，跳转到识别花朵页
                       wx.navigateTo({
                         url: `../flowerInfo/index?fileId=${res.fileID}&pic=${filePath}`,
                       })
                    },
                })
          }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})