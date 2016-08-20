(function ( $ ) {
	function validateOpts(opts) {
        if (!opts) {
            opts = {}
        }
		return opts
	}

	function getRandomRGB() {
		return "rgb(" + Math.floor(Math.random() * 256) + ","
					  + Math.floor(Math.random() * 256) + ","
					  + Math.floor(Math.random() * 256) + ")"
	}
 
    $.fn.hype = function(opts) {
    	var options = $.extend({}, $.fn.hype.defaults, validateOpts(opts))
        console.log(options)
    	$parent = this
    	$parentWidth = $parent.width()
    	$parentHeight = $parent.height()

    	$parent.find("*").each(function() {
    		var $this = $(this)
    		var $childWidth = $this.width()
    		var $childHeight = $this.height()

    		var animateInterval = window.setInterval(function() {
                $this.css("position", "fixed")
    			$this.animate({
                    left: Math.floor(Math.random() * $parentWidth),
                    top: Math.floor(Math.random() * $parentHeight)
                })
				// var randomLeft = Math.floor(Math.random() * ($parentWidth + $childWidth)) - $childWidth
				// var randomTop = Math.floor(Math.random() * ($parentHeight + $childHeight)) - $childHeight
    			if (options.color) {
                    console.log(getRandomRGB())
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
        rotate: null,
        timeout: -1, //Loops forever if value < 1 is set
        silent: false,
        slide: true
    }
 
}( jQuery ));