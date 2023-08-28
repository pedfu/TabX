// function order

// formatNumber()
// readImageAsDataUrl()
// loadLists()
// addItemToList()
// addItemInputListeners()
// listOnClick()


var isDragging = false
var wasDragging = false

var canDrag = false

var currentId = 0;
var currentItemId = 0;
var modalAddItem = null

const rightClickOptions = [
    'Edit',
    'Delete'
]

const example = [{
    "id":2,
    "name":"teste1",
    "description":"",
    "order":2,
    "items":[
       {
          "id":0,
          "name":"JW",
          "logo":"https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/&size=16",
          "url":"https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/",
          "backgroundColor":"#49f1fd",
          "backgroundImage":null,
          "showLogo":true
       },
       {
          "id":1,
          "name":"teste1",
          "logo":"https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.com&size=16",
          "url":"https://www.google.com",
          "backgroundColor":"#c59b9b",
          "backgroundImage":null,
          "showLogo":true
       },
       {
          "id":2,
          "name":"teste nova lista",
          "logo":"https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/&size=16",
          "url":"https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/",
          "backgroundColor":"#000000",
          "backgroundImage":null,
          "showLogo":true
       },
       {
          "id":3,
          "name":"teste",
          "logo":"https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/&size=16",
          "url":"https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/",
          "backgroundColor":"#fd2121",
          "backgroundImage":null,
          "showLogo":true
       }
    ]
 }]


if (!localStorage.getItem('lists')) {
    localStorage.setItem('lists', JSON.stringify(example))
}
var lists = JSON.parse(localStorage.getItem('lists'))

function modalOptionClickHandler(event) {
    event.preventDefault();
    const modal = document.getElementById('modal-options');
    const optionsContainer = modal.querySelector('ul')
    const component = event.currentTarget.closest('.carousel-wrapper');
    const itemElement = event.currentTarget.closest('li');

    console.log('teste', component, itemElement)
    const id = Number(component.id.replace('list-', ''));
    const itemId = Number(itemElement.id.replace('item-', ''));
    currentId = id
    currentItemId = itemId

    const item = lists.find(i => i.id === currentId)?.items?.find(i => i.id === currentItemId)

    const x = event.clientX;
    const y = event.clientY;
    
    modal.style.display = 'block';
    modal.style.left = x + 'px';
    modal.style.top = y + 'px';

    console.log(item, currentId, currentItemId)

    // ADICIONAR ITEM E LSIT ID
    modal.removeEventListener('click', (event) => optionClickHandler(event, item));
    modal.addEventListener('click', (event) => optionClickHandler(event, item));
}

