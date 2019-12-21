
var lesetats=[];
var lesattributs=[];

var lesetatsinit=[];
var lesetatsfinal=[];
function recupval() 
{
    val=document.getElementById("vnombretat").value;
    val=Number(val);
    document.getElementById("nombretat").style.display="none";
    document.getElementById("tabl").style.display="block";
    for (var i=0; i<=val ;i++)
    {
        document.getElementById("tableau").innerHTML+="<tr id='ligne"+(i+1)+"' class='lignes'></tr>";
        document.getElementById("ligne"+(i+1)).innerHTML+="<td><p id='etat"+i+"' class='etats validate'></p></td>"
        for(var j=0;j<val ;j++)
        {
            document.getElementById("ligne"+(i+1)).innerHTML+="<td><input id='cellule"+((val*i)+j+1)+"' class='etats validate' style='text-align: center;'></input>";
            if (i==0) {
                document.getElementById("cellule"+((val*i)+j+1)).setAttribute("onchange","change(this.value,"+j+")");
            }
        }
    }
    document.getElementById("etat0").innerHTML="ETATS";

    
}
function change(valeur,pos) {
    document.getElementById("etat"+(pos+1)).innerHTML=valeur;
}

var verificateurinit=[];
var verificateurfinal=[];

function etats_in_fin() {
    for(var i=1; i<=val; i++)
    {
        content=document.getElementById("cellule"+i).value;
        content=String(content);
        lesetats.push(content);
        if (content.length != 1) {
            
        }
    }
    est_un_afn=0;
    plusieurs=0;
    plusieurssurcetteligne=[];
    for(var i=val+1; i<=val*(val+1); i++)
    {
        contient=document.getElementById("cellule"+i).value;
        plusieurssurcetteligne.push(contient);
        if (i%val==0) {
            for(var j=0; j<val; j++)
            {
                if (plusieurssurcetteligne[j] != "")
                {
                    plusieur=nbrinarray(plusieurssurcetteligne[j],plusieurssurcetteligne);
                    if (plusieur>1) {
                        plusieurs++;
                    }
                }
                
            }
            plusieurssurcetteligne=[];
        }
        if (contient == "" || inarray(contient,lesattributs)==true) {
            i++;
            i--;
        }else 
        {
            if (inarray('.',contient)==true) {
                est_un_afn++;
                contient=contient.split('.');
                for(var n=0; n<contient.length; n++)
                {
                    if (inarray(contient[n], lesattributs)==false) {
                        lesattributs.push(contient[n]);
                    }
                }
            }else
            {
                lesattributs.push(contient);
            }
        }
    }
    document.getElementById("tabl").style.display="none";
    document.getElementById("in_fin").style.display="block";
    for (i=0; i<val; i++)
    {
        document.getElementById("init").innerHTML+="<p><label><input type='checkbox' id='init"+lesetats[i]+"' value='"+lesetats[i]+"' onchange='inneinit("+i+")'/><span>Etat "+lesetats[i]+"</span></label></p>";
        document.getElementById("final").innerHTML+="<p><label><input type='checkbox' id='final"+lesetats[i]+"' value='"+lesetats[i]+"' onchange='innefinal("+i+")'/><span>Etat "+lesetats[i]+"</span></label></p>";
        verificateurinit.push(0);
        verificateurfinal.push(0);
    }
    
}

function inneinit(i)
{
    if (verificateurinit[i]==0) {
        verificateurinit[i]=1;
    }else
    {
        verificateurinit[i]=0;
    }
}

function innefinal(i)
{
    if (verificateurfinal[i]==0) {
        verificateurfinal[i]=1;
    }else
    {
        verificateurfinal[i]=0;
    }
}

function Automate(name, alphabet, etats, etatsinit, etatsfin) {
    this.name=name;
    this.alphabet=alphabet;
    this.etats=etats;
    this.etatsinit=etatsinit;
    this.etatsfin=etatsfin;
    this.construct=function() {
        lautomate=[];
        lautomate.push(lesattributs);
        for(var i=0; i<lesetats.length; i++)
        {
            lautomate.push([]);  
        }
    }
    this.affiche=function () {
        document.getElementById("test").style.display="none";
        document.getElementById("tautomate").style.display="none";
        document.getElementById("zoneAffichAuto").style.display="block";
        document.getElementById("affAlphabet").innerHTML=this.alphabet;
        document.getElementById("affEtats").innerHTML=this.etats;
        document.getElementById("affEtatsInit").innerHTML=this.etatsinit;
        document.getElementById("affEtatsFin").innerHTML=this.etatsfin;
    }

    this.fonctransition=function(etaaa,eta,atribu)
    {
        //eta=toString(eta);
        onyretrouve=[];
        for(var i=1; i<=etaaa.length; i++)
        {
            etatprecis=document.getElementById("cellule"+i).value;
            etatprecis=String(etatprecis);
            if (etatprecis==eta) {
                for(var j=1; j<=val; j++)
                {
                    cetteCellule=document.getElementById("cellule"+((i*val)+j)).value
                    cetteCellule=cetteCellule.split('.');
                    for(var n=0; n<cetteCellule.length; n++)
                    {
                        if (cetteCellule[n]==atribu) {
                            onyretrouve.push(document.getElementById("cellule"+j).value);
                        }
                    }
                }
            }
        }

        if (onyretrouve.length != 0) {
            return onyretrouve;
        }
        else {return false};
       
    }
    this.versafd=function() {
    }
}

