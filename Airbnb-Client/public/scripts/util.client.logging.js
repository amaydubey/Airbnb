$(document).ready(function()
	{
	    $(":button").click(function()
	    {
    		var viewURL = $(location).attr("pathname");
			var clickid = this.id;
			var currentdate = new Date(); 
			var property = "test";

    		var datetime = currentdate.getDate() + "/"
            	    + (currentdate.getMonth()+1)  + "/" 
                	+ currentdate.getFullYear() + " "  
                	+ currentdate.getHours() + ":"  
                	+ currentdate.getMinutes() + ":" 
                	+ currentdate.getSeconds();
    		
            $.post("/analytics",
    			    {
    			        url : viewURL,
    			        id : clickid,
    			        ts : datetime,
    			        property : property
    			    });
    	});
});
