// Referênciando elementos da DOM

var submitButtom = document.querySelector("#app form button")
var zipCodeField = document.querySelector("#app form input")
var content = document.querySelector("#app main")

submitButtom.addEventListener("click", run)

function run(event) {
    event.preventDefault()

    var zipCode = zipCodeField.value
    
    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.trim()
    zipCode = zipCode.replace('.', '')

    axios
        .get('https://viacep.com.br/ws/' + zipCode + '/json/')
        .then(function (response){
            if (response.data.erro) {
                throw new Error('CEP inválido')
            }
            content.innerHTML = ''
            createLine(response.data.localidade + '/' + response.data.uf)
        })
        .catch(function (error){
            console.log(error)
            content.innerHTML = ''
            createLine('CEP inválido')
        })
}

function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}
