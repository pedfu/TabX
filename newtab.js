// function order

// formatNumber()
// readImageAsDataUrl()
// loadLists()
// addItemToList()
// addInputListeners()
// listOnClick()


var isDragging = false
var wasDragging = false

var canDrag = false

var currentId;

const listExample = [
    {
        id: 1, 
        name: 'ChapGPT',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
    {
        id: 2, 
        name: 'ChapGPT2',
        logo: 'https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png',
        url: 'https://chat.openai.com/',
        backgroundColor: '#444444',
        backgroundImage: null,
    },
]

const l = [
    {
        id: 1,
        name: 'lista 1',
        description: 'aaaa',
        order: 1,
        items: listExample
    }
]

if (!localStorage.getItem('lists')) {
    localStorage.setItem('lists', JSON.stringify(l))
}
var lists = JSON.parse(localStorage.getItem('lists'))
console.log(lists)

function formatNumber(number) {
    if (number >= 10) {
        return `${number}`
    }
    return `0${number}`
}

function loadLists() {
    // const lists = localStorage.getItem("lists") || listsExample
    // const lists = listsExample
    const container = document.getElementById('carousel-container')
    container.innerHTML = ''

    for(var i=0; i<lists.length; i++) {
        const list = lists[i]
        const wrapper = document.createElement('div')
        wrapper.classList.add('items')
        wrapper.classList.add('carousel-wrapper')
        wrapper.id = 'list-' + list.id

        const header = document.createElement('div')
        header.classList.add('carousel-header')
        header.innerHTML = `
            <div></div>
            <div class="carousel-controls">
                <button class="add">Add</button>
                <button class="prev disabled">Prev</button>
                <button class="next">Next</button>
            </div>`

        wrapper.append(header)
        
        const ul = document.createElement('ul')
        ul.classList.add('carousel-content')

        list.items.forEach(i => {
            const li = document.createElement('li')
            li.classList.add('carousel-item')
            li.style.background = `url("${i?.backgroundImage}") center / cover no-repeat, ${i?.backgroundColor}`
            console.log(i?.backgroundImage)

            const img = document.createElement('img')
            img.setAttribute('dragabble', 'false')
            img.classList.add('favicon')

            // verify if null or {}
            if (!i?.backgroundImage || 
                (i?.backgroundImage !== null && 
                    typeof i?.backgroundImage === 'object' && 
                    Object.keys(i?.backgroundImage).length === 0)
            ) {
                img.setAttribute('src', i?.logo)
            }
            if (!i?.logo) {
                img.classList.add('hidden')
            }

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

function addItemToList(id, newItem) {
    const container = document.getElementById('carousel-container')
    const modalContainer = document.getElementById('add-modal-container')
    const list = lists[id]
    const wrapper = document.getElementById('list-' + id)
    
    const ul = wrapper.querySelector('ul.carousel-content')
    
    const li = document.createElement('li')
    li.classList.add('carousel-item')

    const img = document.createElement('img')
    img.setAttribute('dragabble', 'false')
    img.setAttribute('src', newItem.logo)

    const itemname = document.createElement('div')
    const name = document.createElement('p')
    name.classList.add('item-name')
    name.innerText = newItem.name

    li.addEventListener('click', () => {
        if(!wasDragging && !isDragging) 
            window.location.href = newItem.url
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

    wrapper.append(ul)
    container.append(wrapper)
}

function readImageAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const imageDataUrl = e.target.result;
        resolve(imageDataUrl);
      };
  
      reader.onerror = function (e) {
        reject(new Error('Error reading the image file.'));
      };
  
      reader.readAsDataURL(file);
    });
  }

// function addItemInList()
function addInputListeners() {
    const nameInput = document.getElementById('name-input')
    const urlInput = document.getElementById('url-input')
    const backgroundColorInput = document.getElementById('backgroundColor-input')
    const fileInput = document.getElementById('fileInput')
    const selectedImage = document.getElementById('selected-image');
    
    const submitButton = document.getElementById('submit')
    const closeButton = document.getElementById('close')
    
    const previewItem = document.getElementById('preview-item')
    const previewImage = document.getElementById('preview-image')
    const previewFavicon = document.getElementById('preview-favicon')
    const previewItemName = document.getElementById('preview-item-name')
    const expandButton = document.getElementById('preview-expand')
    const expandIcon = document.getElementById('expand-icon')

    const backgroundModal = document.getElementById('background-modal')
    const modalContainer = document.getElementById('add-modal-container')
    const modal = document.getElementById('add-modal')

    // prevent close modal on click modal
    modal.addEventListener('click', (event) => {
        event.stopPropagation()
    })
    backgroundModal.addEventListener('click', (event) => {
        modalContainer.classList.add('hidden')
    })

    expandButton.addEventListener('click', (event) => {
        if (expandIcon.classList.contains('fa-angle-left')) {
            expandButton.setAttribute('title', 'Show preview')
            expandIcon.classList.remove('fa-angle-left')
            expandIcon.classList.add('fa-angle-right')
            previewItem.classList.add('hidden')
        } else {
            expandButton.setAttribute('title', 'Hide preview')
            expandIcon.classList.remove('fa-angle-right')
            expandIcon.classList.add('fa-angle-left')
            previewItem.classList.remove('hidden')
        }
    })

    backgroundColorInput.addEventListener('change', (event) => {
        previewImage.style.backgroundColor = event.target.value
    })

    nameInput.addEventListener('change', (event) => {
        previewItemName.innerText = event.target.value
    })
    
    urlInput.addEventListener('change', (event) => {
        const url = event.target.value
        
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
        if (urlRegex.test(url)) {
            console.log('url2')
            const favicon = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=16`
            previewFavicon.src = favicon
        }
    })

    
    fileInput.addEventListener('change', (event) => {
        const fileInput = event.target;
        const selectedFile = fileInput.files[0];
        if (selectedFile) {
            const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;

            if (!allowedExtensions.exec(selectedFile.name)) {
                alert('Please select a valid PNG, JPG, or JPEG file.');
                fileInput.value = '';
                return;
            }

            const reader = new FileReader();

            reader.onload = function(event) {
                selectedImage.src = event.target.result;
                previewImage.src = event.target.result;
            };

            reader.readAsDataURL(selectedFile);
        }
    })
    
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault()
        const name = nameInput?.value
        const url = urlInput?.value
        const bgColor = backgroundColorInput?.value
        const bgImage = fileInput?.files[0];

        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
        if (name && url && urlRegex.test(url)) {
            // create - add to list and load updated list
            // use currentId to update list saved on localhost
            const listItem = lists?.find(l => l.id === currentId)
            if (listItem) {
                const items = listItem?.items
                const id = Number(items[items?.length - 1]?.id) + 1
                const logoUrl = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=16`
                const newItem = {
                    id: id, 
                    name: name,
                    logo: logoUrl,
                    url: url,
                    backgroundColor: bgColor,
                    backgroundImage: null,
                }
                
                if (bgImage) {
                    const imageDataUrl = await readImageAsDataUrl(bgImage)
                    newItem.backgroundImage 
= imageDataUrl
                }
                
                listItem?.items?.push(newItem)
                const othersLists = lists?.filter(l => l.id !== currentId)
                lists = [...othersLists, listItem].sort((a, b) => a?.id - b?.id)
                addItemToList(currentId, newItem)
                listOnClick()

                localStorage.setItem('lists', JSON.stringify(lists))

                modalContainer.classList.add('hidden')
                nameInput.value = ''
                urlInput.value = ''
                fileInput.value = ''
                selectedImage.src = ''
                previewImage.src = ''
                previewImage.style.backgroundColor = ''
                backgroundColorInput.value = '#000000'
            }
        } else {
            window.alert('Name and/or URL are not fulfilled')
            console.log('not create')            
        }
    })
}

function listOnClick() {
    const components = document.querySelectorAll('.carousel-wrapper')
    const modalContainer = document.getElementById('add-modal-container')
    
    for(let i=0; i<components?.length; i++) {
        const component = components[i]
        const id = Number(component.id.replace('list-', ''))
        const content = component.querySelector('.carousel-content')

        let x = 0
        let mouseX = 0
        const maxScrollWidth = content.scrollWidth - content.clientWidth / 2 - content.clientWidth / 2

        const nextButton = component.querySelector('.next')
        const prevButton = component.querySelector('.prev')
        const addButton = component.querySelector('.add')

        if (maxScrollWidth !== 0) {
            component.classList.add('has-controls')
        }

        if (addButton) {
            addButton.addEventListener('click', (event) => {
                event.preventDefault()
                currentId = id
                addInputListeners()
                modalContainer.classList.remove('hidden')
            })
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
            canDrag = true
            content.sx = content.scrollLeft
            mouseX = event.pageX - content.offsetLeft
        }

        const onMouseMove = (event) => {
            if (!canDrag) return
            const mx = event.pageX - content.offsetLeft

			if (mouseX) {
				content.scrollLeft = content.sx + mouseX - mx

                if (!isDragging) isDragging = true
			}
        }

        const onMouseUp = () => {
            wasDragging = isDragging
            isDragging = false
            canDrag = false
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
}

window.addEventListener('load', () => {
    const clock = document.getElementById('clock')
    
    // const headers = new Headers({

    // })
    // fetch('https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.com&size=16', { method: 'GET', mode: 'no-cors' })
    // .then(response => {
    //     console.log(response)
    //     return response.blob();
    //   })
    //   .then(faviconBlob => {
    //     const faviconUrl = URL.createObjectURL(faviconBlob);
    //     const faviconImage = new Image();
    //     faviconImage.src = faviconUrl;
    //     console.log(faviconUrl)
    
    //     document.body.appendChild(faviconImage);
    //   })

    loadLists()
    listOnClick()

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