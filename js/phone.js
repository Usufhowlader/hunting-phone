const loadPhone =async(searchText='13',isShowAll)=>{
 const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
 const data =await res.json();
 const phones =data.data
//  console.log(phones);
displayPhones(phones,isShowAll);
}
const displayPhones = (phones,isShowAll)=>{
    //  console.log(phones);
    // 1.
    const phoneContainer =document.getElementById('phone-container')
     // clear phone container cards before adding new cards
     phoneContainer.textContent ='';
    // display show all button if there are more than 12 phones
      const showAllContainer =document.getElementById('show-all-container')
     if(phones.length>12 && !isShowAll){
       showAllContainer.classList.remove('hidden')
     }
     else{
      showAllContainer.classList.add('hidden');
     }
    //  display only first 12 phones if not show all
    if(!isShowAll){
      phones =phones.slice(0,12);
    }
    phones.forEach(phone => { 
        // console.log(phone);
        //2. create a div
        const phoneCard =document.createElement('div');
        phoneCard.classList =`card p-4 bg-gary-800 shadow-xl`;
        // 3.inner html
        phoneCard.innerHTML  =`
        <figure><img src="${phone.image}" alt="Shoes"/></figure>
                <div class="card-body">
                <h2 class="card-title">${phone.brand}</h2>
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>${phone.slug}</p>
                  <div class="card-actions justify-center">
                    <button onclick="showClickDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                  </div>
                </div>
        `
        // 4.append child
        phoneContainer.appendChild(phoneCard);
        toggleLoadingSpinner(false);
    });
}
const showClickDetails =async(id)=>{
  // console.log('Show Click ', id)
  const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data =await res.json();
const phone =data.data;

 showPhoneDetails(phone);
}


const showPhoneDetails =(phone) =>{
  const phoneName =document.getElementById('phone-name');
  phoneName.innerText =phone.name;
  const showDetailsContainer =document.getElementById('show-details-container')
  showDetailsContainer.innerHTML=`
  <img src="${phone.image}" alt="">
  <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
   <p><span>storage:</span>${phone?.mainFeatures?.storage}</p>
   <p><span>memory:</span>${phone?.mainFeatures?.memory}</p>
   <p><span>Gps:</span>${phone?.others?.GPS}</p>
   <p><span>sensors:</span>${phone?.mainFeatures?.sensors}</p>
   <p><span>USB:</span>${phone?.others?.USB}</p>
  `
  // show the modal
  console.log(phone);
  show_details_modal.showModal();

}

// handle with search button
const handleSearch =(isShowAll) =>{
  toggleLoadingSpinner(true);
    const searchField =document.getElementById('search-field');
    const searchText =searchField.value
    // console.log(searchText);
    loadPhone(searchText,isShowAll);
}
// const handleSearch2 =() =>{
//   toggleLoadingSpinner(true);
//     const searchField =document.getElementById('search-field2');
//     const searchText =searchField.value
//     console.log(searchText);
//     loadPhone(searchText);
// }
const toggleLoadingSpinner =(isLoading)=>{
  const loadingSpinner =document.getElementById('loading-spinner');
 if(isLoading){
  loadingSpinner.classList.remove('hidden')
 }
 else{
  loadingSpinner.classList.add('hidden');
 }
}
const handleShowAll =()=>{
  handleSearch(true);
}

loadPhone();
