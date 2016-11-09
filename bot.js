var token = process.env.TOKEN;

var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

var gebeurtenis = [{naam:"test",datum:"December 30, 2016"},{naam:"Dinnerconcert(Fiesta Latina)",datum:"November 18, 2016 20:00"},{naam:"test",datum:"Augustus 30, 2016"}];
var repetities =["2016-10-28T20:00:00","2016-11-4T20:00:00","2016-11-11T20:00:00","2016-11-16T20:00:00","2016-11-17T20:00:00"];

var fotos = ["https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14542391_593773814161971_3094513226974935335_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14608718_593773757495310_6437503985792596273_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14542304_593773754161977_8897268694471715033_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14560087_593773097495376_3488175353244389391_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14434915_593773064162046_1241129608417350141_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14524608_593773710828648_2657777396131766862_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14589936_593773684161984_2048577703504846900_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14608796_593773687495317_4136150979792710631_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14589886_593773644161988_7375473712361781544_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14500262_593773617495324_2236249338096027357_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14480601_593773017495384_7442616279119861432_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14567499_593773014162051_648511831234004736_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14589695_593773614161991_316759367317620632_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14589627_593773564161996_1145134507984471962_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14543891_593772964162056_2928309916664834224_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14590140_593772930828726_2750567864031588047_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14567358_593772934162059_8876863452645075193_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14570609_593773530828666_1889923897144835218_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14481732_593772867495399_1406700989889823143_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14480535_593772800828739_8217176483295601861_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14500458_593773524162000_5355811538609976303_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14468263_593773490828670_3412790536748053933_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14524534_593773460828673_4082972831410334217_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14525178_593773454162007_6065216743241648683_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14589908_593773404162012_5142598446318865451_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14589565_593773357495350_7049392420938119009_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14481754_593773330828686_7429860693267852640_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14468671_593773320828687_6200823407632476120_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14468504_593773264162026_2150988961988992932_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14567413_593773237495362_3686801726441026365_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14524419_593773214162031_4565489254044233542_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14566188_593773204162032_361704301643596049_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14608714_593773157495370_4424820677434737411_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14556518_593773150828704_5017710311587192816_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14480521_593773124162040_1244249798500454476_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14500526_593773094162043_2494587549118965589_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14481918_593772860828733_2177795854529350744_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14468423_593772797495406_8426067889264163002_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14556723_593772804162072_4058949900798576260_o.jpg",
"https://scontent-bru2-1.xx.fbcdn.net/t31.0-8/14524526_593772864162066_6288744584723391767_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14468412_590632324476120_7456817711127683237_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14468560_590632327809453_4671415260581768939_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14435025_590632321142787_8231062185889907877_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14500682_590632381142781_3506807942468839537_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14444752_590632384476114_6801122568239144777_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14480499_590632407809445_2719552648610628272_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14379910_590632451142774_5022109115534371356_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14435034_590633677809318_4348870876163081905_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14409645_590632474476105_2660880923167700958_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14435097_590632507809435_4161800690482258668_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14409561_590632584476094_4659728336487627582_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14482011_590632591142760_5520656278425281507_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14425499_590632597809426_5371778635496312220_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14480506_590632687809417_5416848717116440499_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14434983_590632691142750_7913231779850432802_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14435027_590632694476083_8859949881645101018_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14500321_590632781142741_6191073196775994834_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14434804_590632787809407_118191827912902479_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14480714_590632791142740_1757090846126884745_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14500586_590632861142733_8026302499458399111_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14425332_590632864476066_2983236704509124072_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14481927_590632924476060_7367818232057175632_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14435092_590633804475972_8063293958903519128_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14481863_590633801142639_5484164995781903194_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14409839_590632947809391_3403146040523801367_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14500275_590632954476057_4471419053498689185_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14424942_590633881142631_1748647665506581610_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14468432_590633807809305_6201836678542977195_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14445220_590633037809382_3571681949852717003_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14468710_590633034476049_2363286661084274050_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14409886_590633861142633_6246806588348938507_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14445191_590633031142716_7084405033122757170_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14468446_590633097809376_4326876364626336223_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14444983_590633117809374_8367676881077444239_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14434804_590633204476032_6199023438095055940_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14444697_590633234476029_1535965442808385348_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14500520_590633271142692_4634632477564314225_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14444705_590633397809346_2265046588905225362_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14468324_590633407809345_2379594283982822939_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14468615_590633424476010_8059367528220394759_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14425377_590633547809331_6285905091775205145_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14468720_590633537809332_3290599852953290635_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14434922_590633551142664_4549643627276595763_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14500351_590633654475987_8624041870923169407_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14424687_590633681142651_6691058134459671987_o.jpg",
"https://scontent-ams3-1.xx.fbcdn.net/t31.0-8/14425320_590633911142628_3370253933619527526_o.jpg"
];


