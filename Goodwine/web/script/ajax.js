
function setOutputText(text,color){
    var out = document.getElementById("output");
    out.style.display = "block";
    out.style.color = color;
    out.innerHTML = text;
}
function hideOutputText(){
   var out = document.getElementById("output");
   out.style.display = "none";
}

function story(){
    const params = new URLSearchParams(window.location.search);
    var search = params.get("id");
    var query = "id="+search;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../jsp/story.jsp", true);
    var loader = document.getElementById("loader-view");
    loader.style.display = "block";
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            var data = JSON.parse(this.responseText);
            if(data !== null){
                setFullStory(data);
                
            }else{
                window.alert("can't load post");
            }
            
            
        }
    };
    xmlHttp.send(query);

    
}
function next(){
    var query = null;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../jsp/next.jsp", true);
    var reload = document.getElementById("reload");
    var load = document.createElement("img");
    load.setAttribute("src","../asset/load.gif");
    reload.innerHTML = "";
    reload.appendChild(load);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            reload.innerHTML = "";
            var span = document.createElement("span");
            span.classList.add("fa");span.classList.add("fa-refresh");
            span.onclick = function(){
               next();  
            };
            reload.appendChild(span);
            var data = JSON.parse(this.responseText);
            var holder = document.querySelectorAll(".post-holder")[0];
            if(data !== null){
                for(var key in data){
                    var post = document.createElement("div");
                    post.classList.add("col-sm-12"); post.classList.add("col-md-3"); post.classList.add("post");
                    var img = document.createElement("img");
                    img.classList.add("img-responsive");
                    img.setAttribute("src",data[key].photo);
                    var h3 = document.createElement("h3");
                    h3.appendChild(document.createTextNode(data[key].title));
                    h3.style.fontSize = "14px";
                    var p = document.createElement("p");
                    p.innerHTML += data[key].text;
                    var a = document.createElement("a");
                    a.href = "story.html?id="+data[key].id; a.appendChild(document.createTextNode("Read More"));
                    post.appendChild(img); post.appendChild(h3); post.appendChild(p);post.appendChild(a);

                    holder.appendChild(post);

                }
            }else{
                window.alert("can't load post");
            }
            
            
        }
    };
    xmlHttp.send(query);

}

function setFullStory(data){
    
    var title = document.getElementsByTagName("title")[0];
    var meta = document.getElementsByName("description")[0];
    var mainh2 = document.querySelectorAll(".main .col-md-12 h2")[0];
    var mainimg = document.querySelectorAll(".main img")[0];
    var mainh4 = document.querySelectorAll(".main .text h4")[0];
    var maintext = document.querySelectorAll(".main .text")[0];
    
    var container  = document.getElementById("related");
    container.innerHTML = "";
    var div = document.createElement("div");
    div.classList.add("col-md-12");
    var heading = document.createElement("h2");
    heading.appendChild(document.createTextNode("Related Posts"));
    div.appendChild(heading);
    container.appendChild(div);
    
    div = document.createElement("div");
    div.classList.add("col-md-12"); div.classList.add("post-holder");
    container.appendChild(div);
    
    
    for(var key in data){
        if(key === "post0"){ //set main story post and social media
            title.innerHTML = data[key].title;
            meta.setAttribute("content",data[key].title);
            mainh2.innerHTML = data[key].title;
            mainimg.setAttribute("src",data[key].photo);
            mainh4.innerHTML="| "+ data[key].author+" |";
            maintext.innerHTML += data[key].text;
            if(data["media"].facebook){
                //set social media
                document.querySelectorAll(".facebook")[0].href = data["media"].facebook;
                document.querySelectorAll(".instagram")[0].href = data["media"].instagram;
                document.querySelectorAll(".twitter")[0].href = data["media"].twitter;
                document.querySelectorAll(".youtube")[0].href = data["media"].youtube;
                
            }
        }else if(key.includes("post")){ // related post
            var post = document.createElement("div");
            post.classList.add("col-sm-12"); post.classList.add("col-md-3"); post.classList.add("post");
            var img = document.createElement("img");
            img.classList.add("img-responsive");
            img.setAttribute("src",data[key].photo);
            var h3 = document.createElement("h3");
            h3.appendChild(document.createTextNode(data[key].title));
            h3.style.fontSize = "14px";
            var p = document.createElement("p");
            p.innerHTML += data[key].text;
            var a = document.createElement("a");
            a.href = "story.html?id="+data[key].id; a.appendChild(document.createTextNode("Read More"));
            post.appendChild(img); post.appendChild(h3); post.appendChild(p);post.appendChild(a);
            
            div.appendChild(post);
            
        }
        
    }
    
}

function fetchEdit(){
     const params = new URLSearchParams(window.location.search);
    var search = params.get("id");
    
    var query = "id="+search;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../../../jsp/fetchEdit.jsp", true);
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "searching";
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            var data = JSON.parse(this.responseText);
            if(data !== null){
                for(var key in data){
                    document.getElementsByName("topic")[0].value = data[key].title;
                    document.getElementsByName("author")[0].value = data[key].author;
                    document.getElementsByName("id")[0].value = data[key].id;
                    document.getElementsByName("editor1")[0].value = data[key].text;
                }
                
            }else{
                window.alert("can't find what you are searching for");
            }
            
            
        }
    };
    xmlHttp.send(query);

    
}

function edit(){
    var id = document.getElementsByName("id")[0].value;
    var image = document.getElementsByName("image")[0].files[0];
    var topic = document.getElementsByName("topic")[0].value;
    var author  = document.getElementsByName("author")[0].value;
    var newsletter  = document.getElementsByName("newsletter")[0].checked;
    if(newsletter){
        newsletter = "yes";
    }else{
        newsletter = "no";
    }
    var editor1 = encodeURIComponent(CKEDITOR.instances.editor1.getData());
    var form = document.getElementById("form");
    var update = document.getElementById("update");
    var formdata = new FormData();
    //append all the form field data one after the other
    formdata.append("image",image);
    formdata.append("sermon",editor1);
    formdata.append("author",author);
    formdata.append("newsletter",newsletter);
    formdata.append("topic",topic);
    formdata.append("id",id);
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "uploading";
    update.disabled = true;
    xmlHttp.open(form.method,form.action, true);
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            update.disabled = false;
            var text = this.responseText;
            if(text.trim() === "format-error"){
                window.alert("please enter an image in any of this format below\n *.png,*.jpg,*.jpeg,*.gif");
            }else if(text.trim() === "upload-error"){
            }else{
                window.alert(text);
            }

        }
    };
    xmlHttp.send(formdata);
    
}

