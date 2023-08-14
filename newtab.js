
function formatNumber(number) {
    if (number >= 10) {
        return `${number}`
    }
    return `0${number}`
}

window.addEventListener('load', () => {
    // get all wrappers (lists)
    const components = document.querySelectorAll('.carousel-wrapper')
    const clock = document.getElementById('clock')
    
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

        const onScroll = () => {
			toggleButtons()
		}

		const toggleButtons = () => {
			if (content.scrollLeft > maxScrollWidth - 10) {
				nextButton.classList.add('disabled')
			} else if ( content.scrollLeft < 10 ) {
				prevButton.classList.add('disabled')
			} else {
				nextButton.classList.remove('disabled')
				prevButton.classList.remove('disabled')
			}
		}

        content.addEventListener('mousemove', onMouseMove)
        content.addEventListener('mousedown', onMouseDown)

        if (component.querySelector('.carousel-controls')) {
            content.addEventListener('scroll', onScroll)
        }

        content.addEventListener('mouseup', onMouseUp)
        content.addEventListener('mouseleave', onMouseUp)


        // time
        const updateTime = () => {
            var now = new Date()
            const time = `${now.getHours()}:${formatNumber(now.getMinutes())}:${formatNumber(now.getSeconds())}`
            clock.innerHTML = time

            // if display only hour and minutes, change 1000 to 60000
            setTimeout(updateTime, 1000)
        }
        updateTime()
    }
})