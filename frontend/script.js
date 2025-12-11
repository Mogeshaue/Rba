
const baseUrl="http://localhost:3000";


const loginForm=document.getElementById('login-container');
const registerForm=document.getElementById('register');
const loginButton=document.getElementById('loginButton');
const registerButton=document.getElementById('registerButton');
const loginContainer=document.getElementById('login-container');
const registerContainer=document.getElementById('register');
const welcomeMsg=document.getElementById('welcome-msg');
const dashboardSection=document.getElementById('dashboard-section');
const showRegister=document.getElementById('show-register');
const logoutBtn=document.getElementById('logout-btn');
const taskList=document.getElementById('task-list');
const user=localStorage.getItem('user');
if(user){
    showForm('dashboard');
    getTasks();
}else{
    showForm('login');
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
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
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    e.preventDefault()
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
            localStorage.setItem('user',JSON.stringify(data));
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
    const username=document.getElementById('regName').value;
    const email=document.getElementById('regEmail').value;
    const password=document.getElementById('regPassword').value;
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
    const user=JSON.parse(localStorage.getItem('user'));
    if(!user || !user.accessToken){
        console.error('No user token found');
        showForm('login');
        return;
    }
    async function fetchTasks(){
        const res=await fetch(`${baseUrl}/task`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.accessToken}`
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
    console.log("Fetching tasks for user:", user);
    fetchTasks();
}   
if(dashboardSection.style.display==='block'){
    getTasks();
}

welcomeMsg.textContent=`Welcome, ${JSON.parse(localStorage.getItem('user')).email.split('@')[0]}`;

