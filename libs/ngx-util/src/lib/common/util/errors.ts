import { HttpErrorResponse } from "@angular/common/http";

export function messageFromError(err : HttpErrorResponse , 
                  myMsg : string = "", 
                  withStatus :boolean = false ,
                   withDetails :boolean = false){
    let message="";
    if (err.error instanceof Error) {
      console.log("Client-side error occured." + JSON.stringify(err));
      message = myMsg;
      } else {
      //console.log("Server-side error occured : " + JSON.stringify(err));
      console.log("Server-side error occured : " + err);
      let detailErrMsg = (err.error && err.error.message)?":"+err.error.message:"";
      if(err.status == 200){
          message = myMsg + "(technical problem)"
         }else{
        message = myMsg 
          + (withStatus?" (status="+ err.status + ":" + err.statusText + ") ":"")
          + (withDetails?detailErrMsg:"")  
      }
      }
    console.log("messageFromError.message="+message)
    return message + " at " + (new Date).toLocaleTimeString();
    //return message ;
  }


  
