const DodoChars = 'ABCDEFGHJKLMNPQRSTUVWXY0123456789';

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

document.getElementById("getDownload").onclick = function()
{
	var hsh=document.getElementById("hash").value;
	var pas=document.getElementById("pass").value;
	var pasHash = TryParseInt(pas,null);
	if (pasHash==null)
	{
		return;
	}
	var decHash=atob(hsh);
	var dodostr="";
	var i;
	for (i = 0; i < decHash.length; i++) {
		var bit = mod((decHash.charCodeAt(i) - pasHash), 33);
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