const Person = ({onSubmitPerson,  
                 onChangeName,
                 valueName,
                 onChangeNumber,
                 valueNumber}) => {
  
  return (
    <form onSubmit={onSubmitPerson}>
      <div>
        name: <input value={valueName} onChange={onChangeName}/>
      </div>
      <div>
        phone: <input value={valueNumber} onChange={onChangeNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Person