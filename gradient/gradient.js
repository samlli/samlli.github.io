window.onload = function() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    var color = "#000000";

    //incrementd
    var rup = true;
	var gup = true;
	var bup = true;

    //initial colors
    initPalette();

    function initPalette(){
    	//randomize initial color
        var randomint=Math.floor(Math.random()*16777215).toString(16); 
        //make sure hex is 6 digits
        for (var i = 6-randomint.length; i>0; i--){
        	randomint = "0"+randomint;
        }
        
        color="#"+randomint;
        document.getElementById("viewport").style.background=color;
        console.log(color);
        //change colors
		setInterval(changePalette,50);
    }

	function changePalette(){
		var r = color.substr(1,2);
		rvalue = parseInt(r, 16);
		console.log(rvalue);

		var g = color.substr(3,2);
		gvalue = parseInt(g, 16);
		console.log(gvalue);

		var b = color.substr(5,2);
		bvalue = parseInt(b, 16);
		console.log(bvalue);

		if (rup){
			rvalue++;
			if (rvalue>=250)
				rup=false;
			
		} else{
			rvalue--;
			if (rvalue<=5)
				rup=true;
		}

		if (gup){
			gvalue+=2;
			if (gvalue>=250)
				gup=false;
			
		} else{
			gvalue-=2;
			if (gvalue<=5)
				gup=true;
		}

		if (bup){
			bvalue+=3;
			if (bvalue>=250)
				bup=false;
			
		} else{
			bvalue-=3;
			if (bvalue<=5)
				bup=true;	
		}

		var rnew=rvalue.toString(16);
		var gnew=gvalue.toString(16);
		var bnew=bvalue.toString(16);

		color="#"+rnew+gnew+bnew;
		document.getElementById("viewport").style.background=color;
        console.log(color);
    }

    function stop(){
    	throw new Error("stop pls");
    }
}


