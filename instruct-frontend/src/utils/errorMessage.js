export const errorMessage = (errRes, setError, setSnackbarStatus, defaultMessage = "送信に失敗しました。") => {
    Object.keys(errRes).map((key) => {
        const messages = errRes[`${key}`]
        let newMessages = [];

        // メッセージ内のスペースを削除
        console.log(typeof(messages))
        for (let i = 0; i < messages.length; i++) {
            newMessages[i] = messages[i].replace(/ /g, "")
        }
        // messageが文字列型の時、新しいメッセージを結合して一つの配列にする(これをしないと１文字ずつ改行される)
        if (typeof (messages) === "string") {
            newMessages = [newMessages.join("")]
        }

        if (key === "detail") {
            const snackbarMessage = '\n' + newMessages.join('\n')
            setSnackbarStatus({
                open: true,
                severity: "error",
                message: defaultMessage + snackbarMessage
            })
            return null
        } else {
            setError(`${key}`, { type: "validate", message: newMessages })
        }
        return null

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
            return null
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
        return null

    })
}