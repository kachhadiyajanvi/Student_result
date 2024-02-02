import './App.css';
import { useState } from "react";
function App() {
  let[roll,setroll]=useState('');
  let[name,setname]=useState('');
  let[sub1,setsub1]=useState('');
  let[sub2,setsub2]=useState('');
  let[sub3,setsub3]=useState('');
  let[sub4,setsub4]=useState('');
  let[sub5,setsub5]=useState('');
  let[getresult,setresult]=useState([]);
  let[grade,setgrade]=useState([]);
  const handlesubmit=()=>{
    if (roll !== '' && !isNaN(roll)) {
      if(name !==''){
        if(sub1 !=='' && !isNaN(sub1) && sub2 !=='' && !isNaN(sub2) && sub3 !=='' && !isNaN(sub3) && sub4 !=='' && !isNaN(sub4) && sub5 !=='' && !isNaN(sub5)){

          var total=parseFloat(sub1)+parseFloat(sub2)+parseFloat(sub3)+parseFloat(sub4)+parseFloat(sub5);
          let min=0,max=0,per=0,cnt=0,result='';
          if(sub1<sub2 && sub1<sub3 && sub1<sub4 && sub1<sub5){
            min=sub1;
          }else if(sub2<sub3 && sub2<sub4 && sub2<sub5){
            min=sub2;
          }else if(sub3<sub4 && sub3<sub5){
            min=sub3;
          }else if(sub4<sub5){
            min=sub4;
          }else{
            min=sub5;
          }
          if(sub1>sub2 && sub1>sub3 && sub1>sub4 && sub1>sub5){
            max=sub1;
          }else if(sub2>sub3 && sub2>sub4 && sub2>sub5){
            max=sub2;
          }else if(sub3>sub4 && sub3>sub5){
            max=sub3;
          }else if(sub4>sub5){
            max=sub4;
          }else{
            max=sub5;
          }
          
          if(min<=35){
            per=0;
          }else{
            per=total/5;
          }
          
          if(sub1<35){
            cnt++;
          }
          if(sub2<35){
            cnt++;
          }
          if(sub3<35){
            cnt++;
          }
          if(sub4<35){
            cnt++;
          }
          if(sub5<35){
            cnt++;
          }
          if(cnt==0){
            result="PASS";
          }else if(cnt==1 || cnt==2){
            result="ATKT";
          }else{
            result="FAIL";
          }
          var obj={
            roll:roll,
            name:name,
            sub1:sub1,
            sub2:sub2,
            sub3:sub3,
            sub4:sub4,
            sub5:sub5,
            Total:total,
            per:per,
            min:min,
            max:max,
            result:result,
          }
          setresult([...getresult, obj]);
          setgrade([...grade,obj]);
          // console.log(getresult);
          setroll('');
          setname('');
          setsub1('');
          setsub2('');
          setsub3('');
          setsub4('');
          setsub5('');

        }else{
          alert("Enter a valid Suject Marks..!")
        }
      }else{
        alert("Enter a Valid name..!");
      }
    } else {
      alert("Enter a valid Roll No..!");
    }
  }
  const handlefilter=(e)=>{
    let data = grade.filter((ele, ind) => {
      return ele.per >= parseInt(e.target.value);
    });
    setresult(data);
  }
  const handleresult=(e)=>{
   var info=e.target.value;
    let data = grade.filter((ele, ind) => {
      return ele.result ==info;
    });
    setresult(data);
  }
  const handleall=()=>{
    setresult([...grade]);
  }
  const handlesort=()=>{
    let sortedData = [...getresult];
    sortedData.sort((a, b) => b.per - a.per);
    setresult(sortedData);
  }
  return (
    <div className="App">
      <table border="4" align="center" cellSpacing="0" cellPadding="8">
        <caption>Student Result</caption>
        <tr>
          <td>Roll No.</td>
          <td><input type="text" size="40" value={roll} onChange={(e)=>setroll(e.target.value)}></input></td>
        </tr>
        <tr>
          <td>Name:=</td>
          <td><input type="text" size="40" value={name} onChange={(e)=>setname(e.target.value)}></input></td>
        </tr>
        <tr>
          <td>Subject 1:=</td>
          <td><input type="text" size="40" value={sub1} onChange={(e)=>setsub1(e.target.value)}></input></td>
        </tr>
        <tr>
          <td>Subject 2:=</td>
          <td><input type="text" size="40" value={sub2} onChange={(e)=>setsub2(e.target.value)}></input></td>
        </tr>
        <tr>
          <td>Subject 3:=</td>
          <td><input type="text" size="40" value={sub3} onChange={(e)=>setsub3(e.target.value)}></input></td>
        </tr>
        <tr>
          <td>Subject 4:=</td>
          <td><input type="text" size="40" value={sub4}  onChange={(e)=>setsub4(e.target.value)}></input></td>
        </tr>
        <tr>
          <td>Subject 5:=</td>
          <td><input type="text" size="40" value={sub5} onChange={(e)=>setsub5(e.target.value)}></input></td>
        </tr>
        <tr>
          <td colSpan="2"><button onClick={handlesubmit}>Submit</button></td>
        </tr>
      </table>
      <div className='filter_persantage'>
      <p className='para'>Persantage:=</p>
      <select onChange={handlefilter}>
        <option value={""}>select Option</option>
        <option value={"90"}>90+</option>
        <option value={"80"}>80+</option>
        <option value={"60"}>60+</option>
        <option value={"50"}>50+</option>
        <option value={"35"}>35+</option>
        <option value={"0"}>0+</option>
      </select>
      <p className='para'>Result:=</p>
      <select onChange={handleresult}>
        <option value={""}>select Option</option>
        <option value={"PASS"}>PASS</option>
        <option value={"ATKT"}>ATKT</option>
        <option value={"FAIL"}>FAIL</option>
      </select>
      <button onClick={handleall}>All Data</button>
      <button onClick={handlesort}>Sort data</button>
      </div>

      <table align='center' border={2} cellSpacing="0" cellPadding="8" className='data'>
        <tr>
          <td>Roll No.</td>
          <td>Name</td>
          <td>Subject1</td>
          <td>Subject2</td>
          <td>Subject3</td>
          <td>Subject4</td>
          <td>Subject5</td>
          <td>Total</td>
          <td>Persantage</td>
          <td>Minimum</td>
          <td>Maximum</td>
          <td>Result</td>
        </tr>
        {getresult.map((ele,ind)=>(
          <tr key={ind} style={{ backgroundColor: ele.result === "PASS" ? 'transparent' : (ele.result === "ATKT" ? 'blue' : 'red') }}>
            <td>{ele.roll}</td>
            <td>{ele.name}</td>
            <td>{ele.sub1}</td>
            <td>{ele.sub2}</td>
            <td>{ele.sub3}</td>
            <td>{ele.sub4}</td>
            <td>{ele.sub5}</td>
            <td>{ele.Total}</td>
            <td>{ele.per}</td>
            <td>{ele.min}</td>
            <td>{ele.max}</td>
            <td>{ele.result}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
