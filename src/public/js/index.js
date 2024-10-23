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
 let clicked=false
 let addtask = document.getElementById('addtask');

 function toggle(){
   
       
        if (!clicked){  
   
    addtask.classList.remove('hidden');
    clicked=true

}
else{
    
   
    addtask.classList.add('hidden');
    clicked=false

}}

addbtn.addEventListener('click', function() {toggle()})

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
      .then(response => {
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
            let tasksTable = document.getElementById('tasktable').getElementsByTagName('tbody')[0];
            tasksTable.innerHTML = ''; // Clear existing rows

            tasks.forEach(task => {
                let row = tasksTable.insertRow();
                let taskCell = row.insertCell(0);
                let descCell = row.insertCell(1);
                let statusCell = row.insertCell(2);
                let durCell = row.insertCell(3);

                taskCell.textContent = task.taskname;
                descCell.textContent = task.description;
                statusCell.textContent='pending'
                durCell.textContent=task.duration
            });
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
}


setInterval(updateTasks, 1000);


updateTasks();

   
 
});