function search(){
    const params = new URLSearchParams(window.location.search);
    var search = params.get("search");
    document.getElementsByTagName("title")[0].innerHTML = search;
    document.getElementsByClassName("alert-success")[0].
            appendChild(document.createTextNode("Search Result For : "+search));
    
    var query = "search="+search;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../../../jsp/search.jsp", true);
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "searching";
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            var data = JSON.parse(this.responseText);
            if(data !== null){
                
                var panels = document.getElementsByClassName("panels")[0];
                panels.innerHTML = "";
                panels.appendChild(createPost(data,"sermons"));
                panels.appendChild(createSeparator());
                panels.appendChild(createPost(data,"events"));
                panels.appendChild(createSeparator());
                panels.appendChild(createPost(data,"testimonials"));
                panels.appendChild(createSeparator());
                panels.appendChild(createContact(data));
                panels.appendChild(createSeparator());
                panels.appendChild(createSubscriber(data));
                panels.appendChild(createSeparator());
                panels.appendChild(createCenter(data));
                panels.appendChild(createSeparator());
                
            }else{
                window.alert("can't find what you are searching for");
            }
            
            
        }
    };
    xmlHttp.send(query);

    
}
function createSeparator(){
    var hr = document.createElement("hr");
    hr.classList.add("col-sm-offset-1");hr.classList.add("col-sm-10");
    return hr;
}
function createSubscriber(data){
    var result = document.createElement("div");
    result.classList.add("col-sm-offset-1");result.classList.add("col-sm-10");
    result.classList.add("results");
    var h1 = document.createElement("h1");
    result.appendChild(h1);
    var count = 0;
    for( var key in data){
        if(data[key].type.toString() === "subscribers"){
            var section = document.createElement("section");
            var span = document.createElement("span");
            span.appendChild(document.createTextNode(data[key].email.charAt(0)));
            var h6 = document.createElement("h6");
            h6.appendChild(document.createTextNode(data[key].email));
            var nav = document.createElement("nav");
            var destroy = document.createElement("button");
            destroy.appendChild(document.createTextNode("Delete"));
            destroy.classList.add("btn");destroy.classList.add("btn-link");
            destroy.setAttribute("id",data[key].id); destroy.setAttribute("name","subscriber");
            destroy.setAttribute("role","button");
            nav.appendChild(destroy);
            destroy.onclick = function(e){
                var target = (e.target) ? e.target : e.srcElement;
                var query = "table="+target.getAttribute("name")+"&id="+target.getAttribute("id");
                window.location.href = "../../../jsp/delete.jsp?"+query;
            };
            var btn = document.createElement("button");
            btn.classList.add("btn");
            btn.classList.add("btn-primary");
            btn.appendChild(document.createTextNode("Send Message"));
            btn.classList.add("send");
            btn.setAttribute("name",data[key].email);
            btn.onclick = function(e){
                var target = (e.target) ? e.target : e.srcElement;
                setModal(target.getAttribute("name"));
            };
            nav.appendChild(btn);

            section.appendChild(span);section.appendChild(h6); section.appendChild(nav);
            result.appendChild(section);
            count++;
        }
        
    }
    h1.appendChild(document.createTextNode("subscribers("+count+")"));
    
    return result;
}
function createCenter(data){
    var result = document.createElement("div");
    result.classList.add("col-sm-offset-1");result.classList.add("col-sm-10");
    result.classList.add("results");
    var h1 = document.createElement("h1");
    result.appendChild(h1);
    var count = 0;
    for( var key in data){
        if(data[key].type.toString() === "locations"){
            var section = document.createElement("section");
            var h4 = document.createElement("h4");
            h4.appendChild(document.createTextNode(data[key].center));
            var h5 = document.createElement("h5");
            h5.appendChild(document.createTextNode(data[key].address));
            var nav = document.createElement("nav");
            var destroy = document.createElement("button");
            destroy.appendChild(document.createTextNode("Delete"));
            destroy.classList.add("btn");destroy.classList.add("btn-link");
            destroy.setAttribute("id",data[key].id); destroy.setAttribute("name","location");
            destroy.setAttribute("role","button");
            nav.appendChild(destroy);
            destroy.onclick = function(e){
                var target = (e.target) ? e.target : e.srcElement;
                var query = "table="+target.getAttribute("name")+"&id="+target.getAttribute("id");
                window.location.href = "../../../jsp/delete.jsp?"+query;
            };
            section.appendChild(h4); section.appendChild(h5); section.appendChild(nav);
            result.appendChild(section);
            count++;
        }
        
    }
    h1.appendChild(document.createTextNode("Church Centers("+count+")"));
    return result;
}
function createContact(data){
    var result = document.createElement("div");
    result.classList.add("col-sm-offset-1");result.classList.add("col-sm-10");
    result.classList.add("results");
    var h1 = document.createElement("h1");
    result.appendChild(h1);
    var count = 0;
    for( var key in data){
        if(data[key].type.toString() === "contacts"){
            var section = document.createElement("section");
            var span = document.createElement("span");
            span.appendChild(document.createTextNode("O"));
            var h4 = document.createElement("h4");
            h4.appendChild(document.createTextNode(data[key].name));
            var h5 = document.createElement("h5");
            h5.appendChild(document.createTextNode(data[key].subject));
            var h6 = document.createElement("h6");
            h6.appendChild(document.createTextNode(data[key].email));
            var nav = document.createElement("nav");
            var destroy = document.createElement("button");
            destroy.appendChild(document.createTextNode("Delete"));
            destroy.classList.add("btn");destroy.classList.add("btn-link");
            destroy.setAttribute("id",data[key].id); destroy.setAttribute("name","contact");
            destroy.setAttribute("role","button");
            nav.appendChild(destroy);
            destroy.onclick = function(e){
                var target = (e.target) ? e.target : e.srcElement;
                var query = "table="+target.getAttribute("name")+"&id="+target.getAttribute("id");
                window.location.href = "../../../jsp/delete.jsp?"+query;
            };
            var btn = document.createElement("button");
            btn.classList.add("btn");
            btn.classList.add("btn-primary");
            btn.appendChild(document.createTextNode("Reply"));
            btn.classList.add("send");
            btn.setAttribute("name",data[key].email);
            btn.onclick = function(e){
                var target = (e.target) ? e.target : e.srcElement;
                setModal(target.getAttribute("name"));
            };
            nav.appendChild(btn);

            section.appendChild(span); section.appendChild(h4); section.appendChild(h5);
            section.appendChild(h6); section.appendChild(nav);
            result.appendChild(section);
            count++;
        }
        
    }
    h1.appendChild(document.createTextNode("contacts("+count+")"));
    
    return result;
}
function createPost(data,types){
    var result = document.createElement("div");
    result.classList.add("col-sm-offset-1");result.classList.add("col-sm-10");
    result.classList.add("results");
    var h1 = document.createElement("h1");
    result.appendChild(h1);
    var count = 0;
    for( var key in data){
        if(data[key].type.toString() === types){
            var section = document.createElement("section");
            var img = document.createElement("img");
            img.setAttribute("src",data[key].image);
            img.classList.add("img-responsive");img.classList.add("thumbnail"); 
            img.classList.add("post"+data[key].id);
            var h5 = document.createElement("h5");
            h5.appendChild(document.createTextNode(data[key].title));
            var nav = document.createElement("nav");
            var destroy = document.createElement("button");
            destroy.appendChild(document.createTextNode("Delete"));
            destroy.classList.add("btn");destroy.classList.add("btn-link");
            destroy.setAttribute("id",data[key].id); destroy.setAttribute("name","post");
            destroy.setAttribute("role","button");
            nav.appendChild(destroy);
            destroy.onclick = function(e){
               var target = (e.target) ? e.target : e.srcElement;
               var target_img = document.getElementsByClassName("post"+target.getAttribute("id"))[0];
                if(target_img !== null){
                    target_img.setAttribute("src","");//release this resource so java can delete it
                    var query = "table="+target.getAttribute("name")+"&id="+target.getAttribute("id");
                    window.location.href = "../../../jsp/delete.jsp?"+query;
                }else{
                    window.alert("can't get photo data");
                }
                
            };
            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Edit"));
            a.classList.add("btn");a.classList.add("btn-link");
            a.href = "edit.jsp?id="+data[key].id+"&table=post";a.setAttribute("role","button");
            nav.appendChild(a);

            section.appendChild(img);section.appendChild(h5); section.appendChild(nav);
            result.appendChild(section);
            
            count++;
        }
        
    }
    
    h1.appendChild(document.createTextNode(types+"("+count+")"));
    return result;
}
function _delete(table,id){
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "deleting content";
    var formdata = new FormData();
    //append all the form field data one after the other
    formdata.append("table",table);
    formdata.append("id",id);
    xmlHttp.open("post","../../../jsp/delete.jsp?", true);
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            var text = this.responseText;
            window.alert(text);
            window.location.reload();
        }
    };
    xmlHttp.send(formdata);
}

