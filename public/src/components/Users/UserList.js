
import Spinner from "../UI/Spinner";
import {useState, useEffect,Fragment} from 'react';
import getData from "../../utils/api";

export default function UserList () {

    const [error, setError] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [userIndex, setUserIndex] = useState(0);

    const [users, setUsers] = useState(null)

    useEffect( ()=> {
      getData("http://localhost:3001/users")
        .then(data => {
          setUsers(data);
          setIsLoading(false); // loading is over.
        })

        .catch(error => {
          setError(error); // set the error object.
          setIsLoading(false)  // we are no longer loading.
        })

      // fetch("http://localhost:3001/users")
      //   .then(resp => resp.json())
      //   .then(data => setUsers(data));
    }, [])

    if (error) {
      return <p>error.message</p>
    }

    if (isLoading) {
      return <p><Spinner/>Loading users....</p>
    }

    const currentUser =  users?.[userIndex];

    if (users === null) {
      return <Spinner/>
    }

    return (
        <Fragment>
          <ul className="users items-list-nav">
            {users.map((b,i) =>(
                <li
                  key={b.id}
                  className={i === userIndex ? "selected": null}>
                  <button className="btn"
                    onClick={() => setUserIndex(i)}>
                        {b.name}<br></br>
                  </button>
                </li>
            ))}
          </ul>
          {currentUser && (
            <div className="bookable-details">
                <div className="item">
                    <div className="item-header">
                        <h2>{currentUser.name}</h2>
                     </div>

                    <p></p>

                     <div className="item-details">
                        <h3>{currentUser.title}</h3>
                        <div className="bookable-availability">
                            {currentUser.notes}
                        </div>
                    </div>
                </div>
             </div>
          )}

        </Fragment>


    )
}

