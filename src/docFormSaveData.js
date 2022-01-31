var maincount = 1
var secCount = 1
var quescount = 1
var ttlcount = 1
var secId = ''
var mainParentId = ""
var mainParentClass = ""
var sectionId = ''
var parentArr = []
var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

var body = document.querySelector('.prevbody')
//var SecTitleAll = document.querySelectorAll('.SecTitle') //|| document.querySelector('.SecTitle')
var SecDisAll = document.getElementsByClassName('.SecDis')



console.log(`existingEntries`, existingEntries)
function formDiv() {
  var FormDivls = document.createElement('div')
  var FormDivNode = document.createElement('div')
  var formHrNode = document.createElement('div')
  FormDivls.setAttribute('id', `FormDivls${maincount}`)
  FormDivNode.setAttribute('id', `formDiv${maincount}`)
  FormDivNode.setAttribute('class', `rounded-3 mainParentFormDiv formDiv${maincount}`)
  formHrNode.setAttribute('style', `border-bottom: 1px solid lightgrey ;`)
  FormDivNode.addEventListener('click', selectedParent)
  return { FormDivls, FormDivNode, formHrNode }
}
function selectedParent(e) {
  secId = e.currentTarget.id
  sectionId = e.currentTarget.id
  mainParentId = secId
  mainParentClass = sectionId

  secId = ''
}


for (let i = 0; i < existingEntries.length; i++) {
  console.log(`existingEntries[i].title ${i}`, existingEntries[i].title)
  prevTitleDiscriptionNodes(existingEntries[i].title, existingEntries[i].discription)
  console.log(`SecDisAll`, SecDisAll)

  var SecTitleAll = document.querySelector(`#SecTitleId${i + 1}`)
  var SecDisAll = document.querySelector(`#SecDisId${i + 1}`)

  SecTitleAll.innerText = existingEntries[i].title + " " + existingEntries[i].CurrentSecId

  SecDisAll.innerText = existingEntries[i].discription
}

function prevTitleDiscriptionNodes(ttlArr, disArr) {
  var divNode = document.createElement('div')
  divNode.setAttribute('class', 'rounded-3 addSecDiv')

  var frmDiv = formDiv()
  if (frmDiv) body.appendChild(frmDiv.FormDivls)
  if (frmDiv.FormDivls) frmDiv.FormDivls.appendChild(frmDiv.FormDivNode)
  if (frmDiv) body.appendChild(frmDiv.formHrNode)
  if (divNode) frmDiv.FormDivNode.appendChild(divNode)
  var SecHeading = document.createElement('h1')
  SecHeading.setAttribute('class', `SecTitle`)
  SecHeading.setAttribute('id', `SecTitleId${secCount}`)
  SecHeading.setAttribute('placeholder', 'Untititled Title')
  var SecDis = document.createElement('p')
  SecDis.setAttribute('class', `SecDis`)
  SecDis.setAttribute('id', `SecDisId${secCount}`)
  SecDis.setAttribute('placeholder', 'add Discription')
  if (SecHeading) divNode.appendChild(SecHeading)
  if (SecDis) divNode.appendChild(SecDis)
  fixTextArea()
  secCount++
  maincount++
}


function fixTextArea() {
  // Add active class to the current button (highlight it)
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) / 1.1 + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';

    }, false);
  }
}



