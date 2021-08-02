import './style/style.scss';
import * as React from "react";

export default class App extends React.Component {
     
  constructor(){
      super();
      this.state={
          counter:0,
          cookiesPerSeconds:0,
          level:["N00b","Novice","Hackerman","Amateur","Junior","Expert","Senior","Master","Godlike","Fast n Furious","Emily","Kill"],
          upgrades:[
              {
              name:"Html",
              nbr:0,
              cost:10,
              income:1,
              level:0,
              img:"./img/html_logo.png",
              },
              {
              name:"Css",
              nbr:0,
              cost:20,
              income:5,
              level:0,
              img:"./img/css_logo.png",
              },
              {
              name:"Javascript",
              nbr:0,
              cost:40,
              income:10,
              level:0,
              img:"./img/js_logo.png",
              },
              {
              name:"Php",
              nbr:0,
              cost:100,
              income:50,
              level:0,
              img:"./img/php_logo.png",
              },
              {
              name:"Laravel",
              nbr:0,
              cost:200,
              income:100,
              level:0,
              img:"./img/laravel_logo.png",
              },
              {
              name:"React",
              nbr:0,
              cost:500,
              income:200,
              level:0,
              img:"./img/react_logo.png",
              },
              {
              name:"Node",
              nbr:0,
              cost:1000,
              income:300,
              level:0,
              img:"./img/node_logo.jpg",
              },
              {
              name:"Python",
              nbr:0,
              cost:1500,
              income:500,
              level:0,
              img:"./img/python_logo.jpg",
              },
              {
              name:"Stage",
              nbr:0,
              cost:2000,
              income:700,
              level:0,
              img:"./img/stage_logo.png",
              },
              {
              name:"Job",
              nbr:0,
              cost:3000,
              income:1000,
              level:0,
              img:"./img/job_logo.jpg",
              },
              
              {
              name:"Coach Becode",
              nbr:0,
              cost:5000,
              income:2000,
              level:0,
              img:"./img/becode_logo.png",
              },
              {
              name:"Transformation Kill",
              nbr:0,
              cost:1000000,
              income:5000,
              level:0,
              img:"./img/kill_logo.jpeg",
              },
          ]
      }
      
      //Please stop forgetting to bind omg ngl 
      this.onIncrement=this.onIncrement.bind(this);
      this.recruit=this.recruit.bind(this);
      this.refresh=this.refresh.bind(this);
      this.interval = setInterval(this.refresh,100);
        
  };
componentDidUpdate(previousProps,previousState){
  //areDifferentArrays() allows to compare arrays while modifying
  if(this.areDifferentArrays(previousState.upgrades,this.state.upgrades)){

      let cookiesPerSecond=0;

      this.state.upgrades.forEach(upgrade=>{
          cookiesPerSecond += upgrade.income*upgrade.nbr;
      });
      this.setState({
          cookiesPerSeconds:cookiesPerSecond,
      })
  };
  
}
areDifferentArrays(array_1,array_2){
  for(let i=0;i<array_1.length;i++){
      //if nbr are different returns true
      if(array_1[i].nbr !== array_2[i].nbr){
          return true;
      }
  }
  return false;
}

render(){
return(
  <div>
      <h1>Web Dev RoadMap Simulator</h1>
        <h2>Wallet : {Math.round(this.state.counter)}</h2>
        <h4>Cash/s : {this.state.cookiesPerSeconds}</h4>
        <button class='button__earn' onClick={this.onIncrement}>Start earning</button>
        
      <div class='upgrades'>
        {this.state.upgrades.map((upgrades, index)=>(
          <div key={index}>
            <img src={ upgrades.img} alt="" ></img>
            <span class='upgrades__name'>{upgrades.name}</span>
            <button  onClick={()=> this.recruit(index)} disabled={(this.state.counter<upgrades.cost)||(upgrades.cost==='max') } >{this.state.level[upgrades.level]} ({upgrades.cost})</button>
            </div>
        ))}
      </div>
  </div>       
)}

refresh(){
//divide by interval amount to get 1s
this.setState({
  counter: this.state.counter + this.state.cookiesPerSeconds/10,
})
}

recruit(index){
//copy array content [...] or object content {...} so that it can be modified separatly from og
const upgradesList = [...this.state.upgrades];
const upgrade = {...upgradesList[index]};


if(this.state.counter >= upgrade.cost){
  if(upgrade.level<this.state.level.length ){
      upgrade.level++;
      //stock before price increase
      const expense= this.state.counter - upgrade.cost;
      
      upgrade.cost = Math.round(upgrade.cost *1.2);
      upgrade.nbr++;
      upgradesList[index]=upgrade;
      this.setState({
          counter: expense,
          upgrades: upgradesList,
      })
      //max upgrade
      if(upgrade.level=== this.state.level.length){
          upgrade.cost='max';
          upgrade.level= this.state.level.length -1;
      }
  }
  
}
};

onIncrement(){

this.setState({
  counter: this.state.counter +1,
})
}
}
