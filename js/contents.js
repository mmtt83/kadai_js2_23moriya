$(function(){
    //キーを作成
    const storageKey = "memo";

    //格納用の配列を用意
    let data = [];

    //編集中のメモを保持する用
    let currentMemo;

    //保持データの取得 
     //JSONデータ（文字）を配列に変換後、配列名・変数としてデータ加工
    if(localStorage.getItem(storageKey)){
        data = JSON.parse(localStorage.getItem(storageKey));
    }

    //保持データの表示
    const loadData = function(){
        //一旦全部消す
        $("#twitterContent").html("");
        $("#key").val();
        $("#memo").val();
        currentMemo = undefined;

        data.forEach(item => {
            const html = `  
                <div class="twitter__block" data-memo-id="${item.memoId}">
                    <figure><img src="img/icon.png" /></figure>
                    <div class="twitter__block-text">
                        <div class="name">G's DEV22<span class="name_reply">@gs_dev22</span></div>
                        <div class="date">${item.time}</div>
                        <div class="text">${item.value}</div>
                        <div class="twitter__icon">
                            <span class="twitter-bubble">${item.bubleR}</span>
                            <span class="twitter-loop">${item.loopR}</span>
                            <span class="twitter-heart">${item.heartR}</span>
                            <span class="delete">削除</span>
                        </div>
                    </div>
                </div>
                `;
            $("#twitterContent").prepend(html);        
        })
    };

    loadData();

    //保存のクリックイベント

    $("#send").on("click", function(){
        const title = $("#key").val();
        const value = $("#memo").val();

        let bubleR = Math.floor(Math.random()*100);
        let loopR = Math.floor(Math.random()*100);
        let heartR = Math.floor(Math.random()*100);

        //現在時刻取得
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() +1;
        const day = date.getDate();
        // const w = now.getDay();
        // const wd = ['日','月','火','水','木','金','土']
        // const weekday = wd[w];
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const now = `${month}/${day} ${hour}:${minutes}`;

        //編集なら元のtimeを使う
        const time = currentMemo ? currentMemo.time : now;

        //編集なら元のIDを使う
        const memoId = currentMemo ? currentMemo.memoId : `${month}${day}${hour}${minutes}`;
        
        const newItem = {memoId, title, value, time, bubleR, loopR, heartR};

        if(currentMemo){
            //配列を編集
            const index = data.findIndex(n => n.memoId == memoId);
            data[index] = newItem;
        }else {
            //配列へ追加
            data.push(newItem);
        }

        //ローカルストレージへ保存
        localStorage.setItem(storageKey, JSON.stringify(data));

        //再表示
        loadData();

    });
    // clear クリックイベント 保存したデータを全て削除
    $("#clear").on("click", function(){
        //ローカルストレージの項目を削除する
        localStorage.clear();

        //#todayListの中身を削除する
        $("#twitterContent").empty();
    });


    //削除イベント
    $("#delete").on("click",function(){
        $("#key").val("");
        $("#memo").val("");
        currentMemo = undefined;
    });

    //読み出し
    $(document).on("click", "#twitterContent", function(){

        //dataからメモID取得
        const id = $(this).data("memo-id");

        //配列からメモIDをキーにしてデータ取得
        const memo = data.filter(n => n.memoId == id)[0];
        currentMemo = memo;

        //フォームへセット
        // $("#key").val(memo.title);
        $("#memo").val(memo.value);
    });
});

////////////////////////////////////////////////////////////////
     //////////////// 課題 ////////////////
////////////////////////////////////////////////////////////////
//①時間表示 1時5分の場合、1:5と表示される。→01:05と表示させたい。
// ②連想配列のデータの取得が理解できていない。
// ③データの全削除について、リロードすると配列にデータが残っている。指定の方法がまずいのかもしれない。
// ④個別削除については、まだ実装できず。ブラウザの表示側と保存側の両方に削除処理をする。
// ⑤keyとvalueの設定で、フォームを２つ作る方法しかできなかったため、keyのinputを非表示にしている。
//  現在の時間と入力したテキストをkeyとvalueにせっていする方法を考える。