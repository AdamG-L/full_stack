
const ContactForm = ({submitAll, newName, updateName, newNum, updateNum}) => {
    return (
        <form onSubmit={submitAll}>
        <div>
          name: <input value={newName} onChange={updateName} />
        </div>
        <div>
          number: <input value={newNum} onChange={updateNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default ContactForm