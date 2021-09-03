const currentTimeAsMilliseconds = 0
const oneMinuteAsMilliseconds = 4000
const NOTIFICATION_TEMPLATE_TYPE = {
  BASIC: "basic",
  IMAGE: "image",
  LIST: "list",
  PROGRESS: "progress"
};
const BASE_TIME = 6
const ADD_BASE_INTERVAL_TIME = 300 // 5分钟

const button1 = {
  title: '延迟5分钟提醒'
}
const button2 = {
  title: '已经写了'
}

let isLock = false
let timer = null // 定时器

let intervalTime = BASE_TIME

chrome.runtime.onInstalled.addListener(() => {
  setTips()
});

chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
  if (buttonIndex === 0) { // 延迟5分钟
    chrome
    intervalTime = ADD_BASE_INTERVAL_TIME
  } else if(buttonIndex === 1) { // 已经写了
    isLoc = isLock9 = true
  }
})

function tipTodo() {
  chrome.notifications.create({
    type: NOTIFICATION_TEMPLATE_TYPE.BASIC,
    title: 'todo todo',
    message: '写todo写todo，不写就扣钱！',
    buttons: [button1, button2],
    iconUrl: "/images/get_started16.png",
    isClickable: true
  });
}

function setTips () {
  timer = setTimeout(() => {
    const date = new Date()
    date.setHours(18, 20, 0) // 时间设置为18:20:00

    if ([3,4].includes(date.getDay())) {
      date.setHours(21, 20, 0) // 周三周四加班，时间设置为21:20:00
    }
    const isThan = new Date().getTime() >= date.getTime()

    if (isThan && !isLock) {
      tipTodo()
    }

    if (!isThan && isLock) {
      isLock = false
    }
    // 超过5分钟提醒后重新按原来的时间间隔提醒
    setTips()
    if (intervalTime !== BASE_TIME) {
      intervalTime = BASE_TIME
    }
  }, 1000 * intervalTime)
}