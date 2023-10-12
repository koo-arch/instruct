export const errorMessage = (errRes, setError, setSnackbarStatus, defaultMessage = "送信に失敗しました。") => {
    Object.keys(errRes).map((key) => {
        const messages = errRes[`${key}`]
        const newMessages = [];
        console.log(messages)
        // メッセージ内のスペースを削除
        console.log(typeof(messages))
        for (let i = 0; i < messages.length; i++) {
            newMessages[i] = messages[i].replace(/ /g, "")
        }
        console.log(newMessages)
        if (key === "detail") {
            const snackbarMessage = '\n' + newMessages.join('\n')
            setSnackbarStatus({
                open: true,
                severity: "error",
                message: defaultMessage + snackbarMessage
            })
            return
        } else {
            setError(`${key}`, { type: "validate", message: newMessages })
        }

    })
}

export const loginErrorMessage = (errRes, setError, setSnackbarStatus, defaultMessage = "ログインに失敗しました。") => {
    Object.keys(errRes).map((key) => {
        const messages = errRes[`${key}`]
        if (key === "detail") {
            const newMessages = "メールアドレスかパスワードが一致しません."
            const snackbarMessage = '\n' + newMessages
            setSnackbarStatus({
                open: true,
                severity: "error",
                message: defaultMessage + snackbarMessage
            })
            return
        } else {
            const newMessages = [];
            console.log(messages)
            // メッセージ内のスペースを削除
            for (let i = 0; i < messages.length; i++) {
                newMessages[i] = messages[i].replace(/ /g, "")
            }
            console.log(newMessages)
            setError(`${key}`, { type: "validate", message: newMessages })
        }

    })
}