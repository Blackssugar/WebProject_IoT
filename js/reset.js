$(document).ready(function(){
    $("#newPassword").onchange = checkPassword;
    $("#repeatPassword").onchange = checkPassword;
})

function checkPassword(){
    var p1 = document.getElementById("newPassword").value;
    var p2 = document.getElementById("repeatPassword").value;
    if(p1!==p2)
        document.getElementById("cpassword").setCustomValidity("Passwords does not match!");
        //setCustomValidity用于判断表单的正误，有错误时可以手动设置提示信息,当没有错误时要将setCustomValidity(“)设置为空，否则表单无法提交
    else
        document.getElementById("cpassword").setCustomValidity('');
}