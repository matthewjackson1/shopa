class Item extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           editClicked : [],
           editedItm : []
       }; 
         
   }


      handleChange(e){
          const editedItems = this.state.editedItm;
          editedItems[this.props.index] = e.target.value;
          //console.log("editedMessages"+editedMessages);
          this.setState({editedItm: editedItems});
          //console.log(this.state.editedMsg);
      }

      handleSubmit(e) {
          e.preventDefault();
          const newVal = this.state.editedItm[this.props.index];
          console.log(newVal);
          this.props.handleEdit(newVal);
          
      }


      itemControls() {
           return <div className="controls">
                          { this.state.editClicked[this.props.index] ? 
                          <span onClick={(e) => this.toggleEdit(e, this.props.index) }><span className="msgIcons ion-close-circled btn-secondary" /> Cancel</span> : 
                          <span onClick={(e) => this.toggleEdit(e, this.props.index) }><span className="msgIcons ion-edit btn-secondary" /> Edit</span> }
                          <span className="delete" onClick={(e) => this.props.handleDelete(e, this.props.index)}><span className="msgIcons ion-trash-a btn-secondary" />Delete</span>
          </div>
      }

      toggleEdit(e, messageKey){
          //console.log(messageKey);
          const clickStatuses = this.state.editClicked;
          console.log(clickStatuses);
          clickStatuses[messageKey] = (clickStatuses[messageKey] === true) ? false : true;
          console.log(clickStatuses);
          this.setState({editClicked: clickStatuses});
      }

   

      render() {
          return (
              <div>
                  { !this.state.editClicked[this.props.index] &&
                      <div className="leftCol">
                         <input className="checkbox" type="checkbox" checked={ this.props.isComplete } onChange={ this.props.toggleComplete } />
                         <span>{ this.props.name }</span>
                      </div>
                  }

                  { this.state.editClicked[this.props.index] &&
                      
                      <form onSubmit={(e) => this.handleSubmit(e)}> 

                          <input className="itmUpdate" 
                          type="text" 
                          defaultValue={this.props.name} 
                          onChange={(e)=>this.handleChange(e)}/>

                          <input className="itmSubmit" 
                          type="submit" 
                          value="update" 
                           />
                      </form>
                      
                  }
                      
                          {this.itemControls()}
                      
              
              </div>
          );
      }
  }

 class Shoppinglist extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           items: [],
           newItemName: ""
       };   
       //this.handleEdit = this.handleEdit.bind(this);
   }

  toggleComplete(index) {
      let itemsCopy = this.state.items.slice();
      console.log("ONE", itemsCopy);
      let item = itemsCopy[index];
      console.log(item);
      item.is_complete = item.is_complete ? false : true;
      console.log(item);
      itemsCopy[index] = item;
      console.log("TWO", itemsCopy);

      fetch('/items/toggleComplete', {
              method: 'POST',
              body: JSON.stringify({name: item.name, newCompletionState: item.is_complete}),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              credentials : 'include' 
              })
              .then(function(response) {
                  if (response.status >= 200 && response.status < 300) {
                  console.log("wooopppeeee");
                  console.log(response);
                  return response;
              } else {
                  var error = new Error(response.statusText);
                  error.response = response;
                  throw error;
              }
              }).then(function(response) {
                  return response.json();
              }).then(function(json) {
                  console.log('parsed json', json)
              }).catch(function(ex) {            
                  console.log('parsing failed', ex)
              });
              
      this.setState({ items: itemsCopy });
  }

  handleDelete(index) {
      //e.preventDefault();
      const selectedItemIndex = index;
      
      const items = this.state.items.slice();
      const selectedItemName = items[index].name;
          fetch('/items/delete', {
              method: 'POST',
              body: JSON.stringify({name: selectedItemName}),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              credentials : 'include' 
              })
              .then(function(response) {
                  if (response.status >= 200 && response.status < 300) {
                  console.log("wooopppeeee");
                  console.log(response);
                  return response;
              } else {
                  var error = new Error(response.statusText);
                  error.response = response;
                  throw error;
              }
              }).then(function(response) {
                  return response.json();
              }).then(function(json) {
                  console.log('parsed json', json)
              }).catch(function(ex) {            
                  console.log('parsing failed', ex)
              });
      
      const updatedItems = items.filter(x => items.indexOf(x) !== index);
      this.setState({ items: updatedItems });
  
  }

   handleEdit(index, newVal) {
      
      const items = this.state.items.slice();
      const currentName = items[index].name;

      fetch('/items/update', {
          method: 'POST',
          body: JSON.stringify({ currentName: currentName, newName: newVal }),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          credentials : 'include' 
      })
      .then(function(response) {
          if (response.status >= 200 && response.status < 300) {
          console.log("wooopppeeee");
          console.log(response);
          return response;
      } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
      }
      }).then(function(response) {
          return response.json();
      }).then(function(json) {
          console.log('parsed json', json)
      }).catch(function(ex) {            
          console.log('parsing failed', ex)
      }); 

      items[index].name = newVal;
      this.setState({ items: items });
      //console.log(JSON.stringify(newItem));
      
  }

  handleSubmit(e) {
      e.preventDefault();
      if (!this.state.newItemName) { return };
      const newItem = { name: this.state.newItemName, is_complete: false };
      this.setState({ items: [...this.state.items, newItem], newItemName: "" }); 
      console.log(JSON.stringify(newItem));
      fetch('/items/create', {
          method: 'POST',
          body: JSON.stringify(newItem),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          credentials : 'include' 
      })
      .then(function(response) {
          if (response.status >= 200 && response.status < 300) {
          console.log("wooopppeeee");
          console.log(response);
          return response;
      } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
      }
      }).then(function(response) {
          return response.json();
      }).then(function(json) {
          console.log('parsed json', json)
      }).catch(function(ex) {            
          console.log('parsing failed', ex)
      });
  }

  handleChange(e) {
       this.setState({ newItemName: e.target.value })
  }

  

  componentDidMount(){
      
      fetch("/getitems", {credentials: 'include'})
          .then(response => response.json())
          .then(json => {
            console.log(json);
            this.setState({items: json});
            console.log(this.state);
});


       
  };
  
  render() {
     return (
       <div className="Shoppinglist">
         <div className="ItemList">
          <ul>
          <li>
              <form onSubmit={ (e) => this.handleSubmit(e) }>
                  <input type="text" value={ this.state.newItemName } onChange={ (e) => this.handleChange(e) } />
                  <input type="submit" />
              </form>
          </li>
          {this.state.items.map( (item, index) =>
              <Item key={ index } 
              index ={ index } 
              name={ item.name } 
              isComplete={ item.is_complete } 
              toggleComplete={ () => this.toggleComplete(index)}
              handleDelete={ () => this.handleDelete(index)}
              handleEdit={ (newVal) => this.handleEdit(index, newVal) }
               />
           )}
           </ul>
           
       </div>
       </div>
     );
   }
 };

 ReactDOM.render(
   <Shoppinglist />, document.getElementById('reactList')
 );