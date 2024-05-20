const timeframes = document.querySelectorAll(".period");
const timeframeName = ['daily','weekly','monthly'];
const prevName = ['Yesterday', 'Last Week', 'Last Month'];
const activities = document.querySelectorAll(".activities");
let curhighlight = document.getElementById('daily');

async function handleClick(timeframeNo){
    try{
        const response = await fetch('data.json');
        const data = await response.json();
        for(let i=0;i<6;i++){
            const nowtime = data[i].timeframes[timeframeName[timeframeNo]].current;
            const prevtime = data[i].timeframes[timeframeName[timeframeNo]].previous;
            activities[i].querySelector('.time-now').textContent = nowtime + ((nowtime>1) ? 'hrs': 'hr');
            activities[i].querySelector('.footer').textContent = prevName[timeframeNo] + ' - ' + prevtime + ((prevtime>1) ? 'hrs': 'hr');
            
        }
    }
    catch{
        console.error("ERROR!!");
    }
}



timeframes.forEach((e) => {
    console.log(e);
    e.addEventListener('click',function(){
        curhighlight.style.color = 'var(--Desaturated-blue)';
        curhighlight = e;
        e.style.color = 'white';
        handleClick(e.dataset.type);
    });
});

handleClick(0);