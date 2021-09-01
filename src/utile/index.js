//下载一个链接 
function download(link, name) {
    if(!name){
            name=link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}
//下载excel
download('http://111.229.14.189/file/1.xlsx')



/**
 * 浏览器下载静态文件
 * @param {String} name 文件名
 * @param {String} content 文件内容
 */
 function downloadFile(name, content) {
    if (typeof name == 'undefined') {
        throw new Error('The first parameter name is a must')
    }
    if (typeof content == 'undefined') {
        throw new Error('The second parameter content is a must')
    }
    if (!(content instanceof Blob)) {
        content = new Blob([content])
    }
    const link = URL.createObjectURL(content)
    download(link, name)
}
//下载一个链接
function download(link, name) {
    if (!name) {//如果没有提供名字，从给的Link中截取最后一坨
        name =  link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}

//使用方式：

downloadFile('1.txt','lalalallalalla')
downloadFile('1.json',JSON.stringify({name:'hahahha'}))

//数据是后端以接口的形式返回的,调用1中的download方法进行下载
 download('http://111.229.14.189/gk-api/util/download?file=1.jpg')
 download('http://111.229.14.189/gk-api/util/download?file=1.mp4')


//可以用来下载浏览器会默认预览的文件类型，例如mp4,jpg等
import axios from 'axios'
//提供一个link，完成文件下载，link可以是  http://xxx.com/xxx.xls
function downloadByLink(link,fileName){
    axios.request({
        url: link,
        responseType: 'blob' //关键代码，让axios把响应改成blob
    }).then(res => {
	const link=URL.createObjectURL(res.data)
        download(link, fileName)
    })

}
// 注意：会有同源策略的限制，需要配置转发


/**
 * 防抖
 * @param {*} func 要进行debouce的函数
 * @param {*} wait 等待时间,默认500ms
 * @param {*} immediate 是否立即执行
 */
 export function debounce(func, wait=500, immediate=false) {
    var timeout
    return function() {
        var context = this
        var args = arguments

        if (timeout) clearTimeout(timeout)
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait)
        }
    }
}



/**
 * 节流，多次触发，间隔时间段执行
 * @param {Function} func
 * @param {Int} wait
 * @param {Object} options
 */
 export function throttle(func, wait=500, options) {
    //container.onmousemove = throttle(getUserAction, 1000);
    var timeout, context, args
    var previous = 0
    if (!options) options = {leading:false,trailing:true}

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime()
        timeout = null
        func.apply(context, args)
        if (!timeout) context = args = null
    }

    var throttled = function() {
        var now = new Date().getTime()
        if (!previous && options.leading === false) previous = now
        var remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining)
        }
    }
    return throttled
}


//去除对象中value为空(null,undefined,'')的属性,举个栗子：
let res=cleanObject({
    name:'',
    pageSize:10,
    page:1
})
console.log("res", res) //输入{page:1,pageSize:10}   name为空字符串，属性删掉













