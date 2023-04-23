
var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var empDBName = "STUDENT-DB";
var empRelationName = "StudData";
var connToken="90932771|-31949278628790260|90948437";

$('#sid').focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getSIdAsJsonObj(){
    var sid = $('#sid').val();
    var jsonStr = {
        id:sid
    };
    return JSON.stringify(jsonStr);
}


function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var data=JSON.parse(jsonObj.data).record;
    $('#sname').val(data.name);
    $('#sclass').val(data.class);
    $('#bd').val(data.bd);
    $('#da').val(data.da);
    $('#dt').val(data.dt);
}


function resetForm(){
    $('#sid').val("");
    $('#sname').val("");
    $('#sclass').val("");
    $('#bd').val("");
    $('#da').val("");
    $('#dt').val("");
    $('#sid').prop("disabled",false);
    $('#save').prop("disabled",true);
    $('#change').prop("disabled",true);
    $('#reset').prop("disabled",true);
    $('#sid').focus();
}




function validateData(){
    var sid,sname , sclass,bd,da,dt;
    sid=$('#sid').val();
    sname=$('#sname').val();
    sclass=$('#sclass').val();
    bd = $('#bd').val();
    da =$('#da').val();
    dt=$('#dt').val();

    if(sid ===""){
        alert("Employee ID missing");
        $('#sid').focus();
        return "";

    }
    if(sname ===""){
        alert("Student Name missing");
        $('#sname').focus();
        return "";

    }
    if(sclass ===""){
        alert("Student Class missing");
        $('#sclass').focus();
        return "";

    }
    if(bd ===""){
        alert(" Birthdate missing");
        $('#bd').focus();
        return "";

    }
    if(da ===""){
        alert(" DA missing");
        $('#da').focus();
        return "";

    }
    if(dt ===""){
        alert(" Enrollment Date missing");
        $('#dt').focus();
        return "";
    }
    var jsonStrObj ={
        id:sid,
        name:sname,
        class:sclass,
        bd:bd,
        da:da,
        dt:dt
    };
    return JSON.stringify(jsonStrObj);
}
function getStud(){
    var sIdJsonObj=getSIdAsJsonObj();
    var getRequest=createGET_BY_KEYRequest(connToken,empDBName,empRelationName,sIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status===400){
    $('#save').prop("disabled",false);
     $('#reset').prop("disabled",false);
    $('#sname').focus();

    }
    else if(resJsonObj.status===200){
        $('#sid').prop("disabled",true);
        fillData(resJsonObj);

    $('#change').prop("disabled",false);
    $('#reset').prop("disabled",false);
    $('#sname').focus();
    }
}

function saveData(){
    var jsonStrObj=validateData();
    if(jsonStrObj === ''){
        return '';
    }
    var putRequest=createPUTRequest(connToken,jsonStrObj,empDBName,empRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#sid').focus();

}

function changeData(){
    $('#change').prop("disabled",true);
    jsonChg=validateData();
    var updateRequest= createUPDATERecordRequest(connToken, jsonChg,empDBName,empRelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $('#sid').focus();
}