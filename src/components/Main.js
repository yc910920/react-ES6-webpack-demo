    /* jshint ignore:start */

require('styles/App.css');

import React from 'react';
import Message from './parent.js';
var PubSub = require('../sources/pubsub.js')
let yeomanImage = require('../images/yeoman.png');

let data =  [
        {stName:'marry',gender:'女',age:18,height:165,weigth:45,_id:2},
        {stName:'leo',gender:'男',age:35,height:180,weigth:80,_id:0},
        {stName:'jeff',gender:'女',age:22,height:171,weigth:60,_id:6},
        {stName:'momo',gender:'男',age:26,height:175,weigth:70,_id:1},
        {stName:'leo',gender:'女',age:18,height:170,weigth:50,_id:3},
        {stName:'momo',gender:'女',age:38,height:166,weigth:50,_id:4},
        {stName:'jeff',gender:'男',age:30,height:175,weigth:65,_id:5}
  ]


export default class App extends React.Component {
	state={
		studentData:data,
    genderValue:'all',
    changeName:''
	}

	genderFilterHandle = (e) => {
		this.setState({
        genderValue:e.target.value
    })
	}

	nameFilterHandle = (e) => {
      this.setState({
      	changeName:e.target.value
      })
  }

  componentDidMount = () =>{
    PubSub.subscribe('delectItem',function(evName,_id){
      var newArr = this.state.studentData.filter(function(item){
        return item._id !== _id;
      });
      this.setState({studentData:newArr});
    }.bind(this))
  }

    render() {
    	return (
    	<div className='index'>
        	<img src={yeomanImage} alt='Yeoman Generator'/>
        	<div className="table-div">
              <h1>信息表</h1>
              <div className='bs-example'>
                <div className='form-group'>
                  <label >按性别筛选</label>
                  <select className='form-control' onChange={this.genderFilterHandle}>
                    <option value='all'>all</option>
                    <option value='1'>man</option>
                    <option value='0'>woman</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label>按名字筛选</label>
                  <input type='text' className='form-control' placeholder='请输入名字' onKeyUp={this.nameFilterHandle}/>
                </div>
              </div>

              <StudentInfoComponent studentData = {this.state.studentData}
                genderValue = {this.state.genderValue} changeName = {this.state.changeName}
              />


            </div>
        </div>

    );
  }
}

class StudentInfoComponent extends React.Component{
  render(){
    var list = [];
    let genderVal = this.props.genderValue;
    let genderArr = ['女','男',''];
    let changeName = this.props.changeName;
    this.props.studentData.forEach((item,index) => {
        if(genderVal !== 'all' && changeName === ''){
          if(genderArr[genderVal] === item.gender){

            list.push(<StudentItemComponent studentItem={item} key={index}/>)
          }
          return;
        }

        if(changeName !== ''){
          if(genderVal !== 'all'){
            if(changeName === item.stName && genderArr[genderVal] === item.gender){
              list.push(<StudentItemComponent studentItem={item} key={index}/>)
            }
          }else{
            if(changeName === item.stName){
              list.push(<StudentItemComponent studentItem={item} key={index}/>)

            }
          }
          return;
        }
            list.push(<StudentItemComponent studentItem={item} key={index}/>)

      })

      return(
        <div className='table-responsive'>
             <table className='table table-bordered table-hover'>
                 <thead>
                     <tr>
                         <th>姓名</th>
                         <th>性别</th>
                         <th>年龄</th>
                         <th>身高（cm）</th>
                         <th>体重（kg）</th>
                         <th>操作</th>
                     </tr>
                 </thead>
                 <tbody id='tb'>
                     {list}
                 </tbody>
             </table>
         </div> 
      )
  }
  }

class StudentItemComponent extends React.Component {
  delectItem = () =>{
      PubSub.publish("delectItem",this.props.studentItem._id ); 
  }
  render(){
    var item = this.props.studentItem;
        return (
          <tr>
            <td>{item.stName}</td>
            <td>{item.gender}</td>
            <td>{item.age}</td>
            <td>{item.height}</td>
            <td>{item.weigth}</td>
            <td><a href="javascript:;" onClick={this.delectItem}>删除</a></td>
            <td><Message/></td>
          </tr>
        )
  }
}









