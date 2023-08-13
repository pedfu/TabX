window.addEventListener('load', () => {
    // get all wrappers (lists)
    const components = document.querySelectorAll('.carousel-wrapper')
    
    for(let i=0; i<components?.length; i++) {
        const component = components[i]
        const content = component.querySelector('.carousel-content')

        let x = 0
        let mouseX = 0
        const maxScrollWidth = content.scrollWidth - content.clientWidth / 2 - content.clientWidth / 2

        const nextButton = component.querySelector('.next')
        const prevButton = component.querySelector('.prev')

        if (maxScrollWidth !== 0) {
            component.classList.add('has-controls')
        }

        if (nextButton) {
            nextButton.addEventListener('click', (event) => {
                event.preventDefault();
        
                const halfClientWidth = content.clientWidth / 2;
                const currentScrollLeft = content.scrollLeft;
                const newScrollLeft = currentScrollLeft + halfClientWidth;
        
                content.scroll({
                    left: newScrollLeft,
                    behavior: 'smooth'
                });
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', (event) => {
                event.preventDefault()

                const halfClientWidth = content.clientWidth / 2;
                const currentScrollLeft = content.scrollLeft;
                const newScrollLeft = currentScrollLeft - halfClientWidth;

                content.scroll({
                    left: newScrollLeft,
                    behavior: 'smooth'
                })
            })
        }
        
        const onMouseDown = (event) => {
            content.sx = content.scrollLeft
            mouseX = event.pageX - content.offsetLeft
        }

        const onMouseMove = (event) => {
            const mx = event.pageX - content.offsetLeft

			if (mouseX) {
				content.scrollLeft = content.sx + mouseX - mx
			}
        }

        const onMouseUp = () => {
            mouseX = 0
        }

        content.addEventListener('mousemove', onMouseMove)
        content.addEventListener('mousedown', onMouseDown)

        // if ( component.querySelector( CONTROLS_SELECTOR ) !== undefined ) {
        //     content.addEventListener( 'scroll', scrollHandler );
        // }

        content.addEventListener('mouseup', onMouseUp)
        content.addEventListener('mouseleave', onMouseUp)

        // const scrollHandler = () => {
		// 	toggleArrows();
		// };

		// /**
		//  * Toggle arrow handler.
		//  */
		// const toggleArrows = () => {
		// 	if ( content.scrollLeft > maxScrollWidth - 10 ) {
		// 		nextButton.classList.add( 'disabled' );
		// 	} else if ( content.scrollLeft < 10 ) {
		// 		prevButton.classList.add( 'disabled' );
		// 	} else {
		// 		nextButton.classList.remove( 'disabled' );
		// 		prevButton.classList.remove( 'disabled' );
		// 	}
		// };
    }
})