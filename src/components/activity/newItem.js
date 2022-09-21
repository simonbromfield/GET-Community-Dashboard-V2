import React from 'react'

function NewItem(props) {
  let { blockTimestamp, newestItem } = props;

  if (blockTimestamp > newestItem) {
    return (
      <p>I am new</p>
    )
  } else {
    return (
      <p>old news</p>
    )
  }
  
}

export default NewItem
