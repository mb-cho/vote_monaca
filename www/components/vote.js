// This is a JavaScript file
// vote.js
function class_text(){
    //console.log('class_log enter');
    
    for(var key in mst_lang_obj){
        console.log('lang ' + key + ' IS ' + mst_lang_obj[key]);
        
    }
    
    // mst_calss_lang_objと同じ名前の class があれば値（文字列）をSET
    for(var key in mst_class_lang_obj){
        //console.log('class_lang ' + key + ' IS ' + mst_class_lang_obj[key]);
        $('.'+key).html(mst_class_lang_obj[key]);
        $('.t_name_mae').html(mst_class_lang_obj['t_name_mae']);
    }
    
    // user_objと同じ名前の class があれば値（文字列）をSET
    for (var key in user_obj){
        if($('.' + key)[0]){
                //console.log(key + ' IS ' + user_obj[key])
                $('.' + key).html(user_obj[key]);
        }
    }
    
}

function send_user_info(){
    var id = user_obj.id;
    var name = $('#input_name').val();
    var mail = $('#input_mail').val();
    var lang = $('#input_lang').val();
    var password = $('#input_password').val();
    var password_cfm = $('#input_password_cfm').val();
    //alert(mail);
    var flg = true;
    //パスワードのチェック
    if(password != password_cfm){
        alert($('.t_password_do_not_match').val());
        flg = false;
    }
    
    if(flg){
        var obj = {};
        obj.id = id;
        obj.name = name;
        obj.mail = mail;
        obj.lang = lang;
        obj.password = password;
        var s_url = 'https://net-navi.cc/vote/users/user_edit';
        http_send_user_info(s_url,obj);
    }
}

function setting_user_info(){
    $('#input_name').val(user_obj.name);
    $('#input_mail').val(user_obj.mail);
    $('#input_password').val(user_obj.password);
    $('#input_password_cfm').val(user_obj.password);
    
    //language selectbox 値SET
    $('select#input_lang').children().remove();
    for (var key in mst_lang_obj){
        $('select#input_lang').append($('<option>').html(mst_lang_obj[key]['lang']).val(mst_lang_obj[key]['code']));
    }
    $("select#input_lang").val(user_obj.lang);//現在の言語を選択状態にする

    
/*   
//select要素のIDをselectとする

//追加するとき
$('#select').append($('<option>').html("追加される項目名").val("追加される値"));

//全て取り除くとき
$('#select > option').remove();

//選択されたものを取り除くとき
$('#select > option:selected').remove();
*/

    
}

// JQuery
$(function(){
    //ここから始まる
    $(document).ready(function(){
//localStorage.clear();
        var user = localStorage.getItem("user");
        if(user == null){//user が無い　＝　初回起動
            var s_url = 'https://net-navi.cc/vote/users/user_entry';
            http_user_add(s_url);
        }else{
            user_obj = eval('(' + user + ')');
            
            var mst_lang = localStorage.getItem("mst_lang");
                mst_lang_obj = eval('(' + mst_lang + ')');
            var mst_class_lang = localStorage.getItem("mst_class_lang");
                mst_class_lang_obj = eval('(' + mst_class_lang + ')');
        }
        
    
    });
    
});
