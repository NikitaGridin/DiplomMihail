import React, { useState } from 'react';

const bookedTimes = [{start: 8, finish: 9}, {start: 14, finish: 16}, {start: 20, finish: 22}];

const bookedTimeArray = bookedTimes.map(time => {
  let times = [];
  for (let i = time.start; i <= time.finish; i++) {
    times.push(i);
  }  
  return times;
}).flat();


const times = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

const App = () => {
const [start, setStart] = useState(null);
const [finish, setFinish] = useState(null);

const isDisabled = time => bookedTimeArray.includes(time);

const updateTime = time => {
if (start === null) {
setStart(time);
} else {
if (time < start) setStart(time);
if (time > start) setFinish(time);  
else {
const diffStart = time - start;
const diffFinish = finish - time;
if (diffStart <= diffFinish) setStart(time);
else setFinish(time);
}
}
}

React.useEffect(()=>{
  if(start && finish){
    for(let i = start; i < finish; i++){
      if(bookedTimeArray.includes(i)){
        setStart(null);
        setFinish(null);
      }
    }
  }
},[start,finish])

  return (
    <>
      <div>
        {times.map((time) => {

          let className = 'p-5 border m-5 disabled:bg-red-100 disabled:cursor-not-allowed';

          if (time === start) {
            className += ' bg-blue-400';
          }

          if (time === finish) {
            className += ' bg-blue-400';
          }

          if (time > start && time < finish) {
            className += ' bg-blue-200';
          }

          return (
            <button
              disabled={isDisabled(time)}
              key={time}
              className={className}
              onClick={() => updateTime(time)}

            >
              {time}
            </button>
          );
        })}
      </div>
      <p>
        Выбранный интервал:{' '}
        {start !== null ? `${start} - ${finish !== null ? finish : ''}` : ''}
      </p>
    </>
  );
};

export default App;