# autobusniKolodvor

### Konstrukcijske vježbe iz predmeta [Osnove web programiranja](http://racunarstvo.vsmti.hr/index.php/project/osnove-web-programiranja/)

# [DEMO](https://kolodvor.herokuapp.com/)

Napisati program u web okruženju pomoću kojega se omogućuje zaposlenicima autobusnog kolodvora kreiranje autobusne karte. U bazi je potrebno upisati 15 hrvatskih gradova sa odgovarajućim atributima:

 - Naziv grada
- Latituda
- Longituda
- Dostupan

Atributi koji opisuju geografsku lokaciju pojedinog grada(lat,lng) moraju biti točni. Program treba sadržavati sljedeće mogućnosti:

### Kreiranje karte
- Zaposlenik ima mogućnost kreiranja karte na način da sa liste dostupnih gradova odabere polazište, zatim odredište te tip karte(jednosmjerna ili povratna). Cijena karte se formira po sljedećim pravilima:
  - Cijena jednosmjerne karte je 0.35 kn/km
- Cijena povratne karte je umanjena za 30% dvaju jednosmjernih karata Udaljenost u kilometrima između 2 grada sa danim latitudama i longitudama se računa pomoću Haversine-ove formule. kreirana karta mora imati sljedeće podatke:
- Datum kreiranja karte
- Polazište
- Odredište
- Tip karte
- Udaljenost u km između polazišta i odredišta
- Cijena karte

### Kreiranu kartu potrebno je spremiti u bazu

### Pregled kreiranih karata 
- Omogućiti zaposleniku pregled kreiranih karata. U tabličnom obliku ispisati sve kreirane karte sortirane od najnovije kreirane do najstarije kreirane karte.
### Provjera cijene karte 
- Omogućiti zaposleniku provjeru cijene karte. 
- Prikazati formu u kojoj zaposlenik može unijeti polazište, odredište i tip karte(jednosmjerna ili povratna) te na temelju tih podataka program treba vratiti cijenu karte i udaljenost između polazišta i odredišta.
### Dodaj grad 
- Omogućiti zaposleniku da preko forme unese naziv novog grada, latitudu i longitudu, te da se uneseni podaci zapišu u      datoteku bazu.
### Ažuriraj grad 
- Omogućiti zaposleniku da uredi dostupnost pojedinog grada.
