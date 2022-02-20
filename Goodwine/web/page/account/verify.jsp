<!DOCTYPE html>
<%@page contentType="text/html" pageEncoding="UTF-8" isThreadSafe="false"%>
<%
    if(session.getAttribute("login") != null){
        response.sendRedirect("dashboard/");
    }
%>
<html  lang="en">
    <head>
        <title>account - sign in</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name=ârobotsâ content=âindex,followâ> 
        <meta name="description" content="Good Wine is a living christian bible believing church,
        life transforming and an atmosphere of love.">
        <meta name="keyword" content="Good Wine, bible, believing,christian,love world">
        <link rel="icon" href="../asset/test-logo.png"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" defer></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" crossorigin="anonymous" defer></script>   
        <!-- Include HTML5 Shim and Respond.js for IE6-8 support of HTML5
         elements and media queries -->
         <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js" defer></script>
         <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js" defer></script> 
         <link rel="stylesheet" href="../../style/dashboard.css"/>
         <script src="../../script/dashboard.js" defer></script>
         <script src="../../script/ajax.js" defer></script>
         <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container-fluid">
            <div class="col-sm-12">
                <div class="col-md-push-4 col-md-4" id="login">
                    <div class="form-group">
                        <h2 class="form-text text-center"><span class="glyphicon glyphicon-lock"></span>Verify Email</h2>
   
                    </div>
                    <div class="form-group">
                        <h6 class="form-text text-center" id="loader">
                            <img src="../../asset/load.gif" alt="load.gif"/><span></span></h6>
                        <p class="form-text text-center" id="output" style="display: block;">We have emailed you 
                            a certain code please 
                            enter the code in the box below to
                            verify that it is you</p>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div>
                            <input class="form-control input-lg" type="text" placeholder="code" name="code"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="form-control btn btn-primary input-lg" id="verify" onclick="verify();">Verify Code</button>
                    </div>
                    <div class="form-group">
                        <p class="form-text text-center">
                            <span style="color: #0275d8;">didn't get the Code <a class="btn-link" role="button"
                            href="#" style="color: rgba(255,0,0,0.8); display: inline" onclick="resend();">Resend Code ?</a></span>
                        </p>
                        <a class="form-control btn btn-link btn-lg" role="button" href="../account/">Login instead ?</a>
                    </div>
                    
                </div>
            </div>
            
        </div>
    </body>
</html>