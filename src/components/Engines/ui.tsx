import "./Engines.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../widgets/Search";
import Settings from "../widgets/Settings";
import Paginator from "../widgets/Paginator";
import BACKEND_URL from "../../constants/constants";
import axios from "axios";
import API_TOKEN from "../../constants/tokens";

type Engine = {
    id: number;
    name: string;
    volume: string;
    type_fuel: string;
    compression: string;
};

const Engines: React.FC = () => {
    const [engines, setEngines] = useState<Engine[]>([]);
    const [limit, setLimit] = useState(15);
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState('');
    const [total, setTotal] = useState(0);
    const [isSearch, setIsSearch] = useState(false);
    const [sort, setSort] = useState('name');
    const [tempLimit, setTempLimit] = useState(15);

    const fetchData = (limit: number, offset: number, search: string) => {
        axios.get(`${BACKEND_URL}/cars/engine/`, {
            headers: { 'Authorization': `Token ${API_TOKEN}` },
            params: { limit, offset, search, ordering: sort }
        })
            .then((resp) => {
                setTotal(resp.data.count);
                setEngines(resp.data?.results || []);
            })
            .catch(() => { });
    };

    useEffect(() => {
        const params = new URLSearchParams({
            limit: `${limit}`,
            offset: `${offset}`,
            search: isSearch ? search : '',
            ordering: sort
        });
        const searchParamsString = params.toString();
        const url = `${window.location.pathname}?${searchParamsString}`;
        window.history.pushState({ path: url }, '', url);

        fetchData(limit, offset, isSearch ? search : '');
    }, [offset, limit, isSearch, sort]);

    useEffect(() => {
        setLimit(parseInt(new URLSearchParams(window.location.search).get('limit') || '15', 10));
        setOffset(parseInt(new URLSearchParams(window.location.search).get('offset') || '0', 10));
        setSearch(new URLSearchParams(window.location.search).get('search') || '');
        setIsSearch(new URLSearchParams(window.location.search).get('is_search') === 'true');
        setSort(new URLSearchParams(window.location.search).get('ordering') || 'name');
    }, []);

    const goSearch = () => {
        setIsSearch(search !== '');
        setOffset(0);
        fetchData(limit, 0, isSearch ? search : '');
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
        setOffset(0);
    };

    const handleLimitChange = () => {
        if (tempLimit > 0) {
            setLimit(tempLimit);
        } else {
            setLimit(5);
            setTempLimit(5);
        }
    };

    const handleTempLimitChange = (event: any) => {
        setTempLimit(event.target.value)
    }

    return (
        <div className="engines">
            <div className="engines__head">
                <Link to="/" className="engines-marks__back button">Назад</Link>
                <Search
                    search={search}
                    goSearch={goSearch}
                    handleChange={handleInputChange}
                />
                <div className="sorting">
                    <div className="option-title">Сортировка</div>
                    <select name="sorter" id="" onChange={handleOrderChange} defaultValue={sort}>
                        <option value="name" >По алфавиту</option>
                        <option value="-name" >Обратно по алфавиту</option>
                    </select>
                </div>
                <Settings handleChange={handleTempLimitChange} value={tempLimit} onSave={handleLimitChange} />
            </div>
            <div className="engines__content">
                <table className="engines__items">
                    <thead>
                        <tr className="engines__item engines__item-head">
                            <td className="engines__item-col engines__item-head-col">Название</td>
                            <td className="engines__item-col engines__item-head-col">Компрессия</td>
                            <td className="engines__item-col engines__item-head-col">Тип топлива</td>
                            <td className="engines__item-col engines__item-head-col">Объём л.</td>
                        </tr>
                    </thead>
                    <tbody>
                        {engines.map((engine) => (
                            <tr className="engines__item" key={engine.id}>
                                <td className="engines__item-col">{engine.name}</td>
                                <td className="engines__item-col">{engine.compression}</td>
                                <td className="engines__item-col">{engine.type_fuel}</td>
                                <td className="engines__item-col">{engine.volume}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {total > limit &&
                    <Paginator
                        setOffset={setOffset}
                        limit={limit}
                        total={total}
                        offset={offset}
                    />
                }
            </div>
        </div>
    );
}

export default Engines;
