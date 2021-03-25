import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Table from 'react-bootstrap/Table'

const AdminView = () => {

    const history = useHistory();
    const user = useSelector(state => state)

    const [stats, setStats] = useState([]);

    const getData = () => {
        axios.get("/api/statistics", {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
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

    const getDateFromFullDate = (fullDate) => {
        return fullDate.substring(0, 10)
    }

    return (
        <div className="container p-5 border border-primary rounded m-5">
            <h2>Statistics</h2>

            <Table striped bordered hover responsive>
                <thead>
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
                        <tr>
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