function testimonials(){
    var image = document.getElementsByName("image")[0].files[0];
    var topic = document.getElementsByName("topic")[0].value;
    var author  = document.getElementsByName("author")[0].value;
    var newsletter  = document.getElementsByName("newsletter")[0].checked;
    if(newsletter){
        newsletter = "yes";
    }else{
        newsletter = "no";
    }
    var editor1 = encodeURIComponent(CKEDITOR.instances.editor1.getData());
    var form = document.getElementById("form");
    var update = document.getElementById("update");
    if(image){
        var formdata = new FormData();
        //append all the form field data one after the other
        formdata.append("image",image);
        formdata.append("sermon",editor1);
        formdata.append("author",author);
        formdata.append("newsletter",newsletter);
        formdata.append("topic",topic);
        var xmlHttp = new XMLHttpRequest();
        //start loading gif or progress
        var loader = document.getElementById("loader");
        loader.style.display = "block";
        document.querySelector("#loader span").innerHTML = "uploading";
        update.disabled = true;
        xmlHttp.open(form.method,form.action, true);
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                loader.style.display = "none";
                update.disabled = false;
                var text = this.responseText;
                if(text.trim() === "format-error"){
                    window.alert("please enter an image in any of this format below\n *.png,*.jpg,*.jpeg,*.gif");
                }else if(text.trim() === "upload-error"){
                    window.alert("file upload failed. please try again later");
                }else{
                    window.alert(text);
                }
                
            }
        };
        xmlHttp.send(formdata);
    }else{
        window.alert("Please select an image file");
    }
}
function events(){
    var image = document.getElementsByName("image")[0].files[0];
    var topic = document.getElementsByName("topic")[0].value;
    var author  = document.getElementsByName("author")[0].value;
    var newsletter  = document.getElementsByName("newsletter")[0].checked;
    if(newsletter){
        newsletter = "yes";
    }else{
        newsletter = "no";
    }
    var editor1 = encodeURIComponent(CKEDITOR.instances.editor1.getData());
    var form = document.getElementById("form");
    var update = document.getElementById("update");
    if(image){
        var formdata = new FormData();
        //append all the form field data one after the other
        formdata.append("image",image);
        formdata.append("sermon",editor1);
        formdata.append("author",author);
        formdata.append("newsletter",newsletter);
        formdata.append("topic",topic);
        var xmlHttp = new XMLHttpRequest();
        //start loading gif or progress
        var loader = document.getElementById("loader");
        loader.style.display = "block";
        document.querySelector("#loader span").innerHTML = "uploading";
        update.disabled = true;
        xmlHttp.open(form.method,form.action, true);
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                loader.style.display = "none";
                update.disabled = false;
                var text = this.responseText;
                if(text.trim() === "format-error"){
                    window.alert("please enter an image in any of this format below\n *.png,*.jpg,*.jpeg,*.gif");
                }else if(text.trim() === "upload-error"){
                    window.alert("file upload failed. please try again later");
                }else{
                    window.alert(text);
                }
                
            }
        };
        xmlHttp.send(formdata);
    }else{
        window.alert("Please select an image file");
    }
}
function sermons(){
    var image = document.getElementsByName("image")[0].files[0];
    var topic = document.getElementsByName("topic")[0].value;
    var author  = document.getElementsByName("author")[0].value;
    var newsletter  = document.getElementsByName("newsletter")[0].checked;
    if(newsletter){
        newsletter = "yes";
    }else{
        newsletter = "no";
    }
    var editor1 = encodeURIComponent(CKEDITOR.instances.editor1.getData());
    var form = document.getElementById("form");
    var update = document.getElementById("update");
    if(image){
        var formdata = new FormData();
        //append all the form field data one after the other
        formdata.append("image",image);
        formdata.append("sermon",editor1);
        formdata.append("author",author);
        formdata.append("newsletter",newsletter);
        formdata.append("topic",topic);
        var xmlHttp = new XMLHttpRequest();
        //start loading gif or progress
        var loader = document.getElementById("loader");
        loader.style.display = "block";
        document.querySelector("#loader span").innerHTML = "uploading";
        update.disabled = true;
        xmlHttp.open(form.method,form.action, true);
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                loader.style.display = "none";
                update.disabled = false;
                var text = this.responseText;
                if(text.trim() === "format-error"){
                    window.alert("please enter an image in any of this format below\n *.png,*.jpg,*.jpeg,*.gif");
                }else if(text.trim() === "upload-error"){
                    window.alert("file upload failed. please try again later");
                }else{
                    window.alert(text);
                }
                
            }
        };
        xmlHttp.send(formdata);
    }else{
        window.alert("Please select an image file");
    }
}
function deputys(){
    var image = document.getElementsByName("image")[1].files[0];
    var name = document.getElementsByName("name")[1].value;
    var editor1 = encodeURIComponent(CKEDITOR.instances.editor2.getData());
    var form = document.getElementById("form2");
    var update = document.getElementById("deputy");
    if(image){
        var formdata = new FormData();
        //append all the form field data one after the other
        formdata.append("image",image);
        formdata.append("statement",editor1);
        formdata.append("name",name);
        var xmlHttp = new XMLHttpRequest();
        //start loading gif or progress
        var loader = document.getElementById("loader");
        loader.style.display = "block";
        document.querySelector("#loader span").innerHTML = "uploading";
        update.disabled = true;
        xmlHttp.open(form.method,form.action, true);
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                loader.style.display = "none";
                update.disabled = false;
                var text = this.responseText;
                if(text.trim() === "format-error"){
                    window.alert("please enter an image in any of this format below\n *.png,*.jpg,*.jpeg,*.gif");
                }else if(text.trim() === "upload-error"){
                    window.alert("file upload failed. please try again later");
                }else{
                    window.alert(text);
                }
                
            }
        };
        xmlHttp.send(formdata);
    }else{
        window.alert("Please select an image file");
    }
}
function overseers(){
    var image = document.getElementsByName("image")[0].files[0];
    var name = document.getElementsByName("name")[0].value;
    var editor1 = encodeURIComponent(CKEDITOR.instances.editor1.getData());
    var form = document.getElementById("form1");
    var update = document.getElementById("overseer");
    if(image){
        var formdata = new FormData();
        //append all the form field data one after the other
        formdata.append("image",image);
        formdata.append("statement",editor1);
        formdata.append("name",name);
        var xmlHttp = new XMLHttpRequest();
        //start loading gif or progress
        var loader = document.getElementById("loader");
        loader.style.display = "block";
        document.querySelector("#loader span").innerHTML = "uploading";
        update.disabled = true;
        xmlHttp.open(form.method,form.action, true);
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                loader.style.display = "none";
                update.disabled = false;
                var text = this.responseText;
                if(text.trim() === "format-error"){
                    window.alert("please enter an image in any of this format below\n *.png,*.jpg,*.jpeg,*.gif");
                }else if(text.trim() === "upload-error"){
                    window.alert("file upload failed. please try again later");
                }else{
                    window.alert(text);
                }
                
            }
        };
        xmlHttp.send(formdata);
    }else{
        window.alert("Please select an image file");
    }
}

