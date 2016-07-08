    /* jshint ignore:start */

import React from 'react';

class Message extends React.Component {

    onChildChange = (newState) =>{
    	this.setState({
    		checked:newState
    	})
    }

    state =  {
    	checked:false
    }

    render() {
    	var isChecked = this.state.checked ? "yes" : "no";
        return(
        	<div>
        		<div>Are you checked: {isChecked}</div>
        		<ToggleButton text="Toggle me" callbackParent={this.onChildChange} initChecked={this.state.checked}></ToggleButton>
        		
        	</div>
        )
    }
}

class ToggleButton extends React.Component {
	state = {
		checked:this.props.initChecked
	}

	onChange = () =>{
		var newState = !this.state.checked;

		this.setState({
			checked:newState
		});
		this.props.callbackParent(newState);
	}

	render(){
		var text = this.props.text;

		return(
			<label >{text}<input type="checkbox" checked={this.checked} onChange={this.onChange}/></label>
		)
	}
}

export default Message;
