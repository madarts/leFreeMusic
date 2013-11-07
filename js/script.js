function screenX(){
	var width=screen.width;
	
	return width;
}

function screenY(){
	var width=screen.width;
	
	return width;
}




window.addEvent('resize', function(){
    y = $('contenido').getSize().y;
    
    if(y<600)
        $('pieMenu').setStyle('height', 239);
    else
        $('pieMenu').setStyle('height', y-361);
        
        
    $('lista').setStyle('height', y);

});


window.addEvent('domready', function(){
    $('contenido').setStyle('width', screenX());
    
	y = $('contenido').getSize().y;
    
	nuevaPosicion = screenX()-375;

	$('lista').setStyle('width', nuevaPosicion);
    
    
    y = $('contenido').getSize().y;
    
    
    if(y<600)
        $('pieMenu').setStyle('height', 239);
    else
        $('pieMenu').setStyle('height', y-361);
    
    
    
    var name = $('audioSound').src;
    
    name = name.split("/");
	name = name[name.length-1].split(".");

	$('tituloRepro').innerHTML = name[0];
    
    var controlReproduccion = function() {
		tiempo = parseInt($('audioSound').duration-$('audioSound').currentTime);
		
		var n=new Date(tiempo*1000);//llevar todo a milisegundos 
		seg = ""+n.getSeconds()+"";
			if(seg.length == 1)
				seg = "0"+seg;
		if(isNaN(seg))
			$('tiempoRepro').innerHTML = '-';
		else
			$('tiempoRepro').innerHTML = "-"+ n.getMinutes()+':'+seg;
		
		tiempo = parseInt((100/$('audioSound').duration)*$('audioSound').currentTime);

		mySlider.set(tiempo);
	};
	/* set periodical into action!  once every second */
	var periodicalID = controlReproduccion.periodical(1000);
    

    activo = 0;
    $('play').addEvent('click', function(event){
		$('audioSound').play();
        activo = 2;
	});
	
	$('stop').addEvent('click', function(event){
		if(activo == 1){
		  $('audioSound').currentTime = 0;
          
          activo = 0;
		}
       
        $('audioSound').pause();
        
        activo = 1;
	});
    
	
	
    seleccionado = 0;
	$('barraRep').addEvent('mousedown', function(event){
		seleccionado=1;
		if(activo == 2) $('audioSound').pause();
	});
	$('contenido').addEvent('mouseup', function(event){
		seleccionado=0;
        
		if(activo==2)
			$('audioSound').play();
        
	});
	$('barraRep').addEvent('mouseup', function(event){
		seleccionado=0;
        
		if(activo==2)
			$('audioSound').play();
	});
    
    var mySlider = new Slider('barraRep', 'stado', {
		steps: 100,
		wheel: true,
		snap: true,
		onChange: function(step){
			if(seleccionado==1){
                tiempo = parseInt($('audioSound').duration-$('audioSound').currentTime);
                
    			var n=new Date(tiempo*1000);//llevar todo a milisegundos 
    			seg = ""+n.getSeconds()+"";
    			if(seg.length == 1)
    				seg = "0"+seg;
    		
    			if(isNaN(seg))
    				$('tiempoRepro').innerHTML = '-';
    			else
    				$('tiempoRepro').innerHTML = "-"+ n.getMinutes()+':'+seg;
                
                tiempo = parseInt(($('audioSound').duration/100)*mySlider.step);
                $('audioSound').currentTime=(tiempo);
			}
		}
	});
	
	
    
    var mySlide1 = new Fx.Slide('reproductor1', {
		mode: 'vertical',
		duration:3500,
		transition: Fx.Transitions.Expo.easeOut,

        onComplete: function() {
			
        }
	});
    
    
    
    
    
    
    
    
    
    
    
    
    
    $$('img.caratula').each(function(el) {
        el.addEvent('dblclick',function(e) {
            e = new Event(e);
			e.stop();
			                       
            var parent = el.getParent('li');

			new Fx.Slide(parent,{
				mode: 'horizontal',
				duration:4000,
				onComplete: function() {
				    new Fx.Slide('reproductor1', {
                		mode: 'vertical',
                		duration:3500,
                		transition: Fx.Transitions.Expo.easeOut,
                
                        onComplete: function() {
        					$('audioSound').pause();
        			
                			caratulas = el.src;
                			caratulas = caratulas.split("/");
                			caratulas = caratulas[caratulas.length-1];
                			
                			$('foto').src = "img/caratulas/"+ caratulas;
                			
                			$('audioSound').src = "music/Mai.mp3";
                			var titulo = $('audioSound').src;
                			
                			titulo = titulo.split("/");
                			titulo = titulo[titulo.length-1].split(".");
                			
                			$('tituloRepro').innerHTML = titulo[0];
                			
                			var n=new Date(parseInt($('audioSound').duration)*1000);//llevar todo a milisegundos 
                			seg = ""+n.getSeconds()+"";
                				if(seg.length == 1)
                					seg = "0"+seg;
                                    
                			if(isNaN(seg))
                				$('tiempoRepro').innerHTML = '-';
                			else
                				$('tiempoRepro').innerHTML = "-"+ n.getMinutes()+':'+seg;
        					
        					mySlide1.slideIn();
        					
                            new Fx.Slide(parent,{
                				mode: 'vertical',
                				duration:2000,
                                onComplete: function() {
                                    parent.style.display = 'none';
                                }
            				}).slideOut();
                            
                        }
                    }).slideOut();
                    
                }
            }).slideOut();
            
		});
	});
    
    
});