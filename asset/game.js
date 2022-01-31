var timerClock;var listHari=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]
var listBulan=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"]
function ribuan(x){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");}
function ribuanForm(c)
{$(document).on("keyup",c,function()
{var bet=onlyNumber(nonribuan($(this).val()));bet=parseInt(bet);if(isNaN(bet))bet='';$(this).val(ribuan(bet));});}
function nonribuan(x){if(typeof x!=="undefined")
{if(x!=""){return x.replace(/[ ,]/g,"");}}}
function isNumber(n){return!isNaN(parseFloat(n))&&isFinite(n);}
function onlyNumber(n){if(typeof n!=="undefined")
{console.log("ini adlaah n",n);return n.replace(/\D/g,'');}else{return '';}}