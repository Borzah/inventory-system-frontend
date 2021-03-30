import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import { getAdminStatistics } from '../services';
import { getDateFromFullDate } from '../utils';

const AdminView = () => {

    const history = useHistory();
    const user = useSelector(state => state)

    const [stats, setStats] = useState([]);

    const getData = () => {
        getAdminStatistics(user.token)
            .then(response => {
                const data  = response.data
                setStats(data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (typeof user === 'undefined') {
            history.push("/")
        } else if (user.role === "USER") {
            history.push("/inventory")
        } else {
            getData();
        }
    }, [])

    return (
        <div className="container mb-3 mt-3">
            <h2><i class="fas fa-chart-bar"></i> Statistics</h2>

            <Table striped bordered hover responsive>
                <thead className="secondary-block">
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Num of Items</th>
                        <th>Num of folders</th>
                        <th>Registered At</th>
                        <th>Last item added</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => 
                        <tr key={index}>
                            <th>{index}</th>
                            <th>{stat.username}</th>
                            <th>{stat.numOfItems}</th>
                            <th>{stat.numOfFolders}</th>
                            <th>{getDateFromFullDate(stat.registeredAt)}</th>
                            <th>{getDateFromFullDate(stat.lastItemAddedAt)}</th>
                        </tr>
                    )}
                </tbody>
                </Table>

        </div>
    )
}

export default AdminView;
