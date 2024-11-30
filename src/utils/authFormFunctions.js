function handleFormTextInput (e, stateVariable, setFunction) {
    const value = e.target.value
    const id = e.target.id
    setFunction({...stateVariable, [id] : value}) 
 }

 export {
    handleFormTextInput
 }