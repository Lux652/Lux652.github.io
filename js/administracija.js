oDbGradovi.on('value', function(oOdgovorPosluzitelja) {
    var oPolaziste = $('#polaziste');
    var oOdrediste = $('#odrediste');
    var oRadio=$('.tip');
    var oGumbovi=$('.btn');
    var oTablicaGradova = $('#tablica-gradovi');
    var nRbr = 1;
    oTablicaGradova.find('tbody').empty();
    oPolaziste.empty();
    oOdrediste.empty();
    oOdgovorPosluzitelja.forEach(function(oGradoviSnapshot) {
        var sGradKey = oGradoviSnapshot.key;
        var oGrad = oGradoviSnapshot.val();
        var oDostupan=oGrad.dostupan=="da";
        var sRow = '<tr><td>' + nRbr++ + '.</td><td>' + oGrad.gradovi_naziv + '</td><td>' + oGrad.lat + '</td><td>' + oGrad.lng + '</td><td>' + oGrad.dostupan + '</a></td><td><button type="button"  onclick="ModalUrediGrad(\'' + sGradKey + '\')" class="btn btn-xs btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td><td><button onclick="obrisiGrad(\'' + sGradKey + '\')" type="button" class="btn btn-xs btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td></tr>';
        var isDostupan='<option value="' + sGradKey + '" data-lat="' + oGrad.lat + '" data-lng="' + oGrad.lng + '">' + oGrad.gradovi_naziv + '</option>';
        oTablicaGradova.find('tbody').append(sRow);
        if (oDostupan) {
          oPolaziste.append(isDostupan);
          oOdrediste.append(isDostupan);
        } else  {
        };
    });
    oPolaziste.prepend('<option value="-1" selected>--Odaberite polazište--</option>');
    oOdrediste.prepend('<option value="-1" selected>--Odaberite odredište--</option>');

    $(document).ready(function(){
   $('select').on('change', function(event ) {
       //restore previously selected value
       var prevValue = $(this).data('previous');
       $('select').not(this).find('option[value="'+prevValue+'"]').show();
       //hide option selected
       var value = $(this).val();
       //update previously selected data
       $(this).data('previous',value);
       $('select').not(this).find('option[value="'+value+'"]').hide();
   });
   oPolaziste.change(function(){
       oOdrediste.prop('disabled', false);
   });
   oOdrediste.change(function(){
      oRadio.prop('disabled',false);
   });
   oRadio.change(function(){
     oGumbovi.prop('disabled',false);
   });
});
});





oDbKarte.on('value', function(oOdgovorPosluzitelja) {
    var oTablicaKarta = $('#tablica-karte');
    oTablicaKarta.find('tbody').empty();
    var nRbr = 1;
    oOdgovorPosluzitelja.forEach(function(oKartaSnapshot) {
        var sKarteKey = oKartaSnapshot.key;
        var oKarta = oKartaSnapshot.val();
        var sRow = '<tr><td>' + nRbr++ + '.</td><td>' + oKarta.datum + '</td><td>' + oKarta.polaziste + '</td><td>' + oKarta.odrediste + '</td><td>' + oKarta.tip + '</td><td>' + oKarta.udaljenost + " km" + '</td><td>' + oKarta.cijena + " kn" + '</td></tr>';
        oTablicaKarta.append(sRow);
    });
});



function DajDanasnjiDatum() {
    var tdate = new Date();
    var dd = tdate.getDate();
    var MM = tdate.getMonth();
    var yyyy = tdate.getFullYear();
    var sDatum = dd + "." + (MM + 1) + "." + yyyy;

    return sDatum;
}



function Haversine(lat1, lon1, lat2, lon2) {
    lat1 = $("#polaziste option:selected").attr('data-lat'),
    lon1 = $("#polaziste option:selected").attr('data-lng')
    lat2 = $("#odrediste option:selected").attr('data-lat'),
    lon2 = $("#odrediste option:selected").attr('data-lng')
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}



function DajCijenu() {
    var sUdaljenost = Haversine().toFixed(2);
    var sJednosmjernaKarta = sUdaljenost * 0.35.toFixed(2);
    var sCijena1 = sJednosmjernaKarta * 2;
    var sCijena2 = ((sJednosmjernaKarta) * 2) * 0.3;
    var sPovratnaKarta = sCijena1 - sCijena2;
    var isJednosmjerna = $('input[value=Jednosmjerna]').is(':checked');
    var isPovratna = $('input[value=Povratna]').is(':checked');

    if (isJednosmjerna) {
        return sJednosmjernaKarta.toFixed(2);
    } else if (isPovratna) {
        return sPovratnaKarta.toFixed(2);
    }
}



function DodajKartu() {
    var sTipKarte = $('input[id=tip]:checked').val();
    var sKey = firebase.database().ref().child('karte').push().key;
    var sPolaziste = $("#polaziste option:selected").text();
    var sOdrediste = $("#odrediste option:selected").text();
    var sUdaljenost = Haversine().toFixed(2);
    var oKarte = {
        datum: DajDanasnjiDatum(),
        polaziste: sPolaziste,
        odrediste: sOdrediste,
        tip: sTipKarte,
        udaljenost: sUdaljenost,
        cijena: DajCijenu(),
    };
    var oZapis = {};
    oZapis[sKey] = oKarte;
    oDbKarte.update(oZapis);
    alert("Karta uspješno kreirana!");

}

function ProvjeriCijenu() {
    var sUdaljenost = Haversine().toFixed(2);
    alert("Udaljenost:" + sUdaljenost + " km" + " \r\nCijena: " + DajCijenu() + " kn");
}


function DodajGrad() {
    var sGradNaziv = $('#inptNazivGrada').val();
    var sGradLat = $('#txtLat').val();
    var sGradLng = $('#txtLng').val();
    var sGradDostupan = $('#txtDostupan').val();
    var sKey = firebase.database().ref().child('gradovi').push().key;
    var oGrad = {
        dostupan: sGradDostupan,
        gradovi_naziv: sGradNaziv,
        lat: sGradLat,
        lng: sGradLng,
    };
    var oZapis = {};
    oZapis[sKey] = oGrad;
    oDbGradovi.update(oZapis);
}



function obrisiGrad(sGradKey) {
    if (confirm("Jeste li sigurni da zelite obrisati ovaj grad?")) {
      var oGradRef = oDb.ref('gradovi/' + sGradKey);
      oGradRef.remove();
  }
  return false;
}


function ModalUrediGrad(sGradKey) {
    var oGradRef = oDb.ref('gradovi/' + sGradKey);
    oGradRef.once('value', function(oOdgovorPosluzitelja) {
        var oGrad = oOdgovorPosluzitelja.val();
        $('#inptEditNazivGrada').val(oGrad.gradovi_naziv);
        $('#txtEditLat').val(oGrad.lat);
        $('#txtEditLng').val(oGrad.lng);
        $('#txtEditDostupan').val(oGrad.dostupan);
        $('#btnUrediGrad').attr('onclick', 'SpremiGrad("' + sGradKey + '")');
        $('#uredi-grad').modal('show');
    });
}



function SpremiGrad(sGradKey) {
    var oGradRef = oDb.ref('gradovi/' + sGradKey);
    var sGradNaziv = $('#inptEditNazivGrada').val();
    var sGradLat = $('#txtEditLat').val();
    var sGradLng = $('#txtEditLng').val();
    var sGradDostupan = $('#txtEditDostupan').val();
    var oGrad = {
        dostupan: sGradDostupan,
        gradovi_naziv: sGradNaziv,
        lat: sGradLat,
        lng: sGradLng,
    };
    oGradRef.update(oGrad);
}
