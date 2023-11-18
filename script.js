document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menutab-item');
  
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        window.open(`hello_${title}.html`, '_blank'); 
      });
    });

    document.getElementById("registerButton").addEventListener("click", control);
  });

  
  window.onload = function() {
    populateDropdowns(); 
  };

  async function populateDropdowns() {
    try {
      const [companiesRes, phoneCodesRes, subjectsRes] = await Promise.all([
        fetch('https://run.mocky.io/v3/42e20875-9439-4ba3-b5d9-7613b6d34733'),
        fetch('https://run.mocky.io/v3/01187235-9fe2-431c-a46c-49e411574183'),
        fetch('https://run.mocky.io/v3/e8572994-5439-4cce-b419-43acfe57247d')
      ]);
  
      const [companiesData, phoneCodesData, subjectsData] = await Promise.all([
        companiesRes.json(),
        phoneCodesRes.json(),
        subjectsRes.json()
      ]);
  
      if (companiesRes.ok) {
        populateCompanyDropdown(companiesData.companies);
      } else {
        console.error("Failed to fetch companies data");
      }
  
      if (phoneCodesRes.ok) {
        populatePhoneCodesDropdown(phoneCodesData.phoneCodes);
      } else {
        console.error("Failed to fetch phone codes data");
      }
  
      if (subjectsRes.ok) {
        populateSubjectsDropdown(subjectsData.subjects);
      } else {
        console.error("Failed to fetch subjects data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  function populateCompanyDropdown(companies) {
    const companySelect = document.getElementById("companySelect");
  
    companies.forEach(company => {
      const option = document.createElement("option");
      option.textContent = company;
      option.value = company;
      companySelect.appendChild(option);
    });
  }
  
  function populatePhoneCodesDropdown(phoneCodes) {
    const phoneCodesSelect = document.getElementById("phoneCodesSelect");
  
    phoneCodes.forEach(code => {
      const option = document.createElement("option");
      option.textContent = code;
      option.value = code;
      phoneCodesSelect.appendChild(option);
    });
  }
  
  function populateSubjectsDropdown(subjects) {
    const subjectsSelect = document.getElementById("subjectsSelect");
  
    subjects.forEach(subject => {
      const option = document.createElement("option");
      option.textContent = subject;
      option.value = subject;
      subjectsSelect.appendChild(option);
    });
  }

  function control() {

    let isnull = false;
    const emailInput = document.getElementById("emailInput").value; 
    const fnameinput = document.getElementById("fname").value;
    const lnameinput = document.getElementById("lname").value;
    const phoneInput = document.getElementById("phoneInput");

    if (fnameinput === "" || lnameinput === "" || emailInput === "" || phoneInput === "") 
    {
        isnull = true;
        alert("Required fields cannot be empty");
       
    }
    
    if ((isnull === false ) && ( !emailInput.includes('@') ||  !emailInput.includes('.com'))) {
       alert("Please enter a valid email!");
    } 
  
     const phoneValidationMessage = document.getElementById("phoneValidationMessage");
     const phoneCodesSelect = document.getElementById("phoneCodesSelect");

    if ((isnull=== false) && (phoneCodesSelect.value !== "+90" || phoneInput.value.length !== 10 || isNaN(phoneInput.value))) {
      alert("Phone number should have +90 code and should be 10 correct format");
    } 
    else {
        alert("registration completed successfully"); 
         window.open(`success.html`, '_blank'); 
    }

  }
  

  
  
  
  