function editItemInputListeners(item) {
    const nameInput = document.getElementById('name-input')
    const urlInput = document.getElementById('url-input')
    const backgroundColorInput = document.getElementById('backgroundColor-input')
    const fileInput = document.getElementById('fileInput')
    const selectedImage = document.getElementById('selected-image')
    const showLogoInput = document.getElementById('show-logo')
    
    const previewItem = document.getElementById('preview-item')
    const previewImage = document.getElementById('preview-image')
    const previewFavicon = document.getElementById('preview-favicon')
    const previewItemName = document.getElementById('preview-item-name')
    const expandButton = document.getElementById('preview-expand')
    const expandIcon = document.getElementById('expand-icon')

    nameInput.value = item?.name
    urlInput.value = item?.url
    fileInput.value = ''
    selectedImage.src = ''
    previewImage.src = item?.backgroundImage
    previewFavicon.src = item?.logo
    previewImage.style.backgroundColor = item?.backgroundColor
    backgroundColorInput.value = item?.backgroundColor || '#000000'
    showLogoInput.checked = item?.showLogo
    
    const submitButton = document.getElementById('submit')
    const closeButton = document.getElementById('close')

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

    showLogoInput.addEventListener('change', (event) => {
        if (!event.target.checked) {
            previewFavicon.style.display = 'none'
        } else {
            previewFavicon.style.display = 'block'
        }
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
        previewImage.style.display = 'block'
        previewImage.style.backgroundColor = event.target.value
    })

    nameInput.addEventListener('change', (event) => {
        previewItemName.innerText = event.target.value
    })
    
    urlInput.addEventListener('change', (event) => {
        const url = event.target.value
        
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
        if (urlRegex.test(url)) {
            const favicon = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=16`
            previewFavicon.style.display = 'block'
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

                previewImage.style.display = 'block'
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
        const showLogo = showLogoInput?.checked;

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
                    showLogo: showLogo || false,
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
                // listOnClick()

                localStorage.setItem('lists', JSON.stringify(lists))

                modalContainer.classList.add('hidden')
                nameInput.value = ''
                urlInput.value = ''
                fileInput.value = ''
                selectedImage.src = ''
                previewImage.src = ''
                previewFavicon.src = ''
                previewImage.style.backgroundColor = ''
                backgroundColorInput.value = '#000000'
                showLogoInput.checked = true
            }
        } else {
            window.alert('Name and/or URL are not fulfilled')
            console.error('not create')            
        }
    })
}

function openEditModal(item) {
    editItemInputListeners(item);
    if (!modalAddItem) modalAddItem = document.getElementById('add-modal-container')
    modalAddItem.classList.remove('hidden');
}

function performAction (option, item) {
    console.log('action', option, item)
    // Edit -> open creation modal with pre filled data
    // Delete acitons -> open confirmation modal and then delete
    if (option === 'Edit') {
        openEditModal(item)
    }

}

function optionClickHandler(event, item) {
    console.log('click', event, item)
    const option = event.target.textContent
    if (rightClickOptions.find(x => x === option)) {
        performAction(option, item);
    }
}

function delButtonClickHandler(event) {
    const filteredList = lists.filter(x => x?.id !== id).sort((a, b) => a?.id - b?.id)
    // remove from lists
    lists = filteredList
    loadLists()
    listOnClick()
    localStorage.setItem('lists', JSON.stringify(filteredList))
}

function expandButtonClickHandler(event) {
    const component = event.currentTarget.closest('.carousel-wrapper');
    const content = component.querySelector('.carousel-content')
    if (component) {
        const expandListButton = component.querySelector('.button-expand')
        if (expandListButton?.classList.contains('down')) {
            expandListButton?.classList.remove('down')
            expandListButton?.classList.add('up')
            expandListButton.innerHTML = `
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 15L12 9L18 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `
            content.style.height = '13rem'
        } else {
            expandListButton?.classList.remove('up')
            expandListButton?.classList.add('down')
            expandListButton.innerHTML = `
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `
            content.style.height = '0rem'
        }
        const id = Number(component.id.replace('list-', ''));
        
    }
}

function addButtonClickHandler(event) {
    event.preventDefault()
    const component = event.currentTarget.closest('.carousel-wrapper');
    if (component) {
        const id = Number(component.id.replace('list-', ''));
        currentId = id;
        addItemInputListeners();
        if (!modalAddItem) modalAddItem = document.getElementById('add-modal-container')
        modalAddItem.classList.remove('hidden');
    }
}

function nextButtonClickHandler(event) {
    event.preventDefault();
    const component = event.currentTarget.closest('.carousel-wrapper');
    const content = component.querySelector('.carousel-content');
    const halfClientWidth = content.clientWidth / 2;
    const currentScrollLeft = content.scrollLeft;
    const newScrollLeft = currentScrollLeft + halfClientWidth;

    content.scroll({
        left: newScrollLeft,
        behavior: 'smooth'
    });
}

function prevButtonClickHandler(event) {
    event.preventDefault()
    const component = event.currentTarget.closest('.carousel-wrapper');
    const content = component.querySelector('.carousel-content');
    const halfClientWidth = content.clientWidth / 2;
    const currentScrollLeft = content.scrollLeft;
    const newScrollLeft = currentScrollLeft - halfClientWidth;

    content.scroll({
        left: newScrollLeft,
        behavior: 'smooth'
    })
}

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
    const sortedList = lists.sort((a, b) => a.order - b.order)
    for(var i=0; i<sortedList.length; i++) {
        const list = sortedList[i]
        const wrapper = document.createElement('div')
        wrapper.classList.add('items')
        wrapper.classList.add('carousel-wrapper')
        wrapper.id = 'list-' + list.id

        // <i class="fa-solid fa-angle-down"></i>
        const header = document.createElement('div')
        header.classList.add('carousel-header')
        header.innerHTML = `
            <div class="title-container">
                <button class="button-expand up">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 15L12 9L18 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <p class="list-title">${list.name}</p>
            </div>
            <div class="carousel-controls">
                <button class="del">
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="add">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="prev disabled">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 17L13 12L18 7M11 17L6 12L11 7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="next">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>`

        wrapper.append(header)
        
        const ul = document.createElement('ul')
        ul.classList.add('carousel-content')

        list.items.forEach(i => {
            console.log(i)
            const li = document.createElement('li')
            li.id = `item-${i?.id}`
            li.classList.add('carousel-item')
            li.style.background = `url("${i?.backgroundImage}") center / cover no-repeat, ${i?.backgroundColor}`

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
            if (!i?.logo || !i?.showLogo) {
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

            li.addEventListener('contextmenu', modalOptionClickHandler);

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
    li.style.background = `url("${newItem?.backgroundImage}") center / cover no-repeat, ${newItem?.backgroundColor}`

    const img = document.createElement('img')
    img.setAttribute('dragabble', 'false')
    img.classList.add('favicon')

    if (!newItem?.backgroundImage || 
        (newItem?.backgroundImage !== null && 
            typeof newItem?.backgroundImage === 'object' && 
            Object.keys(newItem?.backgroundImage).length === 0)
    ) {
        img.setAttribute('src', newItem?.logo)
    }
    if (!newItem?.logo || !newItem?.showLogo) {
        img.classList.add('hidden')
    }

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

    li.addEventListener('contextmenu', modalOptionClickHandler);

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

function addListInputListeners() {
    const nameInput = document.getElementById('name-list-input')
    const submitButton = document.querySelector('#add-list-modal-container #submit')
    const closeButton = document.getElementById('#add-list-modal-container #close')

    const backgroundModal = document.getElementById('add-list-modal-container')

    backgroundModal.addEventListener('click', (event) => {
        if (event.target?.id === 'background-list-modal') {
            backgroundModal.classList.add('hidden')
        }
    })

    submitButton.addEventListener('click', (event) => {
        event.preventDefault()
        const name = nameInput?.value

        const sortedList = lists.sort((a, b) => a.id - b.id)
        var id = 1;
        if (sortedList.length > 0) {
            id = sortedList[sortedList.length - 1]?.id
        }
        
        const newItem = {
            id: id + 1,
            name: name,
            description: '',
            order: id + 1,
            items: []
        }

        lists = [...sortedList, newItem]
        localStorage.setItem('lists', JSON.stringify([...sortedList, newItem]))
        backgroundModal.classList.add('hidden')
        nameInput.value = ''
        loadLists() // add list to screen instead of reloading all
        listOnClick()
    })
}

function addItemInputListeners() {
    const nameInput = document.getElementById('name-input')
    const urlInput = document.getElementById('url-input')
    const backgroundColorInput = document.getElementById('backgroundColor-input')
    const fileInput = document.getElementById('fileInput')
    const selectedImage = document.getElementById('selected-image')
    const showLogoInput = document.getElementById('show-logo')
    
    const previewItem = document.getElementById('preview-item')
    const previewImage = document.getElementById('preview-image')
    const previewFavicon = document.getElementById('preview-favicon')
    const previewItemName = document.getElementById('preview-item-name')
    const expandButton = document.getElementById('preview-expand')
    const expandIcon = document.getElementById('expand-icon')

    nameInput.value = ''
    urlInput.value = ''
    fileInput.value = ''
    selectedImage.src = ''
    previewImage.src = ''
    previewFavicon.src = ''
    previewImage.style.backgroundColor = ''
    backgroundColorInput.value = '#000000'
    showLogoInput.checked = true
    
    const submitButton = document.getElementById('submit')
    const closeButton = document.getElementById('close')

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

    showLogoInput.addEventListener('change', (event) => {
        if (!event.target.checked) {
            previewFavicon.style.display = 'none'
        } else {
            previewFavicon.style.display = 'block'
        }
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
        previewImage.style.display = 'block'
        previewImage.style.backgroundColor = event.target.value
    })

    nameInput.addEventListener('change', (event) => {
        previewItemName.innerText = event.target.value
    })
    
    urlInput.addEventListener('change', (event) => {
        const url = event.target.value
        
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
        if (urlRegex.test(url)) {
            const favicon = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=16`
            previewFavicon.style.display = 'block'
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

                previewImage.style.display = 'block'
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
        const showLogo = showLogoInput?.checked;

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
                    showLogo: showLogo || false,
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
                // listOnClick()

                localStorage.setItem('lists', JSON.stringify(lists))

                modalContainer.classList.add('hidden')
                nameInput.value = ''
                urlInput.value = ''
                fileInput.value = ''
                selectedImage.src = ''
                previewImage.src = ''
                previewFavicon.src = ''
                previewImage.style.backgroundColor = ''
                backgroundColorInput.value = '#000000'
                showLogoInput.checked = true
            }
        } else {
            window.alert('Name and/or URL are not fulfilled')
            console.error('not create')            
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

        const expandListButton = component.querySelector('.button-expand')
        const nextButton = component.querySelector('.next')
        const prevButton = component.querySelector('.prev')
        const addButton = component.querySelector('.add')
        const delButton = component.querySelector('.del')

        expandListButton?.removeEventListener('click', expandButtonClickHandler);
        delButton?.removeEventListener('click', delButtonClickHandler);
        addButton?.removeEventListener('click', addButtonClickHandler);
        nextButton?.removeEventListener('click', nextButtonClickHandler);
        prevButton?.removeEventListener('click', prevButtonClickHandler);

        expandListButton?.addEventListener('click', expandButtonClickHandler);
        delButton?.addEventListener('click', delButtonClickHandler);
        addButton?.addEventListener('click', addButtonClickHandler);
        nextButton?.addEventListener('click', nextButtonClickHandler);
        prevButton?.addEventListener('click', prevButtonClickHandler);

        if (maxScrollWidth !== 0) {
            component.classList.add('has-controls')
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

        content.removeEventListener('mousemove', onMouseMove);
        content.removeEventListener('mousedown', onMouseDown);
        content.removeEventListener('scroll', onScroll);
        content.removeEventListener('mouseup', onMouseUp);
        content.removeEventListener('mouseleave', onMouseUp);

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
    const addList = document.getElementById('add-list')
    const optionsModal = document.getElementById('modal-options')
    addListInputListeners()

    addList.addEventListener('click', () => {
        const addListModal = document.getElementById('add-list-modal-container')
        addListModal.classList.remove('hidden')
    })

    window.addEventListener('click', (event) => {
        if (event.target === optionsModal) return;
        optionsModal.style.display = 'none';
    })

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