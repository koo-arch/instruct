import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useWebSoket = (url, textData, connectSuccess, connectFailure) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new WebSocket(url)

        socket.onopen = (event) => {
            console.log('WebSocket接続が確立されました');

            // パトロールステータスの取得リクエストをサーバーに送信
            socket.send(textData);
        };

        // メッセージを受信したときの処理
        socket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            console.log('パトロールステータスを受信しました:', messageData);
            dispatch(connectSuccess(messageData))

            // パトロールステータスをReactコンポーネント内で利用するための処理を記述
        };

        socket.onerror = (event) => {
            const errorData = event.data;
            console.log('WebSocketエラーが発生しました:', errorData);
            dispatch(connectFailure(errorData));
        };
        // コンポーネントがアンマウントされたときにWebSocket接続を閉じる
        return () => {
            socket.close();
        };
    }, [dispatch, url, textData, connectSuccess, connectFailure])
    return null;

};

export default useWebSoket;