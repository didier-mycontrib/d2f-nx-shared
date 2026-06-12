

export function deleteCookie(name:string ) {
   setCookie(name, '', -1);
}

export function deleteCookieWithPathDomain(name:string,path:string,domain:string ) {
  setCookie(name, '', -1,path,domain);
}

export function setCookie(name: string, value: string, 
                          expireDays: number|null=null, 
                          path: string | null =null,
                          domain : string | null=null ) {
    let cexpires = ''; //no expires date (sessin cookies) by default
    if(expireDays){
      let d:Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      cexpires = `; expires=${d.toUTCString()}`;
    }
    let cpath:string = path ? `; path=${path}` : '';
    let cdomain:string = path ? `; domain=${domain}` : '';
    document.cookie = `${name}=${value}${cexpires}${cpath}${cdomain}`;
}


  
