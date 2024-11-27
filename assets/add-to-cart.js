document.addEventListener("DOMContentLoaded", function () {
    const productImages = document.querySelectorAll('.product-image');
    let variantMap

    productImages.forEach(image => {
        image.addEventListener('click', function () {
            // Code to display modal with product details
            const modal = document.getElementById('product-modal'); 
            const color= this.dataset.color.split(',')
            const size=this.dataset.size.split(',')
            variantMap=JSON.parse(this.dataset.variants)
          // Ensure you have a modal structure
            modal.style.display = 'block';
            modal.querySelector('.modal-title').innerText = this.alt;
            modal.querySelector('.modal-image').src = this.src;
            modal.querySelector('.modal-price').innerText = this.dataset.price;
            modal.querySelector('.modal-description').innerHTML = this.dataset.desc
            modal.querySelector('#color-option1').innerHTML=color[0]
            modal.querySelector('#color-option2').innerHTML=color[1]
           
            console.log(this.dataset.variants)
            for (let i=0;i<size.length;i++){
              modal.querySelector('#size-selector').innerHTML+=`<option value= ${size[i]}> ${size[i]}</option>`
            }
           
        });
    } );
    document.querySelector('.modal-close').addEventListener('click', function () {
        document.getElementById('product-modal').style.display = 'none';
    });
     const colorOptions= document.querySelectorAll(".selector .option")
     const sizeSelector= document.getElementById('size-selector')
     const hiddenInput= document.getElementById("modal-addcart")

     let selectedColor= null
     let selectedSize= null
     
     colorOptions.forEach((option) => {
      option.addEventListener("click",function(){
        selectedColor=option.textContent.trim()

        colorOptions.forEach((o) => o.classList.remove("selected"))
        this.classList.add("selected")

        updateSizeOptions()
        updateVariantId()
      })
     })
     sizeSelector.addEventListener("change",function(){
      selectedSize=sizeSelector.value.trim()
      updateVariantId()
     })

     function updateSizeOptions(){
      const options=sizeSelector.querySelectorAll("option")
      options.forEach((option) => {
        if (option.value==="") return
        const key=`${option.value}/${selectedColor}`
        if (variantMap[key]){
          option.disabled=false
          option.style.display="block"
        }else{
          option.disabled=true
           option.style.display="none"
          }
      })
     }

     function updateVariantId(){
      if(selectedColor && selectedSize){
        const key= `${selectedSize}/${selectedColor}`
        const variantId = variantMap[key]
        if (variantId){
          hiddenInput.value=variantId
        }else{
          console.warn("variant not found")
          hiddenInput.value=""
        }
      }
     }
     document
    .querySelector("#cart-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault()

      const formData = new FormData(event.target)
      await fetch("/cart/add", {
        method: "POST",
        body: formData,
      })

      if (selectedColor == "Black" && selectedSize == "M") {
        const formData = new FormData()
        formData.append("id", "45964676006054")
        await fetch("/cart/add", {
          method: "POST",
          body: formData,
        })
      }

      window.location.href = "/cart"
    })

  });
  const options = document.querySelectorAll(".option");
  
  options.forEach(option => {
    option.addEventListener("click", () => {
      // Remove the selected class from all options
      options.forEach(opt => opt.classList.remove("selected"));
  
      // Add the selected class to the clicked option
      option.classList.add("selected");
    });
  });