import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { heroeAdded } from '../../actions';
import { v4 as uuidv4 } from 'uuid';

const HeroesAddForm = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');
    const {request} = useHttp();

    const dispatch = useDispatch();

    function renderFilters(filters, status) {
        if (status === 'loading') {
            return <option>Загрузка элементов</option>
        } else if (status === 'error') {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => 
                name !== 'all' ? <option key={name} value={name}>{label}</option> : null
            );
        }
    }

    function onSubmitHandler(e) {
        e.preventDefault();

        if (name !== "" && description !== "" && element !== "") {
            const newHero = {
                id: uuidv4(), 
                name: name, 
                description: description, 
                element: element
            }
    
            request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
                .then(dispatch(heroeAdded(newHero)))
                .catch(err => console.log(err));
        }

        setName('');
        setDescription('');
        setElement('');
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => onSubmitHandler(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={description}
                    onChange={(e) => setDescription((e.target.value))}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}>
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;