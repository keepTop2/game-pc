import { createDiscreteApi } from 'naive-ui'
const { message, notification, dialog, loadingBar, modal } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar', 'modal']
)
export const Message = message
export const Dialog = dialog
export const Notification = notification
export const LoadingBar = loadingBar
export const Modal = modal