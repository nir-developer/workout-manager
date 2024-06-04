

const apiBaseURL = 'http://localhost:3000'




//STATE OBJECT TO MANAGE LOGIN STATE
const state =  {
    loggedIn:false, 
    email: '', 
    statusMessage:''
}




//DOM ELEMENT 
const userProfile = document.getElementById('userProfile')
const signupForm = document.getElementById('signupForm'); 
const loginForm = document.getElementById('loginForm')
const logoutButton = document.getElementById('logoutButton')

const loggedInMessage = document.getElementById('loggedInMessage')
const emailDisplay = document.getElementById('emailDisplay')


 const loginEmailInput = document.getElementById('loginEmail');
 const loginPasswordInput = document.getElementById('loginPassword');

 const signupNameInput  = document.getElementById('signupName')
const signupEmailInput = document.getElementById('signupEmail')
const signupPasswordInput = document.getElementById('signupPassword')
 const signupPasswordConfirmInput = document.getElementById('signupPasswordConfirm')
const signupPhoto = document.getElementById('signupPhoto')

const errorMessage = document.getElementById('errorMessage')

const headerMessage = document.querySelector('.header__message')
console.log(headerMessage)



//FUNCTION TO UPDATE UI BASED N LOGIN STATE
const updateUI = () => {
    if(state.loggedIn)
     {
        
        console.log('INSIDE UPDATE UI - CURRENT STATE:', state)
        
        //CLEAR FORMS INPUTS 
        loginForm.style.display = 'none'
        signupForm.style.display = 'none'
        loggedInMessage.style.display = 'block'
        emailDisplay.textContent = state.email;
        headerMessage.textContent = state.statusMessage
        errorMessage.style.display = 'none'
        

        loginEmailInput.value = loginPasswordInput.value = ''

        signupEmailInput.value =
         signupPasswordConfirmInput.value =
         signupPasswordInput.value = 
         signupPhoto.value = 
         signupNameInput.value = ''

     }
     else{
        loginForm.style.display = 'block'
        signupForm.style.display = 'block'
        loggedInMessage.style.display= 'none'
        //???
         
     }
}


loginForm.addEventListener('submit',  async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value; 
    const password = document.getElementById('loginPassword').value; 
    
    console.log('LOGIN SUBMITTED')
    console.log(email, password)

    try{
        const response = await fetch(`${apiBaseURL}/login`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({email, password}),
        credentials: 'include'

        })

        const responseBody = await response.json();

        if(response.ok)
        {

            console.log('Login Successful - the user:')
           
            const {user} = responseBody.data
            console.log(user);

            //UPDATE THE STATE
            state.loggedIn = true; 
            state.email = user.email;
            state.statusMessage = `Welcome, ${user.name}`
            //CLEAR THE FORM INPUTS 
            //LOAD THE UI 
            updateUI();
        }

        else
        {
            throw responseBody;
        }
      

        //RENDER THE USER PROFILE BASED ON THE STATE 
        // userProfile.textContent = state.isLoggedIn === true ? `Logged in as: ${user.name}`: `Bad Credentials`

    }
    catch(error)
    {
        console.error('Login Failed', error.message)
    }


})


///////////////////////////////////////////
//////////////////////////////////////
//HANDLERS - MY CODE WITHOUT STATE! -WORK
signupForm.addEventListener('submit', async event => {
    event.preventDefault(); 

    console.log('SINGUP FORM SUBMITTED!')
    const name  = document.getElementById('signupName').value; 
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    const photo = document.getElementById('signupPhoto').value; 


    console.log(email, password)
    try 
    {
        const response = await fetch(`${apiBaseURL}/signup`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({name, email, password, passwordConfirm, photo})

        })

        // const data = await response.json(); 
        // const {user} = data.data;
        
        const data = await response.json(); 
        if(response.ok) 
            {
                console.log('SUCCESS SIGNUP!RESPONSE BODY:')
                console.log(data)
                const {user} = data.data;
                console.log('USER:')
                console.log(user)
                // console.log(user)

            // //UPDATE THE STATE 
            state.loggedIn = true; 
            state.email = user.email;

            //UPDATE UI 
            updateUI();

        }

        else console.log('Signup failed: ', response.statusText)
    }
    catch(error)
    {
        console.error('Signup failed:', error)
    }
})



