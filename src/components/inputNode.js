
export function inputNode(cls, id ,type,placeholder){
    var inputNode = document.createElement('input')
    inputNode.setAttribute('type', type)
    inputNode.setAttribute('class', cls)
    inputNode.setAttribute('id', id)
    inputNode.setAttribute('placeholder', placeholder)
    return inputNode
}