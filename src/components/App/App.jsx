import css from './App.module.css'
import ContactForm from '../ContactForm/ContactForm'
import SearchBox from '../SearchBox/SearchBox'
import ContactList from '../ContactList/ContactList'
// import initialData from '../../data/data.json'
import { useState, useEffect } from 'react';
export default function App() {
  const [data, setData] = useState(()=>{
    const saveData = window.localStorage.getItem("saved-data");
    if(saveData !== null) 
      {return JSON.parse(saveData)}
return [
  { "id": "id-1", "name": "Rosie Simpson", "number": "459-12-56" },
  { "id": "id-2", "name": "Hermione Kline", "number": "443-89-12" },
  { "id": "id-3", "name": "Eden Clements", "number": "645-17-79" },
  { "id": "id-4", "name": "Annie Copeland", "number": "227-91-26" }
];
  });
  useEffect(() => {
    window.localStorage.setItem("saved-data", JSON.stringify(data));
  }, [data]);
  const [filter, setFilter] = useState('');
  const addData = (newData) => {
    setData((prevData) => {
      return [...prevData, newData];
    });
  };
  const deleteData = (dataId) => {

    setData((prevData) => {
      return prevData.filter((data) => data.id !== dataId);
    });
  };
  const visibleData = data.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div className={css.div}>
  <h1>Phonebook</h1>
  <ContactForm onAdd={addData}/>
  <SearchBox data={filter} onFilter={setFilter}/>
  <ContactList data={visibleData} onDelete={deleteData} />
</div>
  )
}