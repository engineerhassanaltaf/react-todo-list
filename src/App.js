import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAddButtonActive: true,
      todoText: '',
      itemList: []
    };
  }

  onTodoTextChange(e) {
    this.setState({
      todoText: e.target.value
    });
  }

  onAddButtonClick() {
    const { itemList, todoText } = this.state;
    if (!todoText) {
      return;
    }

    itemList.push(todoText);
    this.setState({
      itemList: itemList,
      todoText: ''
    });
  }

  onSaveButtonClick() {
    const { itemList, todoText, updatingIndex } = this.state;
    var newList = itemList;
    newList[updatingIndex] = todoText;

    this.setState({
      itemList: newList,
      todoText: '',
      isAddButtonActive: true
    });
  }

  onDeleteButtonClick(itemIndex) {
    const { itemList } = this.state;
    var newList = itemList;
    newList.splice(itemIndex, 1);

    this.setState({
      itemList: newList
    });
  }

  onUpdateButtonClick(value, index) {
    this.setState({
      updatingIndex: index,
      todoText: value,
      isAddButtonActive: false
    });
  }

  render() {
    const { todoText, itemList, isAddButtonActive } = this.state;
    return (
      <div >
        <input placeholder="Add an item" onChange={(e) => this.onTodoTextChange(e)} value={todoText} />
        {
          isAddButtonActive ?
            <button onClick={() => this.onAddButtonClick()}>Add</button> :
            <button onClick={() => this.onSaveButtonClick()}>Save</button>
        }
        <ul>
          {itemList.map((item, index) => {
            return <div>
              <li>
                {item}
                <button onClick={() => { this.onDeleteButtonClick(index) }}>Delete</button>
                <button onClick={() => { this.onUpdateButtonClick(item, index) }}>Update</button>
              </li>
            </div>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
