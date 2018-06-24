import React, { Component } from 'react';


var ListBox = React.createClass({
    render: function() {
        return (
            <div className="listBox">
            This is the dynamic list box
            </div>
        );
    }
  });
  ReactDOM.render(
    <ListBox />,
    document.getElementById('product-list')
  );