function values(){
    var image = document.getElementsByName("image")[0].files[0];
    var editor1 = encodeURIComponent(CKEDITOR.instances.editor1.getData());
    var form = document.getElementById("form");
    var update = document.getElementById("updateValues");
    if(image){
        var formdata = new FormData();
        //append all the form field data one after the other
        formdata.append("image",image);
        formdata.append("statement",editor1);
        var xmlHttp = new XMLHttpRequest();
        //start loading gif or progress
        var loader = document.getElementById("loader");
        loader.style.display = "block";
        document.querySelector("#loader span").innerHTML = "uploading";
        update.disabled = true;
        xmlHttp.open(form.method,form.action, true);
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                loader.style.display = "none";
                update.disabled = false;
                var text = this.responseText;
                if(text.trim() === "format-error"){
                    window.alert("please enter an image in any of this format below\n *.png,*.jpg,*.jpeg,*.gif");
                }else if(text.trim() === "upload-error"){
                    window.alert("file upload failed. please try again later");
                }else{
                    window.alert(text);
                }
                
            }
        };
        xmlHttp.send(formdata);
    }else{
        window.alert("Please select an image file");
    }
}
function vision(){
    var image = document.getElementsByName("image")[0].files[0];
    var editor1 = encodeURIComponent(CKEDITOR.instances.editor1.getData());
    var form = document.getElementById("form");
    var update = document.getElementById("updateVision");
    if(image){
        var formdata = new FormData();
        //append all the form field data one after the other
        formdata.append("image",image);
        formdata.append("statement",editor1);
        var xmlHttp = new XMLHttpRequest();
        //start loading gif or progress
        var loader = document.getElementById("loader");
        loader.style.display = "block";
        document.querySelector("#loader span").innerHTML = "uploading";
        update.disabled = true;
        xmlHttp.open(form.method,form.action, true);
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                loader.style.display = "none";
                update.disabled = false;
                var text = this.responseText;
                if(text.trim() === "format-error"){
                    window.alert("please enter an image in any of this format below\n *.png,*.jpg,*.jpeg,*.gif");
                }else if(text.trim() === "upload-error"){
                    window.alert("file upload failed. please try again later");
                }else{
                    window.alert(text);
                }
                
            }
        };
        xmlHttp.send(formdata);
    }else{
        window.alert("Please select an image file");
    }
}

function mission(){
    var image = document.getElementsByName("image")[0].files[0];
    var editor1 = encodeURIComponent(CKEDITOR.instances.editor1.getData());
    var form = document.getElementById("form");
    var update = document.getElementById("updateMission");
    if(image){
        var formdata = new FormData();
        //append all the form field data one after the other
        formdata.append("image",image);
        formdata.append("statement",editor1);
        var xmlHttp = new XMLHttpRequest();
        //start loading gif or progress
        var loader = document.getElementById("loader");
        loader.style.display = "block";
        document.querySelector("#loader span").innerHTML = "uploading";
        update.disabled = true;
        xmlHttp.open(form.method,form.action, true);
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                loader.style.display = "none";
                update.disabled = false;
                var text = this.responseText;
                if(text.trim() === "format-error"){
                    window.alert("please enter an image in any of this format below\n *.png,*.jpg,*.jpeg,*.gif");
                }else if(text.trim() === "upload-error"){
                    window.alert("file upload failed. please try again later");
                }else{
                    window.alert(text);
                }
                
            }
        };
        xmlHttp.send(formdata);
    }else{
        window.alert("Please select an image file");
    }
}

function fetchVideo(){
    var query = "req=data";
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "fetching media";
    xmlHttp.open("POST","../../../jsp/fetchvideo.jsp?", true);
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("unable to fetch media");
            }else{
                document.getElementsByTagName("video")[0].src=text.trim();
            }

        }
    };
    xmlHttp.send(query);
}

function uploadVideo(){
    var video = document.getElementsByName("video")[0].files[0];
    var form = document.getElementById("form");
    var update = document.getElementById("update");
    if(video){
        var formdata = new FormData();
        //append all the form field data one after the other
        formdata.append("video",video);
        var xmlHttp = new XMLHttpRequest();
        //start loading gif or progress
        var loader = document.getElementById("loader");
        loader.style.display = "block";
        document.querySelector("#loader span").innerHTML = "uploading";
        update.disabled = true;
        xmlHttp.open(form.method,form.action, true);
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                loader.style.display = "none";
                update.disabled = false;
                var text = this.responseText;
                if(text.trim() === "format-error"){
                    window.alert("please enter a video in mp4 format");
                }else if(text.trim() === "upload-error"){
                    window.alert("file upload failed. please try again later");
                }else{
                    document.getElementsByTagName("video")[0].src=text.trim();
                }
                
            }
        };
        xmlHttp.send(formdata);
    }else{
        window.alert("Please select a video file");
    }
}

