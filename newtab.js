var isDragging = false
var wasDragging = false

function formatNumber(number) {
    if (number >= 10) {
        return `${number}`
    }
    return `0${number}`
}

const listExample = [
    {
        name: 'ChapGPT',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT2',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT3',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        name: 'ChapGPT4',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
]

const listsExample = [
    {
        name: 'lista 1',
        description: 'aaaa',
        order: 1,
        items: listExample
    }
]

function loadLists() {
    // const lists = localStorage.getItem("lists") || listsExample
    const lists = listsExample
    const container = document.getElementById('carousel-container')

    for(var i=0; i<lists.length; i++) {
        const list = lists[i]
        const wrapper = document.createElement('div')
        wrapper.classList.add('items')
        wrapper.classList.add('carousel-wrapper')

        const header = document.createElement('div')
        header.classList.add('carousel-header')
        header.innerHTML = `
            <div></div>
            <div class="carousel-controls">
                <button class="prev disabled">Prev</button>
                <button class="next">Next</button>
            </div>`

        wrapper.append(header)
        
        const ul = document.createElement('ul')
        ul.classList.add('carousel-content')

        list.items.forEach(i => {
            const li = document.createElement('li')
            li.classList.add('carousel-item')

            // const link = document.createElement('a')
            // link.setAttribute('href', i.url)
            // link.addEventListener('dragstart', event => {
            //     event.preventDefault();
            // });

            const img = document.createElement('img')
            img.setAttribute('dragabble', 'false')
            img.setAttribute('src', i.logo)

            const itemname = document.createElement('div')
            const name = document.createElement('p')
            name.classList.add('item-name')
            name.innerText = i.name

            li.addEventListener('click', () => {
                if(!wasDragging && !isDragging) 
                    window.location.href = i.url
                else {
                    wasDragging = false
                    isDragging = false
                }
            })

            itemname.append(name)
            // link.append(img, itemname)
            // li.append(link)
            li.append(img, itemname)
            ul.append(li)
        })

        wrapper.append(ul)
        container.append(wrapper)
    }
}

window.addEventListener('load', () => {
    loadLists()

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

                if (!isDragging) isDragging = true
			}
        }

        const onMouseUp = () => {
            wasDragging = isDragging
            isDragging = false
            mouseX = 0
            // add um grabbing quando tive movendo
            // remover o grabbing aqui e isso bloqueia o hover
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
    }

    // time
    const updateTime = () => {
        var now = new Date()
        const time = `${now.getHours()}:${formatNumber(now.getMinutes())}:${formatNumber(now.getSeconds())}`
        clock.innerHTML = time

        // if display only hour and minutes, change 1000 to 60000
        setTimeout(updateTime, 1000)
    }
    updateTime()
})