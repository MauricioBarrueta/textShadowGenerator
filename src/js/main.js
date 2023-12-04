const horizontalShadow = document.getElementById('hRange'), verticalShadow = document.getElementById('vRange'),
    blurRange = document.getElementById('blurRange'), shadowOpacity = document.getElementById('opaRange'),
    textColor = document.getElementById('text-color'), shadowColor = document.getElementById('shadow-color'),
    blurRadius = document.getElementById('blurRadius'), opacityRange = document.getElementById('opacity')

window.onload = () => {
    resetInputValues()
    generateTextShadow()
}    

/* Se llama al evento 'input' cada que se manipulan los rangos, y se ejecuta la función */
const propertiesInput = document.querySelectorAll('.shadow-properties input')
propertiesInput.forEach(input => {
    input.addEventListener('input', () => { generateTextShadow() })
});

const textShadowCode = document.getElementById('CSS-code'), stylePreview = document.querySelector('.shadow-preview span')
let code = ''
const generateCodeBtn = document.getElementById('generate-code'), codeLines = document.querySelector('.lines'), 
    textShadowResult = document.querySelector('.shadow-res span')

/* Agrega el estilo a la lista */
generateCodeBtn.addEventListener('click', () => {
    const line = document.createElement('p')
    line.classList.add('line')
    codeLines.appendChild(line)
    codeLines.childElementCount === 1 ? line.textContent = `${code}` : line.textContent = `, ${code}`

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('btn'), deleteButton.classList.add('btn-danger'), deleteButton.classList.add('remove-line')
    line.append(deleteButton)  

    /* Borra el elemento padre del botón que se haya seleccionado */ 
    deleteButton.onclick = () => {
        deleteButton.parentNode.remove()  
        getTextContentToFormat()
    }
    getTextContentToFormat()
    textShadowResult.style.color = `${textColor.value}`
})

/* Obtiene el contenido de todos los elementos hijos y los pasa al textarea */
const getTextContentToFormat = () => {
    const getLines = document.querySelectorAll('.lines')
    getLines.forEach(element => {        
        let finalCode = element.textContent[0] == ',' ? element.textContent.slice(1) : element.textContent
        textShadowCode.value = `text-shadow: ${finalCode};`
        textShadowResult.style.textShadow = finalCode
    });
}

/* Genera la sintaxis del código de acuerdo a los valores junto con la vista previa del estilo actual y el resultado final */
const generateTextShadow = () => {
    code = `${horizontalShadow.value}px ${verticalShadow.value}px ${blurRadius.value}px ${hexColorToRgba(shadowColor.value, shadowOpacity.value)}`
    stylePreview.style.color = `${textColor.value}`
    textShadowResult.style.color = `${textColor.value}`
    stylePreview.style.textShadow = code
}

/* Transforma el color hexadecimal al modelo RGB */
const hexColorToRgba = (color, opacity) => {
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const resetInputValues = () => {
    propertiesInput.forEach(element => { element.value = 3 });
    blurRadius.value = blurRange.value = shadowOpacity.value = opacityRange.value = 1    
    textColor.value = '#FFFFFF', shadowColor.value = '#000000'
    textShadowCode.value = ''
}

const copyCodeBtn = document.querySelector('.copy-btn')
copyCodeBtn.addEventListener('click', () => {
    textShadowCode.select()
    textShadowCode.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textShadowCode.value)
})