function aboutData(){
    var method = "POST";
    var url = "../jsp/aboutData.jsp?";
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    document.getElementById("loader-view").style.display = "block";
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            document.getElementById("loader-view").style.display = "none";
            var data = JSON.parse(this.responseText);
            for(var key in data){
                //set vision
                document.querySelector("#vision .text p").innerHTML = data["vision_message"];
                document.querySelector("#vision .image img").setAttribute("src",data["vision_image"]);
                
                //set mission
                document.querySelectorAll("#mission .text p")[0].innerHTML = data["mission_message"];
                document.querySelectorAll("#mission .image img")[0].setAttribute("src",data["mission_image"]);
    
                document.getElementById("bad").innerHTML = data["mission_message"];
                document.querySelectorAll("#mission .image img")[1].setAttribute("src",data["mission_image"]);
                
                
                //set values
                document.querySelector("#values .text p").innerHTML = data["value"];
                document.querySelector("#values .image img").setAttribute("src",data["values_image"]);
                
                //set senior pastor
                document.querySelectorAll("#leadership .text-center img")[0].setAttribute("src",data["overseer_image"]);
                document.querySelectorAll("#leadership .text-center h3")[0].innerHTML = data["overseer_name"];
                document.querySelectorAll("#leadership .text-center p")[0].innerHTML = data["overseer_text"];
                
                //set deputy pastor
                document.querySelectorAll("#leadership .text-center img")[1].setAttribute("src",data["deputy_image"]);
                document.querySelectorAll("#leadership .text-center h3")[1].innerHTML = data["deputy_name"];
                document.querySelectorAll("#leadership .text-left")[1].innerHTML = data["deputy_text"];
                
                //set social media
                document.querySelectorAll(".facebook")[0].href = data["facebook"];
                document.querySelectorAll(".instagram")[0].href = data["instagram"];
                document.querySelectorAll(".twitter")[0].href = data["twitter"];
                document.querySelectorAll(".youtube")[0].href = data["youtube"];
                
            }
            
            
        }
    };
    xmlHttp.send();
}

function homeData(){
    var method = "POST";
    var url = "jsp/homeData.jsp?";
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    document.getElementById("loader-view").style.display = "block";
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            document.getElementById("loader-view").style.display = "none";
            var data = JSON.parse(this.responseText);
            if(data !== null){
               setData(data);
               setSermon(data);
               setEvent(data);
               setTestimonial(data);
            }
        }
    };
    xmlHttp.send();
}
function setData(data){
    for(var key in data){
        if(key.includes("media")){
            document.getElementById("video").setAttribute("src",data[key].video);
            document.querySelector(".welcome p").innerHTML = data[key].message;
            document.querySelector(".welcome h4").innerHTML = data[key].author;
            document.querySelector(".youtube").href = data[key].youtube;
            document.querySelector(".facebook").href = data[key].facebook;
            document.querySelector(".instagram").href = data[key].instagram;
            document.querySelector(".twitter").href = data[key].twitter;
        }
    }
    
    
}
function setSermon(data){
    var counter = 0;
    for(var key in data){
        if(key.includes("sermon")){
            document.querySelectorAll(".container .sermons .card img")[counter].src = data[key].image;
            document.querySelectorAll(".container .sermons .card .card-block .card-title")[counter]
                    .innerHTML= data[key].title;
            document.querySelectorAll(".container .sermons .card .card-block .card-text")[counter]
                    .innerHTML= data[key].text;
            document.querySelectorAll(".container .sermons .card .card-block a")[counter]
                    .href= "page/story.html?id="+data[key].id;
            counter++;
        }
    }
}
function setTestimonial(data){
    var counter = 0;
    for(var key in data){
        if(key.includes("testimonial")){
            document.querySelectorAll(".testimonials img")[counter].src = data[key].image;
            document.querySelectorAll(".testimonials h4")[counter]
                    .innerHTML= data[key].title;
            document.querySelectorAll(".testimonials .paragraph")[counter]
                    .innerHTML= data[key].text;
            document.querySelectorAll(".testimonials a")[counter]
                    .href= "page/story.html?id="+data[key].id;
            counter++;
        }
    }
}
function setEvent(data){
    var counter = 0;
    for(var key in data){
        if(key.includes("event")){
            document.querySelectorAll(".carousel-inner div img")[counter].src = data[key].image;
            document.querySelectorAll(".carousel-inner div img")[counter].alt = data[key].title;
            counter++;
        }
    }
}



