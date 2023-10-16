import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket'
import { server } from '../api/axios';


const useWebSoket = (url, textData, connectSuccess, connectFailure) => {
    const dispatch = useDispatch();
    const WSBaseURL = server.replace(/http/g, "ws") + "/ws"

    useEffect(() => {
        const socket = new ReconnectingWebSocket(WSBaseURL + url)

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