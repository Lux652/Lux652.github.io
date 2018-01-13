oDbGradovi.on('value', function(oOdgovorPosluzitelja)
{
  var oPolaziste=$('#polaziste');
  var oOdrediste=$('#odrediste');
  var oTablicaGradova=$('#tablica-gradovi')
  oTablicaGradova.find('tbody').empty();
  var nRbr=1;
	oPolaziste.find('select').empty();
  oOdrediste.find('select').empty();
	oOdgovorPosluzitelja.forEach(function(oGradoviSnapshot)
	{
		var sGradKey=oGradoviSnapshot.key;
		var oGrad = oGradoviSnapshot.val();
    var sSelect='<option value="'+sGradKey+'">'+oGrad.gradovi_naziv+'</option>' ;
    var sRow='<tr><td>' + nRbr++ + '.</td><td>' + oGrad.gradovi_naziv + '</td><td>' + oGrad.lat + '</td><td>' + oGrad.lng + '</td><td>' + oGrad.dostupan+'</a></td><td><button type="button"  onclick="ModalUrediGrad(\''+sGradKey+'\')" class="btn btn-xs btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td><td><button onclick="obrisiGrad(\''+sGradKey+'\')" type="button" class="btn btn-xs btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td></tr>';

    oTablicaGradova.find('tbody').append(sRow);
    oPolaziste.append(sSelect);
    oOdrediste.append(sSelect);
    console.log(oGrad.gradovi_naziv);
	});
});



oDbKarte.on('value', function(oOdgovorPosluzitelja)
{
	var oTablicaKarta = $('#tablica-karte');
	oTablicaKarta.find('tbody').empty();
	var nRbr = 1;
	oOdgovorPosluzitelja.forEach(function(oKartaSnapshot)
	{
		var sKarteKey = oKartaSnapshot.key;
		var oKarta = oKartaSnapshot.val();
		var sRow = '<tr><td>' + nRbr++ + '.</td><td>' + oKarta.datum+ '</td><td>' + oKarta.polaziste + '</td><td>'+oKarta.odrediste+'</td><td>'+oKarta.tip+'</td></tr>';
		oTablicaKarta.find('tbody').append(sRow);
	});
});



function DajDanasnjiDatum()
{
    var tdate = new Date();
    var dd = tdate.getDate();
    var MM = tdate.getMonth();
    var yyyy = tdate.getFullYear();
    var sDatum = dd + "." + (MM + 1) + "." + yyyy;

    return sDatum;
}



function DodajKartu()
{
  var sTipKarte = $('input[id=tip]:checked').val();
  var sKey = firebase.database().ref().child('karte').push().key;
  var sPolaziste = $( "#polaziste option:selected" ).text();
  var sOdrediste = $( "#odrediste option:selected" ).text();


  var oKarte={
    datum:DajDanasnjiDatum(),
    tip:sTipKarte,
    polaziste:sPolaziste,
    odrediste:sOdrediste,
  };

  var oZapis={};
  oZapis[sKey]=oKarte;
  oDbKarte.update(oZapis);
}




function DodajGrad()
{

	var sGradNaziv = $('#inptNazivGrada').val();
	var sGradLat = $('#txtLat').val();
  var sGradLng = $('#txtLng').val();
  var sGradDostupan = $('#txtDostupan').val();


	var sKey = firebase.database().ref().child('gradovi').push().key;

    var oGrad =
    {
      dostupan:sGradDostupan,
      gradovi_naziv:sGradNaziv,
      lat:sGradLat,
      lng:sGradLng,
    };


    var oZapis = {};
    oZapis[sKey] = oGrad;
    oDbGradovi.update(oZapis);
}




function obrisiGrad(sGradKey)
{
	var oGradRef = oDb.ref('gradovi/' + sGradKey);
	oGradRef.remove();
}



function ModalUrediGrad(sGradKey)
{
	var oGradRef = oDb.ref('gradovi/' + sGradKey);
	oGradRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oGrad = oOdgovorPosluzitelja.val();
		// Popunjavanje elemenata forme za uređivanje
		$('#inptEditNazivGrada').val(oGrad.gradovi_naziv);
		$('#txtEditLat').val(oGrad.lat);
    $('#txtEditLng').val(oGrad.lng);
    $('#txtEditDostupan').val(oGrad.dostupan);
		$('#btnUrediGrad').attr('onclick', 'SpremiGrad("'+sGradKey+'")');

		$('#uredi-grad').modal('show');
	});
}



function SpremiGrad(sGradKey)
{
	var oGradRef = oDb.ref('gradovi/' + sGradKey);

  var sGradNaziv = $('#inptEditNazivGrada').val();
	var sGradLat = $('#txtEditLat').val();
  var sGradLng = $('#txtEditLng').val();
  var sGradDostupan = $('#txtEditDostupan').val();

	var oGrad =
	{
    dostupan:sGradDostupan,
    gradovi_naziv:sGradNaziv,
    lat:sGradLat,
    lng:sGradLng,
	};
	oGradRef.update(oGrad);
}