function reply(){
    var editor1 = CKEDITOR.instances.editor1.getData();
    var subject = document.getElementsByName("subject")[0].value;
    var recipient = document.getElementsByName("recipient")[0].value;
    var title = document.getElementById("title");
    var method = "POST";
    var url = "../../../jsp/reply.jsp?";
    var query ="message="+encodeURIComponent(editor1)+"&subject="+subject+"&recipient="+recipient;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var img = document.createElement("img");
    img.setAttribute("src","../../../asset/load.gif");
    var text = document.createTextNode("Sending Message");
    title.innerHTML = "";
    title.appendChild(img);title.appendChild(text);
    document.getElementById("send").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            title.innerHTML = "";
            document.getElementById("send").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("How did you got here. Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }if(text.trim() === "done"){
                title.innerHTML ="Message sent successfully";
            }else{
                title.innerHTML = text;
            }

        }
    };
    xmlHttp.send(query);
}
function subscriber_table(){
    var query = "req=data";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../../../jsp/subscriber_table.jsp", true);
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "fetching";
    document.getElementById("subscriber").disabled = true;
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("subscriber").disabled = false;
            var data = JSON.parse(this.responseText);
            if(data !== null){
                var table = document.getElementById("table");
                table.classList.add("table");
                table.classList.add("table-striped");
                table.classList.add("table-hover");
                var thead = document.getElementById("thead");
                thead.innerHTML = "";
                var tr = document.createElement("tr");
                var th = document.createElement("th");
                var text = document.createTextNode("S/N");
                th.appendChild(text);
                tr.appendChild(th);
                th = document.createElement("th");
                text = document.createTextNode("Email Address");
                th.appendChild(text);
                tr.appendChild(th);
                th = document.createElement("th");
                text = document.createTextNode("Unsubscribe");
                th.appendChild(text);
                tr.appendChild(th);
                th = document.createElement("th");
                text = document.createTextNode("send Message");
                th.appendChild(text);
                tr.appendChild(th);
                thead.appendChild(tr);
                var tbody = document.getElementById("tbody");
                tbody.innerHTML = "";
                table.appendChild(tbody);
                table.insertBefore(tbody,document.getElementsByName("tfoot")[0]);
                table.insertBefore(thead, tbody);
                for(var key  in data){
                    var email = data[key].email;
                    var id = data[key].id;
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    var text = document.createTextNode(id);
                    td.appendChild(text);
                    tr.appendChild(td);
                    td = document.createElement("td");
                    text = document.createTextNode(email);
                    td.appendChild(text);
                    tr.appendChild(td);
                    td = document.createElement("td");
                    var a = document.createElement("a");
                    a.href = "../../../jsp/unsubscribe.jsp?email="+email; 
                    a.target = "_blank";
                    text = document.createTextNode("unsubscribe");
                    a.appendChild(text);
                    td.appendChild(a);
                    tr.appendChild(td);
                    var btn = document.createElement("button");
                    btn.classList.add("btn");
                    btn.classList.add("btn-primary");
                    btn.classList.add("send");
                    btn.setAttribute("name",data[key].email);
                    btn.onclick = function(e){
                        var target = (e.target) ? e.target : e.srcElement;
                        setModal(target.getAttribute("name"));
                    };
                    text = document.createTextNode("Send");
                    btn.appendChild(text);
                    tr.appendChild(btn);
                    tbody.appendChild(tr);
                    
                }
                
                
                
            }else{
                window.alert("Error, unable to fetch subscriber data");
            }
            
            
        }
    };
    xmlHttp.send(query);
}
function setModal(email){
    document.querySelector("#recipient").value=email;
    document.querySelector("#mymodal").style.display="block";
}
function contact_table(){
    var query = "req=data";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../../../jsp/contact_table.jsp", true);
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "updating";
    document.getElementById("contact").disabled = true;
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("contact").disabled = false;
            var data = JSON.parse(this.responseText);
            if(data !== null){
                var table = document.getElementById("table");
                table.classList.add("table");
                table.classList.add("table-striped");
                table.classList.add("table-hover");
                var thead = document.getElementById("thead");
                thead.innerHTML = "";
                var tr = document.createElement("tr");
                var th = document.createElement("th");
                var text = document.createTextNode("S/N");
                th.appendChild(text);
                tr.appendChild(th);
                th = document.createElement("th");
                text = document.createTextNode("Email Address");
                th.appendChild(text);
                tr.appendChild(th);
                th = document.createElement("th");
                text = document.createTextNode("Subject");
                th.appendChild(text);
                tr.appendChild(th);
                th = document.createElement("th");
                text = document.createTextNode("Name");
                th.appendChild(text);
                tr.appendChild(th);
                th = document.createElement("th");
                text = document.createTextNode("Message");
                th.appendChild(text);
                tr.appendChild(th);
                th = document.createElement("th");
                text = document.createTextNode("Reply Message");
                th.appendChild(text);
                tr.appendChild(th);
                thead.appendChild(tr);
                var tbody = document.getElementById("tbody");
                tbody.innerHTML = "";
                table.appendChild(tbody);
                table.insertBefore(tbody,document.getElementsByName("tfoot")[0]);
                table.insertBefore(thead, tbody);
                for(var key  in data){
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    var text = document.createTextNode(data[key].id);
                    td.appendChild(text);
                    tr.appendChild(td);
                    td = document.createElement("td");
                    text = document.createTextNode(data[key].email);
                    td.appendChild(text);
                    tr.appendChild(td);
                    td = document.createElement("td");
                    text = document.createTextNode(data[key].subject);
                    td.appendChild(text);
                    tr.appendChild(td);
                    td = document.createElement("td");
                    text = document.createTextNode(data[key].name);
                    td.appendChild(text);
                    tr.appendChild(td);
                    td = document.createElement("td");
                    text = document.createTextNode(data[key].message);
                    td.appendChild(text);
                    tr.appendChild(td);
                    var btn = document.createElement("button");
                    btn.classList.add("btn");
                    btn.classList.add("btn-primary");
                    btn.classList.add("send");
                    btn.setAttribute("name",data[key].email);
                    btn.onclick = function(e){
                        var target = (e.target) ? e.target : e.srcElement;
                        setModal(target.getAttribute("name"));
                        
                    };
                    text = document.createTextNode("Reply");
                    btn.appendChild(text);
                    tr.appendChild(btn);
                    tbody.appendChild(tr);
                    
                }
                
                
                
            }else{
                window.alert("Error, unable to fetch contact data");
            }
            
            
        }
    };
    xmlHttp.send(query);
}
function locationData(){
    var query = "req=data";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../jsp/location_data.jsp", true);
    var loader = document.getElementById("loader-view");
    loader.style.display = "block";
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            var data = JSON.parse(this.responseText);
            if(data !== null){
                var locations = document.getElementById("locations");
                for(var key  in data){
                    if(data[key] === "breakpoint"){
                        break;
                    }
                    var location = document.createElement("div");
                    location.classList.add("col-sm-12");
                    location.classList.add("col-md-4");
                    
                    //create center name
                    var h3 = document.createElement("h3");
                    var text = document.createTextNode(data[key].center);
                    h3.appendChild(text);
                    
                    //create center address
                    var p = document.createElement("p");
                    p.classList.add("address");
                    var text = document.createTextNode(data[key].address);
                    p.appendChild(text);
                    
                    //create worship days container
                    var worship = document.createElement("div");
                    worship.classList.add("service");
                    
                    //create worship day 1
                    var h4 =  document.createElement("h4");
                    var text = document.createTextNode(data[key].day1+" : ");
                    var span =  document.createElement("span");
                    var spanText = document.createTextNode(data[key].services1+" "+data[key].time1);
                    span.appendChild(spanText);
                    h4.appendChild(text); h4.appendChild(span);
                    worship.appendChild(h4);
                    
                    
                    //create worship day 2
                    h4 =  document.createElement("h4");
                    text = document.createTextNode(data[key].day2+" : ");
                    span =  document.createElement("span");
                    spanText = document.createTextNode(data[key].services2+" "+data[key].time2);
                    span.appendChild(spanText);
                    h4.appendChild(text); h4.appendChild(span);
                    worship.appendChild(h4);
                    
                    
                    //create worship day 2
                    h4 =  document.createElement("h4");
                    text = document.createTextNode(data[key].day3+" : ");
                    span =  document.createElement("span");
                    spanText = document.createTextNode(data[key].services3+" "+data[key].time3);
                    span.appendChild(spanText);
                    h4.appendChild(text); h4.appendChild(span);
                    worship.appendChild(h4);
                    
                    location.appendChild(h3);
                    location.appendChild(p);
                    location.appendChild(worship);
                    locations.appendChild(location);
                    
                    
                    
                }
                
                
                //append phone
                var others = document.getElementById("others");
                var h3 = document.createElement("h3");
                h3.classList.add("text-danger");
                var text = document.createTextNode("Office Lines");
                h3.appendChild(text);
                var p = document.createElement("p");
                var numbers = document.createTextNode(data["phones"].phone);
                p.appendChild(numbers);
                others.appendChild(h3);
                others.appendChild(p);
                
                //set social media
                document.querySelectorAll(".facebook")[0].href = data["media"].facebook;
                document.querySelectorAll(".instagram")[0].href = data["media"].instagram;
                document.querySelectorAll(".twitter")[0].href = data["media"].twitter;
                document.querySelectorAll(".youtube")[0].href = data["media"].youtube;
                
            }else{
                window.alert("Error, unable to fetch contact data");
            }
            
            
        }
    };
    xmlHttp.send(query);
}

