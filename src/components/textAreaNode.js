
export function textAreaNode(cls,id,placeholder){////textAreaNode(cls,id,placeholder)
    var txtareaNode = document.createElement('textarea')
    txtareaNode.setAttribute('class', cls)
    txtareaNode.setAttribute('id', id)
    txtareaNode.setAttribute('placeholder', placeholder)
    return txtareaNode
}