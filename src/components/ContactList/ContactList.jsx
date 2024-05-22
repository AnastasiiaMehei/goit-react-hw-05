import Contact from "../Contact/Contact";
import css from './ContactList.module.css';
export default function ContactList({ data, onDelete }) {
    return (
        <ul className={css.ul}>
        {data.map((contact, index) => {
    return (
        <li className={css.li} key={`${contact.id}-${index}`}> 
            <Contact id={contact.id} name={contact.name} number={contact.number} onDelete={onDelete}/> 
        </li>
    );
})}
        </ul>
    );
}