function historyData(){
    var query = "req=data";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../jsp/history_data.jsp", true);
    var loader = document.getElementById("loader-view");
    loader.style.display = "block";
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            var data = JSON.parse(this.responseText);
            if(data.length > 0 || data === null){
                var i = 0;
                document.querySelectorAll(".col-sm-12 .text")[i].innerHTML = data[i];
                i++;
                for(var n = 0; n < document.querySelectorAll(".youtube").length; n++){
                    document.querySelectorAll(".youtube")[n].href = data[i];
                }
                i++;
                for(var n = 0; n < document.querySelectorAll(".facebook").length; n++){
                    document.querySelectorAll(".facebook")[n].href = data[i];
                }
                i++;
                for(var n = 0; n < document.querySelectorAll(".instagram").length; n++){
                    document.querySelectorAll(".instagram")[n].href = data[i];
                }
                i++;
                for(var n = 0; n < document.querySelectorAll(".twitter").length; n++){
                    document.querySelectorAll(".twitter")[n].href = data[i];
                }
                
            }else{
                window.alert("Error, unable to fetch privacy policy data");
            }
            
            
        }
    };
    xmlHttp.send(query);
}
function privacyData(){
    var query = "req=data";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../jsp/privacy_data.jsp", true);
    var loader = document.getElementById("loader-view");
    loader.style.display = "block";
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            var data = JSON.parse(this.responseText);
            if(data.length > 0 || data === null){
                var i = 0;
                document.querySelectorAll(".col-sm-12 .text")[i].innerHTML = data[i];
                i++;
                for(var n = 0; n < document.querySelectorAll(".youtube").length; n++){
                    document.querySelectorAll(".youtube")[n].href = data[i];
                }
                i++;
                for(var n = 0; n < document.querySelectorAll(".facebook").length; n++){
                    document.querySelectorAll(".facebook")[n].href = data[i];
                }
                i++;
                for(var n = 0; n < document.querySelectorAll(".instagram").length; n++){
                    document.querySelectorAll(".instagram")[n].href = data[i];
                }
                i++;
                for(var n = 0; n < document.querySelectorAll(".twitter").length; n++){
                    document.querySelectorAll(".twitter")[n].href = data[i];
                }
                
            }else{
                window.alert("Error, unable to fetch privacy policy data");
            }
            
            
        }
    };
    xmlHttp.send(query);
}
function subscriber(){
    var email = document.getElementsByName("email")[1].value;
     var method = "POST";
    var url = "jsp/subscriber.jsp?";
    var query ="email="+email;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader-view");
    loader.style.display = "block";
    document.getElementById("subscriber").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("subscriber").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("Error: please try again later");
            }if(text.trim() === "done"){
                window.alert("You can now get our free newsletter");
            }else{
                window.alert(text);
            }

        }
    };
    xmlHttp.send(query);
}
function contactMessage(){
    var username = document.getElementsByName("username")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var subject = document.getElementsByName("subject")[0].value;
    var message = document.getElementsByName("message")[0].value;
     var method = "POST";
    var url = "jsp/sendMessage.jsp?";
    var query ="username="+username+"&email="+email+"&subject="+subject+"&message="+
            message;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader-view");
    loader.style.display = "block";
    document.getElementById("contact-btn").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("contact-btn").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("Error: please try again later");
            }if(text.trim() === "done"){
                window.alert("thank you for contacting us we will get back to you soon");
            }else{
                window.alert(text);
            }

        }
    };
    xmlHttp.send(query);
}

function locations(){
    var center = document.getElementsByName("center")[0].value;
    var address = document.getElementsByName("address")[0].value;
    var day1 = document.getElementsByName("day1")[0];
    day1 = day1.options[day1.selectedIndex].value;
    var time1 = document.getElementsByName("time1")[0].value;
    var services1 = document.getElementsByName("services1")[0].value;
    var day2 = document.getElementsByName("day2")[0];
    day2 = day2.options[day2.selectedIndex].value;
    var time2 = document.getElementsByName("time2")[0].value;
    var services2 = document.getElementsByName("services2")[0].value;
    var day3 = document.getElementsByName("day3")[0];
    day3 = day3.options[day3.selectedIndex].value;
    var time3 = document.getElementsByName("time3")[0].value;
    var services3 = document.getElementsByName("services3")[0].value;
    var method = "POST";
    var url = "../../../jsp/location.jsp?";
    var query ="center="+center+"&address="+address+"&day1="+day1+"&time1="+
            time1+"&services1="+services1+"&day2="+day2+"&time2="+
            time2+"&services2="+services2+"&day3="+day3+"&time3="+
            time3+"&services3="+services3;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "updating";
    document.getElementById("location").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("location").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("How did you got here. Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }if(text.trim() === "done"){
                window.alert("update effected successfully");
            }else{
                window.alert(text);
            }

        }
    };
    xmlHttp.send(query);
}



function phone(){
    var phone = document.getElementsByName("phone")[0].value;
    var method = "POST";
    var url = "../../../jsp/phone.jsp?";
    var query ="phone="+phone;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "updating";
    document.getElementById("phone").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("phone").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("How did you got here. Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }if(text.trim() === "done"){
                window.alert("update effected successfully");
            }else{
                window.alert(text);
            }

        }
    };
    xmlHttp.send(query);
}

function socials(){
    var twitter = document.getElementsByName("twitter")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var facebook = document.getElementsByName("facebook")[0].value;
    var youtube = document.getElementsByName("youtube")[0].value;
    var instagram = document.getElementsByName("instagram")[0].value;
    var method = "POST";
    var url = "../../../jsp/socials.jsp?";
    var query ="twitter="+twitter+"&email="+email+"&facebook="+facebook+"&youtube="+
            youtube+"&instagram="+instagram;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "updating";
    document.getElementById("socials").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("socials").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("How did you got here. Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }if(text.trim() === "done"){
                window.alert("update effected successfully");
            }else{
                setOutputText(text,"inherit");
            }

        }
    };
    xmlHttp.send(query);
}


