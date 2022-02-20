
<!DOCTYPE html>
<%@page contentType="text/html" pageEncoding="UTF-8" isThreadSafe="false"%>
<%
    char label = ' ';
    String name = "";
    String domain ="@";
    if(session.getAttribute("login") == null){
        response.sendRedirect("../");
    }else{
        label = String.valueOf(session.getAttribute("login")).charAt(0);
        name = String.valueOf(session.getAttribute("login")).split("@")[0];
        domain += String.valueOf(session.getAttribute("login")).split("@")[1];
    }
   
%>
<html  lang="en">
    <head>
        <title>account - dashboard</title>
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
         <link rel="stylesheet" href="../../../style/dashboard.css"/>
         <script src="../../../script/dashboard.js" defer></script>
         <script src="../../../script/ajax.js" defer></script>
         <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    </head>
    <body id="dashboard" onload="statistics();">
        <div id="header">
            <div class="col-md-3 hidden-sm hidden-xs left-header">
                <h3>Dashboard</h3>
            </div>
            <div class="col-sm-12 hidden-md hidden-lg left-header">
                <h3>Dashboard
                    <span class="glyphicon glyphicon-menu-hamburger pull-right" id="menu"></span>
                </h3>
            </div>
            <div class="col-md-9 col-sm-12 right-header">
                <form class="form-group col-md-8" method="get" action="search.jsp" id="search">
                    <div class="input-group">
                        <div class="input-group-btn"><button class="btn" type="button" 
                               onclick="document.getElementById('search').submit();"><span class="fa fa-search"></span>
                               </button></div>
                        <input type="text" class="form-control" placeholder="search" name="search"/>
                    </div>
                </form>

                <div class="col-md-4">
                    <ul class="list-unstyled list-inline pull-right">
                        <li><a href="../dashboard/profile.jsp" class="btn btn-link" role="button">PROFILE</a></li>
                        <li><a href="#" class="btn btn-link" role="button" onclick="signOut();">LOGOUT</a></li>
                    </ul>
                </div>
            </div>
        </div>


        <div id="main">
            <div class="col-md-3 hidden-sm hidden-xs sidebar">
                <div id="profile-show">
                    <h1 class="pull-left"><button><%=label%></button></h1>
                    <h3 class="pull-left"><%=name%> <small><%=domain%></small></h3>
                 </div>
                <ul class="nav nav-pills nav-stacked clear">
                    <li>
                        <a href="#homelinks" class="transition" role="button"
                           data-toggle="collapse" aria-expanded="false" aria-controls="homelinks">
                          <span class="glyphicon glyphicon-home" aria-hidden="true"></span> Home
                          <span class="glyphicon glyphicon-menu-left pull-right transition" aria-hidden="true"></span>
                       </a>
                       <ul class="collapse list-unstyled" id="homelinks">
                           <li><a href="../dashboard/" class="transition">Dashboard</a></li>
                            <li><a href="../dashboard/video.jsp" class="transition">Video Of The Day</a></li>
                            <li><a href="../dashboard/welcome.jsp" class="transition">Welcome</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#aboutlinks" class="transition" role="button"
                           data-toggle="collapse" aria-expanded="false" aria-controls="aboutlinks">
                          <span class="fa fa-book" aria-hidden="true"></span> Abouts
                          <span class="glyphicon glyphicon-menu-left pull-right transition" aria-hidden="true"></span>
                       </a>
                       <ul class="collapse list-unstyled" id="aboutlinks">
                           <li><a href="../dashboard/mission.jsp" class="transition">Mission</a></li>
                            <li><a href="../dashboard/vision.jsp" class="transition">Vision</a></li>
                            <li><a href="../dashboard/values.jsp" class="transition">Values</a></li>
                            <li><a href="../dashboard/leadership.jsp" class="transition">Leadership</a></li>
                            <li><a href="../dashboard/history.jsp" class="transition">History</a></li>
                            <li><a href="../dashboard/privacy.jsp" class="transition">Privacy</a></li>
                            <li><a href="../dashboard/socials.jsp" class="transition">Social Media Handles</a></li>
                            <li><a href="../dashboard/location.jsp" class="transition">Add Church Locations</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#posts" class="transition" role="button"
                           data-toggle="collapse" aria-expanded="false" aria-controls="posts">
                          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Manage Posts
                          <span class="glyphicon glyphicon-menu-left pull-right transition" aria-hidden="true"></span>
                       </a>
                       <ul class="collapse list-unstyled" id="posts">
                           <li><a href="../dashboard/sermons.jsp" class="transition">Sermons</a></li>
                            <li><a href="../dashboard/events.jsp" class="transition">Events</a></li>
                            <li><a href="../dashboard/testimonials.jsp" class="transition">Testimonials</a></li>
                            
                        </ul>
                    </li>

                    <li>
                        <a href="#visitors" class="transition" role="button"
                           data-toggle="collapse" aria-expanded="false" aria-controls="visitors">
                          <span class="fa fa-user" aria-hidden="true"></span> Manage Visitors
                          <span class="glyphicon glyphicon-menu-left pull-right transition" aria-hidden="true"></span>
                       </a>
                       <ul class="collapse list-unstyled" id="visitors">
                        <li><a href="../dashboard/contact.jsp" class="transition">Contact Messages</a></li>
                        <li><a href="../dashboard/subscriber.jsp" class="transition">Newsletter Subscriber</a></li>
                        
                        </ul>
                    </li>

                </ul>
            </div>



            <div class="col-md-9 mainbar">
                <div id="message-panel">
                    <div class="alert alert-success" role="alert">
                        <button type="button" class="close" data-dismiss="alert" arialabel="Close"><span aria-hidden="true">&times;</span></button>
                         Home / Dashboard
                    </div>
                </div>
                <div class="form-group">
                    <h6 class="form-text text-center" id="loader">
                        <img src="../../../asset/load.gif" alt="load.gif"/><span></span></h6>
                    <h4 class="form-text text-center" id="output"></h4>
                </div>
                <div class="panels container-fluid">
                        <div class="stat-holder">
                            <div class="stat">
                                <h1></h1>
                                <h3>Contacts</h3>
                                <a href="../dashboard/contact.jsp" role="button" class="btn btn-primary">View</a>
                            </div>
                            <div class="stat">
                                <h1></h1>
                                <h3>Subscribers</h3>
                                <a href="../dashboard/subscriber.jsp" role="button" class="btn btn-primary">View</a>
                            </div>
                            <div class="stat">
                                <h1></h1>
                                <h3>Posts</h3>
                                <a href="../dashboard/sermons.jsp" role="button" class="btn btn-primary">Create</a>
                            </div>
                            <div class="stat">
                                <h1></h1>
                                <h3>Testimonials</h3>
                                <a href="../dashboard/testimonials.jsp" role="button" class="btn btn-primary">Create</a>
                            </div>
                        </div>
                    
                </div>

            </div>


        </div>



        <div id="mobile">
            <div class="sidebar">
                <div class="left-header">
                    <h3>Dashboard</h3>
                </div>
                <div id="profile-show">
                     <h1 class="pull-left"><button><%=label%></button></h1>
                     <h3 class="pull-left"><%=name%> <small><%=domain%></small></h3>
                </div>
                <ul class="nav nav-pills nav-stacked clear">
                    <li>
                        <a href="#homelinks2" class="transition" role="button"
                           data-toggle="collapse" aria-expanded="false" aria-controls="homelinks2">
                          <span class="glyphicon glyphicon-home" aria-hidden="true"></span> Home
                          <span class="glyphicon glyphicon-menu-left pull-right transition" aria-hidden="true"></span>
                       </a>
                       <ul class="collapse list-unstyled" id="homelinks2">
                        <li><a href="../dashboard/" class="transition">Dashboard</a></li>
                        <li><a href="../dashboard/video.jsp" class="transition">Video Of The Day</a></li>
                        <li><a href="../dashboard/welcome.jsp" class="transition">Welcome</a></li>
    
                       </ul>
                    </li>
                    <li>
                        <a href="#aboutlinks2" class="transition" role="button"
                           data-toggle="collapse" aria-expanded="false" aria-controls="aboutlinks2">
                          <span class="fa fa-book" aria-hidden="true"></span> Abouts
                          <span class="glyphicon glyphicon-menu-left pull-right transition" aria-hidden="true"></span>
                       </a>
                       <ul class="collapse list-unstyled" id="aboutlinks2">
                        <li><a href="../dashboard/mission.jsp" class="transition">Mission</a></li>
                        <li><a href="../dashboard/vision.jsp" class="transition">Vision</a></li>
                        <li><a href="../dashboard/values.jsp" class="transition">Values</a></li>
                        <li><a href="../dashboard/leadership.jsp" class="transition">Leadership</a></li>
                        <li><a href="../dashboard/history.jsp" class="transition">History</a></li>
                        <li><a href="../dashboard/privacy.jsp" class="transition">Privacy</a></li>
                        <li><a href="../dashboard/socials.jsp" class="transition">Social Media Handles</a></li>
                        <li><a href="../dashboard/location.jsp" class="transition">Add Church Locations</a></li>
                        </ul>
                    </li>
    
                    <li>
                        <a href="#posts2" class="transition" role="button"
                           data-toggle="collapse" aria-expanded="false" aria-controls="posts2">
                          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Manage Posts
                          <span class="glyphicon glyphicon-menu-left pull-right transition" aria-hidden="true"></span>
                       </a>
                       <ul class="collapse list-unstyled" id="posts2">
                        <li><a href="../dashboard/sermons.jsp" class="transition">Sermons</a></li>
                        <li><a href="../dashboard/events.jsp" class="transition">Events</a></li>
                        <li><a href="../dashboard/testimonials.jsp" class="transition">Testimonials</a></li>
                            
                        </ul>
                    </li>
    
                    <li>
                        <a href="#visitors2" class="transition" role="button"
                           data-toggle="collapse" aria-expanded="false" aria-controls="visitors">
                          <span class="fa fa-user" aria-hidden="true"></span> Manage Visitors
                          <span class="glyphicon glyphicon-menu-left pull-right transition" aria-hidden="true"></span>
                       </a>
                       <ul class="collapse list-unstyled" id="visitors2">
                           <li><a href="../dashboard/contact.jsp" class="transition">Contact Messages</a></li>
                            <li><a href="../dashboard/subscriber.jsp" class="transition">Newsletter Subscriber</a></li>
                            
                        </ul>
                    </li>
    
                </ul>
            </div>
            
        </div>
        
    </body>
</html>