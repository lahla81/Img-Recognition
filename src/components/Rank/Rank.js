import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <p className="f3 white mb0">
               {`${name}, Your current rank is .... `}
            </p>
            <p className="f1 white mt2 mb0">
               {entries}
            </p>
        </div>
    )
}
export default Rank;