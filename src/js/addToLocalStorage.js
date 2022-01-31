import {
  mainParentId,
  //parentArr, 
  maincount,
  secCount
} from '@/createForm'
import {
  my_ls_name, existingEntries,
  parentArr,
  my_mainCount,
  matchIdxEntries,
  my_secCount, my_optCount, my_quesCount
} from '@/state'
import { mainQuestionId, divOptNodeID, getquestionID, getquestionOptionID, quescount, Optcount, emptyQuestion,emptyQuestionOptions } from '@/js/Question'

var currEntries = JSON.parse(localStorage.getItem("allEntries"))

// console.log(`existingEntries in lc file`, currEntries.length)
var matchQIndex;
var matchOptionIndex;

export var matchIndex = currEntries.length //0 //|| parentArr.length

// console.log(`matchIndex`, matchIndex)
export function saveAllWork() {
  localArr()
  addToLocalStorage(parentArr)
}

export var initialState = {
  CurrentSecId: mainParentId,
  title: '',
  discription: '',
  questions: [
  ]
}


export function localArr() {
  var initialstate = {
    CurrentSecId: mainParentId,
    title: '',
    discription: '',
    questions: [
    ]
  }
  var quesState = {
    qId: mainQuestionId,
    //qId: getquestionID,
    question: '',
    Qtype: '',
    options: [
    ]
  }
  var optionsState = {
    optId: divOptNodeID,
    option: '',
    correct: false
  }

  var getCurrSec = document.getElementById(mainParentId)
  var child = getCurrSec?.children[0]; //get title and discription
  var subChild = child?.children[0]?.value //|| child?.childNodes[0]?.value// get Title
  var subChild1 = child?.children[1]?.value //|| child?.childNodes[1]?.value //get discription
  var child2 = getCurrSec?.children[1];

  // var subChild2OfId = document.getElementById(getquestionID)
  var getCurrentQues = document.getElementById(mainQuestionId)
  // var subChild2 = getCurrentQues?.value || ''
  var quesfstChild = getCurrentQues.children[0]
  var quesfstChild2 = quesfstChild.children[0]
  var subChild2 = quesfstChild2?.value || ''
  // console.log(`getCurrentQues ,subChild2`, getCurrentQues, subChild2)
  var child3 = child2?.children[2]

  // var getsubChild3ById = document.getElementById(getquestionOptionID)  //get question options
  // var subChild3 = getsubChild3ById?.value
  var getCurrentOption = document.getElementById(divOptNodeID)  //get question options
  var getgrandChild1 = getCurrentOption?.children[1]
  var subChild3 = getgrandChild1?.value
  var i;
  var j;
  var k;
  function findSecArrIdx(each, index) {
    if(each.CurrentSecId === mainParentId){
         i=index
         return true//[index,true]
    
    }
  }
  function findQuesArrIdx(each, index) {
    if(each.qId === mainQuestionId){
         j=index
        return true//[index,true]

    }
  }
  function findOptionArrIdx(each, index) {
    if(each.optId === divOptNodeID){
         k=index
        return true//[index,true]

    }
  }
  // i=parentArr.some(findSecArrIdx)
  // j=parentArr[i]?.questions?.some(findQuesArrIdx)
  // k=parentArr[i]?.questions[j]?.options?.some(findOptionArrIdx)
  //if (parentArr.filter(each => { return each.CurrentSecId === mainParentId; }).length > 0) {
  //if (parentArr.filter(findSecArrIdx).length > 0) {
  if (parentArr.some(findSecArrIdx)) {
    //update section + add questions
    for (let i = 0; i < parentArr.length; i++) {
      console.log("parentArr[i]:",parentArr[i])
      if (parentArr[i]?.CurrentSecId === mainParentId) {
        parentArr[i].title = subChild
        parentArr[i].discription = subChild1
        matchQIndex =  parentArr[i]?.questions?.length
        subChild1 = ""
        subChild = ""
        console.log("filter:",parentArr[i].questions.filter(each => { return each.qId === mainQuestionId; }))
        //if (parentArr[i].questions.filter(each => { return each.qId === mainQuestionId; }).length > 0) {
        //if (parentArr[i].questions.filter(findQuesArrIdx).length > 0) {
        if (parentArr[i].questions.some(findQuesArrIdx)) {
          //update question and new or more add options
          for (let j = 0; j < parentArr[i].questions.length; j++) {
            if (parentArr[i].questions[j]?.qId === mainQuestionId) {
              parentArr[i].questions[j].question = subChild2
              parentArr[i].questions[j].Qtype = "MCQs"
              subChild2 = ""
              matchOptionIndex = parentArr[i]?.questions[j]?.options?.length

              //if (parentArr[i].questions[j].options.filter(each => { return each.optId === divOptNodeID; }).length > 0) {
             // if (parentArr[i].questions[j].options.filter(findOptionArrIdx).length > 0) {
              if (parentArr[i].questions[j].options.some(findOptionArrIdx)) {
                //update existing options 
                for (let k = 0; k < parentArr[i].questions[j].options.length; k++) {
                  if (parentArr[i].questions[j].options[k]?.optId === divOptNodeID) {
                    parentArr[i].questions[j].options[k].option = subChild3
                    parentArr[i].questions[j].options[k].correct = false
                    subChild3 = ""
                  }
               }
                emptyQuestion()
                //break;
              }
              else {
                
                //add new options related to same question
                parentArr[i].questions[j].options.push(optionsState)
                for (let t = matchOptionIndex; t < parentArr[i].questions[j].options.length; t++) {
                  if (parentArr[i].questions[j].options[t].optId === divOptNodeID) {
                    parentArr[i].questions[j].options[t].option = subChild3
                    parentArr[i].questions[j].options[t].correct = false
                    subChild3 = ""
                  }
                }
                matchOptionIndex = parentArr[i].questions[j].options.length
                emptyQuestionOptions()
              }
              // }
            }
          }
          //break;
        }
        else {
          // add new question and options* in same section if not exist
          if (mainQuestionId !== "") {
            parentArr[i].questions.push(quesState)
            for (let q = matchQIndex; q < parentArr[i].questions.length; q++) {
              if (parentArr[i].questions[q].qId === mainQuestionId) {
                parentArr[i].questions[q].question = subChild2
                parentArr[i].questions[q].Qtype = 'MCQs'
                subChild2 = ""
                parentArr[i].questions[q].options.push(optionsState) // if options* ofsame question if not exist
                for (let g = 0; g < parentArr[i].questions[q].options.length; g++) {
                  if (parentArr[i].questions[q].options[g].optId === divOptNodeID) {
                    parentArr[i].questions[q].options[g].option = subChild3
                    parentArr[i].questions[q].options[g].correct = false
                    subChild3 = ""
                  }
                }

              }
            }
            emptyQuestion()
            matchQIndex = parentArr[i].questions.length
          }
        }

      }
      console.log(`parentArr:`, parentArr)
      console.log(`parentArr[i].questions:`, parentArr[i].questions)
    }
  }
  else {
    parentArr.push(initialstate)

    if (parentArr[matchIndex]?.CurrentSecId === mainParentId) {
      parentArr[matchIndex].title = subChild
      parentArr[matchIndex].discription = subChild1
      subChild1 = ""
      subChild =""
      if (mainQuestionId !== "") {
        matchQIndex =  parentArr[matchIndex]?.questions?.length
        
        parentArr[matchIndex].questions.push(quesState)
        
        matchOptionIndex = parentArr[matchIndex]?.questions[matchQIndex]?.options?.length
        // console.log("quesState:",quesState)
        if (parentArr[matchIndex].questions[matchQIndex]?.qId === mainQuestionId) {
          parentArr[matchIndex].questions[matchQIndex].question = subChild2
          parentArr[matchIndex].questions[matchQIndex].Qtype = "MCQs"
          subChild2 = ""
          if (divOptNodeID !== "") {
            parentArr[matchIndex].questions[matchQIndex].options.push(optionsState)
            console.log(`parentArr:`, parentArr)
            console.log(`matchOptionIndex:`, matchOptionIndex)
                if (parentArr[matchIndex].questions[matchQIndex].options[matchOptionIndex]?.optId === divOptNodeID) {
                  parentArr[matchIndex].questions[matchQIndex].options[matchOptionIndex].option = subChild3
                  parentArr[matchIndex].questions[matchQIndex].options[matchOptionIndex].correct = false
                  subChild3 =""
                  //break;
                }
                //divOptNodeID = ""
              }
              //mainQuestionId = ""

            }

          //}
        //}
      }
      emptyQuestion()
      matchIndex = parentArr.length;
      matchQIndex = parentArr[matchIndex]?.questions?.length
    }
    emptyQuestion()
    matchIndex = parentArr.length;
    matchQIndex = parentArr[matchIndex]?.questions?.length
  }


}
export function addToLocalStorage(parentArr) {
  // Parse the JSON stored in allEntriesP
  if (parentArr.lenght !== 0) {
    var existingEntries = JSON.parse(localStorage.getItem(my_ls_name));
    //var existMainCount = JSON.parse(localStorage.getItem(my_mainCount));
    var existMainCount = JSON.parse(localStorage.getItem(my_mainCount));
    var existSecCount = JSON.parse(localStorage.getItem(my_secCount));
    var existQuesCount = JSON.parse(localStorage.getItem(my_quesCount));
    var existoptCount = JSON.parse(localStorage.getItem(my_optCount));
    console.log(`existingEntries`, existingEntries)
    // if (existingEntries == null) existingEntries = [];
    localStorage.setItem(my_ls_name, JSON.stringify(parentArr));
    //localStorage.setItem(my_mainCount, maincount);
    //localStorage.setItem(matchIdxEntries, matchIndex);
    return
  }

};