function tester() {
    autom=new Automate("nomauto",lesattributs, lesetats, lesetatsinit, lesetatsfinal);
    autom.affiche();
}

function name(params) {
    
}

function typeautomate() {
    for(var i=0; i<val; i++)
    {
        if (verificateurinit[i]==1) {
            lesetatsinit.push(lesetats[i]);
        }
        if (verificateurfinal[i]==1) {
            lesetatsfinal.push(lesetats[i]);
        }
    }

    document.getElementById("in_fin").style.display="none";
    document.getElementById("tautomate").style.display="block";
    if (inarray('£',lesattributs)==true)
    {
        document.getElementById("name2").style.display="inline-block";
    }else if(lesetatsinit.length > 1 || est_un_afn > 0 || plusieurs>0)
    {
        document.getElementById("name1").style.display="inline-block";
    }else
    {
        document.getElementById("name3").style.display="inline-block";
    }
}

function inarray(ele,larray) {
    for(var i=0; i<larray.length; i++)
    {
        if (ele.length==larray[i].length) {
            var incr=0;
            for(var j=0; j<ele.length; j++)
            {
                if (ele[j]==larray[i][j]) {
                    incr++;
                }
            }
            if (incr==ele.length) {
                return true;
            }
        }
    }

    return false;
}

function nbrinarray(ele,larray) {
    nbre=0;
    for(var i=0; i<larray.length; i++)
    {
        if (ele==larray[i]) {
            nbre++;
        }
    }

    return nbre;
}

function nom(typ,appelation) {
    document.getElementById("tautomate").setAttribute("class", "mesdiv");
    document.getElementById("nomdeautomate").setAttribute("placeholder",appelation);
    document.getElementById("validnomauto").style.display="block";
    document.getElementById("named"+typ).innerHTML="name";
    nomauto= document.getElementById("nomdeautomate").value;
}

function afffonctransi() {
    var eta=document.getElementById("eta").value;
    eta=String(eta);
    var attri=document.getElementById("attri").value;
    attri=String(attri);
    var lesetacorresp=autom.fonctransition(lesetats,eta, attri);
    document.getElementById("affFoncTransi").innerHTML=lesetacorresp;
}

function afn_afd() {
    lesetatsafd=lesetatsinit;
    lesetatsinitafd=lesetatsinit;
    lesetatsfinalafd=[];
    for(var i=0; i<lesetatsafd.length; i++)
    {
        for(var j=0; j<lesattributs.length; j++)
        {
            var nouveletatafd=[];
            for(var k=0; k<lesetatsafd[i].length; k++)
            {
                var etaEta=autom.fonctransition(lesetats,lesetatsafd[i][k], lesattributs[j])
                if (etaEta!=false) {
                    nouveletatafd=nouveletatafd.concat(etaEta);
                }
            }
            nouveletatafd=suprimDoublon(nouveletatafd);
            nouveletatafd.sort();
            if(nouveletatafd.length!=0 && inarray(nouveletatafd,lesetatsafd)==false)
            {
                var compteur=0;
                lesetatsafd.push(nouveletatafd);
                for(var k=0; k<nouveletatafd.length; k++)
                {
                    if(inarray(nouveletatafd[k], lesetatsfinal)!=false)
                    {
                        compteur++;
                    }
                }
                if (compteur >0) {
                    lesetatsfinalafd.push(nouveletatafd);
                }
            }
        }
    }
    document.getElementById("test").innerHTML+=lesetatsafd;
    document.getElementById("zoneAffichAuto").style.display="none";
    document.getElementById("afn_et_afd_ensemble").style.display="block";
    //document.getElementById("afn_et_afd_ensemble").innerHTML+="<tr id='ligne0'><td></td></tr>"
    for(var i=1; i<=lesetats.length; i++)
    {
        document.getElementById("tafntab").innerHTML+="<tr id='afnligne"+i+"'><td style='background-color: gray; color:white;'>"+lesetats[i-1]+"</td></tr>" ;  
        for(var j=0; j<lesattributs.length; j++)
        {
            if(i==1)
            {
                document.getElementById("afnligne0").innerHTML+="<td style='background-color: gray; color:white;'>"+lesattributs[j]+"</td>";
            }
            document.getElementById("afnligne"+i).innerHTML+="<td id='"+i+"afncellule"+(j+1)+"'>/td>";
            var etaEta=autom.fonctransition(lesetats, lesetats[i-1], lesattributs[j])
            if(etaEta==false)
            {
                document.getElementById(i+"afncellule"+(j+1)).innerHTML="---";
            }else{
                document.getElementById(i+"afncellule"+(j+1)).innerHTML=etaEta;
            }
        }
    }
    console.log(lesattributs);
}

function suprimDoublon(tab) {
    for(var i=0; i<tab.length; i++)
    {
        for(var j=i+1; j<tab.length; j++)
        {
            if(tab[i]==tab[j])
            {
                tab.splice(j,1);
                j--;
            }
        }
    }
    return tab;
}


