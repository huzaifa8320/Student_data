// Loader 

let all_main = document.getElementById('all_main')
let loader_div = document.getElementById('loader_div')
all_main.style.display = 'none'

setTimeout(() => {
    loader_div.style.display = 'none'
    all_main.style.display = 'block'
}, 100);

// loader end 


// Roll Number 

let roll_number = 192726

// Roll Number end


// Sno system 

let div7 = document.getElementsByClassName('div7')
function sno() {
    let number = 1
    for (const i of div7) {
        i.querySelector('.sno_div').innerHTML = `${number}.`
        number++
    }
}
sno()

// Sno system end


// Data store 

let div3 = document.getElementById('div3')
let add_student = document.getElementById('add_student')
let input_name = document.getElementById('input_name')
let input_email = document.getElementById('input_email')

// Data store end


// LocalStorage item showing

let localStorage_geting = JSON.parse(localStorage.getItem('student_details'))
if (localStorage_geting != null) {
    for (let i = 0; i < localStorage_geting.length; i++) {
        roll_number++
        let change_email = localStorage_geting[i].email.length > 18 ? localStorage_geting[i].email.slice(0, 15) + '...' : localStorage_geting[i].email;
        div3.innerHTML += `
             <div class="mx-1 div7  row my-3">
                 <div class="sno_div col-2 col-sm-1 d-flex justify-content-center align-items-center"></div>
                 <div class="name_div col-4 col-sm-4 d-flex justify-content-center align-items-center">${localStorage_geting[i].name_user.slice(0, 1).toUpperCase()}${localStorage_geting[i].name_user.slice(1)}</div>
                 <div class="email_div col-6 col-sm-5 col-lg-4 d-flex justify-content-center align-items-center">${change_email}</div>
                 <div class="roll_number d-none col-lg-1 d-lg-flex justify-content-center align-items-center">${localStorage_geting[i].roll}</div>
                 <div class="details_div col-sm-2 d-flex justify-content-center align-items-center d-none d-sm-flex p-0"><button class='details_btn'>Details</button></div>                    
                 <div class="details_div col-sm-2 d-flex justify-content-center align-items-center d-flex d-sm-none p-0"><button class='details_btn mt-3'>Details</button></div>                    
             </div>
             `
    }
    sno()
}

// localStorage item showing end 


// Model div function 

let model = document.getElementById('model')
model.style.display = 'none'

add_student.addEventListener('click', function () {
    model.style.display = 'flex'
})
window.addEventListener('click', function (e) {
    if (e.target.id == 'model') {
        model.style.display = 'none'
    }
})

let close_btn = document.getElementById('close')

close_btn.addEventListener('click', function () {
    model.style.display = 'none'
})

// Model div function end


// Click Save data of student

let add_student_save = document.getElementById('add_student_save')
let courses_btn = document.getElementById('courses_btn')
var courses_input = document.getElementsByClassName('courses_input')
let courses_value = ''
for (let i = 0; i < courses_input.length; i++) {
    courses_input[i].addEventListener('click', function () {
        courses_value = courses_input[i].innerHTML
        courses_btn.innerText = `${courses_input[i].innerHTML.slice(2, 13)}...`
    })
}

