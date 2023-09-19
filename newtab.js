// function order

// formatNumber()
// readImageAsDataUrl()
// loadLists()
// addItemToList()
// addItemInputListeners()
// listOnClick()


let isDragging = false
let wasDragging = false

let canDrag = false

let currentId = 0;
let currentItemId = 0;
let modalAddItem = null

// modal for edit and delete (appear when right click)
let modalOptions = document.getElementById('modal-options');

// modal add/edit listeners
let nameInput = document.getElementById('name-input')
let urlInput = document.getElementById('url-input')
let backgroundColorInput = document.getElementById('backgroundColor-input')
let logoInput = document.getElementById('logoImage')
let selectedLogo = document.getElementById('selected-logo')
let fileInput = document.getElementById('fileInput')
let selectedImage = document.getElementById('selected-image')
let showLogoInput = document.getElementById('show-logo')
let previewItem = document.getElementById('preview-item')
let previewImage = document.getElementById('preview-image')
let previewFavicon = document.getElementById('preview-favicon')
let previewItemName = document.getElementById('preview-item-name')
let expandButton = document.getElementById('preview-expand')
let expandIcon = document.getElementById('expand-icon')
let submitButton = document.getElementById('submit')
let closeButton = document.getElementById('close')
let backgroundModal = document.getElementById('background-modal')
let modal = document.getElementById('add-modal')

// carousel container
let container = document.getElementById('carousel-container')
let modalContainer = document.getElementById('add-modal-container')

// add list modal listeners
let nameListInput = document.getElementById('name-list-input')
let submitListButton = document.querySelector('#add-list-modal-container #submit-list')
let closeListButton = document.getElementById('#add-list-modal-container #close')
let addListModal = document.getElementById('add-list-modal-container')

// components
let components = document.querySelectorAll('.carousel-wrapper')

// others elements
let clock = document.getElementById('clock')
let addList = document.getElementById('add-list')

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
          "logo":null,
          "url":"https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/",
          "backgroundColor":"#49f1fd",
          "backgroundImage":null,
          "showLogo":true,
          "expanded": true,
       },
       {
          "id":1,
          "name":"teste1",
          "logo":null,
          "url":"https://www.google.com",
          "backgroundColor":"#c59b9b",
          "backgroundImage":null,
          "showLogo":true,
          "expanded": true,
       },
       {
          "id":2,
          "name":"teste nova lista",
          "logo":null,
          "url":"https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/",
          "backgroundColor":"#000000",
          "backgroundImage":null,
          "showLogo":true,
          "expanded": true,
       },
       {
          "id":3,
          "name":"teste",
          "logo":null,
          "url":"https://www.jw.org/pt/noticias/noticias-testemunhas-jeova/",
          "backgroundColor":"#fd2121",
          "backgroundImage":null,
          "showLogo":true,
          "expanded": true,
       }
    ]
 }]


 if (!localStorage.getItem('lists')) {
    localStorage.setItem('lists', JSON.stringify(example))
}
var lists = JSON.parse(localStorage.getItem('lists'))

function modalOptionClickHandler(event) {
    event.preventDefault();
    if (!modalOptions) modalOptions = document.getElementById('modal-options');
    const optionsContainer = modalOptions.querySelector('ul')
    const component = event.currentTarget.closest('.carousel-wrapper');
    const itemElement = event.currentTarget.closest('li');

    const id = Number(component.id.replace('list-', ''));
    const itemId = Number(itemElement.id.replace('item-', ''));
    currentId = id
    currentItemId = itemId

    const item = lists.find(i => i.id === currentId)?.items?.find(i => i.id === currentItemId)

    const x = event.clientX;
    const y = event.clientY;
    
    modalOptions.style.display = 'block';
    modalOptions.style.left = x + 'px';
    modalOptions.style.top = y + 'px';

    // ADICIONAR ITEM E LSIT ID
    modalOptions.removeEventListener('click', (event) => optionClickHandler(event, item));
    modalOptions.addEventListener('click', (event) => optionClickHandler(event, item));
}

