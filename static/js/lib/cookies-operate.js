//存
function setCookie(cname, cvalue, seconds){
	var d = new Date();
	d.setTime(d.getTime()+(seconds*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
};
//读
function getCookie(cname){
	var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
};
//删
function removeCookie(cname){
	//setCookie(name, "", -1);  
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	document.cookie = cname + "=; expires=" + exp.toGMTString();
}