//MUST SEND CREDENTIALS:INCLUDE IN THE REQUEST !!!
logoutButton.addEventListener('click', async event => {

    console.log('LOGOUT BUTTON WAS CLICKED')

    try 
    {
        const response = await fetch(`${apiBaseURL}/logout`, {
           method:'POST', 
           credentials:'include'
        })

        //UPDATE THE STATE 
        state.loggedIn = false; 
        state.email =''

        //UPDATE UI 
        updateUI();
    }

    
    catch(error)
    {
        console.error(error)
    }
})





////////////////////////////////
//WORKS!
// loginForm.addEventListener('submit',async event => {
//     event.preventDefault(); 
//     const email = document.getElementById('loginEmail').value; 
//     const password = document.getElementById('loginPassword').value; 
   
//     console.log('LOGIN SUBMITTED')
//     console.log(email, password)

//     try{
//         const response = await fetch(`${apiBaseURL}/login`, {
//         method:'POST',
//         headers:{'Content-Type':'application/json'},
//         body: JSON.stringify({email, password}),
//         credentials: 'include'

//         })

//         const responseBody = await response.json();

//         let message = 'Log in to get started'

//         if(response.ok)
//         {

//             console.log('Login Successful - the user:')
//             //console.log('SUCCESS LOGGED IN! CLIENT! user:')
//             // console.log(responseBody)
            
//             const {user} = responseBody.data
//             console.log(user)

//             message = `Welcome, ${user.name}`

//             //UPDATE THE STATE!!
//             state.setState(true); // Update state to true after successful login
            
                 
//         }

//         else
//         {
//             throw responseBody;
//         }
      

//         //RENDER THE USER PROFILE BASED ON THE STATE 
//         // userProfile.textContent = state.isLoggedIn === true ? `Logged in as: ${user.name}`: `Bad Credentials`

//     }
//     catch(error)
//     {
//         console.error('Login Failed', error.message)
//     }


// })


//MUST SEND CREDENTIALS:INCLUDE IN THE REQUEST !!!
// logoutButton.addEventListener('click', async event => {

//     console.log('LOGOUT BUTTON WAS CLICKED')

//     try 
//     {
//         const response = await fetch(`${apiBaseURL}/logout`, {
//            method:'POST', 
//            credentials:'include'
//         })

//         //UPDATE THE HEADER - REMOVE THE USER NAME FROM THE PROFILE!
//         userProfile.textContent = `Logged in to get started`
//        // if(!response.ok) 
//     }

    
//     catch(error)
//     {
//         console.error(error)
//     }
// })


//         // Subscribe to state changes
//     state.subscribe(isLoggedIn => {
//          console.log('Login state changed:', isLoggedIn);
//             // Update the UI or perform other actions based on the new state
//            document.getElementById('loginStatus').textContent = isLoggedIn ? 'Logged In' : 'Logged Out';
//         });

//         // Example usage
//         document.addEventListener('DOMContentLoaded', () => {
//             document.getElementById('loginForm').addEventListener('submit',async  event => {
//                 event.preventDefault(); 
//                 console.log('LOGIN FORM SUMBITTED')
//                await  handleLogin(); 
//                console.log('SUCCESS')

                
//             });
//         });


//HANDLE 'load' event - by checking the state






/////////////////////////////////////////////////
//COMPLEX STATE - WITH PUBLISHER SUBSCRIBER PATTERN
////////////////////////////////////
// const apiBaseURL = 'http://localhost:3000'


// //DOM ELEMENT SELECT
// const userProfile = document.getElementById('userProfile')
// const signupForm = document.getElementById('signupForm'); 
// const loginForm = document.getElementById('loginForm')
// const logoutButton = document.getElementById('logoutButton')


//  const state = {
//             isLoggedIn: false,
//             listeners: [],

//             // Method to get the state
//             getState: function() {
//                 return this.isLoggedIn;
//             },

//             // Method to update the state and notify listeners
//             setState: function(newState) {
//                 this.isLoggedIn = newState;
//                 this.notifyListeners();
//             },

//             // Method to subscribe to state changes
//             subscribe: function(listener) {
//                 this.listeners.push(listener);
//             },

//             // Method to notify all listeners about the state change
//             notifyListeners: function() {
//                 this.listeners.forEach(listener => listener(this.isLoggedIn));
//             }
//         };