//
//
//
// if (parentArr.filter((each,secindex) =>{ if(each.CurrentSecId === mainParentId) return secindex =i }).length > 0) {
//   //update section + add questions
//  // for (let i = 0; i < parentArr.length; i++) {
//    // if (parentArr[i]?.CurrentSecId === mainParentId) {
//     //secindex =i
//     console.log('secindex ,i', i);
//       parentArr[i].title = subChild
//       parentArr[i].discription = subChild1
      
//       if (j=parentArr[i].questions.filter((each,qindex) => { if(each.qId === mainQuestionId) return qindex }).length > 0) {
//         //update question and new or more add options
//        // for (let j = matchQIndex; j < parentArr[i].questions.length; j++) {
//         //  if (parentArr[i].questions[j]?.qId === mainQuestionId) {
//           console.log('j', j);
//             parentArr[i].questions[j].question = subChild2
//             parentArr[i].questions[j].Qtype = "MCQs"
//             //  if (divOptNodeID !== "") {
//             if (k= parentArr[i].questions[j].options.filter((each,oIndex) => { if(each.optId === divOptNodeID) return oIndex  }).length > 0) {
//               //update existing options 
//             //  for (let k = matchOptionIndex; k <= parentArr[i].questions[j].options.length; k++) {
//                 //if (parentArr[i].questions[j].options[k]?.optId === divOptNodeID) {
//                   console.log('k', k);
//                   parentArr[i].questions[j].options[k].option = subChild3
//                   parentArr[i].questions[j].options[k].correct = false
//                 //}
//              // }
//               emptyQuestion()
//              // break;
//             }
//             else {
//               //add new options related to same question
//               parentArr[i].questions[j].options.push(optionsState)
//              // for (let t = 0; t < parentArr[i].questions[j].options.length; t++) {
//                 if (parentArr[i].questions[j].options[k].optId === divOptNodeID) {
//                   parentArr[i].questions[j].options[k].option = subChild3
//                   parentArr[i].questions[j].options[k].correct = false
//                 }
//              // }
//               matchOptionIndex = parentArr[i].questions[j].options.length
//               emptyQuestionOptions()
//             }
//             // }
//         //  }
//        // }
//         //break;
//       }
//       else {
//         // add new question and options* in same section if not exist
//         if (mainQuestionId !== "") {
//           parentArr[i].questions.push(quesState)
//           for (let q = 0; q < parentArr[i].questions.length; q++) {
//             if (parentArr[i].questions[q].qId === mainQuestionId) {
//               parentArr[i].questions[q].question = subChild2
//               parentArr[i].questions[q].Qtype = 'MCQs'
//               parentArr[i].questions[q].options.push(optionsState) // if options* ofsame question if not exist
//               for (let g = 0; g < parentArr[i].questions[q].options.length; g++) {
//                 if (parentArr[i].questions[q].options[g].optId === divOptNodeID) {
//                   parentArr[i].questions[q].options[g].option = subChild3
//                   parentArr[i].questions[q].options[g].correct = false
//                 }
//               }

