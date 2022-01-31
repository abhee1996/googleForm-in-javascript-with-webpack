


export function createButtonNode(clas,id){
    var btnNode = document.createElement('button')
    btnNode.setAttribute('class', clas)
    btnNode.setAttribute('id', id)
    return btnNode
}