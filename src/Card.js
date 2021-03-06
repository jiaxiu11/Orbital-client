import React, {Component} from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'
import ReactMarkdown from 'react-markdown'
import './card.css'

class Card extends Component{
	constructor(props){
		super(props)
		this.state = {
			editing:false
		}
		this.edit = this.edit.bind(this)
		this.remove = this.remove.bind(this)
		this.save = this.save.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
		this._handleKeyPress = this._handleKeyPress.bind(this)
	}
	componentDidUpdate(){
		var textArea;
		if (this.state.editing){
			textArea = this._newText
			textArea.focus()
			textArea.select()
		}
	}

	shouldComponentUpdate(nextProps,nextState){
		return (
			this.props.index !== nextProps.index||
			this.props.children !== nextProps.children|| this.state !== nextState
			)

	}

	edit(){
		if (this.props.index == "placeHolderCard") return;
		this.setState({
			editing: true
		})
	}
	remove(){
		if (this.props.index == "placeHolderCard") return;
		this.props.onRemove(this.props.index)
	}

	save(e){
		e.preventDefault()
		this.props.onChange(this._newText.value,this.props.index)
		this.setState({
			editing:false
		})
	}

	_handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        console.log('do validate');
        }
    }
	renderForm(){//style={this.style}
		return (
			<div className={`card_${this.props.mode}`} >
			    <form onSubmit={this.save}>
			        <textarea ref={input => this._newText = input}
			            defaultValue={this.props.children}/>
			        <button id="save"><FaFloppyO/></button>


			    </form>
			</div>
		)
	}

	renderDisplay(){//style={this.style}
		return (
			<div className={`card_${this.props.mode}`} >
					<p onClick={this.edit}><ReactMarkdown source = {this.props.children} /></p>
			    <span>
			        <button onClick={this.edit} id="edit"><FaPencil /></button>
			        <button onClick={this.remove} id="remove"><FaTrash /></button>
			    </span>
			 </div>
			)
	}
	render(){
		return this.state.editing ? this.renderForm():this.renderDisplay()
	}
}
export default Card