//             }
//           }
//           emptyQuestion()
//           matchQIndex = parentArr[i].questions.length
//         }
//       }

//    // }
//     console.log(`parentArr:`, parentArr)
//     console.log(`parentArr[i].questions:`, parentArr[i].questions)
//  // }
// }
// else {
//   parentArr.push(initialstate)

//   if (parentArr[matchIndex]?.CurrentSecId === mainParentId) {
//     parentArr[matchIndex].title = subChild
//     parentArr[matchIndex].discription = subChild1
//     parentArr[matchIndex].questions
//     if (mainQuestionId !== "") {
//       //for (let i = 0; i < parentArr.length; i++) {
//         // if (parentArr[matchIndex].questions.filter(each => { return each.qId === mainQuestionId; }).length > 0) {
          
//           parentArr[matchIndex].questions.push(quesState)
//           matchQIndex =  parentArr[matchIndex]?.questions?.length
//           matchOptionIndex = parentArr[matchIndex]?.questions[matchQIndex]?.options?.length
//           if (parentArr[matchIndex].questions[matchIndex]?.qId === mainQuestionId) {
//             parentArr[matchIndex].questions[matchIndex].question = subChild2
//             parentArr[matchIndex].questions[matchIndex].Qtype = "MCQs"
//             if (divOptNodeID !== "") {
//               parentArr[matchIndex].questions[matchIndex].options.push(optionsState)
//               if (parentArr[matchIndex].questions[matchIndex].options[matchIndex]?.optId === divOptNodeID) {
//                 parentArr[matchIndex].questions[matchIndex].options[matchIndex].option = subChild3
//                 parentArr[matchIndex].questions[matchIndex].options[matchIndex].correct = false
//                 //break;
//               }
//               console.log('divOptNodeID', divOptNodeID);
//               //divOptNodeID = ""
//             }
//             //mainQuestionId = ""

//           }

//         //}
//       //}
//     }
//     emptyQuestion()
//     matchIndex = parentArr.length;
//     matchQIndex = parentArr[matchIndex]?.questions?.length
//   }
//   emptyQuestion()
//   matchIndex = parentArr.length;
//   matchQIndex = parentArr[matchIndex]?.questions?.length

//   console.log('matchIndex', matchIndex);
//   console.log('matchQIndex', matchQIndex);
// }
