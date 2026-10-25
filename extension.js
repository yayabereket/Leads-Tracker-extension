const inputBtn = document.getElementById("input-btn");

let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromlocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("savetab-btn");

//console.log(leadsFromlocalStorage)
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    //console.log(myLeads[i]);
    listItems += `<li>
  <a 
  target='_blank' 
  href='   ${leads[i]}  '>${leads[i]}  
  </a>
    </li>`;
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)
  }
  ulEl.innerHTML = listItems;
}
tabBtn.addEventListener("click", function () {
  //console.log(tabs[0].url)
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
if (leadsFromlocalStorage) {
  myLeads = leadsFromlocalStorage;
  render(myLeads);
}
deleteBtn.addEventListener("dblclick", function () {
  console.log("double clicked");
  myLeads = [];
  localStorage.clear();
  render(myLeads);
});
inputBtn.addEventListener("click", function () {
  //console.log("button clicked")
  if (inputEl.value) {
    myLeads.push(inputEl.value);
    inputEl.value = "";
  }
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  //console.log(localStorage.getItem("myLeads"))
  render(myLeads);
});

// function getFirst(arr) {
//   return arr[0]
// }
// console.log(getFirst(["0","1"]))
//console.log(localStorage.getItem("yaya"))
// const yaya = "yaya";
// const myName = `my name is ${yaya}`;
// console.log(myName);