function privacy(){
    var editor1 = CKEDITOR.instances.editor1.getData();
    var method = "POST";
    var url = "../../../jsp/privacy.jsp?";
    var query ="editor1="+encodeURIComponent(editor1);
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "updating church privacy";
    document.getElementById("privacy").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("privacy").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("How did you got here. Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }if(text.trim() === "done"){
                window.alert("update effected successfully");
            }else{
                window.alert(text);
            }

        }
    };
    xmlHttp.send(query);
}


function history(){
    var editor1 = CKEDITOR.instances.editor1.getData();
    var method = "POST";
    var url = "../../../jsp/history.jsp?";
    var query ="editor1="+encodeURIComponent(editor1);
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "updating church history";
    document.getElementById("history").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("history").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("How did you got here. Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }if(text.trim() === "done"){
                window.alert("update effected successfully");
            }else{
                window.alert(text);
            }

        }
    };
    xmlHttp.send(query);
}


function welcome(){
    var message = encodeURIComponent(CKEDITOR.instances.editor1.getData());
    var author = document.getElementsByName("author")[0].value;
    var method = "POST";
    var url = "../../../jsp/welcome.jsp?";
    var query ="message="+message+"&author="+author;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "updating";
    document.getElementById("update").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("update").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.alert("How did you got here. Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }if(text.trim() === "done"){
                window.alert("update effected successfully");
            }else{
                setOutputText(text,"inherit");
            }

        }
    };
    xmlHttp.send(query);
}

function signin(){
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var method = "POST";
    var url = "../../jsp/login.jsp?";
    var query ="email="+email+"&password="+password;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "connecting";
    document.getElementById("signin").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            loader.style.display = "none";
            document.getElementById("signin").disabled =false;
            var text = this.responseText;
            setOutputText(text,"inherit");
            if(text.trim() === "success"){
                window.location.href = "dashboard/";
            }

        }
    };
    xmlHttp.send(query);
    
}
function statistics(){
    var query = "req=stats";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST',"../../../jsp/statistics.jsp", true);
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "loading statistics";
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var loader = document.getElementById("loader");
            loader.style.display = "none";
            var stat = JSON.parse(this.responseText);
            for(var i = 0; i < stat.length; i++){
                document.querySelectorAll(".stat h1")[i].innerHTML = stat[i];
            }
        }
    };
    xmlHttp.send(query);
}

function signOut(){
    if(window.confirm("Sure you want to logout ?")){
        var query = "req=signout";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST',"../../../jsp/logout.jsp", true);
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                if(this.responseText.trim() === "out"){
                    location.reload();
                    //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                   
                }else{
                   window.alert(this.responseText);
                }
            }
        };
        xmlHttp.send(query);
    }
    
}

function updateEmail(){
    var email = document.getElementsByName("email")[0].value;
    var method = "POST";
    var url = "../../../jsp/Editemail.jsp";
    var query ="email="+email;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "Processing Update";
    document.getElementById("updateEmail").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            //stop loading gif or progress
            loader.style.display = "none";
            document.getElementById("updateEmail").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error1"){
                window.alert("How did you got here. Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }if(text.trim() === "done"){
                window.alert("update effected successfully");
                location.reload();
            }else{
                setOutputText(text,"inherit");
            }
        }
    };
    xmlHttp.send(query);
}

function updatePassword(){
    var old = document.getElementsByName("old")[0].value;
    var password = document.getElementsByName("new")[0].value;
    var confirm = document.getElementsByName("confirm")[0].value;
    var method = "POST";
    var url = "../../../jsp/Editpassword.jsp";
    var query ="old="+old+"&new="+password+"&confirm="+confirm;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "Processing Update";
    document.getElementById("updatePassword").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            //stop loading gif or progress
            loader.style.display = "none";
            document.getElementById("updatePassword").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error2"){
                window.alert("You don't know your last login credential.Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }if(text.trim() === "error1"){
                window.alert("How did you got here. Your activity is suspicious");
                //jquery code to disable back button
                $(document).ready(function() {
                      window.history.pushState(null, "", window.location.href);        
                      window.onpopstate = function() {
                          window.history.pushState(null, "", window.location.href);
                      };
                  });
                location.reload();
            }else{
                window.alert(text);
            }
        }
    };
    xmlHttp.send(query);
}

function forgot(){
    var email = document.getElementsByName("email")[0].value;
    var method = "POST";
    var url = "../../jsp/forgot.jsp";
    var query ="email="+email;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "connecting";
    document.getElementById("btn-forgot").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            //stop loading gif or progress
            loader.style.display = "none";
            document.getElementById("btn-forgot").disabled =false;
            var text = this.responseText;
            if(text.trim() === "verify"){
                window.location.href = "verify.jsp";
            }else{
                setOutputText(text,"inherit");
            }

        }
    };
    xmlHttp.send(query);
    
}

function verify(){
    var code = document.getElementsByName("code")[0].value;
    var method = "POST";
    var url = "../../jsp/verify.jsp";
    var query ="code="+code;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "verifying";
    document.getElementById("verify").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            //stop loading gif or progress
            loader.style.display = "none";
            document.getElementById("verify").disabled =false;
            var text = this.responseText;
            if(text.trim() === "verified"){
                window.location.href = "password.jsp";
            }else if(text.trim() === "error"){
                window.location.href = "forgot.jsp";
            }else{
                setOutputText(text,"inherit");
            }

        }
    };
    xmlHttp.send(query);
    
}

function resend(){
    var method = "POST";
    var url = "../../jsp/resend.jsp";
    var query =null;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "resending code";
    document.getElementById("verify").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            //stop loading gif or progress
            loader.style.display = "none";
            document.getElementById("verify").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.location.href = "forgot.jsp";
            }else{
                window.alert(text);
            }
            
        }
    };
    xmlHttp.send(query);
    
}

function change(){
    var confirm = document.getElementsByName("confirm")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var method = "POST";
    var url = "../../jsp/password.jsp";
    var query ="password="+password+"&confirm="+confirm;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "Processing Update";
    document.getElementById("change").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            //stop loading gif or progress
            loader.style.display = "none";
            document.getElementById("change").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.location.href = "forgot.jsp";
            }else{
                setOutputText(text,"inherit");
            }
            
        }
    };
    xmlHttp.send(query);
    
}


function recover(){
    var confirm = document.getElementsByName("confirm")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var method = "POST";
    var url = "rehack.jsp";
    var query ="password="+password+"&confirm="+confirm+"&email="+email;
    var xmlHttp = new XMLHttpRequest();
    //start loading gif or progress
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    document.querySelector("#loader span").innerHTML = "recoverying account";
    document.getElementById("recover").disabled = true;
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            //stop loading gif or progress
            loader.style.display = "none";
            document.getElementById("recover").disabled =false;
            var text = this.responseText;
            if(text.trim() === "error"){
                window.location.href = "forgot.jsp";
            }else{
                setOutputText(text,"inherit");
            }
            
        }
    };
    xmlHttp.send(query);
    
}