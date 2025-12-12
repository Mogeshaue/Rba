
const baseUrl="http://localhost:3000";

const loginForm=document.getElementById('login-container');
const registerForm=document.getElementById('register');
const dashboardSection=document.getElementById('dashboard-section');
const showRegister=document.getElementById('show-register');
const logoutBtn=document.getElementById('logout-btn');
const accessToken=localStorage.getItem('accessToken');
if(accessToken){
    showForm('dashboard');
    getTasks();
}else{
    showForm('login');
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('accessToken');
    showForm('login');
});

function showForm(form){
    dashboardSection.style.display='none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';

    if(form === 'login'){
        loginForm.style.display = 'block';
    } else if(form === 'register'){
        registerForm.style.display = 'block';
    }else{
        dashboardSection.style.display='block';
    }
}

loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email=document.getElementById('email').value.trim();
    const password=document.getElementById('password').value;
    
    // Frontend validation
    if(!email || !password){
        alert('Email and password are required');
        return;
    }
    
    console.log("Login attempt:", {email, password});
    async function loginUser(){
        const reg=await fetch(`${baseUrl}/user/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        });
        const data=await reg.json();
        console.log("Login response data:", data);
        if(data.accessToken){
            console.log("Login successful, storing user data.");
            localStorage.setItem('accessToken',JSON.stringify(data.accessToken));
            showForm('dashboard');
            getTasks();
        }else{
            alert(data.message);
        }
    }
    loginUser();
});


showRegister.addEventListener('click', (e) =>{
    e.preventDefault();
    showForm('register');
});

registerForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const username=document.getElementById('regName').value.trim();
    const email=document.getElementById('regEmail').value.trim();
    const password=document.getElementById('regPassword').value;
    
    // Frontend validation
    if(!username || !email || !password){
        alert('All fields are required');
        return;
    }
    
    if(password.length < 6){
        alert('Password must be at least 6 characters');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        alert('Please enter a valid email address');
        return;
    }
    
    async function registerUser(){
        const reg=await fetch(`${baseUrl}/user/register`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username,email,password})
        });
        const data=await reg.json();    
        if(data.success){
            alert('Registration successful! Please login.');
            showForm('login');
        }else{
            alert(data.message);
        }
    }
    registerUser();
});

function getTasks(){
    const accessToken=JSON.parse(localStorage.getItem('accessToken'));
    if(!accessToken){
        console.error('No user token found');
        showForm('login');
        return;
    }
    async function fetchTasks(){
        const res=await fetch(`${baseUrl}/task`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${accessToken}`
            }
        });
        console.log("Fetching tasks response:", res);
        const data=await res.json();
        console.log("Tasks data:", data);
        const taskList=document.getElementById('task-list');
        taskList.innerHTML='';
        if(data && data.length > 0){
            let tasksserialno=0
            data.forEach(task =>{
                const taskItem=document.createElement('div');
                taskItem.className='task-item';
                taskItem.innerHTML=`<h3>${tasksserialno + 1}. ${task.title}</h3><p>${task.description || ''}</p><br>`;
                taskList.appendChild(taskItem);
                tasksserialno++;
            });
        }else{
            taskList.innerHTML='<p>No tasks found. Create your first task!</p>';
        }
        console.log("Tasks", data.tasks);
    }
    fetchTasks();
}   
if(dashboardSection.style.display==='block'){
    getTasks();
}


