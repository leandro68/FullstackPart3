const PersonList= ({person, deletePerson}) => {

  return (
    <li>
        {person.name} {person.Number}
        <button onClick={deletePerson}>delete</button>
    </li>)
}


export default PersonList