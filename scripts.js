const DodoChars = 'ABCDEFGHJKLMNPQRSTUVWXY0123456789';

document.getElementById("getDownload").onclick = function() {
	var hsh=document.getElementById("hash").value;
	var pulhsh=getHash(hsh);
	if (pulhsh != "")
		hsh=pulhsh;
	var pas=document.getElementById("pass").value;
	var pasHash = TryParseInt(pas,null);
	if (pasHash==null)
	{
		return;
	}
	var decHash=atob(hsh);
	var dodostr="";
	var i;
	var encryptShift = Math.floor(pasHash / 100);
	for (i = 0; i < decHash.length; i++) {
		var extraShift = i % 2 == 0 ? encryptShift : -encryptShift;
		var bit = mod((decHash.charCodeAt(i) - pasHash - extraShift), 33);
		var bitInt = parseInt(bit);
		console.log(`${decHash.charCodeAt(i)}: ${bitInt}`);
		dodostr += `${DodoChars[bitInt]}`;
	}
	document.getElementById("dod").innerHTML = `Dodo code: <b>${dodostr}</b>`;
}

function TryParseInt(str,defaultValue) {
     var retValue = defaultValue;
     if(str !== null) {
         if(str.length > 0) {
             if (!isNaN(str)) {
                 retValue = parseInt(str);
             }
         }
     }
     return retValue;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

const lkup = 'Your dodo hash is ';
function getHash(msg) {
	var index = msg.indexOf(lkup);
	if (index === -1)
		return "";
	var startHash = index + lkup.length;
	var sHashStr = msg.substring(startHash);
	var spl = sHashStr.split(" ");
	return spl[0];
}