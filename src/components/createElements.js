export function createAnchorNode(cls,id,href) { 
    var anchorNode = document.createElement('a')
    anchorNode.setAttribute('class', cls)
    anchorNode.setAttribute('href', href)
    anchorNode.setAttribute('id', id)
    return anchorNode
}
export function createDivNode(cls,id,parent) { 
    var divNode = document.createElement('div')
    divNode?.setAttribute('class', cls)
    divNode?.setAttribute('id', id)
    parent?.appendChild(divNode)
    return divNode
}

export function createDivNodeClass(cls,parent) { 
    var divNode = document.createElement('div')
    divNode?.setAttribute('class', cls)
    parent?.appendChild(divNode)
    return divNode
}