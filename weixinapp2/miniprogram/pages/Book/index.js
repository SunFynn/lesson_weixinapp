// pages/Book/index.js
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
       
    },

    scanCodeFun: function(){
        const ctx = wx.scanCode({
            success: res => {
                this.setData({
                    isbn: res.result
                })
                console.log("isbn:" + res.result);
                // 云函数调用
                wx.cloud.callFunction({
                    name: "Book", //云函数名称
                    data: {
                        a: 10,
                        b: 4,
                        isbn:res.result
                    },
                    success: res => {
                        console.log(res);
                        // 数据库操作
                        db.collection('Book').add({
                            data: res.result,
                            success(ret){
                               console.log(ret)
                               wx.showModal({
                                   title: '添加新书',
                                   content: `${res.result.title}添加成功`
                               })
                            }
                        })
                        // 消息提示框
                        wx.showToast({
                            title: res.result.title
                        });
                        this.setData({
                            yunCode: res.result.sum
                        })
                    }
                })
            }
        });
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