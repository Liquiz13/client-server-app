import React from 'react';

const Rainbow = (WrappedComponent) => {

    const colours = ['red', 'pink', 'orange', 'blue', 'green', 'yellow'];
    const randomColours = colours[Math.floor(Math.random() * 5)];
    const className = randomColours + '-text';

    return (proprs) => {
        return (
            <div className={className}>
                <WrappedComponent {...proprs}/>
            </div>
        )
    }
}

export default Rainbow