/*bot.onText(/^/, function (msg) {
  var name = msg.from.first_name;
  bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(function () {
    // reply sent!
  });
});*/

bot.onText(/\/nextevent/, function (message,match) {
	for(var i=0;i<gebeurtenis.length;i++){
	var datei=new Date(gebeurtenis[i].datum);
	var currentdate = new Date();
	if(datei<currentdate){
		gebeurtenis.splice(i,1);
	}
}

gebeurtenis.sort(function(a, b){
	var dateA=new Date(a.datum), dateB=new Date(b.datum)
	return dateA-dateB;
});
	
bot.sendMessage(message.chat.id, gebeurtenis[0].naam+' op datum: '+gebeurtenis[0].datum);
});

bot.onText(/\/Volgenderepetitie/,function(message,match){
	var currentdate = new Date();

	Date.prototype.setISO8601 = function (string) {
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    var d = string.match(new RegExp(regexp));

    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
    }

    offset -= date.getTimezoneOffset();
    time = (Number(date) + (offset * 60 * 1000));
    this.setTime(Number(time));
}
	
	for(var i=0;i<repetities.length;i++){
	var datei=new Date(repetities[i]);
	var t=new Date();
	if(t.setISO8601(datei)<currentdate){
		repetities.splice(i,1);
	}
}

repetities.sort(function(a, b){
	var dateA=new Date(a), dateB=new Date(b)
	return dateA-dateB;
});
	
var dag = new Date(repetities[0])
var dagnaam;
var Maandnaam;
switch (dag.getUTCDay()) {
    case 0:
        dagnaam = "Zondag";
        break;
    case 1:
        dagnaam = "Maandag";
        break;
    case 2:
        dagnaam = "Dinsdag";
        break;
    case 3:
        dagnaam = "Woensdag";
        break;
    case 4:
        dagnaam = "Donderdag";
        break;
    case 5:
        dagnaam = "Vrijdag";
        break;
    case 6:
        dagnaam = "Zaterdag";
}
switch (dag.getMonth()) {
    case 0:
        Maandnaam = "Januari";
        break;
    case 1:
        Maandnaam = "Februari";
        break;
    case 2:
        Maandnaam = "Maart";
        break;
    case 3:
        Maandnaam = "April";
        break;
    case 4:
        Maandnaam = "Mei";
        break;
    case 5:
        Maandnaam = "Juni";
        break;
    case 6:
        Maandnaam = "Juli";
		break;
	case 7:
        Maandnaam = "Augustus";
		break;
	case 8:
        Maandnaam = "September";
		break;
	case 9:
        Maandnaam = "Oktober";
		break;
	case 10:
        Maandnaam = "November";
		break;
	case 11:
        Maandnaam = "December";
}
bot.sendMessage(message.chat.id, 'De volgende repetitie is '+dagnaam+' '+dag.getDate()+' '+Maandnaam+' '+dag.getFullYear()+' om '+dag.getHours()+'u' +currentdatestring);
});

bot.onText(/\/foto/,function (msg)  {
	
		var x=Math.floor((Math.random() * fotos.length) );

		bot.sendPhoto(msg.chat.id, photo=fotos[x]).then(function(){
	  
		});		
});

module.exports = bot;