// ///////////////////////////////////////////
// //////////////////////////////////////
// //HANDLERS - MY CODE WITHOUT STATE! -WORK
// signupForm.addEventListener('submit', async event => {
//     event.preventDefault(); 

//     console.log('SINGUP FORM SUBMITTED!')
//     const name  = document.getElementById('signupName').value; 
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;
//     const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
//     const photo = document.getElementById('signupPhoto').value; 


//     console.log(email, password)
//     try 
//     {
//         const response = await fetch(`${apiBaseURL}/signup`, {
//             method:'POST',
//             headers:{'Content-Type':'application/json'},
//             body: JSON.stringify({name, email, password, passwordConfirm, photo})

//         })

//         if(response.ok) console.log('Signup successful')

//         else console.log('Signup failed: ', response.statusText)
//     }
//     catch(error)
//     {
//         console.error('Signup failed:', error)
//     }
// })

// const handleLogin = async () => {
    

//     const email = document.getElementById('loginEmail').value; 
//     const password = document.getElementById('loginPassword').value; 
   
//     console.log('LOGIN SUBMITTED')
//     console.log(email, password)

//     try{
//         const response = await fetch(`${apiBaseURL}/login`, {
//         method:'POST',
//         headers:{'Content-Type':'application/json'},
//         body: JSON.stringify({email, password}),
//         credentials: 'include'

//         })

//         const responseBody = await response.json();


//         if(response.ok)
//         {

//             console.log('Login Successful - the user:')
//             //console.log('SUCCESS LOGGED IN! CLIENT! user:')
//             // console.log(responseBody)
            
//             const {user} = responseBody.data
//             console.log(user)


//             //UPDATE THE STATE!!
//             state.setState(true); // Update state to true after successful login
            
                 
//         }

//         else
//         {
//             throw responseBody;
//         }
      

//         //RENDER THE USER PROFILE BASED ON THE STATE 
//         // userProfile.textContent = state.isLoggedIn === true ? `Logged in as: ${user.name}`: `Bad Credentials`

//     }
//     catch(error)
//     {
//         console.error('Login Failed', error.message)
//     }


// }

// //WORKS!
// // loginForm.addEventListener('submit',async event => {
// //     event.preventDefault(); 
// //     const email = document.getElementById('loginEmail').value; 
// //     const password = document.getElementById('loginPassword').value; 
   
// //     console.log('LOGIN SUBMITTED')
// //     console.log(email, password)

// //     try{
// //         const response = await fetch(`${apiBaseURL}/login`, {
// //         method:'POST',
// //         headers:{'Content-Type':'application/json'},
// //         body: JSON.stringify({email, password}),
// //         credentials: 'include'

// //         })

// //         const responseBody = await response.json();

// //         let message = 'Log in to get started'

// //         if(response.ok)
// //         {

// //             console.log('Login Successful - the user:')
// //             //console.log('SUCCESS LOGGED IN! CLIENT! user:')
// //             // console.log(responseBody)
            
// //             const {user} = responseBody.data
// //             console.log(user)

// //             message = `Welcome, ${user.name}`

// //             //UPDATE THE STATE!!
// //             state.setState(true); // Update state to true after successful login
            
                 
// //         }

// //         else
// //         {
// //             throw responseBody;
// //         }
      

// //         //RENDER THE USER PROFILE BASED ON THE STATE 
// //         // userProfile.textContent = state.isLoggedIn === true ? `Logged in as: ${user.name}`: `Bad Credentials`

// //     }
// //     catch(error)
// //     {
// //         console.error('Login Failed', error.message)
// //     }


// // })




//         // Subscribe to state changes
//     state.subscribe(isLoggedIn => {
//          console.log('Login state changed:', isLoggedIn);
//             // Update the UI or perform other actions based on the new state
//            document.getElementById('loginStatus').textContent = isLoggedIn ? 'Logged In' : 'Logged Out';
//         });

//         // Example usage
//         document.addEventListener('DOMContentLoaded', () => {
//             document.getElementById('loginForm').addEventListener('submit',async  event => {
//                 event.preventDefault(); 
//                 console.log('LOGIN FORM SUMBITTED')
//                await  handleLogin(); 
//                console.log('SUCCESS')

                
//             });
//         });


// //HANDLE 'load' event - by checking the state






