const time = document.querySelector("#time")
const trip = document.querySelector(".trip")

const deadline = 'August 31 2021';

function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  getTimeRemaining(deadline);

  function initializeTime(id, endtime) {

    const timeinterval = setInterval(() => {
      const t = getTimeRemaining(endtime);
      time.innerHTML =  t.days + `:` +
                        t.hours + `:` +
                        t.minutes + `:`+ t.seconds;
      if (t.total <= 0) {
        clearInterval(timeinterval);
        trip.innerText = `We are out traveling`
        time.innerHTML = `<p>Update coming soon!</p>`
      }
    },1000);
  }
  
  initializeTime('clockdiv', deadline);



// let countDownDate = new Date("Desember 24, 2021 14:00:00").getTime();

// const x = setInterval(function() {

//   let now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   let distance = countDownDate - now;
//   console.log(distance)
    
//   // Time calculations for days, hours, minutes and seconds
//   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   console.log(now)
//   // Output the result in an element with id="demo"
//   document.getElementById("time").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("time").innerHTML = "EXPIRED";
//   }
// }, 1000);

// const now = new Date();
// const time = now.getTime();
// console.log(time);
// const date = new Date('February 16, 2022 15:00:00');