

function logincheck()
{
    var name=document.getElementById( "login_username" ).value;
    var pass=document.getElementById( "login_password" ).value;
    var flat=false;

    if(name)
    {
        $.ajax({
            type: 'post',
            url: './php/loginCheck.php',
            async: false,
            data: {
                username:name,
                password:pass,
            },
            success: function (response) {

                if(response==="Match")
                {
                    flat=true;
                }
                else
                {
                    $( '#password_status' ).html("Incorrect Username or Password");
                    flat=false;
                }
            }
        });
    }
    else
    {
        $( '#password_status' ).html("");
        return false;
    }

    return flat;
}


// JavaScript Document