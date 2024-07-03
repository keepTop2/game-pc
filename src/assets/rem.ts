// import { Net } from "@/utils/net/Net"

const setRem = () => {
    let width = document.documentElement.clientWidth || document.body.clientWidth
    let dom = document.getElementsByTagName('html')[0]

    dom.style.fontSize = `${(width < 1200 ? 1200 : width) / 100}px`
}
setRem()
window.onresize = function () {
    setRem()
}
// document.addEventListener("visibilitychange", function () {
//     if (document.visibilityState == "visible") {
//         console.log("进入前台");
//     }
//     if (document.visibilityState == "hidden") {
//         console.log("切换到后台")
//         Net.instance.closeSocket()
//     }
// })
