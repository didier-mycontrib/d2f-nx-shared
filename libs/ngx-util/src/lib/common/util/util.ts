

export function fileNameWithDateTimeSuffix(ficName:string):string{
    let posPoint = ficName.lastIndexOf('.');
    let ficNameSansExt = ficName.substring(0,posPoint);
    let ficExt = ficName.substring(posPoint+1);

    //IMPORTANT : un suffix d'horodatage est ajouté au nom du fichier qui sera enregistré coté serveur
    //pour garantir une unicité de la ressource (pas d'écrasement d'ancien fichier de même nom)
    let suffix = (new Date()).getTime();
    //NB: replace(/\s/g, '') pour remplacer tous les éventuels caractères espaces gênants par des '_'
    return ficNameSansExt.replace(/\s/g, '_') +"_"+suffix+"."+ficExt;
}


  
