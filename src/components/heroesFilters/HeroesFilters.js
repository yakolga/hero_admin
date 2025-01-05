import { useDispatch, useSelector } from 'react-redux';
import { activeFilterChanged } from '../../actions';
import { filtersFetching, filtersFetched, filtersFetchingError} from '../../actions';
import { useEffect } from 'react';
import {useHttp} from '../../hooks/http.hook';
import classNames from 'classnames';

const HeroesFilters = () => {
    const {filters, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    const filtersStructure = (filters) => {
        if (!filters.length) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return filters.map((elem, i) => {
            const btnClasses = classNames('btn', elem.className, {'active': elem.name === activeFilter});
            return <button onClick={() => dispatch(activeFilterChanged(elem.name))} className={btnClasses} key={i}>{elem.label}</button>
        });
    }

    const elements = filtersStructure(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;