(function ( $ ) {
	function validateOpts(opts) {
        Object.keys(opts).forEach(function(key) {
            if (typeof $.fn.hype.defaults[key] == "undefined") {
                throw new Error("Invalid hype option: \'" + key + "\'")
            } else if (typeof opts[key] != typeof $.fn.hype.defaults[key]) {
                throw new Error("Hype option \'"+ key + "\' must be a " + typeof $.fn.hype.defaults[key])
            }
        })
        opts = !opts ? {} : opts
        console.log()
		return opts
	}

	function getRandomRGB() {
		return "rgb(" + Math.floor(Math.random() * 256) + ","
					  + Math.floor(Math.random() * 256) + ","
					  + Math.floor(Math.random() * 256) + ")"
	}
 
    $.fn.hype = function(opts) {
    	var options = $.extend({}, $.fn.hype.defaults, validateOpts(opts))
    	$parent = this
    	$parentWidth = $parent.width()
    	$parentHeight = $parent.height()

    	$parent.find("*").each(function() {
    		var $this = $(this)
    		var $childWidth = $this.width()
    		var $childHeight = $this.height()

            var currentRot = 0

    		var animateInterval = window.setInterval(function() {
                $this.css("position", "fixed")

                if (options.slide) {
                    $this.animate({
                        left: Math.floor(Math.random() * $parentWidth),
                        top: Math.floor(Math.random() * $parentHeight)
                    })
                } else {
                    $this.offset({
                        left: Math.floor(Math.random() * $parentWidth),
                        top: Math.floor(Math.random() * $parentHeight)
                    })
                }

                //Rotation
                currentRot += options.rotate
                if (Math.abs(currentRot) >= 360) {
                    currentRot += currentRot < 0 ? 360 : -360
                }
                $this.css({'transform' : 'rotate('+ currentRot +'deg)'});


    			if (options.color) {
    				$this.css("background-color", getRandomRGB())
    			}
    		}, options.delay)

    		//Stops animations once timeout is reached
    		if (options.timeout >= 0) {
    			setTimeout(function() {
                    $this.clearQueue()
    				window.clearInterval(animateInterval)
    			}, options.timeout)
    		}
    	})
    	return this
    }

    //Default options
    $.fn.hype.defaults = {
        delay: 100,
        color: true,
        rotate: 0, //in degrees
        timeout: -1, //Loops forever if value < 1 is set
        slide: true
    }
 
}( jQuery ));