function editItemInputListeners(item) {
    if (!nameInput || !previewImage) {
        nameInput = document.getElementById('name-input')
        urlInput = document.getElementById('url-input')
        backgroundColorInput = document.getElementById('backgroundColor-input')
        logoInput = document.getElementById('logoImage')
        selectedLogo = document.getElementById('selected-logo')
        fileInput = document.getElementById('fileInput')
        selectedImage = document.getElementById('selected-image')
        showLogoInput = document.getElementById('show-logo')        
        previewItem = document.getElementById('preview-item')
        previewImage = document.getElementById('preview-image')
        previewFavicon = document.getElementById('preview-favicon')
        previewItemName = document.getElementById('preview-item-name')
        expandButton = document.getElementById('preview-expand')
        expandIcon = document.getElementById('expand-icon')
    }

    nameInput.value = item?.name
    urlInput.value = item?.url
    logoInput.value = ''
    selectedLogo.src = ''
    fileInput.value = ''
    selectedImage.src = ''
    previewImage.src = item?.backgroundImage
    previewFavicon.src = item?.logo
    previewImage.style.backgroundColor = item?.backgroundColor
    backgroundColorInput.value = item?.backgroundColor || '#000000'
    showLogoInput.checked = item?.showLogo

    if (!submitButton) submitButton = document.getElementById('submit')
    if (!closeButton) closeButton = document.getElementById('close')
    if (!modalContainer) modalContainer = document.getElementById('add-modal-container')
    if (!modal) modal = document.getElementById('add-modal')
    if (!backgroundModal) backgroundModal = document.getElementById('background-modal')

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

    const handleSubmitButton = (event) => {
        debugger;
        console.log('teste')
        event.preventDefault()
        const name = nameInput?.value
        const url = urlInput?.value
        const bgColor = backgroundColorInput?.value
        const bgImage = fileInput?.files[0];
        const logoImage = logoInput?.files[0];
        const showLogo = showLogoInput?.checked;

        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
        if (name && url && urlRegex.test(url)) {
            // create - add to list and load updated list
            // use currentId to update list saved on localhost
            const listItem = lists?.find(l => l.id === currentId)
            if (listItem) {
                const items = listItem?.items
                const id = Number(items[items?.length - 1]?.id) + 1
                const newItem = {
                    id: id, 
                    name: name,
                    logo: logoImage,
                    url: url,
                    backgroundColor: bgColor,
                    backgroundImage: null,
                    showLogo: showLogo || false,
                    expaded: true,
                }
                console.log(newItem)
                
                if (bgImage) {
                    var imageDataUrl = null;
                    readImageAsDataUrl(bgImage).then(res => {
                        imageDataUrl = res
                    })
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
                logoInput.value = ''
                selectedLogo.src = ''
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
    }

    const handleExpandButton = (event) => {
        if (expandIcon.classList.contains('fa-angle-left')) {
            expandButton.setAttribute('title', 'Show preview')
            expandIcon.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.75 16.25C13.6515 16.2505 13.5538 16.2313 13.4628 16.1935C13.3718 16.1557 13.2893 16.1001 13.22 16.03L9.72001 12.53C9.57956 12.3894 9.50067 12.1988 9.50067 12C9.50067 11.8013 9.57956 11.6107 9.72001 11.47L13.22 8.00003C13.361 7.90864 13.5285 7.86722 13.6958 7.88241C13.8631 7.89759 14.0205 7.96851 14.1427 8.08379C14.2649 8.19907 14.3448 8.35203 14.3697 8.51817C14.3946 8.68431 14.363 8.85399 14.28 9.00003L11.28 12L14.28 15C14.4205 15.1407 14.4994 15.3313 14.4994 15.53C14.4994 15.7288 14.4205 15.9194 14.28 16.06C14.1353 16.1907 13.9448 16.259 13.75 16.25Z" fill="#000000"/>
            </svg>`
            previewItem.classList.add('hidden')
        } else {
            expandButton.setAttribute('title', 'Hide preview')
            expandIcon.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.25 16.25C10.1493 16.2466 10.0503 16.2227 9.95921 16.1797C9.86807 16.1367 9.78668 16.0756 9.72001 16C9.57956 15.8594 9.50067 15.6688 9.50067 15.47C9.50067 15.2713 9.57956 15.0806 9.72001 14.94L12.72 11.94L9.72001 8.94002C9.66069 8.79601 9.64767 8.63711 9.68277 8.48536C9.71786 8.33361 9.79933 8.19656 9.91586 8.09322C10.0324 7.98988 10.1782 7.92538 10.3331 7.90868C10.4879 7.89198 10.6441 7.92391 10.78 8.00002L14.28 11.5C14.4205 11.6407 14.4994 11.8313 14.4994 12.03C14.4994 12.2288 14.4205 12.4194 14.28 12.56L10.78 16C10.7133 16.0756 10.6319 16.1367 10.5408 16.1797C10.4497 16.2227 10.3507 16.2466 10.25 16.25Z" fill="#000000"/>
            </svg>`
            previewItem.classList.remove('hidden')
        }
    }

    const handleBgColorChange = (event) => {
        previewImage.style.display = 'block'
        previewImage.style.backgroundColor = event.target.value
    }

    const handleNameChange = (event) => {
        previewItemName.innerText = event.target.value
    }

    const handleLogoChange = (event) => {
        const input = event.target;
        const selectedFile = input.files[0];
        if (selectedFile) {
            const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;

            if (!allowedExtensions.exec(selectedFile.name)) {
                alert('Please select a valid PNG, JPG, or JPEG file.');
                input.value = '';
                return;
            }

            const reader = new FileReader();

            reader.onload = function(event) {
                selectedLogo.src = event.target.result;

                previewFavicon.style.display = 'block'
                previewFavicon.src = event.target.result;
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    const handleFileChange = (event) => {
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
    }

    submitButton.removeEventListener('click', handleSubmitButton)
    expandButton.removeEventListener('click', handleExpandButton)
    backgroundColorInput.removeEventListener('change', handleBgColorChange)
    nameInput.removeEventListener('change', handleNameChange)
    logoInput.removeEventListener('change', handleLogoChange)
    fileInput.removeEventListener('change', handleFileChange)

    expandButton.addEventListener('click', handleExpandButton)
    backgroundColorInput.addEventListener('change', handleBgColorChange)
    nameInput.addEventListener('change', handleNameChange)
    logoInput.addEventListener('change', handleLogoChange)
    fileInput.addEventListener('change', handleFileChange)
    submitButton.addEventListener('click', handleSubmitButton)
}

function openEditModal(item) {
    editItemInputListeners(item);
    if (!modalAddItem) modalAddItem = document.getElementById('add-modal-container')
    modalAddItem.classList.remove('hidden');
}

function performAction (option, item) {
    // Edit -> open creation modal with pre filled data
    // Delete acitons -> open confirmation modal and then delete
    if (option === 'Edit') {
        openEditModal(item)
    }

}

function optionClickHandler(event, item) {
    const option = event.target.textContent
    if (rightClickOptions.find(x => x === option)) {
        performAction(option, item);
    }
}

function delButtonClickHandler(event) {
    const closestComponent = event.target.closest('.carousel-wrapper')
    const id = Number(closestComponent.id.replace('list-', ''))
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
    const listId = Number(component?.id?.split('-')[1])
    if (component) {
        const expandListButton = component.querySelector('.button-expand')
        if (expandListButton?.classList.contains('down')) {
            const index = lists?.findIndex(i => i.id === listId)
            lists[index].expanded = true
            localStorage.setItem('lists', JSON.stringify(lists))

            expandListButton?.classList.remove('down')
            expandListButton?.classList.add('up')
            expandListButton.innerHTML = `
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 15L12 9L18 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `
            content.style.height = '13rem'
        } else {
            const index = lists?.findIndex(i => i.id === listId)
            lists[index].expanded = false
            localStorage.setItem('lists', JSON.stringify(lists))

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
    if (!container) container = document.getElementById('carousel-container')
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

        const headerIcon = list.expanded === false ? 
            `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>` : 
            `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 15L12 9L18 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`
            
        header.innerHTML = `
            <div class="title-container">
                <button class="button-expand ${list.expanded === false ? 'down' : 'up'}">
                    ${headerIcon}
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
        ul.style.height = list.expanded === false ? '0rem' : '13rem'

        list.items.forEach(i => {
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
    if (!container) container = document.getElementById('carousel-container')
    if (!modalContainer) modalContainer = document.getElementById('add-modal-container')
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
    if (!nameListInput || !addListModal) {
        nameListInput = document.getElementById('name-list-input')
        submitListButton = document.querySelector('#add-list-modal-container #submit-list')
        closeListButton = document.querySelector('#add-list-modal-container #close')    
        addListModal = document.getElementById('add-list-modal-container')
    }

    addListModal.addEventListener('click', (event) => {
        if (event.target?.id === 'background-list-modal') {
            addListModal.classList.add('hidden')
        }
    })

    submitListButton.addEventListener('click', (event) => {
        event.preventDefault()
        const name = nameListInput?.value
        if (!name || !name.trim()) {
            alert('You cannot create a list without name')
            return
        }

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
        addListModal.classList.add('hidden')
        nameListInput.value = ''
        loadLists() // add list to screen instead of reloading all
        listOnClick()
    })
}

function addItemInputListeners() {
    if (!nameInput || !previewItem) {
        nameInput = document.getElementById('name-input')
        urlInput = document.getElementById('url-input')
        backgroundColorInput = document.getElementById('backgroundColor-input')
        logoInput = document.getElementById('logoImage')
        selectedLogo = document.getElementById('selected-logo')
        fileInput = document.getElementById('fileInput')
        selectedImage = document.getElementById('selected-image')
        showLogoInput = document.getElementById('show-logo')
        
        previewItem = document.getElementById('preview-item')
        previewImage = document.getElementById('preview-image')
        previewFavicon = document.getElementById('preview-favicon')
        previewItemName = document.getElementById('preview-item-name')
        expandButton = document.getElementById('preview-expand')
    }

    nameInput.value = ''
    urlInput.value = ''
    logoInput.value = ''
    fileInput.value = ''
    selectedLogo.src = ''
    selectedImage.src = ''
    previewImage.src = ''
    previewFavicon.src = ''
    previewImage.style.backgroundColor = ''
    backgroundColorInput.value = '#000000'
    showLogoInput.checked = true

    if (!submitButton) submitButton = document.getElementById('submit')
    if (!closeButton) closeButton = document.getElementById('close')
    if (!modalContainer || !modalContainer || !modal) {
        backgroundModal = document.getElementById('background-modal')
        modalContainer = document.getElementById('add-modal-container')
        modal = document.getElementById('add-modal')
    }

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

    const handleSubmitButton = (event) => {
        event.preventDefault()
        const name = nameInput?.value
        const url = urlInput?.value
        const bgColor = backgroundColorInput?.value
        const bgImage = fileInput?.files[0];
        const logoImage = logoInput?.files[0];
        const showLogo = showLogoInput?.checked;

        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
        if (name && url && urlRegex.test(url)) {
            // create - add to list and load updated list
            // use currentId to update list saved on localhost
            const listItem = lists?.find(l => l.id === currentId)
            if (listItem) {
                const items = listItem?.items
                const id = items?.length + 1
                const newItem = {
                    id: id, 
                    name: name,
                    logo: null,
                    url: url,
                    backgroundColor: bgColor,
                    backgroundImage: null,
                    showLogo: showLogo || false,
                    expaded: true,
                }
                
                if (bgImage) {
                    var imageDataUrl = null;
                    readImageAsDataUrl(bgImage).then(res => {
                        imageDataUrl = res
                    })
                    newItem.backgroundImage 
= imageDataUrl
                }
                if (logoImage) {
                    debugger;
                    var imageDataUrl = null;
                    readImageAsDataUrl(logoImage).then(res => {
                        imageDataUrl = res
                    })
                    newItem.logo 
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
                logoInput.value = ''
                selectedLogo.src = ''
                selectedImage.src = ''
                previewImage.src = ''
                previewFavicon.src = ''
                previewImage.style.backgroundColor = ''
                backgroundColorInput.value = '#000000'
                showLogoInput.checked = true
            }
        } else {
            window.alert('Name and/or URL are not fulfilled')    
        }
    }

    const handleExpandButton = (event) => {
        if (expandButton.classList.contains('expanded')) {
            expandButton.setAttribute('title', 'Show preview')
            expandButton.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.75 16.25C13.6515 16.2505 13.5538 16.2313 13.4628 16.1935C13.3718 16.1557 13.2893 16.1001 13.22 16.03L9.72001 12.53C9.57956 12.3894 9.50067 12.1988 9.50067 12C9.50067 11.8013 9.57956 11.6107 9.72001 11.47L13.22 8.00003C13.361 7.90864 13.5285 7.86722 13.6958 7.88241C13.8631 7.89759 14.0205 7.96851 14.1427 8.08379C14.2649 8.19907 14.3448 8.35203 14.3697 8.51817C14.3946 8.68431 14.363 8.85399 14.28 9.00003L11.28 12L14.28 15C14.4205 15.1407 14.4994 15.3313 14.4994 15.53C14.4994 15.7288 14.4205 15.9194 14.28 16.06C14.1353 16.1907 13.9448 16.259 13.75 16.25Z" fill="#000000"/>
            </svg>`
            expandButton.classList.remove('expanded')
            previewItem.classList.add('hidden')
        } else {
            expandButton.setAttribute('title', 'Hide preview')
            expandButton.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.25 16.25C10.1493 16.2466 10.0503 16.2227 9.95921 16.1797C9.86807 16.1367 9.78668 16.0756 9.72001 16C9.57956 15.8594 9.50067 15.6688 9.50067 15.47C9.50067 15.2713 9.57956 15.0806 9.72001 14.94L12.72 11.94L9.72001 8.94002C9.66069 8.79601 9.64767 8.63711 9.68277 8.48536C9.71786 8.33361 9.79933 8.19656 9.91586 8.09322C10.0324 7.98988 10.1782 7.92538 10.3331 7.90868C10.4879 7.89198 10.6441 7.92391 10.78 8.00002L14.28 11.5C14.4205 11.6407 14.4994 11.8313 14.4994 12.03C14.4994 12.2288 14.4205 12.4194 14.28 12.56L10.78 16C10.7133 16.0756 10.6319 16.1367 10.5408 16.1797C10.4497 16.2227 10.3507 16.2466 10.25 16.25Z" fill="#000000"/>
            </svg>`
            expandButton.classList.add('expanded')
            previewItem.classList.remove('hidden')
        }
    }

    const handleBgColorChange = (event) => {
        previewImage.style.display = 'block'
        previewImage.style.backgroundColor = event.target.value
    }

    const handleNameChange = (event) => {
        previewItemName.innerText = event.target.value
    }

    const handleLogoChange = (event) => {
        const input = event.target;
        const selectedFile = input.files[0];
        if (selectedFile) {
            const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;

            if (!allowedExtensions.exec(selectedFile.name)) {
                alert('Please select a valid PNG, JPG, or JPEG file.');
                input.value = '';
                return;
            }

            const reader = new FileReader();

            reader.onload = function(event) {
                selectedLogo.src = event.target.result;

                previewFavicon.style.display = 'block'
                previewFavicon.src = event.target.result;
            };

            // reader.readAsText(selectedFile);
            reader.readAsDataURL(selectedFile);
        }
    }

    const handleFileChange = (event) => {
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
    }

    submitButton.removeEventListener('click', handleSubmitButton)
    expandButton.removeEventListener('click', handleExpandButton)
    backgroundColorInput.removeEventListener('change', handleBgColorChange)
    nameInput.removeEventListener('change', handleNameChange)
    logoInput.removeEventListener('change', handleLogoChange)
    fileInput.removeEventListener('change', handleFileChange)

    expandButton.addEventListener('click', handleExpandButton)
    backgroundColorInput.addEventListener('change', handleBgColorChange)
    nameInput.addEventListener('change', handleNameChange)
    logoInput.addEventListener('change', handleLogoChange)
    fileInput.addEventListener('change', handleFileChange)
    submitButton.addEventListener('click', handleSubmitButton)
}

function listOnClick() {
    components = document.querySelectorAll('.carousel-wrapper')
    if (!modalContainer) modalContainer = document.getElementById('add-modal-container')

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
    if (!clock) clock = document.getElementById('clock')
    if (!addList) addList = document.getElementById('add-list')
    if (!modalOptions) modalOptions = document.getElementById('modal-options')
    addListInputListeners()

    addList.addEventListener('click', () => {
        if (!addListModal) addListModal = document.getElementById('add-list-modal-container')
        addListModal.classList.remove('hidden')
    })

    window.addEventListener('click', (event) => {
        if (event.target === modalOptions) return;
        modalOptions.style.display = 'none';
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