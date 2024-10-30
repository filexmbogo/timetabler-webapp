 // Timer Variables
 addEventListener("DOMContentLoaded", (event) => {
    
 let timerInterval;
 let timerDuration = 25 * 60; // 25 minutes in seconds

 // Toggle Pomodoro Popup
 document.getElementById('pomodoroBubble').addEventListener('click', function() {
     let popup = document.getElementById('pomodoroPopup');
     popup.classList.toggle('show');
 });
 let addbtn=document.getElementById('activatetask')
 let form =document.querySelector('#taskform')
 let clicked=false
 let addtask = document.getElementById('addtask');
 function smoothScrollToDiv() {
    const targetDiv =form;
    const targetPosition = targetDiv.getBoundingClientRect().top + window.scrollY; // Get target position
    const startPosition = window.scrollY; // Current scroll position
    const distance = targetPosition - startPosition; // Distance to scroll
    const duration = 1000; // Duration of the scroll in ms
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime; // Initialize start time
        const timeElapsed = currentTime - startTime; // Time elapsed since the start
        const scrollAmount = easeInOutQuad(timeElapsed, startPosition, distance, duration); // Calculate scroll amount
        window.scrollTo(0, scrollAmount); // Scroll to the calculated position

        if (timeElapsed < duration) {
            requestAnimationFrame(animation); // Continue animation until the duration is reached
        }
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation); // Start the animation
}
 function toggle(){
    
       
        if (!clicked){  
   
    addtask.classList.remove('hidden');
    clicked=true

}
else{
    
   
    addtask.classList.add('hidden');
    clicked=false

}}

addbtn.addEventListener('click', function() {
   
    toggle()
    smoothScrollToDiv();
   })

 // Timer Logic
 function startTimer() {
     let timer = document.getElementById('timer');
     clearInterval(timerInterval);
     timerInterval = setInterval(() => {
         let minutes = Math.floor(timerDuration / 60);
         let seconds = timerDuration % 60;
         seconds = seconds < 10 ? '0' + seconds : seconds;
         timer.textContent = `${minutes}:${seconds}`;
         if (timerDuration > 0) {
             timerDuration--;
         } else {
             clearInterval(timerInterval);
             alert("Time's up!");
         }
     }, 1000);
 }

 function resetTimer() {
     clearInterval(timerInterval);
     timerDuration = 25 * 60; // reset to 25 minutes
     document.getElementById('timer').textContent = '25:00';
 }


 //handle form
 document.querySelector('#taskform').addEventListener('submit',function (event){
    const form=document.querySelector('#taskform')
    event.preventDefault()
    const taskDescription = document.getElementById('taskDescription');
    let hours = document.getElementById('hours').value;
    let minutes = document.getElementById('minutes').value;
    let taskname=document.querySelector('#taskName')
    let duration=document.querySelector('#duration')
    


    // Format hours and minutes to two digits
    hours = hours.padStart(2, '0'); // Ensure hours are two digits
    minutes = minutes.padStart(2, '0'); // Ensure minutes are two digits

    // Validate hours and minutes
    if (hours < 0 || hours > 23) {
        alert('Hours must be between 00 and 23.');
        return;
    }
    if (minutes < 0 || minutes > 59) {
        alert('Minutes must be between 00 and 59.');
        return;
    }
    const formData = new FormData(form); // Collect form data

    axios.post('/tasks', formData)
      .then(response => { alert('')
        console.log([...formData.entries()]); // Handle success
      })
      .catch(error => {
        console.error(error); // Handle error
      });
      taskname.value=''
      taskDescription.value=''
      document.getElementById('hours').value=''
      document.getElementById('minutes').value=''
      duration.value=''

      alert('task added sucessfully')
      clicked=true
      
      addtask.classList.add('hidden');
      
      console.log(addtask.classList);
      
      
      return true
      

  });



  function updateTasks() {
    axios.get('/tasks')
    
        .then(response => {
            const tasks = response.data;
            
            const date=new Date ()
            
            
            const quote=document.querySelector('#wise')
            quote.textContent='every step is a wise'
           
            let tasksTable = document.getElementById('tasktable').getElementsByTagName('tbody')[0];
            tasksTable.innerHTML = ''; // Clear existing rows
            let id=0

            tasks.forEach(task => {    
            
            let status=['current','pending','elapsed']
                let row = tasksTable.insertRow();
                let manage =row.insertCell(0)
                let taskCell = row.insertCell(1);
                let descCell = row.insertCell(2);
                let starttime= row.insertCell(3)
                let durCell = row.insertCell(4);
                let statusCell = row.insertCell(5);
                const currentHour = date.getHours();
                const currentMinute = date.getMinutes();
                
                // Task start time in hours and minutes
                const taskStartHour = Number(task.start_time_hour);
                const taskStartMinute = Number(task.start_time_min);
                
                // Task duration (assuming it's in minutes for this example)
                const taskDuration = Number(task.duration);
                
                // Convert start time and current time to minutes for easier comparison
                const taskStartInMinutes = taskStartHour * 60 + taskStartMinute;
                const currentTimeInMinutes = currentHour * 60 + currentMinute;
                const taskEndInMinutes = taskStartInMinutes + taskDuration;
                
                // Determine task status based on comparison
                let taskStatus = '';
                if (currentTimeInMinutes < taskStartInMinutes) {
                    taskStatus = status[1]; // "pending"
                } else if (currentTimeInMinutes >= taskStartInMinutes && currentTimeInMinutes < taskEndInMinutes) {
                    taskStatus = status[0]; // "current"
                } else {
                    taskStatus = status[2]; // "elapsed"
                }
            

                taskCell.textContent = task.taskname;
                descCell.textContent = task.description;
                starttime.textContent=`${task.start_time_hour}:${task.start_time_min}:${task.period}`
                
                durCell.textContent=task.duration
                statusCell.textContent=taskStatus
                //Add ID and tooltip to manage cell
    manage.classList.add("manage-cell"); // Add class for styling
    manage.innerHTML = `<span >${id + 1}</span> <span class=" hidden tooltiptext ">Click to manage</span>`; 
    id=id+1
    manage.addEventListener('mouseenter', (event) => {
        const tooltip = manage.querySelector('.tooltiptext');
        tooltip.classList.remove('hidden'); // Show tooltip
    });

    manage.addEventListener('mouseleave', (event) => {
        const tooltip = manage.querySelector('.tooltiptext');
        tooltip.classList.add('hidden'); })// Hide tooltip
    
    manage.addEventListener('click', (event) => {
        event.stopPropagation(); 
      
        let managePopup = document.getElementById("managePopup");
        if (!managePopup) {
            managePopup = document.createElement("div");
            managePopup.id = "managePopup";
            managePopup.className = "manage-popup";
            managePopup.innerHTML = `
                <button style ="margin-left:3px;" onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="updateTask(${task.id})">Update</button>
                
            `;
            document.body.appendChild(managePopup);
        }
        
        // Position the popup near the manage cell and make it visible
        managePopup.style.display = 'flex';
        managePopup.style.top = `${event.clientY + 10}px`;
        managePopup.style.left = `${event.clientX + 10}px`;
    });

    // Hide popup when clicking outside
    document.addEventListener('click', () => {
        const popup = document.getElementById("managePopup");
        if (popup) popup.style.display = 'none';
    });

                
               
                
            });
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
}


setInterval(updateTasks, 1000);


updateTasks();


   
 
});
function closediv(){
    setTimeout(()=>{},1000)
    addtask.classList.add('hidden');
}
