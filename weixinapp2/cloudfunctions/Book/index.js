// 云函数入口文件
const cloud = require('wx-server-sdk');
const axios = require("axios");  // 借助axios获取信息
const doubanbook = require("doubanbook");

cloud.init();

async function getDoubanBook(isbn) {
    //https://search.douban.com/book/subject_search?search_text=9787229030933
    const url ="https://search.douban.com/book/subject_search?search_text=" + isbn;
    let res = await axios.get(url);
    // console.log(res, res.data);
    let reg = /window\.__DATA__ = "(.*)"/;
    if (reg.test(res.data)) {
        //第⼀个括号分组数据
        let searchData = doubanbook(RegExp.$1)[0];
        console.log(searchData);
        return searchData;
    }
}

// getDoubanBook("9787121331565");

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();

    const {a, b, isbn} = event;
    console.log(a, b, isbn, '--------');
    let bookInfo = await getDoubanBook(isbn);

    return {
        sum: a+b,
        title: bookInfo.title,
    }
}