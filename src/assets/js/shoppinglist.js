class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editClicked: [],
            editedItm: []
        };

    }


    handleChange(e) {
        const editedItems = this.state.editedItm;
        editedItems[this.props.index] = e.target.value;
        this.setState({ editedItm: editedItems });
    }

    handleSubmit(e) {
        e.preventDefault();
        const newVal = this.state.editedItm[this.props.index];
        this.props.handleEdit(newVal);

    }


    itemControls() {
        return <div>
            {this.state.editClicked[this.props.index] ?
                <span className="btn-secondary" onClick={(e) => this.toggleEdit(e, this.props.index)}> Cancel</span> :
                <div>
                    <span className="btn-secondary" onClick={(e) => this.toggleEdit(e, this.props.index)}> Edit</span>
                    <span className="delete btn-secondary" onClick={(e) => this.props.handleDelete(e, this.props.index)}>Delete</span>
                </div>
            }
        </div>


    }

    toggleEdit(e, messageKey) {
        const clickStatuses = this.state.editClicked;
        clickStatuses[messageKey] = (clickStatuses[messageKey] === true) ? false : true;
        this.setState({ editClicked: clickStatuses });
    }



    render() {
        return (
            <div>
                {!this.state.editClicked[this.props.index] &&

                    <div className="row">
                        <div className="col-lg-1 list list-left">
                            <input className="" type="checkbox" checked={this.props.isComplete} onChange={this.props.toggleComplete} />
                        </div>
                        <div className="col-lg-6 list list-center">
                            {this.props.name}
                        </div>
                        <div className="col-lg-3 list list-right">
                            {this.itemControls()}
                        </div>
                    </div>

                }

                {this.state.editClicked[this.props.index] &&

                    <div className="row">

                        <div className="col-lg-1 list list-left">
                            <input className="styled-checkbox" type="checkbox" checked={this.props.isComplete} onChange={this.props.toggleComplete} />
                        </div>
                        <div className="col-lg-6 list list-center">
                            <form className="updateform" onSubmit={(e) => this.handleSubmit(e)}>
                                <input className="list-tf" type="text"
                                    defaultValue={this.props.name}
                                    onChange={(e) => this.handleChange(e)} />
                                <input className="btn-primary"
                                    type="submit"
                                    value="update"
                                />
                            </form>
                        </div>

                        <div className="col-3 list list-right">
                            {this.itemControls()}
                        </div>
                    </div>
                }
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
        let item = itemsCopy[index];
        item.is_complete = item.is_complete ? false : true;
        itemsCopy[index] = item;

        fetch('/items/toggleComplete', {
            method: 'POST',
            body: JSON.stringify({ name: item.name, newCompletionState: item.is_complete }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log('parsed json', json)
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            });

        this.setState({ items: itemsCopy });
    }

    handleDelete(index) {
        const selectedItemIndex = index;

        const items = this.state.items.slice();
        const selectedItemName = items[index].name;
        fetch('/items/delete', {
            method: 'POST',
            body: JSON.stringify({ name: selectedItemName }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log('parsed json', json)
            }).catch(function (ex) {
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
            credentials: 'include'
        })
            .then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log('parsed json', json)
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            });

        items[index].name = newVal;
        this.setState({ items: items });

    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.newItemName) { return };
        const newItem = { name: this.state.newItemName, is_complete: false };
        this.setState({ items: [...this.state.items, newItem], newItemName: "" });
        fetch('/items/create', {
            method: 'POST',
            body: JSON.stringify(newItem),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log('parsed json', json)
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            });
    }

    handleChange(e) {
        this.setState({ newItemName: e.target.value })
    }



    componentDidMount() {

        fetch("/getitems", { credentials: 'include' })
            .then(response => response.json())
            .then(json => {
                this.setState({ items: json });
            });



    };

    render() {
        return (
            <div className="Shoppinglist">
                <div className="ItemList">

                    <div className="row">
                        <div className="col-lg-1 list list-left">
                            <i className="fas fa-plus add-new"></i>
                        </div>
                        <div className="col-lg-8 list list-center">
                            <form className="updateform" onSubmit={(e) => this.handleSubmit(e)}>
                                <input className="list-tf" type="text" value={this.state.newItemName} onChange={(e) => this.handleChange(e)} />
                                <input className="btn-primary" type="submit" />
                            </form>
                        </div>

                    </div>

                    {this.state.items.map((item, index) =>
                        <Item key={index}
                            index={index}
                            name={item.name}
                            isComplete={item.is_complete}
                            toggleComplete={() => this.toggleComplete(index)}
                            handleDelete={() => this.handleDelete(index)}
                            handleEdit={(newVal) => this.handleEdit(index, newVal)}
                        />
                    )}

                </div>
            </div>
        );
    }
};

ReactDOM.render(
    <Shoppinglist />, document.getElementById('reactList')
);