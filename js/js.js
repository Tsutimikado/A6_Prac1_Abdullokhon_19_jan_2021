let divSelector;
let nowId;
let timeSt;
let timeEnd;
let i;
let sec5;
let missShot;
let timeInt=[];
let timeM;
let aktText = [
"Вау! У Вас невероятная реакция. В скорости вы не уступаете даже профессионалам!",
"У Вас неплохие рефлексы, что может дать Вам премущество в важный момент!",
"Хм. Ваша реакция ниже среднего. Вам не помешает немнго прокачаться :)"]
let accText = [
"Вы отлично сосредоточились и поразили все цели. Так держать!",
"Ухх. Одной цели не хватило до максимума. Но в следующий раз получится!",
"Возможно Вы слишком торопитесь и суетитесь? Попробуйте в этот раз чуть спокойнее.",
"Ваша точность удивляет (в плохом смысле). Сосредоточтесь и попробуйте ещё раз!",
"Чувак, просто удали эту игру. Это не твоё. Просто удали её и мы сделаем вид что ничего не видели..."]
let accI;
let aktI;


function round(elem){
	
	$(elem).toggleClass("target");
}

function start() {
	$(".container").toggleClass("show-off");
	$("#btn-start").toggleClass("show-off");
	$("#button-stop").toggleClass("show-off");
}

function getInt(opa) { //считает время до каждого выстрела
	timeInt[i]= opa - timeM;
	timeM = opa;
	console.log (timeInt[i])
}

function getBid(obj) {
        let Obj=(obj.id);
        nowId=`#${Obj}`;
    }

function dontRep(elem){ //не даёт повториться одному и тому же квадрату несколько раз подряд
	divSelector=randomDivId();
	if (elem==divSelector) {
		dontRep(divSelector);
	}
}

function miss(){ //Переключение цвета полей в красный
	$(".col").toggleClass("missed");
}

function showSec() // Таймер на 5 секунд
{
	// console.log(sec5);
	$( ".timerjs" ).html(sec5);
	sec5--;
}

function akt(){
	let result=0;	
	for (let j=0;j<=9;j++)
	{
		result+=timeInt[j];
	}
	resTime = result/10;
	if (resTime<260) {aktI=0;}
	else if (resTime<600) {aktI=1;}
	else {aktI=2;}
	return resTime;
}

function endGame(){
	start();
	$(".timerjs").html("10 квадратов");
	$( divSelector ).html("");
	round(divSelector);
	timeEnd= getTimestamp();
	console.log ((timeEnd - timeSt)/1000);
//---------------------------
if (missShot==0) {accI=0;}
	else if (missShot==1) {accI=1;}
	else if (missShot<=3) {accI=2;}
	else if (missShot >=9) {accI=4;}
	else {accI = 3;}
//---------------------------
	$("#win-message").toggleClass("show-off");
	$("#total-time-played").html((timeEnd-timeSt)/1000);
	$(".accuracy").html((10- missShot)*10 + "%");
	$(".akt").html(akt()+"мс");
	$("#akt-com").html(aktText[aktI]);
	$("#acc-com").html(accText[accI]);
//---------------------------	
}

// -------------BUTTONS---------
$("#btn-start").click(function(){
	sec5=5;
	missShot=0;
	$("#win-message").addClass("show-off");
	let timerId = setInterval(() => showSec(), 1000);
	setTimeout(() => { clearInterval(timerId); }, 5000);
	
	setTimeout(() => {
		$( ".timerjs" ).html("GO!");
		console.log(getTimestamp());
		timeSt=getTimestamp();
		timeM = timeSt;
		start();
	},6000);	
	divSelector= randomDivId();
	round(divSelector);
	i=0;	
	$( divSelector ).html(i+1);
});
//--------------------------------
$(".col").click(function() {
	getInt(getTimestamp());
	if (i==9) {endGame(); return;}	
	i++;
	getInt(getTimestamp());
	if (nowId==divSelector){
		$( divSelector ).html("");
		round(divSelector);
		dontRep(divSelector);
		round(divSelector);
		$( divSelector ).html(i+1);
	}
	else {
		miss();
		$( divSelector ).html("");
		setTimeout(miss, 1000);
		round(divSelector);
		dontRep(divSelector);
		round(divSelector);
		setTimeout(() => {$( divSelector ).html(i+1);; }, 1000)
		missShot++;
	}
});
//--------------------------------------
$("#button-stop").click(function() {
	start();
	$( divSelector ).html("");
	$(".timerjs").html("10 квадратов");
	round(divSelector);
}); 