let gender_btn = document.getElementById(`gender_btn`)
let gender_input = document.getElementsByClassName('gender_input')
let gender_value = ''
for (let i = 0; i < gender_input.length; i++) {
    gender_input[i].addEventListener('click', function () {
        gender_value = gender_input[i].innerHTML
        gender_btn.innerText = gender_input[i].innerHTML.slice(2)
    })
}
add_student_save.addEventListener('click', function () {
    if (input_name.value == '') {
        Swal.fire("Please Enter Name 📝");
    }
    else if (input_email.value == '') {
        Swal.fire("Please Enter Email 📝");
    }
    else if (!input_email.value.includes('@gmail.com')) {
        Swal.fire("Pleas Enter a valid Email 📝");
    }
    else if (input_email.value.includes(' ')) {
        Swal.fire("Pleas dont use space in Email 📝");
    }
    else if (gender_value == '') {
        Swal.fire("Please Select Gender 📝");
    }
    else if (courses_value == '') {
        Swal.fire("Please Select Courses 📝");
    }
    else {
        let email_check = true
        let email_storage = JSON.parse(localStorage.getItem('student_details'))
        if (email_storage != null) {
            for (let i = 0; i < email_storage.length; i++) {
                if (input_email.value == email_storage[i].email) {
                    Swal.fire("This email is already in use 📝");
                    email_check = false
                }
                else {
                    email_check == true
                }
            }
        }
        if (email_check == true) {
        
            roll_number++
            let student_details = JSON.parse(localStorage.getItem('student_details')) || [];

            const data_user = {
                name_user: input_name.value,
                email: input_email.value,
                gender: gender_value.slice(2),
                courses: courses_value.slice(2),
                roll: roll_number
            }
            let convert_email = input_email.value.length > 18 ? input_email.value.slice(0, 15) + '...' : input_email.value;
            model.style.display = 'none'

            div3.innerHTML += `
                 <div class="mx-1 div7  row my-3">
                 <div class="sno_div col-2 col-sm-1 d-flex justify-content-center align-items-center"></div>
                 <div class="name_div col-4 col-sm-4 d-flex justify-content-center align-items-center">${input_name.value.slice(0, 1).toUpperCase()}${input_name.value.slice(1)}</div>
                 <div class="email_div col-6 col-sm-5 col-lg-4 d-flex justify-content-center align-items-center">${convert_email}</div>
                 <div class="roll_number d-none col-lg-1 d-lg-flex justify-content-center align-items-center">${roll_number}</div>
                 <div class="details_div col-sm-2 d-flex justify-content-center align-items-center d-none d-sm-flex p-0"><button class='details_btn'>Details</button></div>                    
                 <div class="details_div col-sm-2 d-flex justify-content-center align-items-center d-flex d-sm-none p-0"><button class='details_btn mt-3'>Details</button></div>                    
             </div>
                 `
            student_details.push(data_user)
            localStorage.setItem('student_details', JSON.stringify(student_details))
            sno()
            local()
        }
    }
})

//Click Save data of student end

// Show Details Function 

let div8 = document.getElementById('div8')
div8.style.display = 'none'

div3.addEventListener('click', function (e) {
    if (e.target.classList.contains('details_btn')) {
        let get_Details = e.target.parentElement.parentElement.querySelector('.roll_number').innerHTML
        let input_name_2 = document.getElementById('input_name_2')
        let input_email_2 = document.getElementById('input_email_2')
        let gender_btn_2 = document.getElementById('gender_btn_2')
        let courses_btn_2 = document.getElementById('courses_btn_2')
        div8.style.display = 'flex'
        let details_click = JSON.parse(localStorage.getItem('student_details'))
        for (let i = 0; i <  details_click.length; i++) {
            if (get_Details == details_click[i].roll) {
                input_name_2.value = `${details_click[i].name_user.slice(0, 1).toUpperCase()}${details_click[i].name_user.slice(1)}`
                input_name_2.setAttribute('readonly', true)
                input_email_2.value = details_click[i].email
                input_email_2.setAttribute('readonly', true)
                gender_btn_2.innerHTML = details_click[i].gender
                courses_btn_2.innerHTML = details_click[i].courses
            }  
        }
    }
})

let close_2 = document.getElementById('close_2')
close_2.addEventListener('click', function () {
    div8.style.display = 'none'
})

window.addEventListener('click', function (e) {
    if (e.target.id == 'div8') {
        div8.style.display = 'none'
    }
})

let add_student_save_2 = document.getElementById('add_student_save_2')
add_student_save_2.addEventListener('click', function () {
    Swal.fire("Website in Maintenance 🛠️");
})

// Show Details Function end

// Total Student showing 

function local() {
    let total_student_check = JSON.parse(localStorage.getItem('student_details'))

    if (total_student_check != null) {
        let total_student = document.getElementById('total_student')
        let localStorage_length = JSON.parse(localStorage.getItem('student_details')).length
        total_student.innerHTML = localStorage_length
    }
}
local()

// Total Student showing end